export type MarkdownStats = {
  characters: number;
  words: number;
  lines: number;
  headings: number;
};

export function getMarkdownStats(input: string): MarkdownStats {
  const trimmedLines = input.length === 0 ? [] : input.split(/\r?\n/);
  const words = input.trim()
    ? input.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return {
    characters: input.length,
    words,
    lines: trimmedLines.length,
    headings: (input.match(/^#{1,6}\s+/gm) ?? []).length,
  };
}

export function normalizeMarkdown(input: string): string {
  return input.replace(/\r\n/g, "\n").trimEnd();
}
