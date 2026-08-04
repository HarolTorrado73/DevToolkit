export type JsonFormatResult =
  { ok: true; value: string } | { ok: false; error: string };

function normalizeJsonError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message.replace(/^JSON\.parse:\s*/i, "").trim();
  }

  return "Invalid JSON input.";
}

export function formatJson(input: string, space = 2): JsonFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter JSON to format." };
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    return { ok: true, value: JSON.stringify(parsed, null, space) };
  } catch (error) {
    return { ok: false, error: normalizeJsonError(error) };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter JSON to minify." };
  }

  try {
    const parsed: unknown = JSON.parse(trimmed);
    return { ok: true, value: JSON.stringify(parsed) };
  } catch (error) {
    return { ok: false, error: normalizeJsonError(error) };
  }
}

export function validateJson(input: string): JsonFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter JSON to validate." };
  }

  try {
    JSON.parse(trimmed);
    return { ok: true, value: trimmed };
  } catch (error) {
    return { ok: false, error: normalizeJsonError(error) };
  }
}
