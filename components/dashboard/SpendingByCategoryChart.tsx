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
    <div
      className="rounded-lg px-3.5 py-2.5 text-sm shadow-xl"
      style={{
        background: "var(--color-card)",
        border: `1px solid ${item.color}40`,
        boxShadow: `0 8px 32px rgb(0 0 0 / 40%), 0 0 0 1px ${item.color}20`,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <p className="font-medium text-foreground">{item.label}</p>
      </div>
      <p className="font-mono text-muted-foreground pl-4">{formatCurrency(value)}</p>
    </div>
  );
}

export function SpendingByCategoryChart({ data }: SpendingByCategoryChartProps) {
  if (!data.length) {
    return (
      <Card className="rounded-xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono tracking-[0.12em] uppercase text-muted-foreground">
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
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono tracking-[0.12em] uppercase text-muted-foreground">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--color-muted)" }}
            />
            <Bar dataKey="total" radius={[6, 6, 2, 2]} maxBarSize={48}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
