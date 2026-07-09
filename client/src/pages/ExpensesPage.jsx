import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";

import AddExpenseModal from "../components/expenses/AddExpenseModal";
import EditExpenseModal from "../components/expenses/EditExpenseModal";
import ExpenseCard from "../components/expenses/ExpenseCard";

import { getMotorcycles } from "../api/motorcycleApi";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenseApi";

export default function ExpensesPage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create expense.");
    }
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleUpdateExpense = async (id, expenseData) => {
    try {
      await updateExpense(id, expenseData);
      await fetchData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update expense.");
    }
  };

  const handleDeleteExpense = async (expense) => {
    const confirmed = window.confirm(
      `Delete this ${expense.category} expense?`
    );

    if (!confirmed) return;

    try {
      await deleteExpense(expense._id);
      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense.");
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

        <Button onClick={() => setIsAddModalOpen(true)}>
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
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onEdit={handleEditClick}
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      )}

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        motorcycles={motorcycles}
        onCreate={handleCreateExpense}
      />

      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        expense={selectedExpense}
        motorcycles={motorcycles}
        onUpdate={handleUpdateExpense}
      />
    </DashboardLayout>
  );
}