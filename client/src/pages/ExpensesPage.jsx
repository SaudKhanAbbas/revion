import { useEffect, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ConfirmModal from "../components/ui/ConfirmModal";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const bikes = await getMotorcycles();
      setMotorcycles(bikes);

      const expenseData = await getExpenses();
      setExpenses(expenseData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load expenses.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      await fetchData();

      toast.success("Expense added.");
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense.");
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

      toast.success("Expense updated.");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update expense.");
    }
  };

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteExpense = async () => {
    if (!expenseToDelete) return;

    try {
      await deleteExpense(expenseToDelete._id);

      await fetchData();

      toast.success("Expense deleted.");

      setExpenseToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
            Expenses
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Expense Tracker
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Track every rupee spent on fuel, maintenance,
            insurance and accessories.
          </p>

        </div>

        <Button
          variant="filled"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Expense
        </Button>

      </div>

      {expenses.length === 0 ? (

        <Card className="py-20 text-center">

          <Wallet
            size={60}
            className="mx-auto text-zinc-700"
          />

          <h2 className="mt-6 text-3xl font-bold">
            No expenses yet.
          </h2>

          <p className="mt-4 text-zinc-400">
            Start tracking your motorcycle spending.
          </p>

          <Button
            className="mt-8"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Expense
          </Button>

        </Card>

      ) : (

        <div className="space-y-6">

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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Expense?"
        message={`Delete "${expenseToDelete?.category ?? ""}" expense? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteExpense}
        onCancel={() => {
          setExpenseToDelete(null);
          setIsDeleteModalOpen(false);
        }}
      />

    </DashboardLayout>
  );
}