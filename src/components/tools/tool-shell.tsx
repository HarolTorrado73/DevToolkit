import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { toolCategoryLabels } from "@/tools/categories";
import type { ToolSummary } from "@/types/tool";

type ToolShellProps = {
  tool: ToolSummary;
  children: ReactNode;
};

export function ToolShell({ tool, children }: ToolShellProps) {
  const Icon = tool.icon;

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/tools"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                Tools
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{tool.name}</li>
          </ol>
        </nav>
        <div className="flex flex-wrap items-start gap-4">
          <span className="bg-muted text-foreground inline-flex size-11 items-center justify-center rounded-xl">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                {tool.name}
              </h1>
              <Badge variant="secondary">
                {toolCategoryLabels[tool.category]}
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>
      </header>
      <div>{children}</div>
    </article>
  );
}
