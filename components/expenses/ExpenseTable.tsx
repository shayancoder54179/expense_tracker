"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PencilEdit01Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { EmptyState } from "./EmptyState";
import { Expense } from "@/lib/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { CATEGORY_MAP } from "@/lib/constants";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  filtered?: boolean;
}

export function ExpenseTable({
  expenses,
  onDelete,
  filtered = false,
}: ExpenseTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const expenseToDelete = expenses.find((e) => e.id === deleteId);

  if (expenses.length === 0) {
    return <EmptyState filtered={filtered} />;
  }

  return (
    <>
      <ul className="space-y-2">
        {expenses.map((expense) => {
          const cat = CATEGORY_MAP[expense.category];
          return (
            <li
              key={expense.id}
              className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3.5 hover:border-border/60 transition-all duration-200 animate-fade-in"
            >
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Badge
                    className={cn(
                      "shrink-0 text-xs font-medium border-0",
                      cat.bgColor,
                      cat.textColor
                    )}
                  >
                    {cat.label}
                  </Badge>
                  <span className="text-sm font-medium truncate">
                    {expense.title}
                  </span>
                </div>
                {expense.notes && (
                  <span className="text-xs text-muted-foreground truncate hidden sm:block">
                    {expense.notes}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {formatDate(expense.date)}
                </span>
                <span className="text-sm font-mono font-semibold">
                  {formatCurrency(expense.amount)}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="size-8 text-muted-foreground hover:text-foreground"
                  >
                    <Link href={`/expenses/${expense.id}/edit`}>
                      <Icon icon={PencilEdit01Icon} size={16} />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteId(expense.id)}
                  >
                    <Icon icon={Delete01Icon} size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={expenseToDelete?.title}
        onConfirm={() => {
          if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
          }
        }}
      />
    </>
  );
}
