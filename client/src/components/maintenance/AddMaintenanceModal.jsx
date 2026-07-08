import { useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";

export default function AddMaintenanceModal({
  isOpen,
  onClose,
  motorcycles,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    motorcycle: "",
    serviceType: "",
    mileage: "",
    cost: "",
    description: "",
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
      mileage: Number(formData.mileage),
      cost: Number(formData.cost),
    });

    setFormData({
      motorcycle: "",
      serviceType: "",
      mileage: "",
      cost: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-white">
          Add Maintenance
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <select
            name="motorcycle"
            value={formData.motorcycle}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          >
            <option value="">
              Select Motorcycle
            </option>

            {motorcycles.map((bike) => (
              <option
                key={bike._id}
                value={bike._id}
              >
                {bike.manufacturer} {bike.model}
              </option>
            ))}
          </select>

          <input
            name="serviceType"
            placeholder="Oil Change"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
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