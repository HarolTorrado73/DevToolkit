import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how DevToolkit is structured, how to add a tool module, and how to contribute.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        Full documentation lives in the repository while the in-app docs
        experience is being built. Start with the architecture overview and
        contribution guide.
      </p>
      <ul className="mt-8 space-y-3 text-sm">
        <li>
          <a
            href={`${siteConfig.githubUrl}/blob/main/docs/architecture.md`}
            className="text-foreground font-medium underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Architecture
          </a>
          <span className="text-muted-foreground">
            {" "}
            — module boundaries, registry, and app shell.
          </span>
        </li>
        <li>
          <a
            href={`${siteConfig.githubUrl}/blob/main/docs/adding-a-tool.md`}
            className="text-foreground font-medium underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adding a tool
          </a>
          <span className="text-muted-foreground">
            {" "}
            — step-by-step checklist for new modules.
          </span>
        </li>
        <li>
          <a
            href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`}
            className="text-foreground font-medium underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contributing
          </a>
          <span className="text-muted-foreground">
            {" "}
            — workflow, Conventional Commits, and PR expectations.
          </span>
        </li>
      </ul>
      <Link
        href="/tools"
        className={cn(buttonVariants({ variant: "outline" }), "mt-10 w-fit")}
      >
        Back to tools
      </Link>
    </main>
  );
}
