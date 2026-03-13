import { Category } from "./types";

export interface CategoryConfig {
  value: Category;
  label: string;
  color: string;
  tailwindColor: string;
  bgColor: string;
  textColor: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    value: "food",
    label: "Food",
    color: "#f97316",
    tailwindColor: "orange",
    bgColor: "bg-orange-500/15",
    textColor: "text-orange-400",
  },
  {
    value: "transport",
    label: "Transport",
    color: "#3b82f6",
    tailwindColor: "blue",
    bgColor: "bg-blue-500/15",
    textColor: "text-blue-400",
  },
  {
    value: "shopping",
    label: "Shopping",
    color: "#a855f7",
    tailwindColor: "purple",
    bgColor: "bg-purple-500/15",
    textColor: "text-purple-400",
  },
  {
    value: "bills",
    label: "Bills",
    color: "#ef4444",
    tailwindColor: "red",
    bgColor: "bg-red-500/15",
    textColor: "text-red-400",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    color: "#22c55e",
    tailwindColor: "green",
    bgColor: "bg-green-500/15",
    textColor: "text-green-400",
  },
  {
    value: "other",
    label: "Other",
    color: "#6b7280",
    tailwindColor: "gray",
    bgColor: "bg-gray-500/15",
    textColor: "text-gray-400",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c])
) as Record<Category, CategoryConfig>;

export const LOCAL_STORAGE_KEY = "expense-tracker-expenses";
