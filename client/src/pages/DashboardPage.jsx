import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h3 className="text-lg font-semibold text-white">
            Welcome
          </h3>

          <p className="mt-2 text-zinc-400">
            {user?.fullName || "Rider"}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white">
            Health Score
          </h3>

          <p className="mt-2 text-4xl font-bold text-green-400">
            94
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white">
            Motorcycles
          </h3>

          <p className="mt-2 text-4xl font-bold text-white">
            0
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}