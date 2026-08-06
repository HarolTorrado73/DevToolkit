import { CalendarClockIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const cronGeneratorTool: ToolDefinition = {
  id: "cron-generator",
  slug: "cron-generator",
  name: "Cron Generator",
  description:
    "Build and validate 5-field cron expressions, then preview the next scheduled runs locally.",
  category: "generators",
  keywords: ["cron", "schedule", "crontab", "scheduler", "expression"],
  icon: CalendarClockIcon,
  related: ["timestamp-converter", "regex-tester"],
  load: () => import("./cron-generator"),
};
