import { BracesIcon } from "lucide-react";
import { describe, expect, it } from "vitest";

import { buildSoftwareAppJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import type { ToolSummary } from "@/types/tool";

const sampleTool = {
  id: "json-formatter",
  slug: "json-formatter",
  name: "JSON Formatter",
  description: "Format JSON in your browser.",
  category: "formatters",
  keywords: ["json"],
  icon: BracesIcon,
} satisfies ToolSummary;

describe("seo helpers", () => {
  it("builds website structured data", () => {
    const jsonLd = buildWebsiteJsonLd();

    expect(jsonLd["@type"]).toBe("WebSite");
    expect(jsonLd.name).toBe("DevToolkit");
    expect(jsonLd.url).toContain("http");
  });

  it("builds software application structured data for a tool", () => {
    const jsonLd = buildSoftwareAppJsonLd(sampleTool);

    expect(jsonLd["@type"]).toBe("SoftwareApplication");
    expect(jsonLd.name).toBe("JSON Formatter");
    expect(jsonLd.url).toContain("/tools/json-formatter");
    expect(jsonLd.offers).toMatchObject({ price: "0" });
  });
});
