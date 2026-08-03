# Adding a tool

Follow this checklist to ship a new DevToolkit module.

## 1. Create the module folder

```text
src/tools/<tool-id>/
  index.ts          # ToolDefinition export
  <tool-id>.tsx     # Client or server UI
  lib.ts            # Pure logic
  lib.test.ts       # Unit tests
```

## 2. Implement pure logic first

Write deterministic helpers in `lib.ts` and cover them with Vitest before wiring UI.

## 3. Build the UI

Compose shared primitives from `src/components/ui` and wrap the page content with `ToolShell` (handled by the dynamic route).

Keep accessibility in mind:

- Label every control
- Preserve keyboard access
- Announce errors with clear text

## 4. Export a definition

```ts
import { BracesIcon } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";

export const jsonFormatterTool: ToolDefinition = {
  id: "json-formatter",
  slug: "json-formatter",
  name: "JSON Formatter",
  description: "Format, minify, and validate JSON in your browser.",
  category: "formatters",
  keywords: ["json", "pretty print", "minify"],
  icon: BracesIcon,
  load: () => import("./json-formatter"),
};
```

## 5. Register the tool

Import the definition in `src/tools/registry.ts` and append it to the `tools` array.

## 6. Verify locally

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Open `/tools/<slug>` and confirm metadata, empty states, and happy paths.

## 7. Open a pull request

Use Conventional Commits (`feat(tools): add json formatter`) and fill the PR template.
