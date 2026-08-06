# High-Level Design (HLD)

# Revion

Version: 1.0

Author: Saud Khan Abbas

---

# 1. System Overview

Revion follows a modern three-tier architecture consisting of:

- Frontend (React + Vite)
- Backend (Node.js + Express)
- Database (MongoDB Atlas)

The backend also communicates with the Google Gemini API to provide AI-powered motorcycle diagnostics.

The application is designed using a RESTful architecture where the frontend communicates with the backend through secure HTTP requests while all business logic and database operations are handled server-side.

---

# 2. System Architecture

```
                     +----------------------+
                     |      User Browser    |
                     +----------+-----------+
                                |
                                |
                                ▼
                   +--------------------------+
                   | React Frontend (Vite)    |
                   +------------+-------------+
                                |
                         HTTPS REST API
                                |
                                ▼
                +-------------------------------+
                | Express.js Backend Server     |
                +--------------+----------------+
                               |
             +-----------------+------------------+
             |                                    |
             ▼                                    ▼
     MongoDB Atlas                    Google Gemini API
(Motorcycles, Users,              (AI Diagnosis Service)
 Maintenance, Expenses)
```

---

# 3. Major Components

## Frontend

The frontend is responsible for:

- Landing page
- Authentication
- Dashboard
- Garage management
- Maintenance management
- Expense management
- AI Diagnosis interface
- Responsive layout
- API communication
- User session handling

Technology

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts

---

## Backend

The backend is responsible for:

- Authentication
- JWT verification
- REST API endpoints
- Business logic
- CRUD operations
- Database interaction
- Google Gemini integration
- Error handling

Technology

- Node.js
- Express.js

---

## Database

MongoDB Atlas stores all persistent application data.

Collections include:

- Users
- Motorcycles
- Maintenance Records
- Expenses

Technology

- MongoDB Atlas
- Mongoose

---

## AI Service

Google Gemini provides AI-powered motorcycle diagnostics.

Responsibilities:

- Receive motorcycle symptom descriptions
- Analyze user input
- Generate structured diagnostic responses
- Return diagnosis, severity, confidence, possible causes, and recommendations

---

# 4. Request Flows

## User Authentication

```
User

↓

React Login Page

↓

Express Authentication API

↓

MongoDB User Validation

↓

Password Verification

↓

JWT Generated

↓

Frontend stores JWT

↓

Authenticated User
```

---

## Motorcycle Management

```
User

↓

Garage Page

↓

REST API Request

↓

Express Route

↓

Controller

↓

MongoDB

↓

Updated Motorcycle Data

↓

Frontend Refresh
```

---

## Maintenance Management

```
User

↓

Maintenance Page

↓

REST API

↓

Maintenance Controller

↓

MongoDB

↓

Updated Maintenance Records

↓

Frontend
```

---

## Expense Management

```
User

↓

Expenses Page

↓

REST API

↓

Expense Controller

↓

MongoDB

↓

Updated Expense Records

↓

Frontend
```

---

## AI Diagnosis Flow

```
User enters symptoms

↓

React Frontend

↓

Axios POST Request

↓

Express Route

↓

JWT Authentication

↓

Diagnosis Controller

↓

Google Gemini API

↓

AI Response

↓

Format Response

↓

Return JSON

↓

Display Diagnosis
```

---

# 5. Deployment Architecture

Frontend

↓

Vercel

Backend

↓

Render

Database

↓

MongoDB Atlas

AI Service

↓

Google Gemini API

---

# 6. Security

Revion implements several security practices:

- JWT Authentication
- Password Hashing using Bcrypt
- Protected API Routes
- Environment Variables
- Secure HTTPS Communication
- Authorization Middleware
- Server-side Validation

---

# 7. External Services

| Service | Purpose |
|----------|---------|
| MongoDB Atlas | Database |
| Google Gemini API | AI Diagnosis |
| Vercel | Frontend Hosting |
| Render | Backend Hosting |

---

# 8. Scalability Considerations

Revion separates the frontend, backend, database, and AI service into independent layers.

This architecture allows:

- Independent frontend deployment
- Independent backend deployment
- Scalable cloud database
- External AI inference
- Easier maintenance
- Future feature expansion

---

# 9. Design Decisions

Several architectural decisions were made during development:

- RESTful API architecture for communication.
- JWT-based stateless authentication.
- Separate frontend and backend deployments.
- MongoDB document database for flexible data modeling.
- Google Gemini API for AI-powered diagnostics.
- Modular React component architecture.
- Express middleware for authentication and request handling.

---

# 10. Future Improvements

Potential architectural improvements include:

- Docker containerization
- Redis caching
- API rate limiting
- Background job processing
- Push notifications
- File upload service
- Predictive maintenance engine
- Microservice architecture
- Monitoring and logging

---

# End of Document
