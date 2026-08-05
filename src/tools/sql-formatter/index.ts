import { DatabaseIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const sqlFormatterTool: ToolDefinition = {
  id: "sql-formatter",
  slug: "sql-formatter",
  name: "SQL Formatter",
  description:
    "Format and minify SQL queries in your browser with support for common SQL dialects.",
  category: "formatters",
  keywords: [
    "sql",
    "formatter",
    "pretty print",
    "query",
    "postgresql",
    "mysql",
  ],
  icon: DatabaseIcon,
  related: ["json-formatter", "yaml-formatter"],
  load: () => import("./sql-formatter"),
};
