import { describe, expect, it } from "vitest";

import { formatSql, minifySql } from "./lib";

describe("formatSql", () => {
  it("pretty-prints SQL keywords and clauses", () => {
    const result = formatSql(
      "select id, name from users where active = true order by name",
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain("SELECT");
      expect(result.value).toContain("FROM");
      expect(result.value).toContain("\n");
    }
  });

  it("rejects empty input", () => {
    expect(formatSql("   ")).toEqual({
      ok: false,
      error: "Enter SQL to format.",
    });
  });
});

describe("minifySql", () => {
  it("collapses whitespace after formatting", () => {
    const result = minifySql(`
      select *
      from users
    `);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("SELECT * FROM users");
    }
  });
});
