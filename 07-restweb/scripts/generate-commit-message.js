#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const DEFAULT_OPENAI_BASE_URL = 'https://api.openai.com/v1';
const DEFAULT_OPENAI_MODEL = 'gpt-5-mini';

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

function getStagedDiff() {
  return runGit(['diff', '--cached', '--no-color']);
}

function getStagedStat() {
  return runGit(['diff', '--cached', '--stat']);
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

function getAddedLinesFromDiff(diff) {
  if (!diff) return [];
  return diff
    .split('\n')
    .filter((line) => line.startsWith('+') && !line.startsWith('+++'))
    .map((line) => line.slice(1));
}

function isCommentLine(line) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('*/')
  );
}

function extractFunctionNames(addedLines) {
  const names = [];

  for (const line of addedLines) {
    const patterns = [
      /^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/,
      /^\s*(?:public|private|protected)?\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/,
      /^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*(?::\s*[^=]+)?\s*=>/,
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        names.push(match[1]);
        break;
      }
    }
  }

  return names;
}

function analyzeSourceDiff(files) {
  const sourceFiles = files.filter((file) => file.match(/\.(ts|tsx|js|jsx)$/));
  const signals = {
    commentOnly: false,
    totalMeaningfulAddedLines: 0,
    totalAddedCommentLines: 0,
    functions: [],
    middlewareCalls: [],
    conditionals: 0,
    fileSignals: [],
  };

  if (!sourceFiles.length) return signals;

  for (const file of sourceFiles) {
    const diff = getFileDiff(file);
    const addedLines = getAddedLinesFromDiff(diff);
    if (!addedLines.length) continue;

    const meaningfulLines = addedLines.filter((line) => line.trim().length > 0);
    const fileFunctions = extractFunctionNames(addedLines);
    const fileMiddlewareCalls = [];
    let fileConditionals = 0;

    signals.totalMeaningfulAddedLines += meaningfulLines.length;
    signals.totalAddedCommentLines += meaningfulLines.filter(isCommentLine).length;

    signals.functions.push(...fileFunctions);

    for (const line of addedLines) {
      const middlewareMatch = line.match(/\.use\(([^)]+)\)/);
      if (middlewareMatch) {
        const middlewareName = middlewareMatch[1].replace(/\(\)/g, '').trim();
        signals.middlewareCalls.push(middlewareName);
        fileMiddlewareCalls.push(middlewareName);
      }

      if (/\bif\s*\(|\bswitch\s*\(/.test(line)) {
        signals.conditionals += 1;
        fileConditionals += 1;
      }
    }

    const meaningfulCount = meaningfulLines.length;
    const commentCount = meaningfulLines.filter(isCommentLine).length;
    signals.fileSignals.push({
      file,
      functions: fileFunctions,
      middlewareCalls: fileMiddlewareCalls,
      conditionals: fileConditionals,
      commentOnly: meaningfulCount > 0 && meaningfulCount === commentCount,
      meaningfulAddedLines: meaningfulCount,
    });
  }

  signals.commentOnly =
    signals.totalMeaningfulAddedLines > 0 &&
    signals.totalMeaningfulAddedLines === signals.totalAddedCommentLines;

  return signals;
}

function toWords(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function inferFunctionCapabilities(functionNames) {
  const words = new Set(functionNames.flatMap(toWords));
  const capabilities = [];

  const hasAny = (...tokens) => tokens.some((token) => words.has(token));

  if (hasAny('diff', 'staged', 'lines')) {
    capabilities.push('parse staged diffs');
  }
  if (hasAny('comment', 'comments')) {
    capabilities.push('detect comment-only changes');
  }
  if (hasAny('function', 'functions', 'names')) {
    capabilities.push('identify function-level updates');
  }
  if (hasAny('scope', 'context', 'summary', 'reason')) {
    capabilities.push('infer commit context');
  }
  if (hasAny('middleware')) {
    capabilities.push('recognize middleware updates');
  }
  if (hasAny('conditional', 'conditionals', 'logic')) {
    capabilities.push('classify logic changes');
  }

  return capabilities;
}

function summarizeFunctionChanges(functionNames) {
  const uniqueFunctions = [...new Set(functionNames)];
  const capabilities = inferFunctionCapabilities(uniqueFunctions);

  if (uniqueFunctions.length === 1) {
    return {
      summary: `add ${uniqueFunctions[0]} helper`,
      reason: `it improves commit message accuracy by handling ${uniqueFunctions[0]} analysis`,
    };
  }

  if (capabilities.length > 0) {
    const topCapabilities = capabilities.slice(0, 2).join(' and ');
    return {
      summary: `add helpers to ${topCapabilities}`,
      reason: 'it produces more specific commit messages from actual code changes',
    };
  }

  return {
    summary: `add ${uniqueFunctions.length} helper functions`,
    reason: 'it expands commit message analysis coverage',
  };
}

function fileLabel(file) {
  if (file.startsWith('src/presentation/')) return 'presentation';
  if (file.startsWith('src/domain/')) return 'domain';
  if (file.startsWith('src/infrastructure/')) return 'infrastructure';
  if (file.startsWith('src/')) return 'app';
  if (file.startsWith('scripts/')) return 'scripts';
  return path.basename(file, path.extname(file));
}

function formatFunctionLabel(name) {
  return toWords(name).join(' ');
}

function buildMultiFileSourceContext(files, sourceSignals) {
  if (!sourceSignals.fileSignals || sourceSignals.fileSignals.length < 2) return null;

  const snippets = [];
  for (const fs of sourceSignals.fileSignals) {
    if (fs.file.includes('scripts/generate-commit-message') && fs.functions.length > 0) {
      snippets.push('enhance commit message generation logic');
      continue;
    }

    if (fs.functions.length === 1) {
      snippets.push(`add ${formatFunctionLabel(fs.functions[0])} helper in ${fileLabel(fs.file)}`);
      continue;
    }

    if (fs.functions.length > 1) {
      snippets.push(`add ${fs.functions.length} helpers in ${fileLabel(fs.file)}`);
      continue;
    }

    if (fs.commentOnly) {
      snippets.push(`add comments in ${fileLabel(fs.file)}`);
      continue;
    }

    if (fs.middlewareCalls.length > 0) {
      snippets.push(`update middleware in ${fileLabel(fs.file)}`);
    }
  }

  const uniqueSnippets = [...new Set(snippets)].filter(Boolean);
  if (uniqueSnippets.length < 2) return null;

  return {
    type: 'feat',
    scope: '',
    summary: `${uniqueSnippets[0]} and ${uniqueSnippets[1]}`,
    conciseSummary: `${uniqueSnippets[0]} and ${uniqueSnippets[1]}`,
    whatChanged: uniqueSnippets.slice(0, 3).join('; '),
    whyChanged: `it summarizes coordinated updates across ${files.length} staged files`,
  };
}

function toSingleLine(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function toConciseSummary(text, maxWords = 14) {
  const normalized = toSingleLine(text);
  if (!normalized) return 'update code';
  const words = normalized.split(' ');
  return words.length <= maxWords ? normalized : `${words.slice(0, maxWords).join(' ')}...`;
}

function normalizeContext(context, type, files) {
  const whatChanged = toSingleLine(context.whatChanged || context.summary || inferSummary(type, files));
  const whyChanged = toSingleLine(context.whyChanged || context.reason || inferReason(type));
  const conciseSummary = toConciseSummary(context.conciseSummary || context.summary || whatChanged);

  return {
    ...context,
    whatChanged,
    whyChanged,
    conciseSummary,
  };
}

function trimForPrompt(text, maxChars = 14000) {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[diff truncated]`;
}

function cleanAiText(text) {
  return String(text || '')
    .replace(/^```[a-z]*\n?/i, '')
    .replace(/```$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAiJson(text) {
  const cleaned = cleanAiText(text);
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;

  try {
    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  } catch (_) {
    return null;
  }
}

function normalizeAiContext(aiData, fallbackType, fallbackScope) {
  if (!aiData || typeof aiData !== 'object') return null;

  const type = toSingleLine(aiData.type || fallbackType || 'chore').toLowerCase();
  const scope = toSingleLine(aiData.scope || fallbackScope || '');
  const conciseSummary = toConciseSummary(aiData.conciseSummary || aiData.summary || 'update code');
  const whyChanged = toSingleLine(aiData.whyChanged || aiData.why || 'it improves the implementation');
  const whatChanged = toSingleLine(aiData.whatChanged || conciseSummary);

  return {
    type,
    scope,
    conciseSummary,
    whyChanged,
    whatChanged,
    summary: conciseSummary,
    reason: whyChanged,
  };
}

async function requestOpenAiCommitContext({ files, diff, stat, fallbackType, fallbackScope }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const baseUrl = process.env.OPENAI_BASE_URL || DEFAULT_OPENAI_BASE_URL;
  const model = process.env.COMMIT_MSG_MODEL || DEFAULT_OPENAI_MODEL;

  const prompt = [
    'You generate concise Conventional Commit messages from staged git changes.',
    'Return JSON only with keys: type, scope, conciseSummary, whatChanged, whyChanged.',
    'Rules:',
    '- type must be one of: feat, fix, refactor, docs, chore, test, ci, perf.',
    '- scope should be short and optional.',
    '- conciseSummary: 4-12 words, specific and natural.',
    '- whatChanged: one short sentence about what code changed.',
    '- whyChanged: one short sentence about intent/value.',
    '- Avoid generic phrases like "update files".',
    '',
    `Changed files: ${files.join(', ')}`,
    '',
    'Diff stat:',
    stat || '(none)',
    '',
    'Staged diff:',
    trimForPrompt(diff),
  ].join('\n');

  const response = await fetch(`${baseUrl}/responses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const outputText = data.output_text || '';
  const parsed = parseAiJson(outputText);
  return normalizeAiContext(parsed, fallbackType, fallbackScope);
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
  const sourceSignals = analyzeSourceDiff(files);

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
      conciseSummary: 'add compression middleware',
      whatChanged: 'integrated compression middleware in the Express server pipeline',
      whyChanged: 'it reduces response payload size and improves API performance',
    };
  }

  if (addedDeps.length === 1) {
    return {
      type,
      scope: '',
      summary: `add ${addedDeps[0]} dependency`,
      conciseSummary: `add ${addedDeps[0]} dependency`,
      whatChanged: `added ${addedDeps[0]} to project dependencies`,
      whyChanged: `it supports ${addedDeps[0]} integration`,
    };
  }

  if (addedDeps.length > 1 && addedCompressionDep && addedCompressionTypes) {
    return {
      type: 'feat',
      scope: 'presentation',
      summary: 'add compression support dependencies',
      conciseSummary: 'add compression dependencies',
      whatChanged: 'added compression runtime and typings dependencies',
      whyChanged: 'it enables compressed HTTP responses with TypeScript support',
    };
  }

  const multiFileContext = buildMultiFileSourceContext(files, sourceSignals);
  if (multiFileContext) {
    return multiFileContext;
  }

  if (sourceSignals.commentOnly) {
    return {
      type: 'docs',
      scope: inferScope(files),
      summary: 'add explanatory comments in server setup',
      conciseSummary: 'add server setup comments',
      whatChanged: 'added explanatory comments in server setup code',
      whyChanged: 'it clarifies middleware behavior and server responsibilities for maintainers',
    };
  }

  if (sourceSignals.functions.length > 0) {
    const functionSummary = summarizeFunctionChanges(sourceSignals.functions);

    return {
      type: 'feat',
      scope: inferScope(files),
      summary: functionSummary.summary,
      conciseSummary: functionSummary.summary,
      whatChanged: functionSummary.summary,
      whyChanged: functionSummary.reason,
    };
  }

  if (sourceSignals.conditionals > 0) {
    return {
      type: 'refactor',
      scope: inferScope(files),
      summary: 'update request handling logic',
      conciseSummary: 'refactor request handling logic',
      whatChanged: 'updated conditional flow in request handling paths',
      whyChanged: 'it improves control flow and readability',
    };
  }

  if (sourceSignals.middlewareCalls.length > 0) {
    const middleware = [...new Set(sourceSignals.middlewareCalls)][0];
    return {
      type: 'feat',
      scope: inferScope(files),
      summary: `update middleware setup with ${middleware}`,
      conciseSummary: `update middleware with ${middleware}`,
      whatChanged: `updated server middleware setup with ${middleware}`,
      whyChanged: 'it improves server request and response handling',
    };
  }

  return {
    type,
    scope: '',
    summary: inferSummary(type, files),
    conciseSummary: inferSummary(type, files),
    whatChanged: inferSummary(type, files),
    whyChanged: inferReason(type),
  };
}

async function buildMessage() {
  let files = [];
  let diff = '';
  let stat = '';
  try {
    files = getStagedFiles();
    diff = getStagedDiff();
    stat = getStagedStat();
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
  const rawContext = inferDetailedContext(type, files);
  const fallbackContext = normalizeContext(rawContext, type, files);
  const aiContext = await requestOpenAiCommitContext({
    files,
    diff,
    stat,
    fallbackType: fallbackContext.type || type,
    fallbackScope: fallbackContext.scope || defaultScope,
  });
  const context = aiContext || fallbackContext;
  const scope = context.scope || defaultScope;
  const summary = context.conciseSummary;
  const finalType = context.type || type;
  const breaking = hasBreakingChange() ? '!' : '';

  const prefix = scope ? `${finalType}${breaking}(${scope})` : `${finalType}${breaking}`;
  const message = `${prefix}: ${summary} because ${context.whyChanged}`;

  console.log(message);
}

buildMessage().catch(() => {
  console.error('Failed to generate commit message.');
  process.exit(1);
});
