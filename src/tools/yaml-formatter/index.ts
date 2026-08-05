import { FileCode2Icon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const yamlFormatterTool: ToolDefinition = {
  id: "yaml-formatter",
  slug: "yaml-formatter",
  name: "YAML Formatter",
  description:
    "Format, minify, and convert YAML to JSON entirely in your browser.",
  category: "formatters",
  keywords: ["yaml", "yml", "formatter", "json", "config"],
  icon: FileCode2Icon,
  related: ["json-formatter", "xml-formatter"],
  load: () => import("./yaml-formatter"),
};
