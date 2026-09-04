import { TrendingUp } from "lucide-react";
import Card from "../ui/Card";

export default function DashboardHealthCard({ healthScore }) {
  const healthColor =
    healthScore >= 80
      ? "text-emerald-400"
      : healthScore >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const progressColor =
    healthScore >= 80
      ? "bg-emerald-400"
      : healthScore >= 60
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-500">Motorcycle Health</p>
          <h2 className={`mt-2 text-7xl font-black ${healthColor}`}>
            {healthScore}
          </h2>
        </div>

        <TrendingUp className="text-sky-400" size={34} />
      </div>

      <div className="mt-8 h-3 rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
          style={{ width: `${healthScore}%` }}
        />
      </div>

      <p className="mt-4 text-zinc-500">Overall motorcycle condition</p>
    </Card>
  );
}
