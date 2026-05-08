const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

function resolveGitBinary() {
  if (process.platform !== "win32") {
    return "git";
  }

  for (const candidate of [
    process.env.GIT,
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files\\Git\\bin\\git.exe",
    "git.exe",
    "git",
  ]) {
    if (!candidate) {
      continue;
    }

    try {
      execFileSync(candidate, ["--version"], {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: "ignore",
      });
      return candidate;
    } catch {
      // Try the next candidate until we find a working Git binary.
    }
  }

  throw new Error(
    "Git no esta disponible en PATH. Instala Git for Windows o define la variable GIT con la ruta a git.exe.",
  );
}

function runGit(args) {
  return execFileSync(resolveGitBinary(), args, {
    cwd: process.cwd(),
    encoding: "utf8",
  }).trim();
}

function toGitPath(value) {
  return value.split(path.sep).join("/");
}

function main() {
  const projectRoot = process.cwd();
  const gitRoot = runGit(["rev-parse", "--show-toplevel"]);

  let hooksPath = ".githooks";
  const relativeProjectPath = path.relative(gitRoot, projectRoot);

  if (relativeProjectPath && relativeProjectPath !== "") {
    hooksPath = toGitPath(path.join(relativeProjectPath, ".githooks"));
  }

  runGit(["config", "core.hooksPath", hooksPath]);

  for (const hookFile of ["commit-msg", "pre-commit", "pre-push"]) {
    fs.chmodSync(path.join(projectRoot, ".githooks", hookFile), 0o755);
  }

  console.log(`Git hooks installed. core.hooksPath=${hooksPath}`);
}

main();
