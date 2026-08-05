"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { formatYaml, minifyYaml, yamlToJson } from "@/tools/yaml-formatter/lib";

const SAMPLE = `name: DevToolkit
version: 1
features:
  - format
  - minify
  - convert
`;

export default function YamlFormatterTool() {
  const inputId = useId();
  const outputId = useId();
  const statusId = useId();
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  function applyResult(
    result: ReturnType<typeof formatYaml>,
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
          onClick={() => applyResult(formatYaml(input), "Formatted YAML.")}
        >
          Format
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => applyResult(minifyYaml(input), "Minified YAML.")}
        >
          Minify
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => applyResult(yamlToJson(input), "Converted to JSON.")}
        >
          To JSON
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
