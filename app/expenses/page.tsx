"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseFilters, FilterState } from "@/components/expenses/ExpenseFilters";
import { ExpenseTable } from "@/components/expenses/ExpenseTable";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

const defaultFilters: FilterState = {
  category: "all",
  dateFrom: "",
  dateTo: "",
};

export default function ExpensesPage() {
  const { expenses, isLoaded, deleteExpense } = useExpenses();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filters.category !== "all" && e.category !== filters.category)
        return false;
      if (filters.dateFrom && e.date < filters.dateFrom) return false;
      if (filters.dateTo && e.date > filters.dateTo) return false;
      return true;
    });
  }, [expenses, filters]);

  const hasActiveFilters =
    filters.category !== "all" || !!filters.dateFrom || !!filters.dateTo;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoaded
              ? `${expenses.length} total expense${expenses.length !== 1 ? "s" : ""}`
              : "Loading..."}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/expenses/new">
            <Icon icon={PlusSignIcon} size={16} />
            Add Expense
          </Link>
        </Button>
      </div>

      {isLoaded && (
        <>
          <ExpenseFilters filters={filters} onChange={setFilters} />
          <ExpenseTable
            expenses={filtered}
            onDelete={deleteExpense}
            filtered={hasActiveFilters}
          />
        </>
      )}
    </div>
  );
}
