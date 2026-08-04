import { describe, expect, it } from "vitest";

import { decodeBase64, encodeBase64 } from "./lib";

describe("encodeBase64", () => {
  it("encodes ASCII text", () => {
    expect(encodeBase64("DevToolkit")).toEqual({
      ok: true,
      value: "RGV2VG9vbGtpdA==",
    });
  });

  it("encodes unicode text", () => {
    const result = encodeBase64("café ☕");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(decodeBase64(result.value)).toEqual({
        ok: true,
        value: "café ☕",
      });
    }
  });

  it("rejects empty input", () => {
    expect(encodeBase64("")).toEqual({
      ok: false,
      error: "Enter text to encode.",
    });
  });
});

describe("decodeBase64", () => {
  it("decodes valid Base64", () => {
    expect(decodeBase64("RGV2VG9vbGtpdA==")).toEqual({
      ok: true,
      value: "DevToolkit",
    });
  });

  it("tolerates whitespace in the payload", () => {
    expect(decodeBase64("RGV2 VG9v bGtp dA==")).toEqual({
      ok: true,
      value: "DevToolkit",
    });
  });

  it("rejects empty and invalid Base64", () => {
    expect(decodeBase64("")).toEqual({
      ok: false,
      error: "Enter Base64 to decode.",
    });
    expect(decodeBase64("@@@")).toEqual({
      ok: false,
      error: "Invalid Base64 input.",
    });
  });
});
