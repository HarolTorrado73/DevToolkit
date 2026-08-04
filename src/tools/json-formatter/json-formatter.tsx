"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  formatJson,
  minifyJson,
  validateJson,
} from "@/tools/json-formatter/lib";

const SAMPLE_JSON = `{
  "name": "DevToolkit",
  "version": 1,
  "features": ["format", "minify", "validate"]
}`;

export default function JsonFormatterTool() {
  const inputId = useId();
  const outputId = useId();
  const statusId = useId();
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  function applyResult(
    result: ReturnType<typeof formatJson>,
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
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => applyResult(formatJson(input), "Formatted JSON.")}
        >
          Format
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => applyResult(minifyJson(input), "Minified JSON.")}
        >
          Minify
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => applyResult(validateJson(input), "JSON is valid.")}
        >
          Validate
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE_JSON);
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
            placeholder='{"hello":"world"}'
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
            placeholder="Formatted output appears here."
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
