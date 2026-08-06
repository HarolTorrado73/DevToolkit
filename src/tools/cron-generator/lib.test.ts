import { describe, expect, it } from "vitest";

import {
  buildCronExpression,
  DEFAULT_CRON_PARTS,
  explainCron,
  parseCronExpression,
} from "./lib";

describe("buildCronExpression", () => {
  it("joins five fields", () => {
    expect(buildCronExpression(DEFAULT_CRON_PARTS)).toBe("*/5 * * * *");
  });
});

describe("parseCronExpression", () => {
  it("returns upcoming run times for a valid expression", () => {
    const result = parseCronExpression(
      "0 9 * * 1-5",
      3,
      new Date("2026-01-01T00:00:00.000Z"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.nextRuns).toHaveLength(3);
      expect(result.nextRuns.every((value) => value.includes("T"))).toBe(true);
    }
  });

  it("rejects empty and malformed expressions", () => {
    expect(parseCronExpression("").ok).toBe(false);
    expect(parseCronExpression("* * *").ok).toBe(false);
    expect(parseCronExpression("99 99 99 99 99").ok).toBe(false);
  });
});

describe("explainCron", () => {
  it("returns a human-readable summary", () => {
    expect(explainCron(DEFAULT_CRON_PARTS)).toContain("*/5");
  });
});
