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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/80 backdrop-blur-xl border-t border-sidebar-border">
      <div className="flex items-center justify-around px-6 py-2 pb-6">
        {navItems.map(({ href, label, icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl transition-all duration-200",
                isActive
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground/40 hover:text-sidebar-foreground/70"
              )}
            >
              <Icon icon={icon} size={20} />
              <span className="text-[10px] font-mono tracking-wider uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
