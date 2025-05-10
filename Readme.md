# Full Stack Application

This is a modern full-stack web application built with **TypeScript**, **Prisma**, **Express.js**, and **Vite + React**. The app follows a modular and scalable architecture with a focus on performance, security, and user experience.

---

## Tech Stack

### Backend
- **Express.js** with **TypeScript**
- **Prisma ORM** with a relational database
- **JWT Authentication**
- **Bcrypt** for password hashing
- **CORS** for handling cross-origin requests

### Frontend
- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS** for styling
- **Radix UI** and **Lucide Icons**
- **Redux Toolkit** for state management
- **React Router v7**
- **React Hook Form for form validation
- **Framer Motion** for animations


---

## 📁 Project Structure

### Backend (`/server`)
- `src/index.ts`: Entry point of the server
- Uses Prisma for DB operations
- JWT-based authentication
- Environment-based configuration

### Frontend (`/client`)
- Uses Vite for fast development
- Organized components, hooks, and store
- Modern UI with Radix + Tailwind + animations

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 

### 1. Clone the Repository

```bash


cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


cd client
npm install
npm run dev
