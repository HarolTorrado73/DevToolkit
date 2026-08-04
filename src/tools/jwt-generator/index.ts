import { FileKey2Icon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const jwtGeneratorTool: ToolDefinition = {
  id: "jwt-generator",
  slug: "jwt-generator",
  name: "JWT Generator",
  description:
    "Create HS256-signed JSON Web Tokens locally with custom claims, expiry, and a secret that never leaves your browser.",
  category: "security",
  keywords: ["jwt", "generate", "hs256", "token", "sign", "claims"],
  icon: FileKey2Icon,
  related: ["jwt-decoder", "hash-generator"],
  load: () => import("./jwt-generator"),
};
