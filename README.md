![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-black)

# Revion

> A full-stack motorcycle management platform built with React, Node.js, Express, and MongoDB, with AI-powered motorcycle diagnostics using the Google Gemini API.

Revion is a full-stack application built to help motorcycle owners manage their motorcycles, maintenance records, expenses, and basic diagnostic information from one place.

The application follows a client-server architecture. The React frontend communicates with a REST API built using Express, while MongoDB stores application data. Google Gemini is integrated as an external AI service for motorcycle diagnosis.

**Live Demo:** https://revion-seven.vercel.app/

---

## Features

### Authentication

- User registration and login
- Password hashing with bcrypt
- JWT issuance during login
- JWT verification on protected backend routes
- Persistent authentication using local storage
- Axios interceptor that automatically attaches the Bearer token to authenticated API requests

### Motorcycle Garage

- Add motorcycles
- View owned motorcycles
- View individual motorcycle details
- Update motorcycle information
- Delete motorcycles
- Search motorcycles by manufacturer or model

### Maintenance Tracking

- Create maintenance records
- View maintenance history
- Update maintenance records
- Delete maintenance records
- Associate maintenance records with motorcycles and their owners

### Expense Tracking

- Record motorcycle-related expenses
- Categorize expenses
- Update expense records
- Delete expenses
- Associate expenses with motorcycles and their owners

### AI Motorcycle Diagnosis

- Describe motorcycle symptoms in natural language
- Send the symptom description to the backend
- Generate a diagnosis using Google Gemini
- Return structured JSON instead of unstructured text
- Display a diagnosis, possible causes, recommendations, severity, and confidence score

The Gemini prompt instructs the model to return:

- Exactly 3 possible causes
- Exactly 3 recommendations
- A severity of `Low`, `Medium`, or `High`
- A confidence score between `0` and `100`

---

## Architecture

```text
User
  │
  ▼
React Frontend
  │
  │ HTTPS / REST API Requests
  ▼
Express.js Backend
  │
  ├───────────────► MongoDB Atlas
  │                 Users
  │                 Motorcycles
  │                 Maintenance Records
  │                 Expenses
  │
  └───────────────► Google Gemini API
                    AI Diagnosis
Request Flow
User Action
   │
   ▼
React Component
   │
   ▼
Axios Request
   │
   ▼
Express Route
   │
   ▼
Authentication Middleware
   │
   ▼
Controller / Business Logic
   │
   ├──────────► MongoDB
   │
   └──────────► Google Gemini API
   │
   ▼
JSON Response
   │
   ▼
React State Update
Concepts Implemented
Client-Side Routing

React Router handles navigation between:

Landing page
Login
Signup
Dashboard
Garage
Maintenance
Expenses
AI Diagnosis
Not Found page

Implementation: client/src/main.jsx and client/src/App.jsx

RESTful API Design

The backend uses resource-based REST endpoints.

POST   /api/auth/register
POST   /api/auth/login

GET    /api/dashboard

GET    /api/motorcycles
POST   /api/motorcycles
GET    /api/motorcycles/:id
PUT    /api/motorcycles/:id
DELETE /api/motorcycles/:id

GET    /api/maintenance
POST   /api/maintenance
PUT    /api/maintenance/:id
DELETE /api/maintenance/:id

GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id

POST   /api/diagnosis

Implementation: server/src/routes/

Authentication and Middleware

Authentication is implemented using JWT.

Login Request
   ↓
Find User in MongoDB
   ↓
bcrypt.compare()
   ↓
jwt.sign()
   ↓
JWT Returned to Frontend
   ↓
Token Stored in localStorage
   ↓
Axios Adds Authorization Header
   ↓
Express protect Middleware
   ↓
jwt.verify()
   ↓
Authenticated Request

JWT issuance: server/src/controllers/auth.controller.js

JWT verification: server/src/middleware/auth.middleware.js

Frontend token handling: client/src/api/api.js

Password Hashing

Passwords are never stored directly.

During registration:

Password
   ↓
bcrypt.hash()
   ↓
Hashed Password
   ↓
MongoDB

During login:

Entered Password + Stored Hash
   ↓
bcrypt.compare()
   ↓
Authentication Result

Implementation: server/src/controllers/auth.controller.js

HTTP Status Codes and Server-Side Error Handling

The backend returns appropriate HTTP responses for different outcomes.

Examples include:

200 - Successful request
201 - Resource created
400 - Invalid or missing input
401 - Unauthorized request
404 - Resource not found
500 - Internal server error

Controllers use try/catch blocks to handle server and database errors without crashing the application.

CRUD Operations with MongoDB

Revion implements Create, Read, Update, and Delete operations for:

Motorcycles
Maintenance records
Expenses
Create → POST
Read   → GET
Update → PUT
Delete → DELETE

Implementation: server/src/controllers/

MongoDB Schema Modeling

The application uses Mongoose schemas to define the structure of:

Users
Motorcycles
Maintenance records
Expenses

The schemas include validation such as:

Required fields
Unique email addresses
Minimum password length
Enumerated expense categories
Default values
Automatic timestamps

Implementation: server/src/models/

Referencing Relationships in MongoDB

Revion uses referenced relationships between collections.

Examples:

User
 └── owns ──► Motorcycle

Motorcycle
 └── has ──► Maintenance Records

Motorcycle
 └── has ──► Expenses

Mongoose ObjectId references connect:

Motorcycle.owner → User

Maintenance.motorcycle → Motorcycle
Maintenance.owner      → User

Expense.motorcycle → Motorcycle
Expense.owner      → User

This allows related data to be modeled without embedding all records inside one document.

LLM API Integration

The AI diagnosis feature integrates the backend with the Google Gemini API.

User Symptom
   ↓
Diagnosis Page
   ↓
Axios POST Request
   ↓
Express Route
   ↓
JWT Middleware
   ↓
Diagnosis Controller
   ↓
Gemini Service
   ↓
Google Gemini API
   ↓
Structured JSON Response
   ↓
Diagnosis Display

Implementation: server/src/services/gemini.service.js

The backend uses async/await to wait for the external API response before processing and returning the result.

Prompt Engineering and Structured Output

The diagnosis service uses a specific prompt to control the model's role and output format.

The prompt:

Defines the AI as a senior motorcycle mechanic
Includes the user's symptom description
Requests JSON-only output
Defines the required response fields
Restricts diagnosis length
Requires exactly 3 possible causes
Requires exactly 3 recommendations
Restricts confidence to a 0-100 range
Restricts severity to Low, Medium, or High

The Gemini API is also configured with:

responseMimeType: application/json

The returned JSON is parsed before being sent back to the frontend.

Implementation: server/src/services/gemini.service.js

Async API Communication

The frontend uses Axios for asynchronous API communication.

A centralized API instance:

Reads the API URL from VITE_API_URL
Falls back to the local backend during development
Adds JWT tokens using a request interceptor
Sends requests to the Express backend

Implementation: client/src/api/api.js

Environment Variables and Secrets Management

Sensitive configuration is kept outside the source code.

Backend environment variables:

PORT
MONGO_URI
JWT_SECRET
GEMINI_API_KEY

Frontend environment variable:

VITE_API_URL

The Gemini API key and JWT secret are loaded through environment variables rather than being hardcoded in the repository.

Tech Stack
Frontend
React 19
Vite
React Router
Axios
Tailwind CSS
Framer Motion
Recharts
Lucide React
React Hot Toast
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT
bcrypt
Google Gemini API
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas


Project Structure
revion/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── docs/
│   ├── PRD.md
│   ├── HLD.md
│   └── LLD.md
│
├── README.md
└── LICENSE
Getting Started
Clone the Repository
git clone https://github.com/SaudKhanAbbas/revion.git
cd revion
Client
cd client
npm install
npm run dev
Server

Open another terminal:

cd server
npm install
npm run dev
Local Environment Variables
Server

Create:

server/.env

Add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
Client

Create:

client/.env

Add:

VITE_API_URL=http://localhost:5000/api
Live Deployment

Frontend: https://revion-seven.vercel.app/

Backend API: https://revion-backend.onrender.com/

Future Improvements
Maintenance reminders
Service scheduling
Improved motorcycle analytics
Predictive maintenance
Image upload support
Nearby mechanic integration
AI maintenance predictions
Notifications
Author

Saud Khan Abbas

GitHub: https://github.com/SaudKhanAbbas

Licensed under the MIT License.
