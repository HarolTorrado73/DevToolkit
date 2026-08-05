import { describe, expect, it } from "vitest";

import { formatXml, minifyXml, validateXml } from "./lib";

const sample = `<root><item id="1">DevToolkit</item><item id="2">XML</item></root>`;

describe("formatXml", () => {
  it("pretty-prints XML", () => {
    const result = formatXml(sample);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain("<root>");
      expect(result.value).toContain("\n");
      expect(result.value).toContain("DevToolkit");
    }
  });

  it("rejects empty and invalid XML", () => {
    expect(formatXml("")).toEqual({
      ok: false,
      error: "Enter XML to format.",
    });
    expect(formatXml("<root><unclosed>").ok).toBe(false);
  });
});

describe("minifyXml", () => {
  it("removes formatting whitespace", () => {
    const result = minifyXml(`
      <root>
        <item>1</item>
      </root>
    `);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain("<root>");
      expect(result.value).toContain("<item>1</item>");
    }
  });
});

describe("validateXml", () => {
  it("accepts valid XML", () => {
    expect(validateXml(sample)).toEqual({
      ok: true,
      value: sample,
    });
  });
});
