import { RegexIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const regexTesterTool: ToolDefinition = {
  id: "regex-tester",
  slug: "regex-tester",
  name: "Regex Tester",
  description:
    "Test, inspect, and replace JavaScript regular expressions locally with live match results.",
  category: "text",
  keywords: ["regex", "regexp", "regular expression", "match", "replace"],
  icon: RegexIcon,
  related: ["json-formatter", "markdown-preview"],
  load: () => import("./regex-tester"),
};
