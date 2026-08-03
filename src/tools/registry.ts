import type { ToolDefinition, ToolSummary } from "@/types/tool";

/**
 * Central registry of tool modules.
 * Add new tools by importing their definition and appending to `tools`.
 */
const tools: readonly ToolDefinition[] = [];

export function getAllTools(): readonly ToolDefinition[] {
  return tools;
}

export function getToolSummaries(): readonly ToolSummary[] {
  return tools.map(({ load: _load, ...summary }) => summary);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolSlugs(): readonly string[] {
  return tools.map((tool) => tool.slug);
}

export function searchTools(query: string): readonly ToolSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return getToolSummaries();
  }

  return getToolSummaries().filter((tool) => {
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
}
