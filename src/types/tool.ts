import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export const TOOL_CATEGORIES = [
  "formatters",
  "generators",
  "encoders",
  "security",
  "text",
  "data",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export type ToolComponent = ComponentType;

export type ToolDefinition = {
  /** Stable unique identifier, e.g. "json-formatter". */
  id: string;
  /** URL segment under /tools/[slug]. */
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  keywords: readonly string[];
  icon: LucideIcon;
  /** Lazy-loaded tool UI to keep the catalog bundle lean. */
  load: () => Promise<{ default: ToolComponent }>;
  related?: readonly string[];
};

export type ToolSummary = Omit<ToolDefinition, "load">;
