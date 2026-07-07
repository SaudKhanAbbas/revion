import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import AuthInput from "../components/auth/AuthInput";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-zinc-400">
          Sign in to continue to Revion.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button className="w-full">
            Sign In
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-white hover:underline"
          >
            Create one
          </Link>
        </p>
      </Card>
    </main>
  );
}