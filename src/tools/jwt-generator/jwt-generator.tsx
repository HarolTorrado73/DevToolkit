"use client";

import { useId, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { generateJwt } from "@/tools/jwt-generator/lib";

const DEFAULT_PAYLOAD = `{
  "name": "DevToolkit",
  "role": "developer"
}`;

export default function JwtGeneratorTool() {
  const payloadId = useId();
  const secretId = useId();
  const expiresId = useId();
  const issuerId = useId();
  const subjectId = useId();
  const audienceId = useId();
  const outputId = useId();
  const statusId = useId();

  const [payloadJson, setPayloadJson] = useState(DEFAULT_PAYLOAD);
  const [secret, setSecret] = useState("change-me");
  const [expiresInSeconds, setExpiresInSeconds] = useState(3600);
  const [issuer, setIssuer] = useState("devtoolkit");
  const [subject, setSubject] = useState("");
  const [audience, setAudience] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { status, copy } = useCopyToClipboard();

  async function runGenerate() {
    setPending(true);
    const result = await generateJwt({
      payloadJson,
      secret,
      expiresInSeconds,
      issuer,
      subject,
      audience,
    });
    setPending(false);

    if (result.ok) {
      setToken(result.token);
      setError(null);
      return;
    }

    setError(result.error);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={secretId}>Secret (HS256)</Label>
          <Input
            id={secretId}
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={expiresId}>Expires in (seconds)</Label>
          <Input
            id={expiresId}
            type="number"
            min={0}
            value={expiresInSeconds}
            onChange={(event) =>
              setExpiresInSeconds(
                Math.max(0, Math.trunc(Number(event.target.value) || 0)),
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={issuerId}>Issuer (iss)</Label>
          <Input
            id={issuerId}
            value={issuer}
            onChange={(event) => setIssuer(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={subjectId}>Subject (sub)</Label>
          <Input
            id={subjectId}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={audienceId}>Audience (aud)</Label>
          <Input
            id={audienceId}
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={payloadId}>Payload JSON</Label>
        <Textarea
          id={payloadId}
          value={payloadJson}
          onChange={(event) => setPayloadJson(event.target.value)}
          spellCheck={false}
          className="min-h-40 font-mono"
        />
      </div>

      <Button
        type="button"
        onClick={() => void runGenerate()}
        disabled={pending}
      >
        {pending ? "Signing…" : "Generate JWT"}
      </Button>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={outputId}>Token</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!token}
            onClick={() => void copy(token)}
            aria-label="Copy token"
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
          value={token}
          readOnly
          spellCheck={false}
          className="min-h-28 font-mono"
          aria-describedby={statusId}
        />
      </div>

      <p
        id={statusId}
        className="text-muted-foreground min-h-5 text-sm"
        aria-live="polite"
      >
        {error ? (
          <span className="text-destructive">{error}</span>
        ) : (
          "Tokens are signed locally with HS256 and never leave your browser."
        )}
      </p>
    </div>
  );
}
