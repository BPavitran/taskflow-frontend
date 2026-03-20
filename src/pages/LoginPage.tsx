import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      localStorage.setItem("token", result.accessToken);
      navigate("/dashboard");
    },
    onError: () => {
      setShowError(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowError(false);
            }}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setShowError(false);
            }}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Error message */}
          {showError && (
            <p className="text-red-500 text-sm text-center">
              Invalid email or password
            </p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
