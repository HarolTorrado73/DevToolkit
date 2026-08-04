import { BinaryIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const base64Tool: ToolDefinition = {
  id: "base64",
  slug: "base64",
  name: "Base64 Encoder / Decoder",
  description:
    "Encode text to Base64 or decode Base64 back to UTF-8 text. Handles unicode safely in the browser.",
  category: "encoders",
  keywords: ["base64", "encode", "decode", "utf-8", "binary"],
  icon: BinaryIcon,
  related: ["json-formatter", "hash-generator"],
  load: () => import("./base64"),
};
