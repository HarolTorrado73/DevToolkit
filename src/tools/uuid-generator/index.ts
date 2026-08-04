import { HashIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const uuidGeneratorTool: ToolDefinition = {
  id: "uuid-generator",
  slug: "uuid-generator",
  name: "UUID Generator",
  description:
    "Generate RFC 4122 UUID v4 values locally. Create one ID or a batch for seeding data and tests.",
  category: "generators",
  keywords: ["uuid", "guid", "v4", "identifier", "random id"],
  icon: HashIcon,
  related: ["password-generator", "hash-generator"],
  load: () => import("./uuid-generator"),
};
