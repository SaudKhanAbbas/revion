import { useEffect, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";

export default function EditMotorcycleModal({
  isOpen,
  onClose,
  motorcycle,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    manufacturer: "",
    model: "",
    year: "",
    engineCC: "",
    mileage: "",
  });

  useEffect(() => {
    if (motorcycle) {
      setFormData({
        manufacturer: motorcycle.manufacturer,
        model: motorcycle.model,
        year: motorcycle.year,
        engineCC: motorcycle.engineCC,
        mileage: motorcycle.mileage,
      });
    }
  }, [motorcycle]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onUpdate(motorcycle._id, {
      manufacturer: formData.manufacturer,
      model: formData.model,
      year: Number(formData.year),
      engineCC: Number(formData.engineCC),
      mileage: Number(formData.mileage),
    });

    onClose();
  };

  if (!isOpen || !motorcycle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-white">
          Edit Motorcycle
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            type="number"
            name="engineCC"
            value={formData.engineCC}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            type="number"
            name="mileage"
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
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}