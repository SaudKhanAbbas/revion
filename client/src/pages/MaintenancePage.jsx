import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";

import AddMaintenanceModal from "../components/maintenance/AddMaintenanceModal";
import EditMaintenanceModal from "../components/maintenance/EditMaintenanceModal";
import MaintenanceCard from "../components/maintenance/MaintenanceCard";

import { getMotorcycles } from "../api/motorcycleApi";

import {
  getMaintenanceLogs,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../api/maintenanceApi";

export default function MaintenancePage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

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
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create maintenance log.");
    }
  };

  const handleEditClick = (log) => {
    setSelectedLog(log);
    setIsEditModalOpen(true);
  };

  const handleUpdateMaintenance = async (id, data) => {
    try {
      await updateMaintenance(id, data);
      await fetchData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update maintenance.");
    }
  };

  const handleDeleteMaintenance = async (log) => {
    const confirmed = window.confirm(
      `Delete "${log.serviceType}" maintenance record?`
    );

    if (!confirmed) return;

    try {
      await deleteMaintenance(log._id);
      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete maintenance.");
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

        <Button onClick={() => setIsAddModalOpen(true)}>
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
            <MaintenanceCard
              key={log._id}
              log={log}
              onEdit={handleEditClick}
              onDelete={handleDeleteMaintenance}
            />
          ))}
        </div>
      )}

      <AddMaintenanceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        motorcycles={motorcycles}
        onCreate={handleCreateMaintenance}
      />

      <EditMaintenanceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        log={selectedLog}
        motorcycles={motorcycles}
        onUpdate={handleUpdateMaintenance}
      />
    </DashboardLayout>
  );
}