export type UuidVersion = "v4";

export type GenerateUuidOptions = {
  version?: UuidVersion;
  count?: number;
  uppercase?: boolean;
};

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuidV4(value: string): boolean {
  return UUID_V4_PATTERN.test(value.trim());
}

export function generateUuidV4(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID.
  const bytes = new Uint8Array(16);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUuids(options: GenerateUuidOptions = {}): string[] {
  const version = options.version ?? "v4";
  const count = Math.min(Math.max(options.count ?? 1, 1), 100);
  const uppercase = options.uppercase ?? false;

  if (version !== "v4") {
    throw new Error(`Unsupported UUID version: ${version}`);
  }

  return Array.from({ length: count }, () => {
    const value = generateUuidV4();
    return uppercase ? value.toUpperCase() : value;
  });
}
