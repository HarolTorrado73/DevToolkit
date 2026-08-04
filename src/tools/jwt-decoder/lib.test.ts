import { describe, expect, it } from "vitest";

import { decodeJwt } from "./lib";

function toBase64Url(value: string): string {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

const sampleToken = [
  toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" })),
  toBase64Url(JSON.stringify({ sub: "123", name: "DevToolkit" })),
  "signature",
].join(".");

describe("decodeJwt", () => {
  it("decodes a valid JWT without verifying the signature", () => {
    const result = decodeJwt(sampleToken);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
      expect(result.payload).toEqual({ sub: "123", name: "DevToolkit" });
      expect(result.signature).toBe("signature");
    }
  });

  it("rejects empty and malformed tokens", () => {
    expect(decodeJwt("")).toEqual({
      ok: false,
      error: "Enter a JWT to decode.",
    });
    expect(decodeJwt("only.two").ok).toBe(false);
    expect(decodeJwt("a.b.c").ok).toBe(false);
  });
});
