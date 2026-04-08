# TaskFlow Frontend

A task management application built with React, TypeScript, and modern frontend practices.

## 🚀 Features

- User authentication
- Create, update, and delete tasks
- Filter tasks by status
- Search tasks
- Dashboard with task statistics

## 🛠 Tech Stack

- React + TypeScript
- React Query (TanStack Query)
- Tailwind CSS
- Axios
- Vite

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment variables

Copy the example file:

```bash
cp .env.example .env
```

Update values if needed:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Run the application

```bash
npm run dev
```

App will run on:
http://localhost:5173

## 🐳 Run the Application with Docker

Build Docker image:

```bash
docker build --build-arg VITE_API_BASE_URL=http://localhost:3000 -t taskflow-frontend .
```

Run container:

```bash
docker run --name taskflow-frontend  -p 5173:5173 taskflow-frontend
```

## 📌 Notes

- Backend API should be running before starting the frontend
- `.env` file is ignored for security
