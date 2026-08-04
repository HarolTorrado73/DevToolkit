"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  convertFromDateString,
  convertFromUnix,
  convertNow,
  type TimestampConversion,
} from "@/tools/timestamp-converter/lib";

export default function TimestampConverterTool() {
  const unixId = useId();
  const dateId = useId();
  const statusId = useId();
  const [unixInput, setUnixInput] = useState("1609459200");
  const [dateInput, setDateInput] = useState("2021-01-01T00:00:00.000Z");
  const [result, setResult] = useState<Extract<
    TimestampConversion,
    { ok: true }
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  function apply(conversion: TimestampConversion) {
    if (conversion.ok) {
      setResult(conversion);
      setUnixInput(String(conversion.unixSeconds));
      setDateInput(conversion.iso);
      setError(null);
      return;
    }
    setError(conversion.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => apply(convertFromUnix(unixInput))}>
          Convert Unix
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => apply(convertFromDateString(dateInput))}
        >
          Convert date
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => apply(convertNow())}
        >
          Use now
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={unixId}>Unix timestamp</Label>
          <Input
            id={unixId}
            value={unixInput}
            onChange={(event) => setUnixInput(event.target.value)}
            spellCheck={false}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={dateId}>Date string</Label>
          <Input
            id={dateId}
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            spellCheck={false}
            className="font-mono"
          />
        </div>
      </div>

      {result ? (
        <dl className="border-border/70 bg-card/40 grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-2">
          <ResultRow
            label="Unix seconds"
            value={String(result.unixSeconds)}
            onCopy={() => void copy(String(result.unixSeconds))}
            copied={status === "copied"}
          />
          <ResultRow
            label="Unix milliseconds"
            value={String(result.unixMilliseconds)}
            onCopy={() => void copy(String(result.unixMilliseconds))}
            copied={status === "copied"}
          />
          <ResultRow
            label="ISO"
            value={result.iso}
            onCopy={() => void copy(result.iso)}
            copied={status === "copied"}
          />
          <ResultRow
            label="UTC"
            value={result.utc}
            onCopy={() => void copy(result.utc)}
            copied={status === "copied"}
          />
          <ResultRow
            label="Local"
            value={result.local}
            onCopy={() => void copy(result.local)}
            copied={status === "copied"}
          />
        </dl>
      ) : null}

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

function ResultRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <dt className="text-muted-foreground">{label}</dt>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={onCopy}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
      <dd className="font-mono break-all">{value}</dd>
    </div>
  );
}
