"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  estimatePasswordStrength,
  generatePassword,
} from "@/tools/password-generator/lib";

export default function PasswordGeneratorTool() {
  const lengthId = useId();
  const outputId = useId();
  const statusId = useId();
  const [length, setLength] = useState(16);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState(() => {
    const result = generatePassword({
      length: 16,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
    return result.ok ? result.value : "";
  });
  const [error, setError] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  const strength = useMemo(
    () => estimatePasswordStrength(password),
    [password],
  );

  function regenerate() {
    const result = generatePassword({
      length,
      lowercase,
      uppercase,
      numbers,
      symbols,
      excludeAmbiguous,
    });

    if (result.ok) {
      setPassword(result.value);
      setError(null);
      return;
    }

    setError(result.error);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor={lengthId}>Length</Label>
          <Input
            id={lengthId}
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(event) => {
              const next = Number(event.target.value);
              setLength(
                Number.isFinite(next)
                  ? Math.min(Math.max(Math.trunc(next), 4), 128)
                  : 16,
              );
            }}
          />
        </div>
        <Button type="button" onClick={regenerate} className="gap-2 sm:w-fit">
          <RefreshCwIcon aria-hidden="true" />
          Generate
        </Button>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Character sets</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <CharsetToggle
            label="Lowercase (a-z)"
            checked={lowercase}
            onChange={setLowercase}
          />
          <CharsetToggle
            label="Uppercase (A-Z)"
            checked={uppercase}
            onChange={setUppercase}
          />
          <CharsetToggle
            label="Numbers (0-9)"
            checked={numbers}
            onChange={setNumbers}
          />
          <CharsetToggle
            label="Symbols (!@#...)"
            checked={symbols}
            onChange={setSymbols}
          />
          <CharsetToggle
            label="Exclude ambiguous (O/0/l/1)"
            checked={excludeAmbiguous}
            onChange={setExcludeAmbiguous}
          />
        </div>
      </fieldset>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={outputId}>Password</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!password}
            onClick={() => void copy(password)}
            aria-label="Copy password"
          >
            {status === "copied" ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
            {status === "copied" ? "Copied" : "Copy"}
          </Button>
        </div>
        <Input
          id={outputId}
          value={password}
          readOnly
          spellCheck={false}
          className="font-mono"
          aria-describedby={statusId}
        />
        <p
          id={statusId}
          className="text-muted-foreground text-sm"
          aria-live="polite"
        >
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            <>
              Strength:{" "}
              <span className="text-foreground">{strength.label}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function CharsetToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-foreground size-4"
      />
      {label}
    </label>
  );
}
