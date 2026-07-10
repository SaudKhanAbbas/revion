import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Bike } from "lucide-react";

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
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

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
        bike.model
          .toLowerCase()
          .includes(query)
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

      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Garage
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Your Motorcycles
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Organize every motorcycle you own,
            monitor its health and keep every ride
            in peak condition.
          </p>

        </div>

        <Button
          variant="filled"
          className="px-7 py-3"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus
            size={18}
            className="mr-2"
          />

          Add Motorcycle
        </Button>

      </div>

      <div className="relative mb-10">

        <Search
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <Input
          placeholder="Search your garage..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="pl-14"
        />

      </div>

      {loading ? (

        <p className="text-zinc-400">
          Loading motorcycles...
        </p>

      ) : filteredMotorcycles.length === 0 ? (

        <Card className="py-20 text-center">

          <Bike
            size={60}
            className="mx-auto text-zinc-700"
          />

          <h2 className="mt-6 text-3xl font-bold">
            Your garage is empty.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Add your first motorcycle to start
            tracking maintenance, expenses and
            AI diagnostics.
          </p>

          <Button
            className="mt-8"
            onClick={() =>
              setIsAddModalOpen(true)
            }
          >
            Add Motorcycle
          </Button>

        </Card>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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