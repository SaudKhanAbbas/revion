import { Bike, Wrench, Wallet, Brain } from "lucide-react";
import Card from "../ui/Card";

export default function DashboardStatsGrid({ stats }) {
  return (
    <div className="grid gap-6 xl:grid-cols-4">
      <Card>
        <Bike className="text-sky-400" size={24} />
        <p className="mt-6 text-sm text-zinc-500">Motorcycles</p>
        <h2 className="mt-2 text-4xl font-black">
          {stats.totalMotorcycles}
        </h2>
      </Card>

      <Card>
        <Wrench className="text-orange-400" size={24} />
        <p className="mt-6 text-sm text-zinc-500">Maintenance</p>
        <h2 className="mt-2 text-4xl font-black">
          {stats.totalMaintenance}
        </h2>
      </Card>

      <Card>
        <Wallet className="text-emerald-400" size={24} />
        <p className="mt-6 text-sm text-zinc-500">Total Expenses</p>
        <h2 className="mt-2 text-4xl font-black">
          ₹{stats.totalExpenses.toLocaleString()}
        </h2>
      </Card>

      <Card>
        <Brain className="text-violet-400" size={24} />
        <p className="mt-6 text-sm text-zinc-500">AI Status</p>
        <h2 className="mt-2 text-3xl font-black text-emerald-400">
          Healthy
        </h2>
      </Card>
    </div>
  );
}
