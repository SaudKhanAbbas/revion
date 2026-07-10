import { useState } from "react";
import { Wrench, Plus } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">

      <Card className="w-full max-w-2xl">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-sky-400/10 p-4">

            <Wrench
              size={28}
              className="text-sky-400"
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Add Maintenance
            </h2>

            <p className="mt-1 text-zinc-400">
              Record a completed service.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Motorcycle
              </label>

              <select
                name="motorcycle"
                value={formData.motorcycle}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
              >
                <option value="">
                  Select Motorcycle
                </option>

                {motorcycles.map((bike) => (
                  <option
                    key={bike._id}
                    value={bike._id}
                  >
                    {bike.manufacturer}{" "}
                    {bike.model}
                  </option>
                ))}

              </select>

            </div>

            <Input
              label="Service Type"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              placeholder="Oil Change"
              required
            />

            <Input
              label="Mileage"
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="12000"
              required
            />

            <Input
              label="Cost"
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="1500"
              required
            />

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional notes..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-sky-400"
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

              Add Maintenance

            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}