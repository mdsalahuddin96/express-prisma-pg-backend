# Express Prisma PostgreSQL Backend

A RESTful backend API built with **Express.js, TypeScript, Prisma ORM, and PostgreSQL**.
The project includes JWT-based authentication, role-based authorization, event management, bookings, reviews, categories, and soft-delete support.

## 🔗 Project Links

* **Live API:** [https://express-prisma-pg-backend.vercel.app](https://express-prisma-pg-backend.vercel.app)
* **GitHub:** [https://github.com/mdsalahuddin96/express-prisma-pg-backend.git](https://github.com/mdsalahuddin96/express-prisma-pg-backend.git)
* **API Documentation:** [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)

---

## 🚀 Features

* User registration and login
* Password hashing with bcrypt
* JWT authentication
* Role-based authorization
* User management
* Event management
* Event category management
* Event booking system
* Event reviews and ratings
* Soft delete support
* PostgreSQL database
* Prisma ORM
* RESTful API
* Vercel deployment
* Neon PostgreSQL database

---

## 🛠️ Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime               |
| Express.js | Backend framework     |
| TypeScript | Type safety           |
| PostgreSQL | Database              |
| Prisma     | ORM                   |
| bcrypt     | Password hashing      |
| JWT        | Authentication        |
| CORS       | Cross-origin requests |
| Neon       | Cloud PostgreSQL      |
| Vercel     | Deployment            |

---

## 📁 Project Structure

```text
express-prisma-pg/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── booking.controller.ts
│   │   ├── category.controller.ts
│   │   ├── event.controller.ts
│   │   ├── review.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── booking.service.ts
│   │   ├── category.service.ts
│   │   ├── event.service.ts
│   │   ├── review.service.ts
│   │   └── user.service.ts
│   │
│   ├── routes/
│   │   ├── auth.route.ts
│   │   ├── booking.route.ts
│   │   ├── category.route.ts
│   │   ├── event.route.ts
│   │   ├── review.route.ts
│   │   └── user.route.ts
│   │
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── auth.types.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── API_DOCUMENTATION.md
├── prisma.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mdsalahuddin96/express-prisma-pg-backend.git
```

### 2. Navigate to the project

```bash
cd express-prisma-pg-backend
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
```
---

## 🗄️ Database Setup

This project uses **PostgreSQL with Prisma ORM**.

After configuring `DATABASE_URL`, generate the Prisma Client:

```bash
npx prisma generate
```

Apply existing migrations:

```bash
npx prisma migrate deploy
```

For local development, when creating a new migration:

```bash
npx prisma migrate dev
```

---

## ▶️ Run the Project Locally

### Development

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

### Production Build

```bash
npm run build
```

### Production Start

```bash
npm start
```

---

## 📜 Available Scripts

| Command                     | Description                        |
| --------------------------- | ---------------------------------- |
| `npm run dev`               | Start development server           |
| `npm run build`             | Compile TypeScript                 |
| `npm start`                 | Start production server            |
| `npm run studio`            | Open Prisma Studio                 |
| `npx prisma generate`       | Generate Prisma Client             |
| `npx prisma migrate dev`    | Create/apply development migration |
| `npx prisma migrate deploy` | Apply production migrations        |

---

## 🔑 Authentication

The API uses **JWT-based authentication**.

After successful login, the API returns a JWT token.

Send the token with protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### User Roles

The system supports three roles:

```text
User
Organizer
Admin
```

Role-based authorization is implemented through authentication middleware.

---

## 🗃️ Database Models

The application contains the following main models:

```text
User
Category
Event
Booking
Review
```

### Relationships

```text
User
 ├── Events
 ├── Bookings
 └── Reviews

Category
 └── Events

Event
 ├── Category
 ├── Organizer
 ├── Bookings
 └── Reviews
```

---

## 🗑️ Soft Delete

Users and events support soft deletion using:

```prisma
deletedAt DateTime?
```

Instead of permanently removing the record from the database, the deletion time is stored in `deletedAt`.

Example:

```text
deletedAt: null
```

After soft delete:

```text
deletedAt: 2026-08-11T12:30:00.000Z
```

---

## 🌐 API Base URL

### Production

```text
[https://your-project.vercel.app](https://express-prisma-pg-backend.vercel.app)
```

### Local

```text
http://localhost:5000
```

For the complete list of endpoints, request bodies, responses, and status codes, see:

```text
API_DOCUMENTATION.md
```

---

## 📌 Main API Modules

```text
Authentication
├── Register
└── Login

Users
├── Get Users
├── Update User
└── Delete User

Categories
├── Create Category
├── Get Categories
├── Update Category
└── Delete Category

Events
├── Create Event
├── Get Events
├── Update Event
└── Delete Event

Bookings
├── Create Booking
├── Get Bookings
├── Update Booking
└── Cancel Booking

Reviews
├── Create Review
├── Get Reviews
├── Update Review
└── Delete Review
```

---

## ☁️ Deployment

The backend is deployed on **Vercel** and uses **Neon PostgreSQL** as the production database.

### Deployment Architecture

```text
Client
   │
   ▼
Vercel
   │
   ▼
Express.js API
   │
   ▼
Prisma ORM
   │
   ▼
Neon PostgreSQL
```

Environment variables are configured in the Vercel project settings.

---

## 👨‍💻 Author

**Md. Salauddin**

* GitHub: `https://github.com/mdsalahuddin96`


