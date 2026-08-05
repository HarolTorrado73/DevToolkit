import { FileTextIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const markdownPreviewTool: ToolDefinition = {
  id: "markdown-preview",
  slug: "markdown-preview",
  name: "Markdown Preview",
  description:
    "Preview GitHub Flavored Markdown live in your browser with word counts and local-only rendering.",
  category: "text",
  keywords: ["markdown", "preview", "gfm", "md", "readme"],
  icon: FileTextIcon,
  related: ["json-formatter", "yaml-formatter"],
  load: () => import("./markdown-preview"),
};
