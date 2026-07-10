import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bike,
  Wrench,
  Wallet,
  Brain,
  TrendingUp,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SkeletonCard from "../components/ui/SkeletonCard";

import { getDashboardData } from "../api/dashboardApi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#38bdf8",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#ec4899",
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid gap-6 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </DashboardLayout>
    );
  }

  const {
    user,
    stats,
    expenseChartData,
  } = dashboardData;

  const healthScore =
    stats.averageHealthScore;

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
    <DashboardLayout>

      <div className="mb-10">

        <p className="text-zinc-500">
          Welcome back
        </p>

        <h1 className="mt-2 text-5xl font-black tracking-tight">
          {user.fullName}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Here's everything happening with your
          motorcycles today.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <Card>

          <Bike
            className="text-sky-400"
            size={24}
          />

          <p className="mt-6 text-sm text-zinc-500">
            Motorcycles
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.totalMotorcycles}
          </h2>

        </Card>

        <Card>

          <Wrench
            className="text-orange-400"
            size={24}
          />

          <p className="mt-6 text-sm text-zinc-500">
            Maintenance
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.totalMaintenance}
          </h2>

        </Card>

        <Card>

          <Wallet
            className="text-emerald-400"
            size={24}
          />

          <p className="mt-6 text-sm text-zinc-500">
            Total Expenses
          </p>

          <h2 className="mt-2 text-4xl font-black">
            ₹
            {stats.totalExpenses.toLocaleString()}
          </h2>

        </Card>

        <Card>

          <Brain
            className="text-violet-400"
            size={24}
          />

          <p className="mt-6 text-sm text-zinc-500">
            AI Status
          </p>

          <h2 className="mt-2 text-3xl font-black text-emerald-400">
            Healthy
          </h2>

        </Card>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Motorcycle Health
              </p>

              <h2
                className={`mt-2 text-7xl font-black ${healthColor}`}
              >
                {healthScore}
              </h2>

            </div>

            <TrendingUp
              className="text-sky-400"
              size={34}
            />

          </div>

          <div className="mt-8 h-3 rounded-full bg-zinc-800">

            <div
              className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
              style={{
                width: `${healthScore}%`,
              }}
            />

          </div>

          <p className="mt-4 text-zinc-500">
            Overall motorcycle condition
          </p>

        </Card>

        <Card>

          <h2 className="text-xl font-bold">
            Expense Breakdown
          </h2>

          {expenseChartData.length === 0 ? (

            <p className="mt-8 text-zinc-500">
              No expense data yet.
            </p>

          ) : (

            <div className="mt-6 h-72">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={expenseChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                  >

                    {expenseChartData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </Card>

      </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <Card>

          <h2 className="mb-6 text-xl font-bold">
            Recent Maintenance
          </h2>

          {dashboardData.recentMaintenance.length === 0 ? (

            <p className="text-zinc-500">
              No maintenance records yet.
            </p>

          ) : (

            <div className="space-y-5">

              {dashboardData.recentMaintenance.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4"
                >

                  <div>

                    <p className="font-semibold">
                      {item.serviceType}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.motorcycle.manufacturer}{" "}
                      {item.motorcycle.model}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </Card>

        <Card>

          <h2 className="mb-6 text-xl font-bold">
            Recent Expenses
          </h2>

          {dashboardData.recentExpenses.length === 0 ? (

            <p className="text-zinc-500">
              No expenses recorded.
            </p>

          ) : (

            <div className="space-y-5">

              {dashboardData.recentExpenses.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4"
                >

                  <div>

                    <p className="font-semibold">
                      {item.category}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.motorcycle.manufacturer}{" "}
                      {item.motorcycle.model}
                    </p>

                  </div>

                  <span className="font-bold text-emerald-400">
                    ₹{item.amount}
                  </span>

                </div>

              ))}

            </div>

          )}

        </Card>

      </div>

      <Card className="mt-8">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Quick Actions
            </h2>

            <p className="mt-2 text-zinc-500">
              Jump to the section you need.
            </p>

          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <Button
            variant="filled"
            onClick={() => navigate("/garage")}
          >
            Garage
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/maintenance")}
          >
            Maintenance
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/expenses")}
          >
            Expenses
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/diagnosis")}
          >
            AI Diagnosis
          </Button>

        </div>

      </Card>

    </DashboardLayout>
  );
}