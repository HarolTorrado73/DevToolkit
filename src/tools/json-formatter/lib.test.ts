import { describe, expect, it } from "vitest";

import { formatJson, minifyJson, validateJson } from "./lib";

describe("formatJson", () => {
  it("pretty-prints valid JSON", () => {
    const result = formatJson('{"name":"DevToolkit","ok":true}');

    expect(result).toEqual({
      ok: true,
      value: `{
  "name": "DevToolkit",
  "ok": true
}`,
    });
  });

  it("rejects empty input", () => {
    expect(formatJson("   ")).toEqual({
      ok: false,
      error: "Enter JSON to format.",
    });
  });

  it("returns a parse error for invalid JSON", () => {
    const result = formatJson("{invalid");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});

describe("minifyJson", () => {
  it("compacts valid JSON", () => {
    expect(minifyJson('{\n  "a": 1\n}')).toEqual({
      ok: true,
      value: '{"a":1}',
    });
  });

  it("rejects empty input", () => {
    expect(minifyJson("")).toEqual({
      ok: false,
      error: "Enter JSON to minify.",
    });
  });
});

describe("validateJson", () => {
  it("accepts valid JSON without rewriting it", () => {
    const input = ' {"a":1} ';
    expect(validateJson(input)).toEqual({
      ok: true,
      value: '{"a":1}',
    });
  });

  it("rejects empty and invalid JSON", () => {
    expect(validateJson("")).toEqual({
      ok: false,
      error: "Enter JSON to validate.",
    });
    expect(validateJson("[1, 2,]").ok).toBe(false);
  });
});
