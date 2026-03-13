import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  label: string;
  value: string;
  icon: IconSvgElement;
  iconClassName?: string;
  subtext?: string;
  accentColor?: string;
}

export function SummaryCard({
  label,
  value,
  icon,
  iconClassName,
  subtext,
  accentColor,
}: SummaryCardProps) {
  return (
    <Card className="rounded-xl border-border transition-all duration-200 hover:border-border/60 hover:shadow-lg hover:shadow-black/20 animate-fade-in overflow-hidden group">
      {/* Colored accent bar */}
      {accentColor && (
        <div
          className="h-[2px] w-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-muted-foreground">
              {label}
            </p>
            <p className="text-2xl font-bold tracking-tight font-mono truncate leading-none mt-0.5">
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>
            )}
          </div>
          <div
            className={cn(
              "p-2.5 rounded-lg shrink-0 transition-all duration-200 group-hover:scale-105",
              iconClassName ?? "bg-muted"
            )}
          >
            <Icon icon={icon} size={18} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
