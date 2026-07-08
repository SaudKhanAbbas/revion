import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import MotorcycleCard from "../components/garage/MotorcycleCard";
import { getMotorcycles } from "../api/motorcycleApi";

export default function GaragePage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const data = await getMotorcycles();
        setMotorcycles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            My Garage
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all your motorcycles in one place.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading motorcycles...</p>
      ) : motorcycles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Your garage is empty
          </h2>

          <p className="mt-3 text-zinc-400">
            Add your first motorcycle in the next step.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {motorcycles.map((motorcycle) => (
            <MotorcycleCard
              key={motorcycle._id}
              motorcycle={motorcycle}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}