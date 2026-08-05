import { format as formatSqlDialect } from "sql-formatter";

export type SqlFormatResult =
  { ok: true; value: string } | { ok: false; error: string };

export type SqlDialect =
  "sql" | "postgresql" | "mysql" | "mariadb" | "sqlite" | "tsql" | "bigquery";

export const SQL_DIALECTS: readonly SqlDialect[] = [
  "sql",
  "postgresql",
  "mysql",
  "mariadb",
  "sqlite",
  "tsql",
  "bigquery",
] as const;

export function formatSql(
  input: string,
  dialect: SqlDialect = "sql",
): SqlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter SQL to format." };
  }

  try {
    return {
      ok: true,
      value: formatSqlDialect(trimmed, {
        language: dialect,
        tabWidth: 2,
        keywordCase: "upper",
      }),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Unable to format SQL.",
    };
  }
}

export function minifySql(input: string): SqlFormatResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter SQL to minify." };
  }

  try {
    const formatted = formatSqlDialect(trimmed, {
      language: "sql",
      tabWidth: 2,
      keywordCase: "upper",
    });
    return {
      ok: true,
      value: formatted.replace(/\s+/g, " ").trim(),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Unable to minify SQL.",
    };
  }
}
