import {
  DollarCircleIcon,
  Calendar03Icon,
  Tag01Icon,
  ReceiptDollarIcon,
} from "@hugeicons/core-free-icons";
import { SummaryCard } from "./SummaryCard";
import { formatCurrency } from "@/lib/utils";
import { SummaryStats } from "@/lib/types";

interface SummaryCardsProps {
  stats: SummaryStats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        label="Total Spent"
        value={formatCurrency(stats.totalSpent)}
        icon={DollarCircleIcon}
        iconClassName="bg-blue-500/15 text-blue-400"
      />
      <SummaryCard
        label="This Month"
        value={formatCurrency(stats.thisMonthTotal)}
        icon={Calendar03Icon}
        iconClassName="bg-green-500/15 text-green-400"
      />
      <SummaryCard
        label="Top Category"
        value={stats.topCategory}
        icon={Tag01Icon}
        iconClassName="bg-purple-500/15 text-purple-400"
      />
      <SummaryCard
        label="Total Expenses"
        value={String(stats.expenseCount)}
        icon={ReceiptDollarIcon}
        iconClassName="bg-orange-500/15 text-orange-400"
      />
    </div>
  );
}
