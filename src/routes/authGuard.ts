import { redirect } from "react-router-dom"

export function requireAuth() {
  const token = localStorage.getItem("token")

  if (!token) {
    throw redirect("/")
  }

  return null
}