import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MotorcycleCard from "../components/garage/MotorcycleCard";
import AddMotorcycleModal from "../components/garage/AddMotorcycleModal";
import EditMotorcycleModal from "../components/garage/EditMotorcycleModal";

import {
  getMotorcycles,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
} from "../api/motorcycleApi";

import Button from "../components/ui/Button";

export default function GaragePage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMotorcycle, setSelectedMotorcycle] =
    useState(null);

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

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  const filteredMotorcycles = useMemo(() => {
    const query = search.toLowerCase();

    return motorcycles.filter(
      (bike) =>
        bike.manufacturer
          .toLowerCase()
          .includes(query) ||
        bike.model.toLowerCase().includes(query)
    );
  }, [motorcycles, search]);

  const handleCreateMotorcycle = async (
    motorcycleData
  ) => {
    try {
      await createMotorcycle(motorcycleData);
      await fetchMotorcycles();
    } catch (error) {
      console.error(error);
      alert("Failed to create motorcycle.");
    }
  };

  const handleEditClick = (motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsEditModalOpen(true);
  };

  const handleUpdateMotorcycle = async (
    id,
    motorcycleData
  ) => {
    try {
      await updateMotorcycle(id, motorcycleData);
      await fetchMotorcycles();
    } catch (error) {
      console.error(error);
      alert("Failed to update motorcycle.");
    }
  };

  const handleDeleteMotorcycle = async (
    motorcycle
  ) => {
    const confirmed = window.confirm(
      `Delete ${motorcycle.manufacturer} ${motorcycle.model}?`
    );

    if (!confirmed) return;

    try {
      await deleteMotorcycle(motorcycle._id);
      await fetchMotorcycles();
    } catch (error) {
      console.error(error);
      alert("Failed to delete motorcycle.");
    }
  };

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

        <Button
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Motorcycle
        </Button>
      </div>

      <input
        type="text"
        placeholder="Search motorcycles..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-8 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white outline-none"
      />

      {loading ? (
        <p className="text-zinc-400">
          Loading motorcycles...
        </p>
      ) : filteredMotorcycles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No motorcycles found
          </h2>

          <p className="mt-3 text-zinc-400">
            Try a different search.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredMotorcycles.map((motorcycle) => (
            <MotorcycleCard
              key={motorcycle._id}
              motorcycle={motorcycle}
              onEdit={handleEditClick}
              onDelete={handleDeleteMotorcycle}
            />
          ))}
        </div>
      )}

      <AddMotorcycleModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onCreate={handleCreateMotorcycle}
      />

      <EditMotorcycleModal
        isOpen={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        motorcycle={selectedMotorcycle}
        onUpdate={handleUpdateMotorcycle}
      />
    </DashboardLayout>
  );
}