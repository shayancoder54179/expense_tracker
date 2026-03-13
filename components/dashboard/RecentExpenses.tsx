import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Expense } from "@/lib/types";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import { CATEGORY_MAP } from "@/lib/constants";

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const recent = expenses.slice(0, 5);

  return (
    <Card className="rounded-xl border-border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono tracking-[0.12em] uppercase text-muted-foreground">
          Recent Expenses
        </CardTitle>
        <Link
          href="/expenses"
          className="text-xs font-mono tracking-wider uppercase text-muted-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors duration-200"
        >
          View all <Icon icon={ArrowRight01Icon} size={12} />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            No expenses yet
          </p>
        ) : (
          <ul>
            {recent.map((expense, i) => {
              const cat = CATEGORY_MAP[expense.category];
              return (
                <li key={expense.id}>
                  <Link
                    href={`/expenses/${expense.id}/edit`}
                    className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-muted/30 transition-all duration-200 group"
                  >
                    {/* Left: color dot + content */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Category color dot */}
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: cat.color,
                          boxShadow: `0 0 0 3px ${cat.color}25`,
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate text-foreground group-hover:text-foreground/90">
                          {expense.title}
                        </p>
                        <p className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50 mt-0.5">
                          {cat.label}
                        </p>
                      </div>
                    </div>

                    {/* Right: date + amount */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground/50 hidden sm:block">
                        {formatShortDate(expense.date)}
                      </span>
                      <span className="text-sm font-mono font-semibold text-foreground">
                        {formatCurrency(expense.amount)}
                      </span>
                      <Icon
                        icon={ArrowRight01Icon}
                        size={12}
                        className="text-muted-foreground/25 group-hover:text-muted-foreground/60 transition-colors duration-200"
                      />
                    </div>
                  </Link>
                  {i < recent.length - 1 && (
                    <div className="mx-5 h-px bg-border/50" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
