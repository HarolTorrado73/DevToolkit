"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { generateUuids } from "@/tools/uuid-generator/lib";

export default function UuidGeneratorTool() {
  const countId = useId();
  const outputId = useId();
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [values, setValues] = useState(() => generateUuids({ count: 1 }));
  const { status, copy } = useCopyToClipboard();

  const output = useMemo(() => values.join("\n"), [values]);

  function regenerate(nextCount = count, nextUppercase = uppercase) {
    setValues(
      generateUuids({
        count: nextCount,
        uppercase: nextUppercase,
      }),
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor={countId}>Count</Label>
          <Input
            id={countId}
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => {
              const next = Number(event.target.value);
              const safe = Number.isFinite(next)
                ? Math.min(Math.max(Math.trunc(next), 1), 100)
                : 1;
              setCount(safe);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(event) => setUppercase(event.target.checked)}
              className="accent-foreground size-4"
            />
            Uppercase
          </label>
          <Button type="button" onClick={() => regenerate()} className="gap-2">
            <RefreshCwIcon aria-hidden="true" />
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={outputId}>UUIDs</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!output}
            onClick={() => void copy(output)}
            aria-label="Copy generated UUIDs"
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
  );
}
