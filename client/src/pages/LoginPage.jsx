import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";
import { useAuth } from "../context/AuthContext";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      await fetchUser();

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <Card className="w-full max-w-xl p-10">
        <h1 className="text-5xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-4 text-zinc-400">
          Sign in to continue to Revion.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block text-zinc-300">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-zinc-300">
              Password
            </label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none focus:border-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>

          <p className="text-center text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-white hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
}