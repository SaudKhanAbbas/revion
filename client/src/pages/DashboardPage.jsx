import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";

import { getDashboardData } from "../api/dashboardApi";

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
            Average Health Score
          </h3>

          <p className="mt-4 text-6xl font-bold text-green-400">
            {dashboardData.stats.averageHealthScore}
          </p>

          <p className="mt-2 text-zinc-400">
            out of 100
          </p>
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
    </DashboardLayout>
  );
}