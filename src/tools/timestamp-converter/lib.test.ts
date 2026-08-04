import { describe, expect, it } from "vitest";

import { convertFromDateString, convertFromUnix, convertNow } from "./lib";

describe("convertFromUnix", () => {
  it("converts second-based timestamps", () => {
    const result = convertFromUnix("1609459200");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.unixMilliseconds).toBe(1609459200000);
      expect(result.iso).toBe("2021-01-01T00:00:00.000Z");
    }
  });

  it("detects millisecond timestamps", () => {
    const result = convertFromUnix("1609459200000");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.unixSeconds).toBe(1609459200);
    }
  });

  it("rejects empty and non-numeric input", () => {
    expect(convertFromUnix("").ok).toBe(false);
    expect(convertFromUnix("not-a-number").ok).toBe(false);
  });
});

describe("convertFromDateString", () => {
  it("parses ISO date strings", () => {
    const result = convertFromDateString("2021-01-01T00:00:00.000Z");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.unixSeconds).toBe(1609459200);
    }
  });
});

describe("convertNow", () => {
  it("returns a conversion for the provided date", () => {
    const fixed = new Date("2021-01-01T00:00:00.000Z");
    const result = convertNow(fixed);
    expect(result).toMatchObject({
      ok: true,
      unixSeconds: 1609459200,
      iso: "2021-01-01T00:00:00.000Z",
    });
  });
});
