# Architecture

DevToolkit is a Next.js App Router application organized around a thin app shell and isolated tool modules.

## Layers

1. **App shell** — layouts, navigation, theming, SEO, and shared UI.
2. **Tool registry** — discovers tools and powers catalog routes.
3. **Tool modules** — one directory per tool with UI, pure logic, and tests.
4. **Shared libraries** — utilities, SEO helpers, and design-system components.

## Tool module contract

Each tool lives under `src/tools/<tool-id>/` and exports a `ToolDefinition` from `index.ts`:

| Field                  | Purpose                           |
| ---------------------- | --------------------------------- |
| `id`                   | Stable identifier                 |
| `slug`                 | URL segment under `/tools/[slug]` |
| `name` / `description` | UI + SEO copy                     |
| `category`             | Catalog grouping                  |
| `keywords`             | Search + metadata                 |
| `icon`                 | Lucide icon component             |
| `load`                 | Dynamic import of the tool UI     |
| `related`              | Optional related tool ids         |

Pure business logic belongs in `lib.ts` so unit tests stay fast and UI-free.

## Routing

- `/` — product landing page
- `/tools` — searchable catalog driven by the registry
- `/tools/[slug]` — lazy-loaded tool page with metadata from the registry
- `/docs`, `/about` — project documentation surfaces

## State

Zustand powers lightweight UI state for the catalog (search query and category filters). Tool payloads are not persisted.

## Extensibility rules

- Prefer adding a new module over growing shared god-files.
- Keep tool dependencies local to the module when possible.
- Register every tool in `src/tools/registry.ts`.
- Ship unit tests for `lib.ts` with every tool.
