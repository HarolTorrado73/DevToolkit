"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  replaceRegex,
  testRegex,
  type RegexFlags,
} from "@/tools/regex-tester/lib";

const DEFAULT_FLAGS: RegexFlags = {
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
  unicode: false,
};

export default function RegexTesterTool() {
  const patternId = useId();
  const inputId = useId();
  const replacementId = useId();
  const statusId = useId();
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [input, setInput] = useState(
    "Contact us at hello@devtoolkit.dev or support@example.com",
  );
  const [replacement, setReplacement] = useState("[email]");
  const [flags, setFlags] = useState<RegexFlags>(DEFAULT_FLAGS);
  const [replaced, setReplaced] = useState("");
  const { status, copy } = useCopyToClipboard();

  const result = useMemo(
    () => testRegex(pattern, input, flags),
    [pattern, input, flags],
  );

  function runReplace() {
    const next = replaceRegex(pattern, input, replacement, flags);
    if (next.ok && next.value !== undefined) {
      setReplaced(next.value);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor={patternId}>Pattern</Label>
          <Input
            id={patternId}
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            spellCheck={false}
            className="font-mono"
            aria-describedby={statusId}
          />
        </div>
        <fieldset className="flex flex-wrap gap-3 pb-1">
          <legend className="sr-only">Flags</legend>
          {(
            [
              ["global", "g"],
              ["ignoreCase", "i"],
              ["multiline", "m"],
              ["dotAll", "s"],
              ["unicode", "u"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={flags[key]}
                onChange={(event) =>
                  setFlags((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
                className="accent-foreground size-4"
              />
              {label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="space-y-2">
        <Label htmlFor={inputId}>Test string</Label>
        <Textarea
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          className="min-h-32 font-mono"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor={replacementId}>Replacement</Label>
          <Input
            id={replacementId}
            value={replacement}
            onChange={(event) => setReplacement(event.target.value)}
            spellCheck={false}
            className="font-mono"
          />
        </div>
        <Button type="button" onClick={runReplace}>
          Replace
        </Button>
      </div>

      <div id={statusId} aria-live="polite" className="space-y-3 text-sm">
        {!result.ok ? (
          <p className="text-destructive">{result.error}</p>
        ) : (
          <>
            <p className="text-muted-foreground">
              {result.matchCount} match{result.matchCount === 1 ? "" : "es"}
            </p>
            {result.matches.length > 0 ? (
              <ul className="space-y-2">
                {result.matches.map((match, index) => (
                  <li
                    key={`${match.index}-${match.match}-${index}`}
                    className="border-border/70 bg-card/40 rounded-lg border p-3 font-mono"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>
                        #{index + 1} @ {match.index}: &quot;{match.match}&quot;
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => void copy(match.match)}
                        aria-label={`Copy match ${index + 1}`}
                      >
                        {status === "copied" ? (
                          <CheckIcon aria-hidden="true" />
                        ) : (
                          <CopyIcon aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                    {match.groups.length > 0 ? (
                      <p className="text-muted-foreground mt-1">
                        Groups: {match.groups.join(", ")}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>

      {replaced ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={`${replacementId}-output`}>Replaced output</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void copy(replaced)}
              aria-label="Copy replaced output"
            >
              {status === "copied" ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            id={`${replacementId}-output`}
            value={replaced}
            readOnly
            className="min-h-24 font-mono"
          />
        </div>
      ) : null}
    </div>
  );
}
