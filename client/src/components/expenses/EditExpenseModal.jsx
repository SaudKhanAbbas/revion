import { useEffect, useState } from "react";
import { Save, Wallet } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function EditExpenseModal({
  isOpen,
  onClose,
  expense,
  motorcycles,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    motorcycle: "",
    category: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        motorcycle: expense.motorcycle._id,
        category: expense.category,
        amount: expense.amount,
        description: expense.description || "",
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onUpdate(expense._id, {
      ...formData,
      amount: Number(formData.amount),
    });

    onClose();
  };

  if (!isOpen || !expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md">

      <Card className="w-full max-w-2xl">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-emerald-400/10 p-4">
            <Wallet
              size={28}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Edit Expense
            </h2>

            <p className="mt-1 text-zinc-400">
              Update an expense record.
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
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
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

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              >
                <option>Fuel</option>
                <option>Service</option>
                <option>Repair</option>
                <option>Insurance</option>
                <option>Accessories</option>
                <option>Parking</option>
                <option>Tolls</option>
                <option>Other</option>
              </select>

            </div>

            <Input
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
              />

            </div>

          </div>

          <div className="mt-10 flex justify-end gap-4">

            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="filled"
              type="submit"
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