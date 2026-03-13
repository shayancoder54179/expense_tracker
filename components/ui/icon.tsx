import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: IconSvgElement;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function Icon({ icon, className, size = 20, strokeWidth }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      className={cn("shrink-0", className)}
      strokeWidth={strokeWidth}
    />
  );
}
