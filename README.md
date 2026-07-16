![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-black)


# Revion

> Motorcycle management platform built with React, Node.js, and MongoDB, featuring AI-powered diagnostics using Google Gemini.

Revion is a full-stack motorcycle management platform built for riders to manage their motorcycles, maintenance records, expenses, and AI-powered diagnostics from a single dashboard.

**Live Demo:** https://revion-seven.vercel.app/


---

## Features

### Authentication
- User signup and login using JWT authentication
- Protected routes
- Persistent login using local storage

### Garage
- Add motorcycles
- Edit motorcycle details
- Delete motorcycles
- Search motorcycles by manufacturer or model

### Maintenance
- Record maintenance history
- Update maintenance logs
- Delete maintenance records
- View service history for each motorcycle

### Expenses
- Track motorcycle-related expenses
- Categorize expenses
- Edit and delete expense records

### AI Diagnosis
- Describe motorcycle issues in natural language
- AI-powered diagnosis using Google Gemini
- Possible causes
- Recommended actions
- Severity level
- Confidence score

---

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Screenshots

### Landing Page & Authentication

<img width="1898" height="1022" alt="Landing Page" src="https://github.com/user-attachments/assets/5fc17d1c-26cf-43b1-949c-b4b5318f6d82" />

<img width="1890" height="1015" alt="Authentication" src="https://github.com/user-attachments/assets/d80dfa79-d47d-4ec0-8de9-78cddee48e60" />

---

### Dashboard

<img width="1893" height="1032" alt="Dashboard" src="https://github.com/user-attachments/assets/098e04d5-6f53-4244-8841-49775d7a4e85" />

---

### Garage

<img width="1571" height="986" alt="Garage" src="https://github.com/user-attachments/assets/64277300-0c43-4962-9e7f-e420abb67153" />

---

### AI Diagnosis

<img width="1896" height="1031" alt="AI Diagnosis" src="https://github.com/user-attachments/assets/1068f886-744d-4718-9de4-5056a446dccb" />

---

## Project Structure

```text
client/
│── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   └── utils/

server/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/SaudKhanAbbas/revion.git
cd revion
```

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

---

## Local Setup

Create the required environment variables for both the client and server before running the application.

The client should point to the backend API, while the server requires MongoDB, JWT, and Google Gemini API credentials.

---

## Live Deployment

- **Frontend:** https://revion-seven.vercel.app/
- **Backend API:** https://revion-backend.onrender.com/

---

## Future Improvements

- Maintenance reminders
- Service scheduling
- Motorcycle health analytics
- Multiple motorcycles per rider dashboard
- Image upload support
- AI maintenance predictions
- Nearby service center integration

---

## Author

**Saud Khan Abbas**

GitHub — https://github.com/SaudKhanAbbas

---

If you found this project interesting, consider leaving a ⭐ on the repository.
