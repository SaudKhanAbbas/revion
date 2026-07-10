import { useEffect, useState } from "react";
import { Bike, Save } from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              Edit Motorcycle
            </h2>

            <p className="mt-1 text-zinc-400">
              Update your motorcycle details.
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
              required
            />

            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />

            <Input
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />

            <Input
              label="Engine (CC)"
              name="engineCC"
              type="number"
              value={formData.engineCC}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">

              <Input
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
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
              <Save
                size={16}
                className="mr-2"
              />

              Save Changes
            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}