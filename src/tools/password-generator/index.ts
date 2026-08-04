import { KeyRoundIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const passwordGeneratorTool: ToolDefinition = {
  id: "password-generator",
  slug: "password-generator",
  name: "Password Generator",
  description:
    "Generate strong random passwords locally with controllable length, character sets, and ambiguous-character filtering.",
  category: "generators",
  keywords: ["password", "generator", "secure", "random", "passphrase"],
  icon: KeyRoundIcon,
  related: ["hash-generator", "uuid-generator"],
  load: () => import("./password-generator"),
};
