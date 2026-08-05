import { BracesIcon, HashIcon } from "lucide-react";
import { beforeEach, describe, expect, it } from "vitest";

import { useCatalogStore } from "@/stores/catalog-store";
import {
  filterToolSummaries,
  findToolBySlug,
  getAllTools,
  getToolBySlug,
  getToolSlugs,
  getToolSummaries,
  searchTools,
  toToolSummaries,
  toToolSummary,
} from "@/tools/registry";
import type { ToolDefinition } from "@/types/tool";

const sampleDefinitions = [
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format and minify JSON.",
    category: "formatters",
    keywords: ["json", "pretty"],
    icon: BracesIcon,
    load: async () => ({ default: () => null }),
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate RFC UUID values.",
    category: "generators",
    keywords: ["uuid", "guid"],
    icon: HashIcon,
    load: async () => ({ default: () => null }),
  },
] as const satisfies readonly ToolDefinition[];

const sampleTools = toToolSummaries(sampleDefinitions);

describe("tool registry", () => {
  it("registers phase 1 through phase 3 tools", () => {
    const tools = getAllTools();
    const slugs = getToolSlugs();

    expect(tools.length).toBeGreaterThanOrEqual(12);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "json-formatter",
        "uuid-generator",
        "base64",
        "password-generator",
        "hash-generator",
        "jwt-decoder",
        "jwt-generator",
        "timestamp-converter",
        "sql-formatter",
        "yaml-formatter",
        "xml-formatter",
        "markdown-preview",
      ]),
    );
    expect(getToolSummaries()).toHaveLength(tools.length);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getToolBySlug("does-not-exist")).toBeUndefined();
  });

  it("finds registered tools by slug and search query", () => {
    expect(getToolBySlug("json-formatter")?.name).toBe("JSON Formatter");
    expect(searchTools("yaml")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ slug: "yaml-formatter" }),
      ]),
    );
    expect(searchTools("")).toHaveLength(getToolSummaries().length);
  });
});

describe("registry helpers", () => {
  it("maps definitions to summaries without the loader", () => {
    const summary = toToolSummary(sampleDefinitions[0]);

    expect(summary).toMatchObject({
      id: "json-formatter",
      slug: "json-formatter",
      name: "JSON Formatter",
    });
    expect(summary).not.toHaveProperty("load");
    expect(toToolSummaries(sampleDefinitions)).toHaveLength(2);
  });

  it("finds tools by slug", () => {
    expect(findToolBySlug(sampleDefinitions, "uuid-generator")?.name).toBe(
      "UUID Generator",
    );
    expect(findToolBySlug(sampleDefinitions, "missing")).toBeUndefined();
  });
});

describe("filterToolSummaries", () => {
  it("returns all items for an empty query", () => {
    expect(filterToolSummaries(sampleTools, "   ")).toEqual(sampleTools);
  });

  it("matches name, description, category, and keywords", () => {
    expect(filterToolSummaries(sampleTools, "JSON")).toHaveLength(1);
    expect(filterToolSummaries(sampleTools, "generators")).toHaveLength(1);
    expect(filterToolSummaries(sampleTools, "guid")).toHaveLength(1);
    expect(filterToolSummaries(sampleTools, "xml")).toHaveLength(0);
  });
});

describe("catalog store", () => {
  beforeEach(() => {
    useCatalogStore.getState().resetFilters();
  });

  it("updates query and category filters", () => {
    useCatalogStore.getState().setQuery("jwt");
    useCatalogStore.getState().setCategory("security");

    expect(useCatalogStore.getState().query).toBe("jwt");
    expect(useCatalogStore.getState().category).toBe("security");
  });

  it("resets filters to defaults", () => {
    useCatalogStore.getState().setQuery("uuid");
    useCatalogStore.getState().setCategory("generators");
    useCatalogStore.getState().resetFilters();

    expect(useCatalogStore.getState().query).toBe("");
    expect(useCatalogStore.getState().category).toBe("all");
  });
});
