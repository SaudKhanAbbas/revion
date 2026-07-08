import { useEffect, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";

export default function EditMaintenanceModal({
  isOpen,
  onClose,
  log,
  motorcycles,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    motorcycle: "",
    serviceType: "",
    mileage: "",
    cost: "",
    description: "",
  });

  useEffect(() => {
    if (log) {
      setFormData({
        motorcycle: log.motorcycle._id,
        serviceType: log.serviceType,
        mileage: log.mileage,
        cost: log.cost,
        description: log.description || "",
      });
    }
  }, [log]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onUpdate(log._id, {
      ...formData,
      mileage: Number(formData.mileage),
      cost: Number(formData.cost),
    });

    onClose();
  };

  if (!isOpen || !log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-white">
          Edit Maintenance
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
            value={formData.serviceType}
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

          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
          />

          <textarea
            name="description"
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
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}