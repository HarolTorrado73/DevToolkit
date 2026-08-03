import type { ToolSummary } from "@/types/tool";
import { siteConfig } from "@/lib/constants";

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    license: "https://opensource.org/licenses/MIT",
  };
}

export function buildSoftwareAppJsonLd(tool: ToolSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
    url: `${siteConfig.url}/tools/${tool.slug}`,
  };
}
