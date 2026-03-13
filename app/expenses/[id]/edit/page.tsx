"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Expense } from "@/lib/types";

interface EditExpensePageProps {
  params: Promise<{ id: string }>;
}

export default function EditExpensePage({ params }: EditExpensePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { getExpenseById, updateExpense, isLoaded } = useExpenses();

  const expense = getExpenseById(id);

  function handleSubmit(data: Omit<Expense, "id">) {
    updateExpense(id, data);
    router.push("/expenses");
  }

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 flex items-center justify-center h-48 text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Not found</h1>
        <p className="text-muted-foreground">
          This expense does not exist.{" "}
          <button
            onClick={() => router.push("/expenses")}
            className="underline hover:text-foreground transition-colors"
          >
            Go back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Expense</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Update "{expense.title}"
        </p>
      </div>
      <ExpenseForm initialValues={expense} onSubmit={handleSubmit} />
    </div>
  );
}
