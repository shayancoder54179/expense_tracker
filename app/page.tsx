"use client";

import Link from "next/link";
import { useExpenses } from "@/hooks/useExpenses";
import { getSummaryStats, groupByCategory, groupByDate } from "@/lib/utils";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { SpendingByCategoryChart } from "@/components/dashboard/SpendingByCategoryChart";
import { SpendingOverTimeChart } from "@/components/dashboard/SpendingOverTimeChart";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  const { expenses, isLoaded } = useExpenses();

  const stats = getSummaryStats(expenses);
  const categoryData = groupByCategory(expenses);
  const timeData = groupByDate(expenses, "month");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your financial overview
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/expenses/new">
            <Icon icon={PlusSignIcon} size={16} />
            Add Expense
          </Link>
        </Button>
      </div>

      {isLoaded ? (
        <>
          <SummaryCards stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingByCategoryChart data={categoryData} />
            <SpendingOverTimeChart data={timeData} />
          </div>

          <RecentExpenses expenses={expenses} />
        </>
      ) : (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Loading...
        </div>
      )}
    </div>
  );
}
