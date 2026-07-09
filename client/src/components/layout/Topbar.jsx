import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Button from "../ui/Button";

export default function Topbar() {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);

    showToast("Logged out successfully.");

    navigate("/");
  };

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

      <div className="flex items-center gap-4">
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

        <Button
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}