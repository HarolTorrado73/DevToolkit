import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browse free developer tools that run entirely in your browser. More tools are being added every release.",
};

export default function ToolsIndexPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        The modular tool catalog is ready for contributions. Individual tools
        will appear here as modules are registered.
      </p>
      <div className="border-border/70 bg-muted/30 mt-10 rounded-xl border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          No tools registered yet. Follow the contributing guide to propose or
          add the first module.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/docs"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Read the docs
          </Link>
          <a
            href={`${siteConfig.githubUrl}/issues/new/choose`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            Propose a tool
          </a>
        </div>
      </div>
    </main>
  );
}
