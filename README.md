<div align="center">

# 🚀 Node.js Boilerplate

**A production-ready RESTful API boilerplate built with TypeScript, Express, Prisma, and MySQL.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*Kickstart your next Node.js API project with TypeScript, battle-tested patterns and best practices.*

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💎 **TypeScript** | Full type safety with strict mode enabled |
| 🏗️ **Layered Architecture** | Controller → Service → Prisma (clean separation of concerns) |
| 🔐 **JWT Authentication** | Token-based auth with role-based access control (ADMIN / USER) |
| 📦 **Prisma ORM** | Type-safe database client with migrations and auto-generation |
| ✅ **Joi Validation** | Request body validation with human-readable error messages |
| 📝 **Winston Logging** | Structured logging with console + file transports |
| 🛡️ **Security** | Helmet, CORS, rate limiting out of the box |
| 🔄 **Graceful Shutdown** | Handles SIGTERM/SIGINT for zero-downtime deployments |
| 🐳 **Docker Ready** | Multi-stage Dockerfile + Docker Compose (App + MySQL) |
| ⚡ **ES Modules** | Native ESM with TypeScript |
| 🧪 **Test Ready** | Jest + Supertest pre-configured |

---

## 📁 Project Structure

```
nodejs-boilerplate/
├── prisma/
│   └── schema.prisma            # Database schema & models
├── src/
│   ├── config/
│   │   ├── database.ts          # Prisma client instance
│   │   ├── index.ts             # Configuration management
│   │   └── logger.ts            # Winston logger setup
│   ├── controllers/
│   │   └── user.controller.ts   # HTTP request handlers
│   ├── middlewares/
│   │   ├── auth.ts              # JWT authentication & authorization
│   │   ├── errorHandler.ts      # Global error handler
│   │   └── validate.ts          # Joi validation middleware
│   ├── routes/
│   │   ├── index.ts             # Route aggregator
│   │   └── user.routes.ts       # User CRUD routes
│   ├── services/
│   │   └── user.service.ts      # Business logic layer
│   ├── utils/
│   │   ├── apiError.ts          # Custom error class
│   │   ├── catchAsync.ts        # Async error wrapper
│   │   └── response.ts          # Standardized responses
│   ├── validations/
│   │   └── user.validation.ts   # Joi schemas
│   └── index.ts                 # Application entry point
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- [MySQL](https://www.mysql.com/) 8.0+ (or use Docker)
- [Docker](https://www.docker.com/) (optional)

### Quick Start with Docker

```bash
git clone https://github.com/tanawat011/nodejs-boilerplate.git
cd nodejs-boilerplate

# Start all services
docker-compose up -d

# The API is now running at http://localhost:3000
```

### Manual Setup

```bash
# Clone and navigate
git clone https://github.com/tanawat011/nodejs-boilerplate.git
cd nodejs-boilerplate

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server (with hot-reload)
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Health check | ❌ |
| `POST` | `/api/v1/users` | Create a new user | ❌ |
| `GET` | `/api/v1/users` | List all users (paginated) | ❌ |
| `GET` | `/api/v1/users/:id` | Get user by ID | ❌ |
| `PUT` | `/api/v1/users/:id` | Update user | ✅ |
| `DELETE` | `/api/v1/users/:id` | Delete user | ✅ Admin |

### Example Requests

**Create User:**
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "fullName": "John Doe"
  }'
```

**List Users with Pagination:**
```bash
curl "http://localhost:3000/api/v1/users?page=1&limit=10"
```

---

## ⚙️ Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `DATABASE_URL` | — | MySQL connection string |
| `JWT_SECRET` | — | JWT signing secret |
| `JWT_EXPIRES_IN` | `24h` | Token expiration |
| `LOG_LEVEL` | `info` | Logging level |

---

## 🛠️ Available Scripts

```bash
npm run dev           # Start with hot-reload (tsx watch)
npm run build         # Compile TypeScript to JavaScript
npm start             # Start production server
npm run typecheck     # Run TypeScript type checking
npm test              # Run tests with coverage
npm run lint          # Run ESLint
npm run prisma:studio # Open Prisma Studio (DB GUI)
npm run docker:up     # Start Docker services
npm run docker:down   # Stop Docker services
```

---

## 🧰 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Express](https://expressjs.com/) | HTTP framework |
| [Prisma](https://www.prisma.io/) | Database ORM |
| [MySQL](https://www.mysql.com/) | Database |
| [JWT](https://github.com/auth0/node-jsonwebtoken) | Authentication |
| [Joi](https://joi.dev/) | Request validation |
| [Winston](https://github.com/winstonjs/winston) | Logging |
| [Helmet](https://helmetjs.github.io/) | Security headers |
| [Docker](https://www.docker.com/) | Containerization |

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ and TypeScript**

*If you found this helpful, give it a ⭐️!*

</div>
