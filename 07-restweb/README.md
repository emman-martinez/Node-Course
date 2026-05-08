# node-webrest-server

Complete guide to run this project locally for both development and testing.

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

## 10) Quick troubleshooting

- Postgres connection error:
Confirm `docker compose ps` shows the container as running.
Validate `POSTGRES_URL` in `.env` and `.env.test`.
- Prisma Client not generated:
Run `npx prisma generate`.
- Migration error:
Run `npx prisma migrate deploy` against the correct database.

## 11) Windows 10+ setup notes

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

```bash
npm install
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run dev
```

For tests on Windows:

- Keep a dedicated test database (`TODO_TEST`)
- Make sure `.env.test` points to that DB
- Run `npm test`
