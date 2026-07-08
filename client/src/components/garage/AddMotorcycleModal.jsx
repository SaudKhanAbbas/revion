import { useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-white">
          Add Motorcycle
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            name="manufacturer"
            placeholder="Manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            name="year"
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            name="engineCC"
            type="number"
            placeholder="Engine CC"
            value={formData.engineCC}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            name="mileage"
            type="number"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}