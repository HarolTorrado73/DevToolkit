import QRCode from "qrcode";

export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type QrGenerateOptions = {
  text: string;
  errorCorrectionLevel?: QrErrorCorrectionLevel;
  margin?: number;
  width?: number;
  darkColor?: string;
  lightColor?: string;
};

export type QrGenerateResult =
  { ok: true; dataUrl: string } | { ok: false; error: string };

export async function generateQrDataUrl(
  options: QrGenerateOptions,
): Promise<QrGenerateResult> {
  const text = options.text.trim();
  if (!text) {
    return { ok: false, error: "Enter text or a URL to encode." };
  }

  const width = options.width ?? 256;
  const margin = options.margin ?? 2;

  if (width < 64 || width > 1024) {
    return { ok: false, error: "Width must be between 64 and 1024 pixels." };
  }

  if (margin < 0 || margin > 16) {
    return { ok: false, error: "Margin must be between 0 and 16." };
  }

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
      margin,
      width,
      color: {
        dark: options.darkColor ?? "#000000",
        light: options.lightColor ?? "#ffffff",
      },
    });

    return { ok: true, dataUrl };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Unable to generate QR code.",
    };
  }
}
