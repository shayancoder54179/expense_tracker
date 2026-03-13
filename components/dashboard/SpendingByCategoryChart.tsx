"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryGroup } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface SpendingByCategoryChartProps {
  data: CategoryGroup[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: CategoryGroup }[];
}) {
  if (!active || !payload?.length) return null;
  const { value, payload: item } = payload[0];
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.label}</p>
      <p className="font-mono text-muted-foreground">{formatCurrency(value)}</p>
    </div>
  );
}

export function SpendingByCategoryChart({ data }: SpendingByCategoryChartProps) {
  if (!data.length) {
    return (
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold tracking-tight">
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          No data yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold tracking-tight">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(1 0 0 / 8%)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 5%)" }} />
            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
