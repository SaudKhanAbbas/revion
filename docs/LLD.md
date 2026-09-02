# Low-Level Design (LLD)

# Revion

Version: 1.0  
Author: Saud Khan Abbas

---

# 1. Introduction

This document describes the internal implementation of Revion.

It covers:

- Project structure
- Frontend architecture
- Backend architecture
- REST API design
- Authentication flow
- Middleware
- Database schemas
- MongoDB relationships
- CRUD operations
- AI diagnosis implementation
- Prompt engineering
- Structured outputs
- Environment variables
- Deployment configuration
- Error handling

Unlike the High-Level Design, this document focuses on the exact modules and data flow used inside the application.

---

# 2. Project Structure

```text
revion/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── motorcycle.controller.js
│   │   │   ├── maintenance.controller.js
│   │   │   ├── expense.controller.js
│   │   │   └── diagnosis.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Motorcycle.js
│   │   │   ├── Maintenance.js
│   │   │   └── Expense.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── motorcycle.routes.js
│   │   │   ├── maintenance.routes.js
│   │   │   ├── expense.routes.js
│   │   │   └── diagnosis.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── gemini.service.js
│   │   │
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
3. Backend Entry Point
File
server/src/server.js

The server entry point is responsible for:

Loading environment variables
Connecting to MongoDB
Starting the Express server
Startup Flow
Server Starts
      │
      ▼
dotenv.config()
      │
      ▼
Read Environment Variables
      │
      ▼
connectDB()
      │
      ▼
MongoDB Connection
      │
      ▼
app.listen(PORT)
      │
      ▼
Express API Available

The database connection is established before the application is used.

4. Database Configuration
File
server/src/config/db.js

The database configuration uses Mongoose to connect the backend to MongoDB.

Responsibilities
Read MONGO_URI from environment variables
Connect using mongoose.connect()
Log successful connections
Handle connection failures
Stop the server process when the database connection fails
Implementation Flow
connectDB()
      │
      ▼
mongoose.connect(process.env.MONGO_URI)
      │
      ├── Success
      │      │
      │      ▼
      │   MongoDB Connected
      │
      └── Failure
             │
             ▼
        Log Error
             │
             ▼
        process.exit(1)

This prevents the application from continuing with an unavailable database connection.

5. Express Application
File
server/src/app.js

The Express application configures:

Express middleware
JSON request parsing
CORS
API route registration

The application groups backend functionality into resource-based routes.

Request Flow
HTTP Request
      │
      ▼
Express Application
      │
      ▼
Global Middleware
      │
      ▼
Route Matching
      │
      ▼
Authentication Middleware
      │
      ▼
Controller
      │
      ▼
Database / AI Service
      │
      ▼
JSON Response
6. RESTful Endpoint Design
Implementation
server/src/routes/

Revion organizes its backend around resource-based REST APIs.

The main resources are:

Authentication
Motorcycles
Maintenance
Expenses
AI Diagnosis
Authentication Routes
File
server/src/routes/auth.routes.js
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Purpose
Endpoint	Method	Purpose
/register	POST	Create a new user account
/login	POST	Authenticate a user
/me	GET	Return authenticated user information
Motorcycle Routes
File
server/src/routes/motorcycle.routes.js
GET    /api/motorcycles
POST   /api/motorcycles
GET    /api/motorcycles/:id
PUT    /api/motorcycles/:id
DELETE /api/motorcycles/:id

These endpoints implement CRUD operations.

POST   → Create
GET    → Read
PUT    → Update
DELETE → Delete
Maintenance Routes
File
server/src/routes/maintenance.routes.js

The maintenance routes provide operations for managing maintenance records.

GET    /api/maintenance
POST   /api/maintenance
PUT    /api/maintenance/:id
DELETE /api/maintenance/:id
Expense Routes
File
server/src/routes/expense.routes.js

The expense routes provide CRUD operations for motorcycle-related expenses.

GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
Diagnosis Route
File
server/src/routes/diagnosis.routes.js
POST /api/diagnosis

The route receives a motorcycle symptom and forwards the authenticated request to the diagnosis controller.

7. Middleware
Authentication Middleware
File
server/src/middleware/auth.middleware.js

The authentication middleware protects private API endpoints.

Responsibilities
Read the Authorization header
Extract the Bearer token
Verify the token
Identify the authenticated user
Attach user information to the request
Reject unauthorized requests
Pass valid requests to the next middleware or controller
Flow
Protected Request
      │
      ▼
Authorization Header
      │
      ▼
Bearer Token Present?
      │
   No ─┴── Yes
   │          │
   ▼          ▼
401       jwt.verify()
               │
               ▼
        Valid Token?
          │       │
         No      Yes
          │       │
          ▼       ▼
         401   req.user
                   │
                   ▼
                next()

This middleware uses next() only after successful authentication.

8. Authentication Implementation
Controller
server/src/controllers/auth.controller.js

The authentication controller handles:

Registration
Login
Password hashing
Password comparison
JWT issuance
HTTP responses
Authentication errors
Registration Flow
POST /register
      │
      ▼
Receive name, email, password
      │
      ▼
Validate Required Fields
      │
      ▼
Check Existing User
      │
      ├── Exists
      │     │
      │     ▼
      │   400 Response
      │
      └── Does Not Exist
             │
             ▼
        bcrypt.hash()
             │
             ▼
        Create User
             │
             ▼
        MongoDB
             │
             ▼
        201 Response
Password Hashing

Passwords are hashed before being stored.

Plain Password
      │
      ▼
bcrypt.hash()
      │
      ▼
Password Hash
      │
      ▼
MongoDB

The original password is not stored directly.

Login Flow
POST /login
      │
      ▼
Find User by Email
      │
      ├── Not Found
      │      │
      │      ▼
      │    401 Response
      │
      └── Found
             │
             ▼
       bcrypt.compare()
             │
             ├── Invalid
             │     │
             │     ▼
             │   401 Response
             │
             └── Valid
                    │
                    ▼
                jwt.sign()
                    │
                    ▼
               Return Token
9. JWT Issuance and Verification
JWT Issuance
File
server/src/controllers/auth.controller.js

After successful login:

Authenticated User
      │
      ▼
jwt.sign()
      │
      ▼
JWT Created
      │
      ▼
Return Token
JWT Verification
File
server/src/middleware/auth.middleware.js

For protected requests:

Bearer Token
      │
      ▼
jwt.verify()
      │
      ├── Invalid
      │      │
      │      ▼
      │    401
      │
      └── Valid
             │
             ▼
      Authenticated User
             │
             ▼
          next()
10. HTTP Status Codes

The backend uses HTTP status codes to communicate request results.

Examples include:

200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
Usage
Status	Meaning
200	Successful operation
201	Resource successfully created
400	Invalid request or missing input
401	Missing or invalid authentication
404	Requested resource does not exist
500	Unexpected server failure

Status codes allow the frontend to distinguish between different outcomes.

11. Server-Side Error Handling

Backend operations can fail because of:

Invalid input
Missing records
Database errors
Invalid JWTs
External AI API failures

Controller operations use asynchronous error handling.

General Pattern
Request
   │
   ▼
try
   │
   ├── Successful Operation
   │       │
   │       ▼
   │   Return JSON Response
   │
   └── Error
           │
           ▼
         catch
           │
           ▼
       Return Error Response

The goal is to return a controlled HTTP response rather than allowing the server to crash.

12. MongoDB Schema Modeling
User Schema
File
server/src/models/User.js

The User model stores account information.

Core fields include:

name
email
password

The schema also includes timestamps.

The email is modeled as unique.

Motorcycle Schema
File
server/src/models/Motorcycle.js

The Motorcycle model stores:

owner
manufacturer
model
year
engineCC
mileage
healthScore
image
createdAt
updatedAt
Ownership Relationship
Motorcycle.owner
       │
       ▼
User._id

The owner field uses an ObjectId reference to identify which user owns the motorcycle.

Maintenance Schema
File
server/src/models/Maintenance.js

A maintenance document is connected to both a user and a motorcycle.

Conceptually:

Maintenance
    │
    ├── owner ──────► User
    │
    └── motorcycle ─► Motorcycle

This relationship allows maintenance records to remain separate from the Motorcycle document.

Expense Schema
File
server/src/models/Expense.js

An expense document is connected to both:

The user
The motorcycle

Conceptually:

Expense
   │
   ├── owner ──────► User
   │
   └── motorcycle ─► Motorcycle
13. Referencing Relationships

Revion primarily uses referenced relationships for data that can grow over time.

User to Motorcycle
User
  │
  └── Motorcycle.owner → User._id
Motorcycle to Maintenance
Motorcycle
  │
  └── Maintenance.motorcycle → Motorcycle._id
Motorcycle to Expense
Motorcycle
  │
  └── Expense.motorcycle → Motorcycle._id
Why Referencing?

Maintenance and expense records can continue growing.

Storing every record inside the User or Motorcycle document could create large embedded arrays.

Using references keeps the collections separate while preserving relationships.

Trade-off

Referenced relationships can require additional database queries when related data must be retrieved.

14. CRUD Operations
Motorcycle CRUD
Create
POST /api/motorcycles

Flow:

Request
   │
   ▼
Authentication Middleware
   │
   ▼
Motorcycle Controller
   │
   ▼
Create MongoDB Document
   │
   ▼
201 Response
Read
GET /api/motorcycles
GET /api/motorcycles/:id

The controller retrieves motorcycle data associated with the authenticated user.

Update
PUT /api/motorcycles/:id

The controller:

Identifies the requested motorcycle
Applies updated values
Returns the updated result
Delete
DELETE /api/motorcycles/:id

The controller removes the requested motorcycle resource.

Maintenance CRUD

The same CRUD pattern is used for maintenance records.

Create → POST
Read   → GET
Update → PUT
Delete → DELETE
Expense CRUD

The same CRUD pattern is used for expenses.

Create → POST
Read   → GET
Update → PUT
Delete → DELETE
15. AI Diagnosis Implementation
Files
server/src/routes/diagnosis.routes.js
server/src/controllers/diagnosis.controller.js
server/src/services/gemini.service.js

The AI feature is divided into separate layers.

Route

Receives the HTTP request.

Middleware

Verifies the authenticated user.

Controller

Validates and processes the diagnosis request.

Service

Communicates with the Google Gemini API.

16. LLM API Integration
Service
server/src/services/gemini.service.js

The Gemini service is responsible for:

Initializing the Google GenAI client
Reading the API key from environment variables
Building the diagnosis prompt
Sending the request to Gemini
Requesting structured output
Processing the returned response
Flow
Symptom
   │
   ▼
Gemini Service
   │
   ▼
Build Prompt
   │
   ▼
Google Gemini API
   │
   ▼
Generate Response
   │
   ▼
Structured JSON
   │
   ▼
Parse Result
   │
   ▼
Return Diagnosis
17. Prompt Engineering

The AI diagnosis request uses a structured prompt.

The prompt:

Defines the AI as a motorcycle mechanic
Includes the user's symptom
Requests a diagnosis
Requests possible causes
Requests recommended actions
Requests severity
Requests confidence
Restricts the expected response format

The prompt does not rely on the model to decide the output structure independently.

Instead, it explicitly defines the required information.

Expected Output Fields
diagnosis
possibleCauses
recommendedActions
severity
confidence
18. Structured AI Output

The Gemini request configures structured output using:

application/json

The model is instructed to return JSON rather than free-form text.

The response is constrained to include:

Diagnosis:
Short explanation

Possible Causes:
Exactly 3

Recommended Actions:
Exactly 3

Severity:
Low / Medium / High

Confidence:
0 to 100
Processing Flow
Gemini API Response
        │
        ▼
JSON Text
        │
        ▼
JSON.parse()
        │
        ▼
JavaScript Object
        │
        ▼
Express JSON Response
        │
        ▼
React UI

Structured output makes the frontend implementation more predictable.

19. Environment Variables and Secrets Management
Backend

The backend reads sensitive configuration through environment variables.

PORT
MONGO_URI
JWT_SECRET
GEMINI_API_KEY
Usage
MONGO_URI
    │
    └── MongoDB Connection

JWT_SECRET
    │
    └── JWT Signing and Verification

GEMINI_API_KEY
    │
    └── Google Gemini API

PORT
    │
    └── Express Server
Frontend
VITE_API_URL

The frontend uses this variable to determine the production backend URL.

This allows development and production environments to use different API URLs without changing the application source code.

20. Frontend Architecture
Entry Point
client/src/main.jsx

The frontend entry point mounts the React application.

Application Routes
client/src/App.jsx

The application component defines the client-side routing structure.

React Router is used to navigate between application pages.

21. React Component Composition

The frontend is divided into reusable components, layouts, and pages.

Conceptually:

App
 │
 ├── Layout
 │    │
 │    ├── Navigation
 │    ├── Sidebar
 │    └── Page Content
 │
 └── Pages
      │
      ├── Dashboard
      ├── Garage
      ├── Maintenance
      ├── Expenses
      └── AI Diagnosis

This component composition keeps shared UI separate from page-specific functionality.

22. State Management with useState

React components use local state to manage values that can change during user interaction.

Examples include:

Form Input
    │
    ▼
useState
    │
    ▼
State Updated
    │
    ▼
Component Re-renders

State is used for values such as:

Form fields
Loading state
Error state
API response data
UI visibility
23. Side Effects with useEffect

React uses useEffect for operations that occur outside normal rendering.

Typical use cases include:

Component Loads
      │
      ▼
useEffect()
      │
      ▼
Fetch API Data
      │
      ▼
Update State
      │
      ▼
Re-render UI

This pattern separates data-fetching side effects from component rendering.

24. Frontend API Communication
File
client/src/api/api.js

The frontend uses a centralized Axios instance.

Responsibilities
Configure the API base URL
Use VITE_API_URL
Attach JWT authentication headers
Handle asynchronous requests
Request Interceptor
Axios Request
      │
      ▼
Read Token from localStorage
      │
      ├── No Token
      │      │
      │      ▼
      │   Send Request
      │
      └── Token Exists
             │
             ▼
Add:
Authorization: Bearer <token>
             │
             ▼
       Send Request

This avoids manually attaching the token in every authenticated request.

25. Frontend Authentication Persistence

The authentication token is stored in browser storage after successful login.

On later authenticated requests:

localStorage
      │
      ▼
Axios Interceptor
      │
      ▼
Authorization Header
      │
      ▼
Backend JWT Middleware

The authentication state is restored from the stored token when the application reloads.

26. Async Data Fetching

The frontend performs API communication asynchronously.

General flow:

User Action / Component Load
          │
          ▼
Axios Request
          │
          ▼
Loading = true
          │
          ▼
Wait for Promise
          │
     ┌────┴────┐
     ▼         ▼
 Success      Error
     │         │
     ▼         ▼
Update      Store Error
Data
     │
     ▼
Loading = false

This prevents the browser UI from blocking while waiting for the backend.

27. Loading and Error States

The frontend handles different asynchronous request states.

Loading

Displayed while a request is still pending.

Success

Displayed when a valid API response is received.

Error

Displayed when a request fails.

This gives users feedback about the current operation.

28. Responsive Layout

The frontend is designed to adapt to different screen sizes.

The responsive design applies to:

Navigation
Page layout
Forms
Dashboard content
Motorcycle management UI
AI diagnosis interface

The frontend styling uses Tailwind CSS and responsive utility classes.

29. End-to-End Request Flows
Protected CRUD Request
User
  │
  ▼
React Page
  │
  ▼
Axios
  │
  ▼
Request Interceptor
  │
  ▼
Bearer JWT
  │
  ▼
Express Route
  │
  ▼
Authentication Middleware
  │
  ▼
Controller
  │
  ▼
Mongoose
  │
  ▼
MongoDB Atlas
  │
  ▼
JSON Response
  │
  ▼
React State
  │
  ▼
Updated UI
AI Diagnosis Request
User Enters Symptom
        │
        ▼
React Diagnosis Page
        │
        ▼
Axios POST Request
        │
        ▼
Authorization Header
        │
        ▼
Diagnosis Route
        │
        ▼
JWT Middleware
        │
        ▼
Diagnosis Controller
        │
        ▼
Gemini Service
        │
        ▼
Prompt Construction
        │
        ▼
Google Gemini API
        │
        ▼
Structured JSON
        │
        ▼
Parse AI Result
        │
        ▼
Express JSON Response
        │
        ▼
React State Update
        │
        ▼
Diagnosis Displayed
30. Design Decisions
Centralized Axios Client

Why:

Avoid repeating API configuration
Automatically attach authentication tokens
Support different API URLs through environment variables
JWT Middleware

Why:

Prevent unauthenticated users from accessing private controllers
Centralize authentication logic
Avoid repeating token verification inside every controller
Separate Controllers and Routes

Why:

Routes define HTTP endpoints
Controllers contain application logic
Improves separation of responsibilities
Separate Gemini Service

Why:

Keeps external AI logic out of the controller
Makes AI integration easier to modify
Separates API integration from HTTP request handling
Structured AI Output

Why:

Easier for the frontend to display
Reduces the need to parse free-form text
Provides predictable fields
Referenced MongoDB Relationships

Why:

Maintenance and expense records can grow independently
Documents remain separated by resource type
Relationships are maintained using ObjectId references
31. Current Limitations

The current implementation has some limitations:

AI diagnosis depends on Google Gemini availability
AI output is not guaranteed to be fully accurate
External API calls can increase response time
No dedicated centralized error middleware is currently used
Additional validation middleware can be added
Rate limiting can be added
Automated test coverage can be expanded
The AI diagnosis feature should not replace professional motorcycle inspection
32. Future Improvements

Future technical improvements include:

Centralized error handling middleware
Request validation middleware
Rate limiting
Expanded automated testing
Logging and monitoring
Maintenance reminders
Notifications
Image upload
Predictive maintenance
Advanced analytics
Role-based access control
Caching
