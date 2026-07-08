import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import AddMaintenanceModal from "../components/maintenance/AddMaintenanceModal";

import { getMotorcycles } from "../api/motorcycleApi";
import {
  getMaintenanceLogs,
  createMaintenance,
} from "../api/maintenanceApi";

export default function MaintenancePage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const bikes = await getMotorcycles();
      setMotorcycles(bikes);

      const logs = await getMaintenanceLogs();
      setMaintenanceLogs(logs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateMaintenance = async (maintenanceData) => {
    try {
      await createMaintenance(maintenanceData);
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create maintenance log.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Maintenance
          </h1>

          <p className="mt-2 text-zinc-400">
            Track every service your motorcycles receive.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Maintenance
        </Button>
      </div>

      {maintenanceLogs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No maintenance logs yet
          </h2>

          <p className="mt-3 text-zinc-400">
            Add your first maintenance record.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {maintenanceLogs.map((log) => (
            <div
              key={log._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {log.serviceType}
              </h3>

              <p className="mt-2 text-zinc-400">
                {log.motorcycle.manufacturer}{" "}
                {log.motorcycle.model}
              </p>

              <p className="mt-2 text-zinc-300">
                Mileage: {log.mileage.toLocaleString()} km
              </p>

              <p className="text-zinc-300">
                Cost: ₹{log.cost}
              </p>

              {log.description && (
                <p className="mt-2 text-zinc-400">
                  {log.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <AddMaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        motorcycles={motorcycles}
        onCreate={handleCreateMaintenance}
      />
    </DashboardLayout>
  );
}