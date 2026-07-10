import { useState } from "react";
import {
  Plus,
  Wallet,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function AddExpenseModal({
  isOpen,
  onClose,
  motorcycles,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    motorcycle: "",
    category: "",
    amount: "",
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
      amount: Number(formData.amount),
    });

    setFormData({
      motorcycle: "",
      category: "",
      amount: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) return null;

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
              Add Expense
            </h2>

            <p className="mt-1 text-zinc-400">
              Record a motorcycle expense.
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
                <option value="">
                  Select Category
                </option>

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
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="2500"
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
                placeholder="Additional notes..."
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
              <Plus
                size={16}
                className="mr-2"
              />

              Add Expense

            </Button>

          </div>

        </form>

      </Card>

    </div>
  );
}