# Testing

## Unit tests (Vitest)

```bash
npm run test
npm run test:coverage
```

Conventions:

- Pure tool logic lives in `lib.ts` and is covered by `lib.test.ts`.
- Shared helpers under `src/lib` and stores under `src/stores` should keep meaningful coverage.
- Prefer deterministic tests with no network access.

## End-to-end tests (Playwright)

```bash
npm run build
npm run test:e2e
```

Smoke tests verify the app shell, catalog empty state, and unknown tool handling. Expand coverage as tools ship.
