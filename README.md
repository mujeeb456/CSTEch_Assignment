# MERN Stack Developer Machine Test

## 🚀 Project Overview

A full-stack MERN application that enables:

- ✅ Admin user authentication (login/signup)
- ✅ Agent creation & management
- ✅ CSV upload functionality
- ✅ Smart distribution of tasks among agents

---

## 📦 Features

### 1. **User Authentication**
- Secure JWT-based login & signup
- Password hashing
- Login-protected dashboard access

### 2. **Agent Management**
- Add new agents with:
  - Name
  - Email
  - Mobile number (with country code)
  - Password

### 3. **CSV Upload & Distribution**
- Upload `.csv` files with:
  - FirstName (Text)
  - Phone (Number)
  - Notes (Text)
- File type validation (`.csv`, `.xlsx`, `.xls`)
- Tasks are evenly distributed among available agents
- Distribution saved in MongoDB
- Displayed per-agent on frontend

---

## 🧰 Tech Stack

| Layer      | Tech                  |
|------------|-----------------------|
| Frontend   | React.js (Vite)       |
| Backend    | Node.js + Express     |
| Database   | MongoDB (Mongoose)    |
| Auth       | JWT                   |
| File Upload| express-fileupload, csv-parser |

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-name.git
cd backend 
cd frontend

start backen
cd backend
npm install
node server.js

start frontend
cd frontend
npm install
npm start

