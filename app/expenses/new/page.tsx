"use client";

import { useRouter } from "next/navigation";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Expense } from "@/lib/types";

export default function NewExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  function handleSubmit(data: Omit<Expense, "id">) {
    addExpense(data);
    router.push("/expenses");
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Expense</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Record a new expense
        </p>
      </div>
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
}
