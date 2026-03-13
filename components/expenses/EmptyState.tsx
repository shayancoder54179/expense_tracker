import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ReceiptDollarIcon, PlusSignIcon } from "@hugeicons/core-free-icons";

interface EmptyStateProps {
  filtered?: boolean;
}

export function EmptyState({ filtered = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="p-4 bg-muted rounded-full">
        <Icon icon={ReceiptDollarIcon} size={32} className="text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {filtered ? "No matching expenses" : "No expenses yet"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {filtered
            ? "Try adjusting your filters to see more results."
            : "Add your first expense to get started."}
        </p>
      </div>
      {!filtered && (
        <Button asChild size="sm">
          <Link href="/expenses/new">
            <Icon icon={PlusSignIcon} size={16} />
            Add Expense
          </Link>
        </Button>
      )}
    </div>
  );
}
