import { afterEach, describe, expect, it, vi } from "vitest";

import { generateUuidV4, generateUuids, isUuidV4 } from "./lib";

describe("generateUuidV4", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a valid UUID v4", () => {
    const value = generateUuidV4();
    expect(isUuidV4(value)).toBe(true);
  });

  it("generates unique values across multiple calls", () => {
    const values = new Set(Array.from({ length: 20 }, () => generateUuidV4()));
    expect(values.size).toBe(20);
  });

  it("falls back when randomUUID is unavailable", () => {
    vi.stubGlobal("crypto", {
      getRandomValues: (bytes: Uint8Array) => {
        for (let index = 0; index < bytes.length; index += 1) {
          bytes[index] = index;
        }
        return bytes;
      },
    });

    const value = generateUuidV4();
    expect(isUuidV4(value)).toBe(true);
  });

  it("falls back to Math.random when Web Crypto is unavailable", () => {
    vi.stubGlobal("crypto", undefined);
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.42);

    const value = generateUuidV4();
    expect(isUuidV4(value)).toBe(true);
    spy.mockRestore();
  });
});

describe("generateUuids", () => {
  it("respects count and uppercase options", () => {
    const values = generateUuids({ count: 3, uppercase: true });

    expect(values).toHaveLength(3);
    for (const value of values) {
      expect(value).toBe(value.toUpperCase());
      expect(isUuidV4(value)).toBe(true);
    }
  });

  it("clamps count between 1 and 100", () => {
    expect(generateUuids({ count: 0 })).toHaveLength(1);
    expect(generateUuids({ count: 500 })).toHaveLength(100);
  });

  it("rejects unsupported versions", () => {
    expect(() =>
      generateUuids({ version: "v1" as "v4", count: 1 }),
    ).toThrowError(/Unsupported UUID version/);
  });
});

describe("isUuidV4", () => {
  it("accepts valid UUID v4 strings and rejects other versions", () => {
    expect(isUuidV4("550e8400-e29b-11d4-a716-446655440000")).toBe(false);
    expect(isUuidV4(generateUuidV4())).toBe(true);
  });

  it("rejects malformed values", () => {
    expect(isUuidV4("not-a-uuid")).toBe(false);
    expect(isUuidV4("")).toBe(false);
  });
});
