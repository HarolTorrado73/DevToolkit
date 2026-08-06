"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  buildCronExpression,
  DEFAULT_CRON_PARTS,
  explainCron,
  parseCronExpression,
  type CronField,
  type CronParts,
} from "@/tools/cron-generator/lib";

const FIELD_LABELS: Record<CronField, string> = {
  minute: "Minute",
  hour: "Hour",
  dayOfMonth: "Day of month",
  month: "Month",
  dayOfWeek: "Day of week",
};

export default function CronGeneratorTool() {
  const expressionId = useId();
  const statusId = useId();
  const [parts, setParts] = useState<CronParts>(DEFAULT_CRON_PARTS);
  const expression = useMemo(() => buildCronExpression(parts), [parts]);
  const parsed = useMemo(
    () => parseCronExpression(expression, 5),
    [expression],
  );
  const { status, copy } = useCopyToClipboard();

  function updateField(field: CronField, value: string) {
    setParts((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(FIELD_LABELS) as CronField[]).map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={`${expressionId}-${field}`}>
              {FIELD_LABELS[field]}
            </Label>
            <Input
              id={`${expressionId}-${field}`}
              value={parts[field]}
              onChange={(event) => updateField(field, event.target.value)}
              spellCheck={false}
              className="font-mono"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={expressionId}>Cron expression</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void copy(expression)}
            aria-label="Copy cron expression"
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
          id={expressionId}
          value={expression}
          readOnly
          className="font-mono"
          aria-describedby={statusId}
        />
        <p className="text-muted-foreground text-sm">{explainCron(parts)}</p>
      </div>

      <div id={statusId} aria-live="polite" className="space-y-3">
        {!parsed.ok ? (
          <p className="text-destructive text-sm">{parsed.error}</p>
        ) : (
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Next 5 runs (UTC)</h2>
            <ol className="border-border/70 bg-card/40 space-y-2 rounded-xl border p-4 font-mono text-sm">
              {parsed.nextRuns.map((run) => (
                <li key={run}>{run}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setParts(DEFAULT_CRON_PARTS)}
        >
          Every 5 minutes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setParts({
              minute: "0",
              hour: "9",
              dayOfMonth: "*",
              month: "*",
              dayOfWeek: "1-5",
            })
          }
        >
          Weekdays at 09:00
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            setParts({
              minute: "0",
              hour: "0",
              dayOfMonth: "1",
              month: "*",
              dayOfWeek: "*",
            })
          }
        >
          Monthly
        </Button>
      </div>
    </div>
  );
}
