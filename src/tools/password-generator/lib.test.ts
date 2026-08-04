import { describe, expect, it } from "vitest";

import {
  buildCharset,
  estimatePasswordStrength,
  generatePassword,
} from "./lib";

describe("buildCharset", () => {
  it("concatenates selected character sets", () => {
    expect(
      buildCharset({
        lowercase: true,
        uppercase: false,
        numbers: true,
        symbols: false,
      }),
    ).toBe("abcdefghijklmnopqrstuvwxyz0123456789");
  });
});

describe("generatePassword", () => {
  it("generates a password with the requested length", () => {
    const result = generatePassword({
      length: 16,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toHaveLength(16);
      expect(result.value).toMatch(/[a-z]/);
      expect(result.value).toMatch(/[A-Z]/);
      expect(result.value).toMatch(/\d/);
    }
  });

  it("rejects invalid length and empty charset", () => {
    expect(
      generatePassword({
        length: 2,
        lowercase: true,
        uppercase: false,
        numbers: false,
        symbols: false,
      }).ok,
    ).toBe(false);

    expect(
      generatePassword({
        length: 12,
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
      }),
    ).toEqual({
      ok: false,
      error: "Select at least one character set.",
    });
  });

  it("can exclude ambiguous characters", () => {
    const result = generatePassword({
      length: 32,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: false,
      excludeAmbiguous: true,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).not.toMatch(/[O0l1Io]/);
    }
  });
});

describe("estimatePasswordStrength", () => {
  it("scores short and complex passwords differently", () => {
    expect(estimatePasswordStrength("abc").label).toBe("Very weak");
    expect(estimatePasswordStrength("Abcdef12!xyz").label).not.toBe(
      "Very weak",
    );
  });
});
