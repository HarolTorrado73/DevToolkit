"use client";

import { useEffect, useId, useState } from "react";
import { DownloadIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  generateQrDataUrl,
  type QrErrorCorrectionLevel,
} from "@/tools/qr-generator/lib";

export default function QrGeneratorTool() {
  const textId = useId();
  const sizeId = useId();
  const marginId = useId();
  const levelId = useId();
  const statusId = useId();
  const [text, setText] = useState(
    "https://github.com/HarolTorrado73/DevToolkit",
  );
  const [width, setWidth] = useState(256);
  const [margin, setMargin] = useState(2);
  const [level, setLevel] = useState<QrErrorCorrectionLevel>("M");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setPending(true);
      const result = await generateQrDataUrl({
        text,
        width,
        margin,
        errorCorrectionLevel: level,
      });
      if (cancelled) return;
      setPending(false);

      if (result.ok) {
        setDataUrl(result.dataUrl);
        setError(null);
        return;
      }

      setDataUrl("");
      setError(result.error);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [text, width, margin, level]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={textId}>Text or URL</Label>
          <Input
            id={textId}
            value={text}
            onChange={(event) => setText(event.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={sizeId}>Size (px)</Label>
          <Input
            id={sizeId}
            type="number"
            min={64}
            max={1024}
            value={width}
            onChange={(event) =>
              setWidth(
                Math.min(
                  1024,
                  Math.max(64, Math.trunc(Number(event.target.value) || 256)),
                ),
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={marginId}>Margin</Label>
          <Input
            id={marginId}
            type="number"
            min={0}
            max={16}
            value={margin}
            onChange={(event) =>
              setMargin(
                Math.min(
                  16,
                  Math.max(0, Math.trunc(Number(event.target.value) || 0)),
                ),
              )
            }
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={levelId}>Error correction</Label>
          <select
            id={levelId}
            value={level}
            onChange={(event) =>
              setLevel(event.target.value as QrErrorCorrectionLevel)
            }
            className="border-input bg-background h-9 w-full rounded-lg border px-3 text-sm"
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="border-border/70 bg-card/40 flex min-h-64 min-w-64 items-center justify-center rounded-xl border p-4">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt={`QR code for ${text}`}
              width={width}
              height={width}
              className="max-h-64 max-w-64"
            />
          ) : (
            <p className="text-muted-foreground text-sm">
              {pending ? "Generating…" : "QR preview"}
            </p>
          )}
        </div>
        <a
          href={dataUrl || undefined}
          download="devtoolkit-qr.png"
          aria-disabled={!dataUrl}
          className={cn(
            buttonVariants(),
            "gap-2",
            !dataUrl && "pointer-events-none opacity-50",
          )}
        >
          <DownloadIcon aria-hidden="true" />
          Download PNG
        </a>
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
