import { CodeXmlIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const xmlFormatterTool: ToolDefinition = {
  id: "xml-formatter",
  slug: "xml-formatter",
  name: "XML Formatter",
  description:
    "Format, minify, and validate XML documents locally in your browser.",
  category: "formatters",
  keywords: ["xml", "formatter", "pretty print", "minify", "validate"],
  icon: CodeXmlIcon,
  related: ["json-formatter", "yaml-formatter"],
  load: () => import("./xml-formatter"),
};
