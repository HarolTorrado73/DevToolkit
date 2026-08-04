export type TimestampConversion =
  | {
      ok: true;
      unixSeconds: number;
      unixMilliseconds: number;
      iso: string;
      utc: string;
      local: string;
    }
  | { ok: false; error: string };

function buildConversion(date: Date): TimestampConversion {
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: "Invalid date or timestamp." };
  }

  const unixMilliseconds = date.getTime();
  return {
    ok: true,
    unixSeconds: Math.floor(unixMilliseconds / 1000),
    unixMilliseconds,
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toString(),
  };
}

export function convertFromUnix(input: string): TimestampConversion {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a Unix timestamp." };
  }

  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { ok: false, error: "Unix timestamp must be numeric." };
  }

  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) {
    return { ok: false, error: "Unix timestamp must be numeric." };
  }

  // Heuristic: values with absolute magnitude >= 1e12 are milliseconds.
  const millis = Math.abs(numeric) >= 1e12 ? numeric : numeric * 1000;
  return buildConversion(new Date(millis));
}

export function convertFromDateString(input: string): TimestampConversion {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a date string." };
  }

  return buildConversion(new Date(trimmed));
}

export function convertNow(now = new Date()): TimestampConversion {
  return buildConversion(now);
}
