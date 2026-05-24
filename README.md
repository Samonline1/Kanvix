# Kanvix

Kanvix is a simplified Jira-inspired task management system built with the MERN stack. It provides secure authentication, project-based task organization, and a responsive dashboard experience with a clean and practical interface.

## Overview

Kanvix helps users:

- create an account and log in securely
- manage tasks across multiple project boards
- track progress using `Todo`, `In Progress`, and `Done` columns
- view a dashboard with simple task analytics
- update task details such as priority, due date, and status

The project focuses on practical software engineering fundamentals:

- readable component structure
- clear API flow
- simple state management
- responsive layout
- polished UI feedback with empty states, loading skeletons, and toast messages

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Context API
- React Hot Toast
- Vite

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs

## Core Features

### Authentication

- User registration
- User login
- JWT-based session handling
- Protected routes for authenticated users only

### Task Management

- Create task
- Edit task
- Delete task
- Update task status
- Set task priority
- Set due date
- Filter tasks by project board

### Dashboard and UI

- Dashboard with total task summary
- Task status analytics
- Recent tasks section
- Project navigation sidebar
- Mobile-friendly navigation
- Dark and light mode
- Skeleton loading states
- Empty states
- Toast notifications
- Profile page with user details and task summary

## Application Pages

### Public Pages

- `/` Landing page
- `/login` Login page
- `/register` Registration page

### Protected Pages

- `/dashboard` Dashboard overview
- `/board/:id` Project task board
- `/profile` User profile and summary

## Folder Structure

```txt
Kanvix/
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- styles/
|   |   `-- utils/
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- package.json
|   `-- server.js
|-- package.json
`-- README.md
```

## API Routes

### Auth Routes

```txt
POST /api/auth/register
POST /api/auth/login
```

### Task Routes

```txt
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Notes:

- `GET /api/tasks` returns all tasks for the logged-in user
- `GET /api/tasks?projectId=<board-id>` returns tasks for a specific project board

## Database Models

### User

```txt
name
email
password
createdAt
updatedAt
```

### Task

```txt
title
description
status
priority
dueDate
projectId
createdBy
createdAt
updatedAt
```

### Task Status Values

- `todo`
- `inprogress`
- `done`

### Task Priority Values

- `low`
- `medium`
- `high`

## Local Development Setup

### 1. Clone the project

```bash
git clone <your-repository-url>
cd Kanvix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment files

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the development servers

```bash
npm run dev
```

This starts:

- the backend server on `http://localhost:5000`
- the frontend app on the Vite development port

## Build for Production

To build the frontend:

```bash
npm run build --workspace client
```

## Project Workflow

Kanvix follows a simple and practical workflow:

1. User registers or logs in.
2. Auth token is stored on the client.
3. Protected routes become accessible.
4. User opens dashboard or project boards.
5. Tasks are created, updated, deleted, and tracked by status.
6. Dashboard and profile page reflect task progress.

## Design Direction

The UI is intentionally kept clean and practical:

- white and blue accents in light mode
- dark slate tones in dark mode
- simple card-based layout
- modal-based task editing instead of many extra pages

The goal is to provide a clean, complete full-stack project with practical features and a maintainable codebase rather than an overengineered enterprise clone.

## Deployment

Kanvix is configured for:

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

### Live URLs

- Frontend: `https://kanvix.netlify.app/`
- Backend: `https://kanvix.onrender.com`

### Netlify Environment Variable

Set this in Netlify:

```env
VITE_API_URL=https://kanvix.onrender.com/api
```

### Render Environment Variables

Set these in Render:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://kanvix.netlify.app
```

### Important Render Note

If Render is deploying from the repository root, it needs a root `start` script. This project now includes that, so `npm start` correctly starts the backend workspace.

## Future Improvements

Possible future enhancements include:

- project creation from the UI
- task search and filtering
- profile editing
- task comments
- activity history

## Author Notes

Kanvix was built to demonstrate end-to-end MERN development with clear structure, practical features, and a polished user experience.
