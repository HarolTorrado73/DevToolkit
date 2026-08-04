import { FingerprintIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const hashGeneratorTool: ToolDefinition = {
  id: "hash-generator",
  slug: "hash-generator",
  name: "Hash Generator",
  description:
    "Compute SHA-1, SHA-256, SHA-384, and SHA-512 digests in your browser with the Web Crypto API.",
  category: "security",
  keywords: ["hash", "sha256", "sha512", "digest", "checksum", "crypto"],
  icon: FingerprintIcon,
  related: ["password-generator", "base64"],
  load: () => import("./hash-generator"),
};
