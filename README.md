# 🚀 Booking System – Full Stack Engineering Intern Assignment

A full-stack booking system that demonstrates the **end-to-end booking lifecycle** for an on-demand home services marketplace.  
The project focuses on **real-world workflow design**, **state management**, and **clear system behavior**, rather than over-engineering.

![WhatsApp Image 2026-01-20 at 10 58 30 PM](https://github.com/user-attachments/assets/ae18dd17-9db5-4a6c-8588-d706267dbfbb)



<img width="1111" height="165" alt="image" src="https://github.com/user-attachments/assets/7df88958-cd27-4b23-8927-95542b84ef62" />




---

## 🧠 Overview

This application simulates how customers book services, providers fulfill them, and ops/admin teams manage exceptions.  
It showcases how bookings move through different states with proper observability and manual intervention.

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🧾 react-hook-form
- 🎨 Basic CSS for clean UI

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🌐 REST APIs

### Storage
- 🧠 In-memory storage (used intentionally for simplicity and clarity)

PENDING → ASSIGNED → COMPLETED


### Alternate flows:
- ❌ REJECTED (by provider)
- 🚫 CANCELLED (by customer)
- 🛠 ADMIN OVERRIDE (manual intervention)

Each state transition is recorded and visible via booking history.

---

## ✨ Features

### 👤 Customer
- Create a booking
- Cancel a booking
- View booking status

### 🧑‍🔧 Provider
- Accept booking
- Reject booking

### 🛠 Admin / Ops
- Manually override booking state
- Mark booking as completed

### 📊 Observability
- View complete booking history
- Timestamped state changes (event log)

---

## 🖥 UI Screens

- 📝 Booking creation screen
- 🔁 Booking status & action screen
- 🛠 Admin / ops controls (simple panel)
- 📜 Booking history view

---

## ▶️ How to Run Locally

### 1️⃣ Backend

```bash
cd backend
npm install
node index.js


Backend runs on:
👉 http://localhost:5000

2️⃣ Frontend
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:5173

📌 Design Notes

No database used to keep the focus on workflow logic

No authentication added (out of scope for assignment)

Emphasis on correct state transitions and clean API design

Simple UI by design — functionality over aesthetics

✅ Assignment Coverage

✔ Booking creation
✔ Provider workflow (accept / reject)
✔ Booking lifecycle management
✔ Failure handling (cancel / reject)
✔ Manual admin override
✔ Booking history & observability
✔ Frontend + backend integration

📬 Submission

This project was built as part of the Full Stack Engineering Intern Assignment.

👤 Author

Aman Singh



