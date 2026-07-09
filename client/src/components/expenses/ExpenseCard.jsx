import Button from "../ui/Button";

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {expense.category}
          </h3>

          <p className="mt-1 text-zinc-400">
            {expense.motorcycle.manufacturer}{" "}
            {expense.motorcycle.model}
          </p>
        </div>

        <span className="text-2xl font-bold text-green-400">
          ₹{expense.amount}
        </span>
      </div>

      {expense.description && (
        <p className="mt-4 text-zinc-300">
          {expense.description}
        </p>
      )}

      <p className="mt-4 text-sm text-zinc-500">
        {new Date(
          expense.expenseDate
        ).toLocaleDateString()}
      </p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => onEdit(expense)}>
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(expense)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}