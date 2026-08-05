"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  formatSql,
  minifySql,
  SQL_DIALECTS,
  type SqlDialect,
} from "@/tools/sql-formatter/lib";

const SAMPLE = `select id, name, email from users where active = 1 and role = 'admin' order by name asc`;

export default function SqlFormatterTool() {
  const inputId = useId();
  const outputId = useId();
  const dialectId = useId();
  const statusId = useId();
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  function applyResult(
    result: ReturnType<typeof formatSql>,
    successMessage: string,
  ) {
    if (result.ok) {
      setOutput(result.value);
      setError(null);
      setStatusMessage(successMessage);
      return;
    }
    setError(result.error);
    setStatusMessage(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-2">
          <Label htmlFor={dialectId}>Dialect</Label>
          <select
            id={dialectId}
            value={dialect}
            onChange={(event) => setDialect(event.target.value as SqlDialect)}
            className="border-input bg-background h-9 rounded-lg border px-3 text-sm"
          >
            {SQL_DIALECTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          onClick={() =>
            applyResult(formatSql(input, dialect), "Formatted SQL.")
          }
        >
          Format
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => applyResult(minifySql(input), "Minified SQL.")}
        >
          Minify
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setOutput("");
            setError(null);
            setStatusMessage(null);
          }}
        >
          Reset sample
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={inputId}>Input</Label>
          <Textarea
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="min-h-72 font-mono"
            aria-invalid={Boolean(error)}
            aria-describedby={error || statusMessage ? statusId : undefined}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={outputId}>Output</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!output}
              onClick={() => void copy(output)}
              aria-label="Copy output"
            >
              {status === "copied" ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <CopyIcon aria-hidden="true" />
              )}
              {status === "copied" ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            id={outputId}
            value={output}
            readOnly
            spellCheck={false}
            className="min-h-72 font-mono"
          />
        </div>
      </div>

      <div id={statusId} aria-live="polite" className="min-h-5 text-sm">
        {error ? (
          <p className="text-destructive">{error}</p>
        ) : statusMessage ? (
          <p className="text-muted-foreground">{statusMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
