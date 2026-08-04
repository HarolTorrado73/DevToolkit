"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { decodeJwt } from "@/tools/jwt-decoder/lib";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlRvb2xraXQiLCJpYXQiOjE1MTYyMzkwMjJ9.signature";

export default function JwtDecoderTool() {
  const inputId = useId();
  const headerId = useId();
  const payloadId = useId();
  const statusId = useId();
  const [input, setInput] = useState(SAMPLE);
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { status, copy } = useCopyToClipboard();

  function runDecode() {
    const result = decodeJwt(input);
    if (result.ok) {
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
      setError(null);
      return;
    }

    setError(result.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={runDecode}>
          Decode
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput(SAMPLE);
            setHeader("");
            setPayload("");
            setSignature("");
            setError(null);
          }}
        >
          Reset sample
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor={inputId}>JWT</Label>
        <Textarea
          id={inputId}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          className="min-h-28 font-mono"
          aria-describedby={statusId}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={headerId}>Header</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!header}
              onClick={() => void copy(header)}
              aria-label="Copy header"
            >
              {status === "copied" ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <CopyIcon aria-hidden="true" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            id={headerId}
            value={header}
            readOnly
            spellCheck={false}
            className="min-h-40 font-mono"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor={payloadId}>Payload</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!payload}
              onClick={() => void copy(payload)}
              aria-label="Copy payload"
            >
              {status === "copied" ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <CopyIcon aria-hidden="true" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            id={payloadId}
            value={payload}
            readOnly
            spellCheck={false}
            className="min-h-40 font-mono"
          />
        </div>
      </div>

      {signature ? (
        <p className="text-muted-foreground font-mono text-sm break-all">
          Signature: {signature}
        </p>
      ) : null}

      <p
        id={statusId}
        className="text-muted-foreground min-h-5 text-sm"
        aria-live="polite"
      >
        {error ? (
          <span className="text-destructive">{error}</span>
        ) : (
          "Signature is displayed only — verification is not performed."
        )}
      </p>
    </div>
  );
}
