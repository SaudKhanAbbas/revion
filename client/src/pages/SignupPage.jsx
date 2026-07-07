import { useState } from "react";

import api from "../api/api";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <Card className="w-full max-w-xl p-10">
        <h1 className="text-5xl font-bold">Create Account</h1>

        <p className="mt-4 text-zinc-400">
          Join Revion and manage every motorcycle in one place.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block text-zinc-300">
              Full Name
            </label>

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-zinc-300">
              Email
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-zinc-300">
              Password
            </label>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-zinc-300">
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-white"
              required
            />
          </div>

          <Button type="submit" className="w-full">
  Create Account
</Button>

          <p className="text-center text-zinc-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-white"
            >
              Sign In
            </a>
          </p>
        </form>
      </Card>
    </main>
  );
}