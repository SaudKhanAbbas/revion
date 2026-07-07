import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import AuthInput from "../components/auth/AuthInput";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-zinc-400">
          Join Revion and manage every motorcycle in one place.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
          />

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

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <Button className="w-full">
            Create Account
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
      </Card>
    </main>
  );
}