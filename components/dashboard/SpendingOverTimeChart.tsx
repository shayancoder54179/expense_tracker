"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateGroup } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface SpendingOverTimeChartProps {
  data: DateGroup[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{label}</p>
      <p className="font-mono text-muted-foreground">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

function formatAxisDate(dateStr: string): string {
  if (dateStr.length === 7) {
    const [year, month] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleString("en-US", { month: "short", year: "2-digit" });
  }
  return dateStr.slice(5);
}

export function SpendingOverTimeChart({ data }: SpendingOverTimeChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatAxisDate(d.date),
  }));

  if (!data.length) {
    return (
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold tracking-tight">
            Spending Over Time
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
          Spending Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={chartData}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
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
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="oklch(0.488 0.243 264.376)"
              strokeWidth={2}
              dot={{ fill: "oklch(0.488 0.243 264.376)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
