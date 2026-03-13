"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { Expense, Category } from "@/lib/types";

type FormValues = {
  title: string;
  amount: string;
  category: Category | "";
  date: string;
  notes: string;
};

interface ExpenseFormProps {
  initialValues?: Expense;
  onSubmit: (data: Omit<Expense, "id">) => void;
  isLoading?: boolean;
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ExpenseForm({
  initialValues,
  onSubmit,
  isLoading = false,
}: ExpenseFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? "",
    amount: initialValues?.amount?.toString() ?? "",
    category: initialValues?.category ?? "",
    date: initialValues?.date ?? today(),
    notes: initialValues?.notes ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.amount || isNaN(Number(values.amount)) || Number(values.amount) <= 0)
      newErrors.amount = "Enter a valid amount";
    if (!values.category) newErrors.category = "Category is required";
    if (!values.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: values.title.trim(),
      amount: Number(values.amount),
      category: values.category as Category,
      date: values.date,
      notes: values.notes.trim() || undefined,
    });
  }

  function set(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <Card className="rounded-xl border-border">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="title">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              placeholder="e.g. Coffee, Groceries, Netflix..."
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="amount">
                Amount <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-mono">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={values.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  className="pl-7 font-mono"
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="category">
                Category <span className="text-destructive">*</span>
              </label>
              <Select
                value={values.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="date">
              Date <span className="text-destructive">*</span>
            </label>
            <Input
              id="date"
              type="date"
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              className="w-full sm:w-48"
            />
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Optional notes..."
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : initialValues
                  ? "Save changes"
                  : "Add expense"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/expenses")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
