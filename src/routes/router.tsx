import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import DashboardPage from "../pages/DashboardPage"
import TasksPage from "../pages/TasksPage"
import AppLayout from "../components/layouts/AppLayout"
import { requireAuth } from "./authGuard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    loader: requireAuth,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
    ],
  },
])