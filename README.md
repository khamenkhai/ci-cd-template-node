# NestJS Todo API

A simple NestJS application with SQLite using Prisma ORM.

---

## CI/CD Pipeline

```
┌─ TRIGGERS (when to run)
│  ├─ on: push to main
│  └─ on: manual trigger
│
├─ ENV (hardcoded config)
│  ├─ NODE_VERSION
│  ├─ SERVER_PORT
│  └─ SERVER_APP_DIR
│
├─ JOB 1: BUILD
│  ├─ checkout code
│  ├─ install Node.js + cache
│  ├─ npm ci (install deps)
│  ├─ prisma generate (DB types)
│  ├─ lint (catch errors)
│  ├─ build (compile TS)
│  └─ upload artifacts (dist + prisma)
│
└─ JOB 2: DEPLOY (needs: build)
   ├─ download artifacts
   ├─ SCP files to VPS
   └─ SSH: install → migrate → restart PM2
```

### Build Flow

```
GitHub Actions (runner)          VPS Server
─────────────────────           ──────────
npm ci                  →
npm run prisma:generate →
npm run lint            →
npm run build           →      (copies dist/ via SCP)
                            →  npm ci --omit=dev
                            →  prisma generate
                            →  prisma migrate deploy
                            →  pm2 restart
```

**Why build in GitHub Actions, not on the VPS?**
- GitHub runner is clean — no conflicts
- VPS only gets production files (smaller, faster)
- VPS doesn't need `typescript`, `eslint`, etc.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `SERVER_HOST` | VPS IP address |
| `SERVER_USER` | SSH username |
| `SERVER_SSH_KEY` | Private SSH key |

### Server Prerequisites

- Node.js 24+
- PM2 installed (`npm i -g pm2`)
- `.env` file in `SERVER_APP_DIR`

---

## Getting Started

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

API: `http://localhost:4000/api`
Swagger: `http://localhost:4000/swagger`

---

## API Endpoints

| Method   | Path           | Description  |
| -------- | -------------- | ------------ |
| `GET`    | `/health`      | Health check |
| `POST`   | `/api/todo`    | Create todo  |
| `GET`    | `/api/todo`    | List todos   |
| `GET`    | `/api/todo/:id`| Get todo     |
| `PATCH`  | `/api/todo/:id`| Update todo  |
| `DELETE` | `/api/todo/:id`| Delete todo  |

---

## Scripts

| Command                   | Action                 |
| ------------------------- | ---------------------- |
| `npm run start:dev`       | Dev server with watch  |
| `npm run build`           | Build to `dist/`       |
| `npm run lint`            | ESLint with `--fix`    |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate`  | Run dev migration      |
| `npm run prisma:studio`   | Open Prisma Studio     |

---

## License

UNLICENSED
