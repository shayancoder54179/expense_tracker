export type Category =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment"
  | "other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO date string YYYY-MM-DD
  notes?: string;
}

export interface SummaryStats {
  totalSpent: number;
  thisMonthTotal: number;
  topCategory: string;
  expenseCount: number;
}

export interface CategoryGroup {
  category: Category;
  label: string;
  total: number;
  color: string;
}

export interface DateGroup {
  date: string;
  total: number;
}
