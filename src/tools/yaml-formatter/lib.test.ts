import { describe, expect, it } from "vitest";

import { formatYaml, minifyYaml, yamlToJson } from "./lib";

const sample = `
name: DevToolkit
features:
  - format
  - convert
`;

describe("formatYaml", () => {
  it("formats nested YAML", () => {
    const result = formatYaml(sample);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain("name: DevToolkit");
      expect(result.value).toContain("features:");
    }
  });

  it("rejects empty input", () => {
    expect(formatYaml("")).toEqual({
      ok: false,
      error: "Enter YAML to format.",
    });
  });

  it("rejects invalid YAML", () => {
    expect(formatYaml("key: [unclosed").ok).toBe(false);
  });
});

describe("yamlToJson", () => {
  it("converts YAML to JSON", () => {
    const result = yamlToJson("name: DevToolkit\ncount: 2");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(JSON.parse(result.value)).toEqual({
        name: "DevToolkit",
        count: 2,
      });
    }
  });
});

describe("minifyYaml", () => {
  it("returns a compact representation", () => {
    const result = minifyYaml(sample);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.length).toBeGreaterThan(0);
      expect(result.value).toContain("DevToolkit");
    }
  });
});
