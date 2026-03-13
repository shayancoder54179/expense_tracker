"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FilterHorizontalIcon } from "@hugeicons/core-free-icons";
import { CATEGORIES } from "@/lib/constants";
import { Category } from "@/lib/types";

export interface FilterState {
  category: Category | "all";
  dateFrom: string;
  dateTo: string;
}

interface ExpenseFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function ExpenseFilters({ filters, onChange }: ExpenseFiltersProps) {
  const hasActiveFilters =
    filters.category !== "all" || filters.dateFrom !== "" || filters.dateTo !== "";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2 text-muted-foreground shrink-0">
        <Icon icon={FilterHorizontalIcon} size={16} />
        <span className="text-sm font-medium">Filter</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <Select
          value={filters.category}
          onValueChange={(value) =>
            onChange({ ...filters, category: value as Category | "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          className="w-full sm:w-40"
        />

        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          className="w-full sm:w-40"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onChange({ category: "all", dateFrom: "", dateTo: "" })
            }
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
