# My Fullstack App

A production-ready full-stack authentication system built using **React + Tailwind**, **Node.js**, **Express**, and **MongoDB**. Includes email verification, OTP-based password reset, JWT protection, and recruiter-grade UI polish. Designed for scalability, security, and real-world deployment.

## 🚀 Tech Stack

- **Frontend**: React, React-Router, React-Toastify, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Cookie-Parser, cors, dotenv,
- **Auth**: JWT-based authentication with cookie support
- **Email**: Nodemailer
- **State Mgmt**: React Context API

## 🧠 Features

- **User registration & login** with hashed passwords (bcrypt)
- **JWT Authentication** with secure cookie storage
- **Email Verification** via OTP (nodemailer integration)
- **Password Reset** using OTP flow
- **Protected Routes** with middleware-based access control (token verification)
- **Context API** for global auth state management
- **Frontend Validation** and error handling
- **Responsive UI** built with Tailwind CSS
- Cookie-based session handling
- Modular folder structure (controllers, models, routes)

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create .env file in backend/ with:

```
MONGODB_URI=
JWT_SECRET =
NODE_ENV =
SMTP_USER =
SMTP_PASS =
SENDER_EMAIL =
```

Create .env file in frontend/ with:

```
VITE_BACKEND_URL=
```
