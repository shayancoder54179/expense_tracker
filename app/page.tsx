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

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div>
          <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground/50 mb-1.5">
            {today}
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your financial snapshot
          </p>
        </div>
        <Button asChild size="sm" className="mt-1 shrink-0">
          <Link href="/expenses/new">
            <Icon icon={PlusSignIcon} size={15} />
            Add Expense
          </Link>
        </Button>
      </div>

      {isLoaded ? (
        <>
          {/* Summary stats */}
          <SummaryCards stats={stats} />

          {/* Charts */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground/40 mb-3">
              Analytics
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SpendingByCategoryChart data={categoryData} />
              <SpendingOverTimeChart data={timeData} />
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground/40 mb-3">
              Recent Activity
            </p>
            <RecentExpenses expenses={expenses} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64 text-muted-foreground text-sm font-mono tracking-wider">
          Loading...
        </div>
      )}
    </div>
  );
}
