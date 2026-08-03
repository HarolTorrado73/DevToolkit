import type { Metadata } from "next";

import { ToolCatalog } from "@/components/tools/tool-catalog";
import { getToolSummaries } from "@/tools/registry";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browse free developer tools that run entirely in your browser. Formatters, generators, encoders, and more.",
};

export default function ToolsIndexPage() {
  const tools = getToolSummaries();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Tools</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          A growing catalog of privacy-first utilities. Every tool is a
          self-contained module with shared UX, accessibility, and tests.
        </p>
      </div>
      <ToolCatalog tools={tools} />
    </main>
  );
}
