import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { toolCategoryLabels } from "@/tools/categories";
import type { ToolSummary } from "@/types/tool";

type ToolCardProps = {
  tool: ToolSummary;
};

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="border-border/70 bg-card/40 hover:border-border hover:bg-card focus-visible:ring-ring group block rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-start gap-3">
        <span className="bg-muted text-foreground inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="group-hover:text-foreground font-medium tracking-tight">
              {tool.name}
            </h2>
            <Badge variant="outline">{toolCategoryLabels[tool.category]}</Badge>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
