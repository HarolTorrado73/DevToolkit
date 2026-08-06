import { QrCodeIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const qrGeneratorTool: ToolDefinition = {
  id: "qr-generator",
  slug: "qr-generator",
  name: "QR Generator",
  description:
    "Generate downloadable QR codes from text or URLs entirely in your browser.",
  category: "generators",
  keywords: ["qr", "qrcode", "barcode", "url", "generator"],
  icon: QrCodeIcon,
  related: ["uuid-generator", "base64"],
  load: () => import("./qr-generator"),
};
