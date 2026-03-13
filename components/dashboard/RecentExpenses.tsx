import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Expense } from "@/lib/types";
import { formatCurrency, formatShortDate, cn } from "@/lib/utils";
import { CATEGORY_MAP } from "@/lib/constants";

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const recent = expenses.slice(0, 5);

  return (
    <Card className="rounded-xl border-border">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-bold tracking-tight">
          Recent Expenses
        </CardTitle>
        <Link
          href="/expenses"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-200"
        >
          View all <Icon icon={ArrowRight01Icon} size={14} />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No expenses yet
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((expense) => {
              const cat = CATEGORY_MAP[expense.category];
              return (
                <li key={expense.id}>
                  <Link
                    href={`/expenses/${expense.id}/edit`}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
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
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatShortDate(expense.date)}
                      </span>
                      <span className="text-sm font-mono font-semibold">
                        {formatCurrency(expense.amount)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
