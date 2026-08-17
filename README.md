# NestJS Todo API

A simple NestJS application with SQLite using Prisma ORM.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)

### Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

API runs at `http://localhost:4000/api`  
Swagger docs at `http://localhost:4000/swagger`

---

## API Endpoints

| Method   | Path           | Description  |
| -------- | -------------- | ------------ |
| `POST`   | `/api/todo`    | Create todo  |
| `GET`    | `/api/todo`    | List todos   |
| `GET`    | `/api/todo/:id`| Get todo     |
| `PATCH`  | `/api/todo/:id`| Update todo  |
| `DELETE`  | `/api/todo/:id`| Delete todo  |

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
