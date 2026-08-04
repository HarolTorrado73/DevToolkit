import { describe, expect, it } from "vitest";

import { hashText } from "./lib";

describe("hashText", () => {
  it("hashes text with SHA-256", async () => {
    const result = await hashText("DevToolkit", "SHA-256");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.algorithm).toBe("SHA-256");
      expect(result.value).toHaveLength(64);
      expect(result.value).toMatch(/^[a-f0-9]+$/);
    }
  });

  it("rejects empty input", async () => {
    expect(await hashText("", "SHA-256")).toEqual({
      ok: false,
      error: "Enter text to hash.",
    });
  });

  it("produces different digests for different algorithms", async () => {
    const sha1 = await hashText("hello", "SHA-1");
    const sha512 = await hashText("hello", "SHA-512");

    expect(sha1.ok && sha512.ok).toBe(true);
    if (sha1.ok && sha512.ok) {
      expect(sha1.value).not.toBe(sha512.value);
      expect(sha1.value).toHaveLength(40);
      expect(sha512.value).toHaveLength(128);
    }
  });
});
