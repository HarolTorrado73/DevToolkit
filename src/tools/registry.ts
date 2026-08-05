import { base64Tool } from "@/tools/base64";
import { hashGeneratorTool } from "@/tools/hash-generator";
import { jsonFormatterTool } from "@/tools/json-formatter";
import { jwtDecoderTool } from "@/tools/jwt-decoder";
import { jwtGeneratorTool } from "@/tools/jwt-generator";
import { markdownPreviewTool } from "@/tools/markdown-preview";
import { passwordGeneratorTool } from "@/tools/password-generator";
import { sqlFormatterTool } from "@/tools/sql-formatter";
import { timestampConverterTool } from "@/tools/timestamp-converter";
import { uuidGeneratorTool } from "@/tools/uuid-generator";
import { xmlFormatterTool } from "@/tools/xml-formatter";
import { yamlFormatterTool } from "@/tools/yaml-formatter";
import type { ToolDefinition, ToolSummary } from "@/types/tool";

/**
 * Central registry of tool modules.
 * Add new tools by importing their definition and appending to `tools`.
 */
const tools: readonly ToolDefinition[] = [
  jsonFormatterTool,
  uuidGeneratorTool,
  base64Tool,
  passwordGeneratorTool,
  hashGeneratorTool,
  jwtDecoderTool,
  jwtGeneratorTool,
  timestampConverterTool,
  sqlFormatterTool,
  yamlFormatterTool,
  xmlFormatterTool,
  markdownPreviewTool,
];

export function toToolSummary(tool: ToolDefinition): ToolSummary {
  const { load: _load, ...summary } = tool;
  return summary;
}

export function toToolSummaries(
  items: readonly ToolDefinition[],
): readonly ToolSummary[] {
  return items.map(toToolSummary);
}

export function findToolBySlug(
  items: readonly ToolDefinition[],
  slug: string,
): ToolDefinition | undefined {
  return items.find((tool) => tool.slug === slug);
}

export function getAllTools(): readonly ToolDefinition[] {
  return tools;
}

export function getToolSummaries(): readonly ToolSummary[] {
  return toToolSummaries(tools);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return findToolBySlug(tools, slug);
}

export function getToolSlugs(): readonly string[] {
  return tools.map((tool) => tool.slug);
}

export function filterToolSummaries(
  items: readonly ToolSummary[],
  query: string,
): readonly ToolSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return items;
  }

  return items.filter((tool) => {
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

export function searchTools(query: string): readonly ToolSummary[] {
  return filterToolSummaries(getToolSummaries(), query);
}
