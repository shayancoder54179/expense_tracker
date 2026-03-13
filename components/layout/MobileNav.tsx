"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home01Icon, ReceiptDollarIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string; icon: IconSvgElement }[] = [
  { href: "/", label: "Dashboard", icon: Home01Icon },
  { href: "/expenses", label: "Expenses", icon: ReceiptDollarIcon },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border z-50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg transition-all duration-200",
                isActive
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon icon={icon} size={20} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
