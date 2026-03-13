import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Expense, SummaryStats, CategoryGroup, DateGroup } from "./types";
import { CATEGORIES, CATEGORY_MAP } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getSummaryStats(expenses: Expense[]): SummaryStats {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonthKey = getCurrentMonthKey();
  const thisMonthTotal = expenses
    .filter((e) => e.date.startsWith(currentMonthKey))
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCategoryKey = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0];

  const topCategory = topCategoryKey
    ? (CATEGORY_MAP[topCategoryKey as keyof typeof CATEGORY_MAP]?.label ??
      "None")
    : "None";

  return {
    totalSpent,
    thisMonthTotal,
    topCategory,
    expenseCount: expenses.length,
  };
}

export function groupByCategory(expenses: Expense[]): CategoryGroup[] {
  const totals = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return CATEGORIES.map((cat) => ({
    category: cat.value,
    label: cat.label,
    total: totals[cat.value] ?? 0,
    color: cat.color,
  })).filter((g) => g.total > 0);
}

export function groupByDate(
  expenses: Expense[],
  groupBy: "day" | "week" | "month" = "month"
): DateGroup[] {
  const totals: Record<string, number> = {};

  for (const expense of expenses) {
    let key: string;
    if (groupBy === "day") {
      key = expense.date;
    } else if (groupBy === "week") {
      const date = new Date(expense.date + "T00:00:00");
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      key = startOfWeek.toISOString().slice(0, 10);
    } else {
      key = expense.date.slice(0, 7);
    }
    totals[key] = (totals[key] ?? 0) + expense.amount;
  }

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, total]) => ({ date, total }));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
