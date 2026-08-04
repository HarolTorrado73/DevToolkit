"use client";

import { useId, useState } from "react";
import { ArrowLeftRightIcon, CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { decodeBase64, encodeBase64 } from "@/tools/base64/lib";

export default function Base64Tool() {
  const inputId = useId();
  const outputId = useId();
  const statusId = useId();
  const [input, setInput] = useState("DevToolkit");
  const [output, setOutput] = useState("RGV2VG9vbGtpdA==");
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(
    "Encoded sample text.",
  );
  const { status, copy } = useCopyToClipboard();

  function runEncode() {
    const result = encodeBase64(input);
    if (result.ok) {
      setOutput(result.value);
      setError(null);
      setStatusMessage("Encoded to Base64.");
      return;
    }
    setError(result.error);
    setStatusMessage(null);
  }

  function runDecode() {
    const result = decodeBase64(input);
    if (result.ok) {
      setOutput(result.value);
      setError(null);
      setStatusMessage("Decoded from Base64.");
      return;
    }
    setError(result.error);
    setStatusMessage(null);
  }

  function swapFields() {
    setInput(output);
    setOutput(input);
    setError(null);
    setStatusMessage("Swapped input and output.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={runEncode}>
          Encode
        </Button>
        <Button type="button" variant="secondary" onClick={runDecode}>
          Decode
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={swapFields}
          className="gap-2"
        >
          <ArrowLeftRightIcon aria-hidden="true" />
          Swap
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
            className="min-h-56 font-mono"
            aria-invalid={Boolean(error)}
            aria-describedby={error || statusMessage ? statusId : undefined}
            placeholder="Text or Base64"
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
            className="min-h-56 font-mono"
            placeholder="Result appears here."
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
