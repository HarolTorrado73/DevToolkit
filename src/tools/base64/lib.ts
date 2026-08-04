export type Base64Result =
  { ok: true; value: string } | { ok: false; error: string };

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return binary;
}

function binaryStringToBytes(binary: string): Uint8Array {
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export function encodeBase64(input: string): Base64Result {
  if (!input) {
    return { ok: false, error: "Enter text to encode." };
  }

  try {
    const bytes = new TextEncoder().encode(input);
    return {
      ok: true,
      value: btoa(bytesToBinaryString(bytes)),
    };
  } catch {
    return {
      ok: false,
      error: "Unable to encode the provided text as Base64.",
    };
  }
}

export function decodeBase64(input: string): Base64Result {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter Base64 to decode." };
  }

  try {
    const normalized = trimmed.replace(/\s+/g, "");
    const binary = atob(normalized);
    const bytes = binaryStringToBytes(binary);
    return {
      ok: true,
      value: new TextDecoder().decode(bytes),
    };
  } catch {
    return {
      ok: false,
      error: "Invalid Base64 input.",
    };
  }
}
