export type JwtDecodeResult =
  | {
      ok: true;
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
      signature: string;
      rawHeader: string;
      rawPayload: string;
    }
  | { ok: false; error: string };

function base64UrlToBase64(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (normalized.length % 4)) % 4;
  return normalized + "=".repeat(padding);
}

function decodeBase64UrlJson(segment: string): Record<string, unknown> {
  const json = new TextDecoder().decode(
    Uint8Array.from(atob(base64UrlToBase64(segment)), (char) =>
      char.charCodeAt(0),
    ),
  );
  const parsed: unknown = JSON.parse(json);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("JWT segment must be a JSON object.");
  }
  return parsed as Record<string, unknown>;
}

export function decodeJwt(token: string): JwtDecodeResult {
  const trimmed = token.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a JWT to decode." };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) {
    return {
      ok: false,
      error: "A JWT must have three Base64URL segments separated by dots.",
    };
  }

  const [rawHeader, rawPayload, signature] = parts as [string, string, string];

  try {
    return {
      ok: true,
      header: decodeBase64UrlJson(rawHeader),
      payload: decodeBase64UrlJson(rawPayload),
      signature,
      rawHeader,
      rawPayload,
    };
  } catch {
    return {
      ok: false,
      error: "Unable to decode JWT header or payload.",
    };
  }
}
