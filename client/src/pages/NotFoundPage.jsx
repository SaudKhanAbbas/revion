import { Link } from "react-router-dom";

import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <h1 className="text-8xl font-black text-white">
        404
      </h1>

      <h2 className="mt-6 text-3xl font-bold text-white">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-zinc-400">
        The page you're looking for doesn't exist or may
        have been moved.
      </p>

      <Link to="/" className="mt-10">
        <Button>
          Return Home
        </Button>
      </Link>
    </div>
  );
}