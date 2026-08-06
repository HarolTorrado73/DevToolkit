import { CronExpressionParser } from "cron-parser";

export type CronField =
  "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek";

export type CronParts = Record<CronField, string>;

export type CronResult =
  | { ok: true; expression: string; nextRuns: string[] }
  | { ok: false; error: string };

export const DEFAULT_CRON_PARTS: CronParts = {
  minute: "*/5",
  hour: "*",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "*",
};

export function buildCronExpression(parts: CronParts): string {
  return [
    parts.minute.trim() || "*",
    parts.hour.trim() || "*",
    parts.dayOfMonth.trim() || "*",
    parts.month.trim() || "*",
    parts.dayOfWeek.trim() || "*",
  ].join(" ");
}

export function parseCronExpression(
  expression: string,
  count = 5,
  now = new Date(),
): CronResult {
  const trimmed = expression.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a cron expression." };
  }

  const fields = trimmed.split(/\s+/);
  if (fields.length !== 5) {
    return {
      ok: false,
      error: "Use a 5-field cron expression: minute hour day month weekday.",
    };
  }

  try {
    const interval = CronExpressionParser.parse(trimmed, {
      currentDate: now,
    });
    const nextRuns = Array.from(
      { length: Math.min(Math.max(count, 1), 20) },
      () => {
        const next = interval.next().toISOString();
        if (!next) {
          throw new Error("Unable to compute the next cron run.");
        }
        return next;
      },
    );
    return { ok: true, expression: trimmed, nextRuns };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Invalid cron expression.",
    };
  }
}

export function explainCron(parts: CronParts): string {
  return `At ${parts.minute} minute(s) past hour ${parts.hour}, on day-of-month ${parts.dayOfMonth} and on ${parts.dayOfWeek}, in month ${parts.month}.`;
}
