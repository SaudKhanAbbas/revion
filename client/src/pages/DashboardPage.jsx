import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";

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
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#ec4899",
];

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
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
        <p className="text-zinc-400">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  const healthScore = dashboardData.stats.averageHealthScore;

  const healthColor =
    healthScore >= 80
      ? "text-green-400"
      : healthScore >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const progressColor =
    healthScore >= 80
      ? "bg-green-400"
      : healthScore >= 60
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <h3 className="text-lg font-semibold text-white">
            Welcome
          </h3>

          <p className="mt-2 text-zinc-400">
            {dashboardData.user.fullName}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white">
            Motorcycles
          </h3>

          <p className="mt-2 text-4xl font-bold text-white">
            {dashboardData.stats.totalMotorcycles}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white">
            Maintenance
          </h3>

          <p className="mt-2 text-4xl font-bold text-blue-400">
            {dashboardData.stats.totalMaintenance}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white">
            Total Expenses
          </h3>

          <p className="mt-2 text-4xl font-bold text-green-400">
            ₹{dashboardData.stats.totalExpenses.toLocaleString()}
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-xl font-semibold text-white">
            Motorcycle Health
          </h3>

          <p className={`mt-4 text-6xl font-bold ${healthColor}`}>
            {healthScore}
          </p>

          <p className="mt-2 text-zinc-400">
            out of 100
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full transition-all duration-500 ${progressColor}`}
              style={{
                width: `${healthScore}%`,
              }}
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-white">
            Latest Motorcycle
          </h3>

          {dashboardData.latestMotorcycle ? (
            <div className="mt-4 space-y-2 text-zinc-300">
              <p>
                <strong>Manufacturer:</strong>{" "}
                {dashboardData.latestMotorcycle.manufacturer}
              </p>

              <p>
                <strong>Model:</strong>{" "}
                {dashboardData.latestMotorcycle.model}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {dashboardData.latestMotorcycle.year}
              </p>

              <p>
                <strong>Mileage:</strong>{" "}
                {dashboardData.latestMotorcycle.mileage.toLocaleString()} km
              </p>
            </div>
          ) : (
            <p className="mt-4 text-zinc-400">
              No motorcycles added yet.
            </p>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <h3 className="mb-6 text-xl font-semibold text-white">
            Expense Breakdown
          </h3>

          {dashboardData.expenseChartData.length === 0 ? (
            <p className="text-zinc-400">
              No expense data available.
            </p>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.expenseChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={130}
                    label
                  >
                    {dashboardData.expenseChartData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index % COLORS.length]
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
    </DashboardLayout>
  );
}