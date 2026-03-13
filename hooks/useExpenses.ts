"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense } from "@/lib/types";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { generateId } from "@/lib/utils";

function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Expense[]) : [];
  } catch {
    return [];
  }
}

function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setExpenses(loadExpenses());
    setIsLoaded(true);
  }, []);

  const addExpense = useCallback((data: Omit<Expense, "id">): Expense => {
    const newExpense: Expense = { ...data, id: generateId() };
    setExpenses((prev) => {
      const updated = [newExpense, ...prev];
      saveExpenses(updated);
      return updated;
    });
    return newExpense;
  }, []);

  const updateExpense = useCallback(
    (id: string, data: Partial<Omit<Expense, "id">>): void => {
      setExpenses((prev) => {
        const updated = prev.map((e) => (e.id === id ? { ...e, ...data } : e));
        saveExpenses(updated);
        return updated;
      });
    },
    []
  );

  const deleteExpense = useCallback((id: string): void => {
    setExpenses((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveExpenses(updated);
      return updated;
    });
  }, []);

  const getExpenseById = useCallback(
    (id: string): Expense | undefined => {
      return expenses.find((e) => e.id === id);
    },
    [expenses]
  );

  return {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
  };
}
