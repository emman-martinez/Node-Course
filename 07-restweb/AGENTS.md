# AGENTS.md

Operational guide for AI coding agents working in this repository.

## Project Snapshot

- Stack: Node.js + TypeScript + Express + Prisma + PostgreSQL
- Runtime: CommonJS (`"type": "commonjs"`)
- DB access: Prisma with `@prisma/client` and `@prisma/adapter-pg`
- Main app entry: `src/app.ts`
- Tests: Jest + Supertest

## Environment Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.template .env
```

Windows PowerShell equivalent:

```powershell
Copy-Item .env.template .env
```

3. Start PostgreSQL:

```bash
docker compose up -d
```

4. Apply migrations and generate Prisma client artifacts:

```bash
npx prisma migrate deploy
npx prisma generate
```

## Important Repo Behavior

- `src/generated/prisma` is gitignored and should not be committed.
- Do not assume generated artifacts exist on a new machine.
- Always regenerate Prisma artifacts when needed with:

```bash
npx prisma generate
```

## Common Commands

- Development server:

```bash
npm run dev
```

- Build:

```bash
npm run build
```

- Production local start:

```bash
npm start
```

- Tests:

```bash
npm test
```

- Smoke tests:

```bash
npm run test:smoke
```

- Watch tests:

```bash
npm run test:watch
```

- Coverage:

```bash
npm run test:coverage
```

- Install Git hooks:

```bash
npm run hooks:install
```

- `pre-push` runs smoke tests by default.
- Use `PREPUSH_FULL=1 git push` to run full test suite on push.

## Testing Rules

- `npm test` runs `prisma:migrate:test` before Jest.
- Test migrations use `.env.test`.
- Prefer a dedicated test database (example: `TODO_TEST`) to avoid polluting dev data.
- Keep tests deterministic; clear DB state in test setup when needed (already done in route tests with `deleteMany`).

## Code Change Expectations

- Keep TypeScript strictness intact.
- Follow existing architecture boundaries:
  - `domain` for entities/dtos/use-cases/contracts
  - `infrastructure` for data-source/repository implementations
  - `presentation` for HTTP routes/controllers/server wiring
- Prefer minimal, focused changes.
- Add or update tests when behavior changes.

## Prisma and Database Notes

- Schema location: `prisma/schema.prisma`
- Migrations location: `prisma/migrations`
- Prisma config: `prisma.config.ts`
- If schema changes, ensure migration flow remains valid and client generation still works.

## What to Check Before Finishing

1. Relevant tests pass.
2. App still starts in dev mode.
3. No accidental commits of ignored/generated artifacts.
4. README remains aligned with any setup or workflow changes.
