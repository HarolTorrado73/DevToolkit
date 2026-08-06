import { describe, expect, it } from "vitest";

import { generateQrDataUrl } from "./lib";

describe("generateQrDataUrl", () => {
  it("creates a PNG data URL", async () => {
    const result = await generateQrDataUrl({
      text: "https://devtoolkit.dev",
      width: 128,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.dataUrl.startsWith("data:image/png;base64,")).toBe(true);
    }
  });

  it("rejects empty text and invalid sizes", async () => {
    expect((await generateQrDataUrl({ text: "" })).ok).toBe(false);
    expect((await generateQrDataUrl({ text: "ok", width: 10 })).ok).toBe(false);
    expect((await generateQrDataUrl({ text: "ok", margin: 40 })).ok).toBe(
      false,
    );
  });
});
