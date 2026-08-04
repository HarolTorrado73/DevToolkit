import { BracesIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const jsonFormatterTool: ToolDefinition = {
  id: "json-formatter",
  slug: "json-formatter",
  name: "JSON Formatter",
  description:
    "Format, minify, and validate JSON entirely in your browser. Useful for cleaning API payloads and config snippets.",
  category: "formatters",
  keywords: [
    "json",
    "pretty print",
    "minify",
    "validate",
    "formatter",
    "beautify",
  ],
  icon: BracesIcon,
  related: ["base64", "yaml-formatter"],
  load: () => import("./json-formatter"),
};
