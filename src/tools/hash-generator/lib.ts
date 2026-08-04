export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export const HASH_ALGORITHMS: readonly HashAlgorithm[] = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
] as const;

export type HashResult =
  | { ok: true; value: string; algorithm: HashAlgorithm }
  | { ok: false; error: string };

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashText(
  input: string,
  algorithm: HashAlgorithm,
): Promise<HashResult> {
  if (!input) {
    return { ok: false, error: "Enter text to hash." };
  }

  if (!HASH_ALGORITHMS.includes(algorithm)) {
    return { ok: false, error: `Unsupported algorithm: ${algorithm}` };
  }

  if (typeof globalThis.crypto?.subtle?.digest !== "function") {
    return {
      ok: false,
      error: "Web Crypto is unavailable in this environment.",
    };
  }

  try {
    const data = new TextEncoder().encode(input);
    const digest = await globalThis.crypto.subtle.digest(algorithm, data);
    return { ok: true, value: toHex(digest), algorithm };
  } catch {
    return { ok: false, error: "Unable to compute the hash." };
  }
}
