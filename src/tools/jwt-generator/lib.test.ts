import { describe, expect, it } from "vitest";

import { decodeJwt } from "@/tools/jwt-decoder/lib";

import { generateJwt } from "./lib";

describe("generateJwt", () => {
  it("creates a decodable HS256 token", async () => {
    const result = await generateJwt({
      payloadJson: JSON.stringify({ name: "DevToolkit" }),
      secret: "test-secret",
      expiresInSeconds: 3600,
      subject: "user-1",
      issuer: "devtoolkit",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.token.split(".")).toHaveLength(3);
    expect(result.payload.sub).toBe("user-1");
    expect(result.payload.iss).toBe("devtoolkit");
    expect(typeof result.payload.exp).toBe("number");

    const decoded = decodeJwt(result.token);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.header).toEqual({ alg: "HS256", typ: "JWT" });
      expect(decoded.payload.name).toBe("DevToolkit");
    }
  });

  it("rejects missing secret and invalid payload JSON", async () => {
    expect(
      await generateJwt({
        payloadJson: "{}",
        secret: "",
      }),
    ).toEqual({
      ok: false,
      error: "Enter a signing secret.",
    });

    expect(
      (
        await generateJwt({
          payloadJson: "{bad",
          secret: "secret",
        })
      ).ok,
    ).toBe(false);
  });
});
