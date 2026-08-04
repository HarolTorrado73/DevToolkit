"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  HASH_ALGORITHMS,
  hashText,
  type HashAlgorithm,
} from "@/tools/hash-generator/lib";

export default function HashGeneratorTool() {
  const inputId = useId();
  const algorithmId = useId();
  const outputId = useId();
  const statusId = useId();
  const [input, setInput] = useState("DevToolkit");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { status, copy } = useCopyToClipboard();

  async function runHash() {
    setPending(true);
    const result = await hashText(input, algorithm);
    setPending(false);

    if (result.ok) {
      setOutput(result.value);
      setError(null);
      return;
    }

    setError(result.error);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_12rem] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor={algorithmId}>Algorithm</Label>
          <select
            id={algorithmId}
            value={algorithm}
            onChange={(event) =>
              setAlgorithm(event.target.value as HashAlgorithm)
            }
            className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
          >
            {HASH_ALGORITHMS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Button type="button" onClick={() => void runHash()} disabled={pending}>
          {pending ? "Hashing…" : "Hash"}
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
            className="min-h-48 font-mono"
            aria-describedby={statusId}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={outputId}>Hash (hex)</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!output}
              onClick={() => void copy(output)}
              aria-label="Copy hash"
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
            className="min-h-48 font-mono"
          />
        </div>
      </div>

      <p
        id={statusId}
        className="text-muted-foreground min-h-5 text-sm"
        aria-live="polite"
      >
        {error ? <span className="text-destructive">{error}</span> : null}
      </p>
    </div>
  );
}
