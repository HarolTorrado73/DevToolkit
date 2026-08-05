import { describe, expect, it } from "vitest";

import { getMarkdownStats, normalizeMarkdown } from "./lib";

describe("getMarkdownStats", () => {
  it("counts characters, words, lines, and headings", () => {
    const stats = getMarkdownStats(`# Title

Hello **world**

## Section
`);

    expect(stats.characters).toBeGreaterThan(0);
    expect(stats.words).toBe(6);
    expect(stats.lines).toBe(6);
    expect(stats.headings).toBe(2);
  });

  it("handles empty input", () => {
    expect(getMarkdownStats("")).toEqual({
      characters: 0,
      words: 0,
      lines: 0,
      headings: 0,
    });
  });
});

describe("normalizeMarkdown", () => {
  it("normalizes CRLF endings", () => {
    expect(normalizeMarkdown("a\r\nb\r\n")).toBe("a\nb");
  });
});
