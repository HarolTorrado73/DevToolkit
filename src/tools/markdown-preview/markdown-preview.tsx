"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  getMarkdownStats,
  normalizeMarkdown,
} from "@/tools/markdown-preview/lib";

const SAMPLE = `# DevToolkit

Write **Markdown** on the left and preview it instantly.

## Features

- GitHub Flavored Markdown
- Live preview
- Local-only processing

\`\`\`ts
const tools = ["json", "sql", "markdown"];
\`\`\`
`;

export default function MarkdownPreviewTool() {
  const inputId = useId();
  const previewId = useId();
  const [input, setInput] = useState(SAMPLE);
  const { status, copy } = useCopyToClipboard();
  const stats = useMemo(() => getMarkdownStats(input), [input]);
  const normalized = useMemo(() => normalizeMarkdown(input), [input]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">
          {stats.words} words · {stats.characters} chars · {stats.lines} lines ·{" "}
          {stats.headings} headings
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!input}
            onClick={() => void copy(input)}
            aria-label="Copy markdown"
          >
            {status === "copied" ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
            {status === "copied" ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setInput(SAMPLE)}
          >
            Reset sample
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={inputId}>Markdown</Label>
          <Textarea
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="min-h-[28rem] font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={previewId}>Preview</Label>
          <div
            id={previewId}
            className="border-border/70 bg-card/40 markdown-preview [&_a]:text-foreground [&_code]:bg-muted [&_pre]:bg-muted min-h-[28rem] max-w-none overflow-auto rounded-xl border p-4 text-sm leading-relaxed [&_a]:underline [&_code]:rounded [&_code]:px-1 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {normalized}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
