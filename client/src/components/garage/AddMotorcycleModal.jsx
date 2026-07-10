import { useState } from "react";
import { Bike, Plus } from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

export default function AddMotorcycleModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    manufacturer: "",
    model: "",
    year: "",
    engineCC: "",
    mileage: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      ...formData,
      year: Number(formData.year),
      engineCC: Number(formData.engineCC),
      mileage: Number(formData.mileage),
    });

    setFormData({
      manufacturer: "",
      model: "",
      year: "",
      engineCC: "",
      mileage: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">

      <Card className="w-full max-w-2xl">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10">
            <Bike
              size={28}
              className="text-sky-400"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Add Motorcycle
            </h2>

            <p className="mt-1 text-zinc-400">
              Add a motorcycle to your garage.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Honda"
              required
            />

            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="CB350RS"
              required
            />

            <Input
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="2024"
              required
            />

            <Input
              label="Engine (CC)"
              name="engineCC"
              type="number"
              value={formData.engineCC}
              onChange={handleChange}
              placeholder="348"
              required
            />

            <div className="md:col-span-2">

              <Input
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="12500"
                required
              />

            </div>

          </div>

          <div className="mt-10 flex justify-end gap-4">

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="filled"
            >
              <Plus
                size={16}
                className="mr-2"
              />

              Add Motorcycle
            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}