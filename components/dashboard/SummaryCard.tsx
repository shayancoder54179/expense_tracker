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
}

export function SummaryCard({
  label,
  value,
  icon,
  iconClassName,
  subtext,
}: SummaryCardProps) {
  return (
    <Card className="rounded-xl border-border transition-all duration-200 hover:border-border/80 animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold tracking-tight font-mono truncate">
              {value}
            </p>
            {subtext && (
              <p className="text-xs text-muted-foreground">{subtext}</p>
            )}
          </div>
          <div
            className={cn(
              "p-2.5 rounded-lg shrink-0",
              iconClassName ?? "bg-muted"
            )}
          >
            <Icon icon={icon} size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
