import { describe, expect, it } from "vitest";

import { flagsToString, replaceRegex, testRegex } from "./lib";

describe("flagsToString", () => {
  it("serializes selected flags", () => {
    expect(
      flagsToString({
        global: true,
        ignoreCase: true,
        multiline: false,
        dotAll: true,
        unicode: false,
      }),
    ).toBe("gis");
  });
});

describe("testRegex", () => {
  it("finds all global matches", () => {
    const result = testRegex("\\d+", "a1 b22 c3", {
      global: true,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matchCount).toBe(3);
      expect(result.matches.map((item) => item.match)).toEqual([
        "1",
        "22",
        "3",
      ]);
    }
  });

  it("rejects empty and invalid patterns", () => {
    expect(
      testRegex("", "text", {
        global: false,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
      }).ok,
    ).toBe(false);

    expect(
      testRegex("(", "text", {
        global: false,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
      }).ok,
    ).toBe(false);
  });
});

describe("replaceRegex", () => {
  it("replaces matches", () => {
    const result = replaceRegex("cat", "cat and cat", "dog", {
      global: true,
      ignoreCase: false,
      multiline: false,
      dotAll: false,
      unicode: false,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("dog and dog");
    }
  });
});
