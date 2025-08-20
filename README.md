# Full Stack User Management App

A **full-stack user management application** built with **Next.js (React) frontend**, **Node.js/Express backend**, and **MySQL** database. The app supports **user CRUD operations**, **authentication**, and **dark/light theme toggle** with Tailwind CSS v4.

---

## Features

### Frontend (Next.js / React)
- Display all users in a responsive table
- Create, edit, and delete users
- Real-time updates after CRUD actions
- Loading states for API requests
- Responsive UI with Tailwind CSS
- **Dark/Light mode toggle** (system, light, dark)
- Modals for edit and delete actions
- Form validation for creating and editing users
- Fully client-side theme management

### Backend (Node.js / Express)
- REST API for user management
  - `GET /api/users/all-users` - fetch all users
  - `POST /api/users/create` - create a new user
  - `PUT /api/users/edit/:id` - update a user
  - `DELETE /api/users/remove/:id` - delete a user
- MySQL database integration
- Password stored as plain text (for demo purposes – should hash in production)
- Error handling for CRUD operations
- CORS enabled for frontend-backend communication

### Database (MySQL)
- Users table with the following columns:
  - `id` (INT, PK, auto-increment)
  - `firstname` (VARCHAR)
  - `lastname` (VARCHAR)
  - `username` (VARCHAR)
  - `password` (VARCHAR)
  - `date` (DATETIME)

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express.js, Axios
- **Database:** MySQL
- **Other Tools:** Postman, VS Code, Git/GitHub

---

## Screenshots

| Users Table | Dark Mode |
|-------------|-----------|
| ![Users Table](screenshots/users-table.png) | ![Dark Mode](screenshots/dark-mode.png) |

> Add your screenshots in the `screenshots` folder for clarity.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MySQL >= 8
- npm or yarn
- Optional: Postman for API testing

---

### Backend Setup

1. Clone the repo:

```bash
git clone https://github.com/yourusername/fullstack-user-management.git
cd fullstack-user-management/backend
