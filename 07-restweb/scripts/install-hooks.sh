#!/usr/bin/env sh

set -e

PROJECT_ROOT="$(pwd)"
GIT_ROOT="$(git rev-parse --show-toplevel)"

HOOKS_PATH=".githooks"
case "$PROJECT_ROOT/" in
  "$GIT_ROOT/"*)
    RELATIVE_PROJECT_PATH="${PROJECT_ROOT#"$GIT_ROOT"/}"
    if [ -n "$RELATIVE_PROJECT_PATH" ] && [ "$RELATIVE_PROJECT_PATH" != "$PROJECT_ROOT" ]; then
      HOOKS_PATH="$RELATIVE_PROJECT_PATH/.githooks"
    fi
    ;;
esac

git config core.hooksPath "$HOOKS_PATH"
chmod +x .githooks/commit-msg .githooks/pre-commit .githooks/pre-push

echo "Git hooks installed. core.hooksPath=$HOOKS_PATH"
