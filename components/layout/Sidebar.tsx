"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home01Icon, ReceiptDollarIcon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string; icon: IconSvgElement }[] = [
  { href: "/", label: "Dashboard", icon: Home01Icon },
  { href: "/expenses", label: "Expenses", icon: ReceiptDollarIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <Icon icon={Wallet01Icon} size={22} className="text-sidebar-primary" />
        <span className="font-bold tracking-tight text-sidebar-foreground text-lg">
          Expense Tracker
        </span>
      </div>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon icon={icon} size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
