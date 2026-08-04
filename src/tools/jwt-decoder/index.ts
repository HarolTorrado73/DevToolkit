import { ScanSearchIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const jwtDecoderTool: ToolDefinition = {
  id: "jwt-decoder",
  slug: "jwt-decoder",
  name: "JWT Decoder",
  description:
    "Decode JSON Web Tokens in your browser. Inspect header and payload without sending data to a server.",
  category: "security",
  keywords: ["jwt", "decode", "token", "json web token", "claims"],
  icon: ScanSearchIcon,
  related: ["jwt-generator", "base64"],
  load: () => import("./jwt-decoder"),
};
