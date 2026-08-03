"use client";

import { useMemo } from "react";
import { SearchIcon } from "lucide-react";

import { ToolCard } from "@/components/tools/tool-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCatalogStore } from "@/stores/catalog-store";
import { toolCategoryLabels } from "@/tools/categories";
import { TOOL_CATEGORIES, type ToolSummary } from "@/types/tool";

type ToolCatalogProps = {
  tools: readonly ToolSummary[];
};

export function ToolCatalog({ tools }: ToolCatalogProps) {
  const query = useCatalogStore((state) => state.query);
  const category = useCatalogStore((state) => state.category);
  const setQuery = useCatalogStore((state) => state.setQuery);
  const setCategory = useCatalogStore((state) => state.setCategory);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        category === "all" ? true : tool.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const haystack = [
        tool.name,
        tool.description,
        tool.category,
        ...tool.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [tools, query, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="tool-search">Search tools</Label>
          <div className="relative">
            <SearchIcon
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="JSON, JWT, UUID…"
              className="pl-9"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2"
      >
        <CategoryChip
          active={category === "all"}
          onClick={() => setCategory("all")}
          label="All"
        />
        {TOOL_CATEGORIES.map((item) => (
          <CategoryChip
            key={item}
            active={category === item}
            onClick={() => setCategory(item)}
            label={toolCategoryLabels[item]}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border-border/70 bg-muted/30 rounded-xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm">
            {tools.length === 0
              ? "No tools registered yet. Modules will appear here as they ship."
              : "No tools match your current filters."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-visible:ring-ring rounded-full border px-3 py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}
