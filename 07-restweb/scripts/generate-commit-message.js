#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

function runGit(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });

  if (result.status !== 0) {
    if (result.error) {
      throw result.error;
    }
    throw new Error((result.stderr || result.stdout || 'git command failed').trim());
  }

  return (result.stdout || '').trim();
}

function getStagedFiles() {
  const output = runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMR']);
  if (!output) return [];

  const projectFolder = `${path.basename(process.cwd())}/`;
  return output
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean)
    .map((file) => (file.startsWith(projectFolder) ? file.slice(projectFolder.length) : file));
}

function hasBreakingChange() {
  const diff = runGit(['diff', '--cached']);
  return /\bBREAKING CHANGE\b/.test(diff);
}

function getFileDiff(file) {
  try {
    return runGit(['diff', '--cached', '--no-color', '--', file]);
  } catch (_) {
    return '';
  }
}

function extractAddedDepsFromPackageDiff(diff) {
  if (!diff) return [];

  let section = '';
  const deps = [];
  const lines = diff.split('\n');

  for (const line of lines) {
    if (!line || line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      continue;
    }

    const body = line.slice(1);

    if (/"dependencies"\s*:\s*{/.test(body)) {
      section = 'dependencies';
      continue;
    }
    if (/"devDependencies"\s*:\s*{/.test(body)) {
      section = 'devDependencies';
      continue;
    }
    if (/^\s*}/.test(body)) {
      section = '';
      continue;
    }

    if (!line.startsWith('+') || !section) {
      continue;
    }

    const match = body.match(/^\s*"([^"]+)"\s*:/);
    if (match) deps.push(match[1]);
  }

  return deps;
}

function inferType(files) {
  if (!files.length) return 'chore';

  const allDocs = files.every((file) => file.endsWith('.md') || file.startsWith('docs/'));
  if (allDocs) return 'docs';

  const hasTests = files.some((file) =>
    file.includes('/__tests__/') ||
    file.endsWith('.test.ts') ||
    file.endsWith('.spec.ts')
  );
  if (hasTests && files.length === 1) return 'test';

  const hasCI = files.some((file) => file.startsWith('.github/workflows/'));
  if (hasCI) return 'ci';

  const hasConfigOnly = files.every((file) =>
    file === 'package.json' ||
    file === 'package-lock.json' ||
    file.endsWith('.json') ||
    file.endsWith('.yml') ||
    file.endsWith('.yaml') ||
    file.endsWith('.env') ||
    file.endsWith('.env.template') ||
    file.includes('tsconfig')
  );
  if (hasConfigOnly) return 'chore';

  const hasSrc = files.some((file) => file.startsWith('src/'));
  if (hasSrc) return 'feat';

  return 'chore';
}

function inferScope(files) {
  if (!files.length) return '';
  const first = files[0];

  if (first.startsWith('src/presentation/')) return 'presentation';
  if (first.startsWith('src/domain/')) return 'domain';
  if (first.startsWith('src/infrastructure/')) return 'infrastructure';
  if (first.startsWith('prisma/')) return 'prisma';
  if (first.startsWith('public/')) return 'public';
  if (first.startsWith('src/')) return 'app';

  return '';
}

function inferSummary(type, files) {
  if (!files.length) return 'empty staging area';
  if (files.length === 1) {
    return `update ${files[0]}`;
  }

  if (type === 'docs') return 'update documentation';
  if (type === 'ci') return 'update CI workflow';
  if (type === 'test') return 'add or update tests';
  if (type === 'chore') return 'update project configuration';
  return `update ${files.length} files`;
}

function inferReason(type) {
  if (type === 'docs') return 'it keeps project documentation current';
  if (type === 'ci') return 'it improves CI reliability';
  if (type === 'test') return 'it improves confidence in behavior';
  if (type === 'chore') return 'it keeps project tooling and configuration aligned';
  return 'it supports the new behavior';
}

function inferDetailedContext(type, files) {
  const packageDiff = files.includes('package.json') ? getFileDiff('package.json') : '';
  const serverDiff = files.includes('src/presentation/server.ts')
    ? getFileDiff('src/presentation/server.ts')
    : '';

  const addedDeps = extractAddedDepsFromPackageDiff(packageDiff);
  const addedCompressionDep = addedDeps.includes('compression');
  const addedCompressionTypes = addedDeps.includes('@types/compression');
  const usesCompressionMiddleware = /\+\s*this\.app\.use\(compression\(\)\)/.test(serverDiff);
  const importsCompression = /\+\s*import .*compression/.test(serverDiff);

  if (addedCompressionDep && (usesCompressionMiddleware || importsCompression)) {
    return {
      type: 'feat',
      scope: 'presentation',
      summary: 'add compression middleware',
      reason: 'it reduces response payload size and improves API performance',
    };
  }

  if (addedDeps.length === 1) {
    return {
      type,
      scope: '',
      summary: `add ${addedDeps[0]} dependency`,
      reason: `it supports ${addedDeps[0]} integration`,
    };
  }

  if (addedDeps.length > 1 && addedCompressionDep && addedCompressionTypes) {
    return {
      type: 'feat',
      scope: 'presentation',
      summary: 'add compression support dependencies',
      reason: 'it enables compressed HTTP responses with TypeScript support',
    };
  }

  return {
    type,
    scope: '',
    summary: inferSummary(type, files),
    reason: inferReason(type),
  };
}

function buildMessage() {
  let files = [];
  try {
    files = getStagedFiles();
  } catch (error) {
    console.error('Could not read staged files. Are you inside a git repository?');
    process.exit(1);
  }

  if (!files.length) {
    console.error('No staged changes found. Stage files first, then run npm run commit:msg');
    process.exit(1);
  }

  const type = inferType(files);
  const defaultScope = inferScope(files);
  const context = inferDetailedContext(type, files);
  const scope = context.scope || defaultScope;
  const summary = context.summary;
  const finalType = context.type || type;
  const breaking = hasBreakingChange() ? '!' : '';

  const prefix = scope ? `${finalType}${breaking}(${scope})` : `${finalType}${breaking}`;
  const message = `${prefix}: ${summary} because ${context.reason}`;

  console.log(message);
}

buildMessage();
