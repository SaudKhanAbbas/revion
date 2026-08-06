# Low-Level Design (LLD)

# Revion

Version: 1.0

Author: Saud Khan Abbas

---

# 1. Introduction

This document describes the internal implementation of Revion, including the project structure, frontend modules, backend architecture, API endpoints, database schemas, authentication workflow, and request lifecycle.

---

# 2. Project Structure

```
Revion
│
├── client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── docs
│   ├── PRD.md
│   ├── HLD.md
│   └── LLD.md
│
├── README.md
└── LICENSE
```

---

# 3. Frontend Modules

## Landing Page

Responsibilities

- Project introduction
- Features overview
- Navigation
- Call-to-action buttons

---

## Authentication

Responsibilities

- User Registration
- User Login
- JWT storage
- Persistent login
- Logout

---

## Dashboard

Responsibilities

- Display motorcycle statistics
- Display maintenance summary
- Display expense summary
- Quick navigation

---

## Garage

Responsibilities

- Add motorcycles
- Edit motorcycles
- Delete motorcycles
- Search motorcycles

---

## Maintenance

Responsibilities

- Create maintenance records
- Edit maintenance records
- Delete maintenance records
- Display maintenance history

---

## Expenses

Responsibilities

- Add expenses
- Edit expenses
- Delete expenses
- Categorize expenses

---

## AI Diagnosis

Responsibilities

- Accept symptom descriptions
- Submit diagnosis requests
- Display AI-generated diagnosis
- Display severity level
- Display confidence score
- Display recommendations

---

## Context

Responsible for

- Authentication state
- User session
- Toast notifications

---

# 4. Backend Modules

## Routes

Authentication

```
POST /api/auth/signup

POST /api/auth/login

GET /api/auth/me
```

---

Motorcycles

```
GET /api/motorcycles

POST /api/motorcycles

PUT /api/motorcycles/:id

DELETE /api/motorcycles/:id
```

---

Maintenance

```
GET /api/maintenance

POST /api/maintenance

PUT /api/maintenance/:id

DELETE /api/maintenance/:id
```

---

Expenses

```
GET /api/expenses

POST /api/expenses

PUT /api/expenses/:id

DELETE /api/expenses/:id
```

---

Diagnosis

```
POST /api/diagnosis
```

---

# 5. Controllers

## Authentication Controller

Responsibilities

- Register users
- Login users
- Generate JWT
- Return authenticated user

---

## Motorcycle Controller

Responsibilities

- Create motorcycles
- Retrieve motorcycles
- Update motorcycles
- Delete motorcycles

---

## Maintenance Controller

Responsibilities

- Create maintenance logs
- Retrieve maintenance logs
- Update maintenance logs
- Delete maintenance logs

---

## Expense Controller

Responsibilities

- Create expenses
- Retrieve expenses
- Update expenses
- Delete expenses

---

## Diagnosis Controller

Responsibilities

- Receive symptoms
- Validate request
- Call Google Gemini API
- Parse AI response
- Return structured diagnosis

---

# 6. Middleware

## Authentication Middleware

Responsibilities

- Verify JWT
- Protect private routes
- Attach authenticated user to requests

---

## Error Handling

Responsibilities

- Handle invalid requests
- Return HTTP status codes
- Prevent application crashes

---

# 7. Database Design

## User Collection

```
User

_id

name

email

password

createdAt

updatedAt
```

---

## Motorcycle Collection

```
Motorcycle

_id

user

manufacturer

model

year

registrationNumber

createdAt

updatedAt
```

---

## Maintenance Collection

```
Maintenance

_id

motorcycle

serviceType

serviceDate

mileage

cost

description

createdAt

updatedAt
```

---

## Expense Collection

```
Expense

_id

motorcycle

category

amount

description

expenseDate

createdAt

updatedAt
```

---

# 8. Authentication Flow

```
User

↓

Login Request

↓

Authentication Route

↓

Find User

↓

Verify Password

↓

Generate JWT

↓

Return Token

↓

Store Token

↓

Authenticated Requests
```

---

# 9. Request Lifecycle

## Garage

```
User Action

↓

React Component

↓

Axios Request

↓

Express Route

↓

Authentication Middleware

↓

Controller

↓

MongoDB

↓

JSON Response

↓

React UI Update
```

---

## Maintenance

```
User Action

↓

Maintenance Page

↓

Axios

↓

Express

↓

Controller

↓

MongoDB

↓

Updated UI
```

---

## Expenses

```
User Action

↓

Expense Page

↓

Axios

↓

Express

↓

Controller

↓

MongoDB

↓

Updated UI
```

---

## AI Diagnosis

```
User enters symptoms

↓

Diagnosis Page

↓

Axios POST Request

↓

Authentication Middleware

↓

Diagnosis Controller

↓

Google Gemini API

↓

Generate Diagnosis

↓

Return JSON

↓

Render Results
```

---

# 10. Environment Variables

## Backend

```
PORT

MONGO_URI

JWT_SECRET

GEMINI_API_KEY
```

---

## Frontend

```
VITE_API_URL
```

---

# 11. Error Handling

Frontend

- Loading indicators
- Form validation
- Toast notifications
- API error handling

Backend

- Try/Catch blocks
- HTTP status codes
- Authentication validation
- Database error handling
- AI service failure handling

---

# 12. Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

AI Service

Google Gemini API

---

# 13. Future Improvements

- Predictive maintenance engine
- Maintenance reminders
- Expense analytics
- Motorcycle health score
- Image uploads
- Mechanic locator
- Push notifications
- Docker deployment
- Redis caching
- Rate limiting

---

# End of Document
