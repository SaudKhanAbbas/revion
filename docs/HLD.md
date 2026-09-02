# High-Level Design (HLD)

# Revion

Version: 1.0  
Author: Saud Khan Abbas

---

# 1. System Overview

Revion is a full-stack motorcycle management platform built using a three-tier client-server architecture.

The major layers are:

- Frontend: React and Vite
- Backend: Node.js and Express.js
- Database: MongoDB Atlas

The backend also integrates with the Google Gemini API to provide AI-powered motorcycle diagnosis.

The frontend and backend are deployed independently. The React frontend is hosted on Vercel, while the Express backend is hosted on Render. MongoDB Atlas provides the cloud database.

The system is designed so that users can authenticate, manage motorcycle-related data, and access AI diagnosis through a single frontend application.

---

# 2. System Architecture

```text
                         +----------------------+
                         |     User Browser     |
                         +----------+-----------+
                                    |
                                    |
                                    ▼
                    +-----------------------------+
                    |     React Frontend (Vite)    |
                    |                             |
                    | - Pages                     |
                    | - Components                |
                    | - React Router              |
                    | - Auth State                |
                    | - Axios API Client          |
                    +-------------+---------------+
                                  |
                          HTTPS / REST API
                                  |
                                  ▼
                    +-----------------------------+
                    |   Express.js Backend Server  |
                    |                             |
                    | - REST Routes                |
                    | - JWT Middleware             |
                    | - Controllers                |
                    | - Business Logic             |
                    | - Error Handling             |
                    +--------+--------------+------+
                             |              |
                             |              |
                             ▼              ▼
                 +----------------+   +----------------------+
                 | MongoDB Atlas  |   | Google Gemini API    |
                 |                |   |                      |
                 | Users          |   | AI Diagnosis         |
                 | Motorcycles    |   | Prompt Processing    |
                 | Maintenance    |   | Structured Output    |
                 | Expenses       |   |                      |
                 +----------------+   +----------------------+
