# node-webrest-server

Complete guide to run this project locally for both development and testing.

## Quick Start After Clone

Run these commands after cloning:

```bash
npm install
cp .env.template .env
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run hooks:install
npm run dev
```

Windows PowerShell equivalent for `.env`:

```powershell
Copy-Item .env.template .env
```

Windows note:

- Open Docker Desktop and wait until it is running before `docker compose up -d`.
- In PowerShell or CMD, use `npm run hooks:install` or `npm run hooks:install:windows`. Do not use the Unix-only `npm run hooks:install:unix` unless you are in Git Bash or another shell with `sh`.

## Quick Start for Tests

If your goal is running tests quickly on a fresh clone:

```bash
npm install
cp .env.template .env
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm test
```

Recommended:

- Use a dedicated test database (for example `TODO_TEST`) in `.env.test`.
- If you also want Git hooks on Windows, prefer `npm run hooks:install` or `npm run hooks:install:windows`.

## Bootstrap From Zero (No Global Prisma)

You do not need Prisma installed globally on your machine.
All Prisma commands here run through local project dependencies using `npx`.

```bash
npm install
cp .env.template .env
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Notes:

- `npm install` installs `prisma` and `@prisma/client` from `package.json`.
- `npx prisma ...` uses the local Prisma CLI from `node_modules`.
- If `src/generated/prisma` does not exist yet, `npx prisma generate` creates required artifacts.
- On Windows PowerShell or CMD, install hooks with `npm run hooks:install` or `npm run hooks:install:windows`.

## 1) Prerequisites

- `Node.js` 20+ (20 or 22 LTS recommended)
- `npm` (included with Node)
- `Docker` + `Docker Compose`

Verify your setup:

```bash
node -v
npm -v
docker -v
docker compose version
```

## 2) Clone and install dependencies

```bash
git clone <REPO_URL>
cd 07-restweb
npm install
```

## 3) Configure environment variables

Create `.env` from the template:

```bash
cp .env.template .env
```

Minimum expected `.env`:

```env
PORT=3000
PUBLIC_PATH=public
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
POSTGRES_USER=postgres
POSTGRES_DB=TODO
POSTGRES_PORT=5432
POSTGRES_PASSWORD=123456
NODE_ENV=development
```

## 4) Start local PostgreSQL with Docker

```bash
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

## 5) Run migrations and generate Prisma Client

This step prevents dependency on generated files that are not committed to the repo.

```bash
npx prisma migrate deploy
npx prisma generate
```

Important note about `src/generated/prisma`:

- That folder is in `.gitignore`, so it should not be versioned.
- To run this project on another machine, regenerate artifacts with `npx prisma generate`.
- In this repo, code uses `@prisma/client` (it does not import directly from `src/generated/prisma`), so the command above is enough.

## 6) Run in development mode

```bash
npm run dev
```

Expected server URL: `http://localhost:3000`

## 7) Run tests

The test script already applies migrations using `.env.test` before running Jest.

```bash
npm test
```

Optional:

```bash
npm run test:watch
npm run test:coverage
```

## 8) Recommended `.env.test` configuration

Use a different database than development to avoid mixing data:

```env
PORT=3001
PUBLIC_PATH=public
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO_TEST
POSTGRES_USER=postgres
POSTGRES_DB=TODO_TEST
POSTGRES_PORT=5432
POSTGRES_PASSWORD=123456
NODE_ENV=test
```

If you use a local DB for tests, create the `TODO_TEST` database (for example using `psql` or pgAdmin) and then run `npm test`.

## 9) Local production run (build + start)

```bash
npm run build
npm start
```

## 10) Git hooks (recommended)

This repo includes lightweight Git hooks to keep commit quality high:

- `pre-commit`: runs `eslint` and `prettier --check`
- `commit-msg`: validates Conventional Commit format
- `pre-push`: runs smoke tests by default (`tests/presentation/todos/routes.test.ts`)
- `pre-push` output is summarized on success and prints full logs only on failure

Install hooks once after cloning:

```bash
npm run hooks:install
```

Available hook install commands:

- `npm run hooks:install`: cross-platform option for Windows, PowerShell, CMD, macOS, and Linux
- `npm run hooks:install:windows`: explicit Windows installer
- `npm run hooks:install:unix`: explicit Unix/macOS installer using `sh`

Manual quality checks:

```bash
npm run lint
npm run format:check
```

Run full test suite on push when needed:

```bash
PREPUSH_FULL=1 git push
```

Windows PowerShell equivalent:

```powershell
$env:PREPUSH_FULL=1; git push
```

Valid commit example:

```text
docs(readme): add Windows 10+ setup notes
```

Allowed Conventional Commit types in this repo:

- `feat`: adds a new user-facing feature.
- `fix`: fixes a bug or incorrect behavior.
- `docs`: updates documentation only.
- `style`: formatting or style-only changes with no behavior impact.
- `refactor`: code restructuring without changing behavior.
- `perf`: improves performance.
- `test`: adds or updates tests.
- `build`: changes build tooling or dependencies.
- `ci`: changes CI/CD configuration or workflows.
- `chore`: maintenance tasks not tied to app behavior.
- `revert`: reverts a previous commit.

Examples:

```text
feat(todos): add dueDate to todo creation
fix(todos): prevent empty title updates
docs(readme): explain test database setup
style(routes): format todo routes for readability
refactor(repository): simplify todo query mapping
perf(todos): reduce duplicate DB reads in list endpoint
test(todos): cover PATCH /api/todos/:id validation
build(prisma): bump prisma and regenerate client
ci(actions): run smoke tests on pull_request
chore(hooks): adjust pre-push logging output
revert: revert "feat(todos): add dueDate to todo creation"
```

## 11) Quick troubleshooting

- Postgres connection error:
  - Confirm `docker compose ps` shows the container as running.
  - Validate `POSTGRES_URL` in `.env` and `.env.test`.
- Prisma Client not generated:
  - Run `npx prisma generate`.
- Migration error:
  - Run `npx prisma migrate deploy` against the correct database.

## 12) Windows 10+ setup notes

This project works on Windows 10/11. Use one of these terminals:

- PowerShell (recommended)
- Windows Terminal
- Git Bash

Recommended tools on Windows:

- Install Node.js LTS (20+)
- Install Docker Desktop and make sure Docker is running
- Keep Git configured to use LF when possible (`core.autocrlf=input` is a good default)

Windows command equivalents:

- Create `.env` from template in PowerShell:

```powershell
Copy-Item .env.template .env
```

- Or in CMD:

```cmd
copy .env.template .env
```

Everything else is the same:

Important for Windows:

- Open Docker Desktop and wait until it shows as running before executing `docker compose up -d`.
- If Docker Desktop is closed (or still starting), Compose will fail because it cannot connect to the Docker daemon.

```bash
npm install
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Git hooks on Windows:

- Use `npm run hooks:install` as the default option.
- If you want the explicit Windows command, use `npm run hooks:install:windows`.
- `npm run hooks:install:unix` is intended for shells that provide `sh`, such as Git Bash, macOS, or Linux.

For tests on Windows:

- Keep a dedicated test database (`TODO_TEST`)
- Make sure `.env.test` points to that DB
- Run `npm test`
