import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 p-2 rounded mb-6"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
