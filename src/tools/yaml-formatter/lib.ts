import { parse, stringify } from "yaml";

export type YamlFormatResult =
  { ok: true; value: string } | { ok: false; error: string };

export function formatYaml(input: string): YamlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter YAML to format." };
  }

  try {
    const parsed: unknown = parse(trimmed);
    return {
      ok: true,
      value: stringify(parsed, { indent: 2, lineWidth: 0 }).trimEnd(),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid YAML input.",
    };
  }
}

export function minifyYaml(input: string): YamlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter YAML to minify." };
  }

  try {
    const parsed: unknown = parse(trimmed);
    return {
      ok: true,
      value: stringify(parsed, { indent: 2, lineWidth: 0 })
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .join("\n")
        .trimEnd(),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid YAML input.",
    };
  }
}

export function yamlToJson(input: string): YamlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter YAML to convert." };
  }

  try {
    const parsed: unknown = parse(trimmed);
    return { ok: true, value: JSON.stringify(parsed, null, 2) };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid YAML input.",
    };
  }
}
