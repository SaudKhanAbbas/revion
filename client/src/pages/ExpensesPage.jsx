import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import AddExpenseModal from "../components/expenses/AddExpenseModal";

import { getMotorcycles } from "../api/motorcycleApi";
import {
  getExpenses,
  createExpense,
} from "../api/expenseApi";

export default function ExpensesPage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const bikes = await getMotorcycles();
      setMotorcycles(bikes);

      const expenseData = await getExpenses();
      setExpenses(expenseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create expense.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Expenses
          </h1>

          <p className="mt-2 text-zinc-400">
            Track every expense related to your motorcycles.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          + Add Expense
        </Button>
      </div>

      {expenses.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No expenses yet
          </h2>

          <p className="mt-3 text-zinc-400">
            Add your first expense.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {expense.category}
                  </h3>

                  <p className="text-zinc-400">
                    {expense.motorcycle.manufacturer}{" "}
                    {expense.motorcycle.model}
                  </p>
                </div>

                <p className="text-2xl font-bold text-green-400">
                  ₹{expense.amount}
                </p>
              </div>

              {expense.description && (
                <p className="mt-3 text-zinc-400">
                  {expense.description}
                </p>
              )}

              <p className="mt-3 text-sm text-zinc-500">
                {new Date(
                  expense.expenseDate
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        motorcycles={motorcycles}
        onCreate={handleCreateExpense}
      />
    </DashboardLayout>
  );
}