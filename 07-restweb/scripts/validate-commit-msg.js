#!/usr/bin/env node

const fs = require("fs");

const commitMsgFilePath = process.argv[2];

if (!commitMsgFilePath) {
  console.error("Error: commit message file path is required.");
  process.exit(1);
}

const rawMessage = fs.readFileSync(commitMsgFilePath, "utf8");
const message = rawMessage.split("\n")[0].trim();

const conventionalCommitRegex =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?!?: .{1,72}$/;

if (!conventionalCommitRegex.test(message)) {
  console.error("Invalid commit message format.");
  console.error("Expected: type(scope): subject");
  console.error("Example: docs(readme): add windows setup notes");
  console.error(
    "Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert",
  );
  process.exit(1);
}

process.exit(0);
