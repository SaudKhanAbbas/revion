import { useEffect, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-white">
          Edit Expense
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

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
            required
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

          <input
            type="number"
            name="amount"
            value={formData.amount}
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