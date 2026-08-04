export type PasswordCharsetOptions = {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export type GeneratePasswordOptions = PasswordCharsetOptions & {
  length: number;
  excludeAmbiguous?: boolean;
};

export type PasswordResult =
  { ok: true; value: string } | { ok: false; error: string };

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?";
const AMBIGUOUS = new Set(["O", "0", "l", "1", "I", "o"]);

function getRandomValues(length: number): Uint32Array {
  const values = new Uint32Array(length);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(values);
    return values;
  }

  for (let index = 0; index < length; index += 1) {
    values[index] = Math.floor(Math.random() * 0xffffffff);
  }
  return values;
}

function pickChar(charset: string, randomValue: number): string {
  return charset[randomValue % charset.length]!;
}

export function buildCharset(options: PasswordCharsetOptions): string {
  let charset = "";
  if (options.lowercase) charset += LOWERCASE;
  if (options.uppercase) charset += UPPERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;
  return charset;
}

export function generatePassword(
  options: GeneratePasswordOptions,
): PasswordResult {
  const length = Math.trunc(options.length);
  if (!Number.isFinite(length) || length < 4 || length > 128) {
    return { ok: false, error: "Length must be between 4 and 128." };
  }

  let charset = buildCharset(options);
  if (options.excludeAmbiguous) {
    charset = [...charset].filter((char) => !AMBIGUOUS.has(char)).join("");
  }

  if (!charset) {
    return {
      ok: false,
      error: "Select at least one character set.",
    };
  }

  const requiredSets: string[] = [];
  if (options.lowercase) {
    requiredSets.push(
      options.excludeAmbiguous
        ? [...LOWERCASE].filter((char) => !AMBIGUOUS.has(char)).join("")
        : LOWERCASE,
    );
  }
  if (options.uppercase) {
    requiredSets.push(
      options.excludeAmbiguous
        ? [...UPPERCASE].filter((char) => !AMBIGUOUS.has(char)).join("")
        : UPPERCASE,
    );
  }
  if (options.numbers) {
    requiredSets.push(
      options.excludeAmbiguous
        ? [...NUMBERS].filter((char) => !AMBIGUOUS.has(char)).join("")
        : NUMBERS,
    );
  }
  if (options.symbols) requiredSets.push(SYMBOLS);

  const activeSets = requiredSets.filter((set) => set.length > 0);
  if (activeSets.length > length) {
    return {
      ok: false,
      error: "Password length is too short for the selected character sets.",
    };
  }

  const random = getRandomValues(length);
  const chars: string[] = Array.from({ length }, (_, index) =>
    pickChar(charset, random[index]!),
  );

  // Guarantee one character from each selected set.
  for (let index = 0; index < activeSets.length; index += 1) {
    chars[index] = pickChar(activeSets[index]!, random[index]!);
  }

  // Fisher–Yates shuffle with crypto randomness.
  const shuffleRandom = getRandomValues(chars.length);
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = shuffleRandom[index]! % (index + 1);
    const current = chars[index]!;
    chars[index] = chars[swapIndex]!;
    chars[swapIndex] = current;
  }

  return { ok: true, value: chars.join("") };
}

export function estimatePasswordStrength(password: string): {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Very weak" | "Weak" | "Fair" | "Strong" | "Very strong";
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const normalized = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  const labels = [
    "Very weak",
    "Weak",
    "Fair",
    "Strong",
    "Very strong",
  ] as const;

  return { score: normalized, label: labels[normalized] };
}
