export type JwtGenerateInput = {
  payloadJson: string;
  secret: string;
  expiresInSeconds?: number;
  issuer?: string;
  subject?: string;
  audience?: string;
};

export type JwtGenerateResult =
  | {
      ok: true;
      token: string;
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
    }
  | { ok: false; error: string };

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function encodeJson(value: unknown): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(value)));
}

async function signHs256(data: string, secret: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle?.importKey !== "function") {
    throw new Error("Web Crypto is unavailable in this environment.");
  }

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );

  return toBase64Url(new Uint8Array(signature));
}

export async function generateJwt(
  input: JwtGenerateInput,
): Promise<JwtGenerateResult> {
  const secret = input.secret.trim();
  if (!secret) {
    return { ok: false, error: "Enter a signing secret." };
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(input.payloadJson || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, error: "Payload must be a JSON object." };
    }
    payload = { ...(parsed as Record<string, unknown>) };
  } catch {
    return { ok: false, error: "Payload must be valid JSON." };
  }

  const now = Math.floor(Date.now() / 1000);
  payload.iat = typeof payload.iat === "number" ? payload.iat : now;

  if (input.expiresInSeconds && input.expiresInSeconds > 0) {
    payload.exp = now + Math.trunc(input.expiresInSeconds);
  }
  if (input.issuer?.trim()) payload.iss = input.issuer.trim();
  if (input.subject?.trim()) payload.sub = input.subject.trim();
  if (input.audience?.trim()) payload.aud = input.audience.trim();

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = encodeJson(header);
  const encodedPayload = encodeJson(payload);
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  try {
    const signature = await signHs256(signingInput, secret);
    return {
      ok: true,
      token: `${signingInput}.${signature}`,
      header,
      payload,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to sign the JWT with the provided secret.",
    };
  }
}
