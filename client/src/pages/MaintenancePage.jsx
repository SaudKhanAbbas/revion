import { useEffect, useState } from "react";
import {
  Plus,
  Wrench,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ConfirmModal from "../components/ui/ConfirmModal";

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

  const [selectedLog, setSelectedLog] =
    useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [logToDelete, setLogToDelete] =
    useState(null);

  const fetchData = async () => {
    try {
      const bikes = await getMotorcycles();
      setMotorcycles(bikes);

      const logs = await getMaintenanceLogs();
      setMaintenanceLogs(logs);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load maintenance.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateMaintenance = async (
    maintenanceData
  ) => {
    try {
      await createMaintenance(maintenanceData);

      await fetchData();

      toast.success("Maintenance added.");

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add maintenance.");
    }
  };

  const handleEditClick = (log) => {
    setSelectedLog(log);
    setIsEditModalOpen(true);
  };

  const handleUpdateMaintenance = async (
    id,
    data
  ) => {
    try {
      await updateMaintenance(id, data);

      await fetchData();

      toast.success("Maintenance updated.");

      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update maintenance.");
    }
  };

  const handleDeleteMaintenance = (log) => {
    setLogToDelete(log);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMaintenance = async () => {
    if (!logToDelete) return;

    try {
      await deleteMaintenance(logToDelete._id);

      await fetchData();

      toast.success("Maintenance deleted.");

      setIsDeleteModalOpen(false);
      setLogToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete maintenance.");
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Maintenance
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Service History
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Keep a complete history of every
            service your motorcycles receive.
          </p>

        </div>

        <Button
          variant="filled"
          onClick={() =>
            setIsAddModalOpen(true)
          }
        >
          <Plus
            size={18}
            className="mr-2"
          />

          Add Maintenance

        </Button>

      </div>

      {maintenanceLogs.length === 0 ? (

        <Card className="py-20 text-center">

          <Wrench
            size={60}
            className="mx-auto text-zinc-700"
          />

          <h2 className="mt-6 text-3xl font-bold">
            No maintenance records.
          </h2>

          <p className="mt-4 text-zinc-400">
            Start tracking every service for
            your motorcycles.
          </p>

          <Button
            className="mt-8"
            onClick={() =>
              setIsAddModalOpen(true)
            }
          >
            Add Maintenance
          </Button>

        </Card>

      ) : (

        <div className="space-y-6">

          {maintenanceLogs.map((log) => (
            <MaintenanceCard
              key={log._id}
              log={log}
              onEdit={handleEditClick}
              onDelete={
                handleDeleteMaintenance
              }
            />
          ))}

        </div>

      )}

      <AddMaintenanceModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        motorcycles={motorcycles}
        onCreate={handleCreateMaintenance}
      />

      <EditMaintenanceModal
        isOpen={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        log={selectedLog}
        motorcycles={motorcycles}
        onUpdate={handleUpdateMaintenance}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Maintenance?"
        message={`Delete "${logToDelete?.serviceType ?? ""}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteMaintenance}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setLogToDelete(null);
        }}
      />

    </DashboardLayout>
  );
}