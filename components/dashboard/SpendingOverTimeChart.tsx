"use client";

import {
  AreaChart,
  Area,
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
    <div
      className="rounded-lg px-3.5 py-2.5 text-sm shadow-xl"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 8px 32px rgb(0 0 0 / 40%)",
      }}
    >
      <p className="text-muted-foreground font-mono text-xs mb-1">{label}</p>
      <p className="font-mono font-semibold text-foreground">
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

const ACCENT = "var(--color-sidebar-primary)";

export function SpendingOverTimeChart({ data }: SpendingOverTimeChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatAxisDate(d.date),
  }));

  if (!data.length) {
    return (
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono tracking-[0.12em] uppercase text-muted-foreground">
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
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono tracking-[0.12em] uppercase text-muted-foreground">
          Spending Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity={0.25} />
                <stop offset="100%" stopColor={ACCENT} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke={ACCENT}
              strokeWidth={2}
              fill="url(#timeGradient)"
              dot={{
                fill: ACCENT,
                r: 3.5,
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5.5,
                fill: ACCENT,
                stroke: "var(--color-card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
