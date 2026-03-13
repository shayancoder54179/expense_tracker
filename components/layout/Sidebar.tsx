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
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-sidebar shrink-0 relative">
      {/* Right edge gradient separator */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sidebar-border to-transparent" />

      {/* Logo */}
      <div className="px-5 pt-7 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <Icon icon={Wallet01Icon} size={15} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-tight text-sidebar-foreground">
              Expense
            </span>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-sidebar-foreground/35 mt-0.5">
              Tracker
            </span>
          </div>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-5 pb-2">
        <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-sidebar-foreground/25">
          Menu
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/45 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground/80"
              )}
            >
              {/* Active left accent bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-sidebar-primary" />
              )}
              <Icon
                icon={icon}
                size={17}
                className={isActive ? "text-sidebar-primary" : ""}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom meta */}
      <div className="px-5 py-5 border-t border-sidebar-border">
        <p className="text-[9px] font-mono tracking-widest text-sidebar-foreground/20 uppercase">
          v1.0.0
        </p>
      </div>
    </aside>
  );
}
