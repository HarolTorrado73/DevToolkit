import { Clock3Icon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const timestampConverterTool: ToolDefinition = {
  id: "timestamp-converter",
  slug: "timestamp-converter",
  name: "Timestamp Converter",
  description:
    "Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, ISO, UTC, and local time.",
  category: "data",
  keywords: ["timestamp", "unix", "epoch", "date", "iso", "utc"],
  icon: Clock3Icon,
  related: ["jwt-decoder", "uuid-generator"],
  load: () => import("./timestamp-converter"),
};
