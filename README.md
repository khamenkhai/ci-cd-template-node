# NestJS Todo API

A simple NestJS application with SQLite using Prisma ORM.

---

## CI/CD Pipeline

```
┌─ TRIGGERS (when to run)
│  ├─ on: push to dev
│  └─ on: manual trigger
│
├─ ENV (hardcoded config)
│  ├─ NODE_VERSION: 24.19.0
│  ├─ SERVER_PORT: 22
│  ├─ SERVER_APP_DIR: /var/www/nest-app
│  └─ PM2_APP_NAME: nest-app
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
| `SERVER_USER` | SSH username (use `ubuntu` for Lightsail) |
| `SERVER_SSH_KEY` | Private SSH key |

### SSH Key Setup

**Step 1: Get the private key from your VPS**
```bash
# SSH into your VPS
ssh ubuntu@YOUR_VPS_IP

# Show the private key content
cat ~/.ssh/your_ssh
```

**Step 2: Copy the private key and paste into GitHub Secret**

Copy the entire output including the headers:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```
Paste it into GitHub Secret `SERVER_SSH_KEY`.

**Step 3: Add the public key to `authorized_keys` on the VPS**

Check if the public key is already in `authorized_keys`:
```bash
cat ~/.ssh/authorized_keys
```

If `your_ssh.pub` is not listed, add it:
```bash
cat ~/.ssh/your_ssh.pub >> ~/.ssh/authorized_keys
```

Set correct permissions:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

**Step 4: Verify SSH access works**

Test from your local machine:
```bash
ssh -i ~/.ssh/your_ssh ubuntu@YOUR_VPS_IP
```

If this works, GitHub Actions will also work.

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
