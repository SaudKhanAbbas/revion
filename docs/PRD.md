# Product Requirements Document (PRD)

# Revion

Version: 1.0  
Author: Saud Khan Abbas

---

# 1. Overview

Revion is a full-stack motorcycle management platform designed to help riders manage motorcycle information, maintenance records, expenses, and motorcycle problems from one application.

The application combines a React frontend, an Express.js backend, MongoDB Atlas, and the Google Gemini API. Users can securely create an account, manage their motorcycles, record maintenance and expenses, and submit a motorcycle symptom for AI-assisted diagnosis.

Revion is built as a client-server application. The frontend communicates with the backend through HTTP-based REST API requests, while MongoDB stores application data. The AI diagnosis feature uses the Google Gemini API as an external AI service.

The main goal of the project is to demonstrate the development of a larger full-stack application involving frontend development, backend APIs, authentication, database modeling, CRUD operations, AI integration, and production deployment.

---

# 2. Problem Statement

Motorcycle ownership involves more than simply riding the motorcycle. Riders may need to remember maintenance history, track expenses, manage multiple vehicles, and investigate problems when symptoms occur.

This information is often scattered across bills, notes, service records, and different applications.

Revion addresses this by providing a centralized platform where a user can:

- Create an account and securely log in
- Manage motorcycle information
- Record maintenance activity
- Track motorcycle-related expenses
- View information through a dashboard
- Describe a motorcycle problem in natural language
- Receive an AI-generated diagnosis with possible causes and recommended actions

---

# 3. Objectives

The objectives of Revion are to:

- Provide a centralized platform for motorcycle management
- Allow users to securely create and access personal accounts
- Implement authentication using password hashing and JWT
- Protect private API routes using authentication middleware
- Allow users to create, read, update, and delete motorcycle-related data
- Store application data using MongoDB and Mongoose schemas
- Model relationships between users, motorcycles, maintenance records, and expenses
- Integrate a Large Language Model API for motorcycle diagnosis
- Use prompt engineering to request useful and structured AI responses
- Provide a responsive frontend for desktop and mobile users
- Deploy the application using cloud services

---

# 4. Target Users

## Motorcycle Owners

Users who want to manage information about their motorcycles, maintenance, and expenses.

## Riders

Users who want a single application for keeping track of motorcycle-related records.

## Motorcycle Enthusiasts

Users interested in understanding possible causes of motorcycle symptoms using an AI-assisted diagnosis feature.

---

# 5. User Stories

## Authentication

As a new user,  
I want to create an account,  
So that I can access my motorcycle information securely.

As a returning user,  
I want to log in,  
So that I can access the data associated with my account.

As an authenticated user,  
I want my protected API requests to include my JWT,  
So that the backend can verify my identity.

---

## Motorcycle Management

As a user,  
I want to add a motorcycle,  
So that I can manage its information.

As a user,  
I want to view my motorcycles,  
So that I can access my vehicle information.

As a user,  
I want to update motorcycle details,  
So that my information remains accurate.

As a user,  
I want to delete a motorcycle,  
So that I can remove information I no longer need.

---

## Maintenance

As a user,  
I want to record maintenance information,  
So that I can keep a history of work performed on my motorcycle.

As a user,  
I want to view and update maintenance records,  
So that my maintenance history remains accurate.

---

## Expenses

As a user,  
I want to record motorcycle-related expenses,  
So that I can track how much I spend on my motorcycle.

As a user,  
I want to categorize expenses,  
So that different types of spending can be organized.

---

## AI Diagnosis

As a user,  
I want to describe a motorcycle problem in natural language,  
So that I can receive an AI-generated diagnosis.

As a user,  
I want to receive possible causes and recommended actions,  
So that the response is useful and actionable.

As a user,  
I want the AI response to contain structured information,  
So that the frontend can display diagnosis results consistently.

---

# 6. Functional Requirements

## 6.1 User Authentication

The system must allow users to:

- Register with a name, email, and password
- Log in using valid credentials
- Receive a JWT after successful authentication
- Access authenticated user information
- Access protected resources only after JWT verification

### Password Security

The system must:

- Hash passwords using bcrypt before storing them
- Compare the entered password with the stored password hash during login
- Never store the original password directly in MongoDB

### Authentication Flow

```text
User Registration
       │
       ▼
Validate Input
       │
       ▼
Check Existing User
       │
       ▼
bcrypt Password Hashing
       │
       ▼
Create User in MongoDB
       │
       ▼
Return Authentication Response
