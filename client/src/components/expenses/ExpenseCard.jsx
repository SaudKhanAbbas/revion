import {
  Calendar,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="group overflow-hidden p-0">

      <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black p-6">

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-emerald-400/10 p-3">
                <Wallet
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {expense.category}
                </h2>

                <p className="mt-1 text-zinc-400">
                  {expense.motorcycle.manufacturer}{" "}
                  {expense.motorcycle.model}
                </p>

              </div>

            </div>

          </div>

          <h3 className="text-3xl font-black text-emerald-400">
            ₹{expense.amount}
          </h3>

        </div>

      </div>

      <div className="space-y-4 p-6">

        {expense.description && (

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Description
            </p>

            <p className="mt-3 text-zinc-300">
              {expense.description}
            </p>

          </div>

        )}

        <div className="flex items-center text-sm text-zinc-500">

          <Calendar
            size={16}
            className="mr-2"
          />

          {new Date(
            expense.expenseDate
          ).toLocaleDateString()}

        </div>

      </div>

      <div className="flex gap-3 p-6">

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onEdit(expense)}
        >
          <Pencil
            size={16}
            className="mr-2"
          />

          Edit

        </Button>

        <Button
          variant="danger"
          className="flex-1"
          onClick={() => onDelete(expense)}
        >
          <Trash2
            size={16}
            className="mr-2"
          />

          Delete

        </Button>

      </div>

    </Card>
  );
}