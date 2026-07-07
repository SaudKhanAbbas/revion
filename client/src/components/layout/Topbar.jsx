import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Welcome back, {user?.fullName || "Rider"}.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-black">
          {user?.fullName?.charAt(0) || "R"}
        </div>

        <div>
          <p className="font-medium text-white">
            {user?.fullName || "Rider"}
          </p>

          <p className="text-sm text-zinc-400">
            {user?.email || ""}
          </p>
        </div>
      </div>
    </header>
  );
}