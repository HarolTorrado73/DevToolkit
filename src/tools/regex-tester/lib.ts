export type RegexFlags = {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
};

export type RegexMatch = {
  index: number;
  match: string;
  groups: string[];
  namedGroups: Record<string, string>;
};

export type RegexTestResult =
  | {
      ok: true;
      matches: RegexMatch[];
      matchCount: number;
    }
  | { ok: false; error: string };

export function flagsToString(flags: RegexFlags): string {
  return [
    flags.global ? "g" : "",
    flags.ignoreCase ? "i" : "",
    flags.multiline ? "m" : "",
    flags.dotAll ? "s" : "",
    flags.unicode ? "u" : "",
  ].join("");
}

export function testRegex(
  pattern: string,
  input: string,
  flags: RegexFlags,
): RegexTestResult {
  if (!pattern) {
    return { ok: false, error: "Enter a regular expression pattern." };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flagsToString({ ...flags, global: true }));
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  for (const result of input.matchAll(regex)) {
    matches.push({
      index: result.index ?? 0,
      match: result[0] ?? "",
      groups: result.slice(1).map((value) => value ?? ""),
      namedGroups: { ...(result.groups ?? {}) },
    });

    if (!flags.global) {
      break;
    }
  }

  return {
    ok: true,
    matches,
    matchCount: matches.length,
  };
}

export function replaceRegex(
  pattern: string,
  input: string,
  replacement: string,
  flags: RegexFlags,
): RegexTestResult & { value?: string } {
  if (!pattern) {
    return { ok: false, error: "Enter a regular expression pattern." };
  }

  try {
    const regex = new RegExp(pattern, flagsToString(flags));
    const value = input.replace(regex, replacement);
    const tested = testRegex(pattern, input, flags);
    if (!tested.ok) {
      return tested;
    }
    return { ...tested, value };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid regular expression.",
    };
  }
}
