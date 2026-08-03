# Contributing to DevToolkit

Thanks for helping build a professional open-source toolkit for developers.

## Ground rules

- Keep the repository production-ready after every commit.
- Prefer small, focused pull requests.
- Follow Conventional Commits.
- Add tests for new logic (`lib.ts` helpers and meaningful UI flows).
- Do not commit secrets, credentials, or generated local artifacts.

## Development setup

```bash
npm install
npm run dev
```

Useful scripts:

| Command                 | Purpose                     |
| ----------------------- | --------------------------- |
| `npm run lint`          | ESLint                      |
| `npm run format`        | Prettier                    |
| `npm run typecheck`     | TypeScript                  |
| `npm run test`          | Unit tests                  |
| `npm run test:coverage` | Unit tests + coverage gates |
| `npm run build`         | Production build            |
| `npm run test:e2e`      | Playwright smoke tests      |

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(tools): add json formatter
fix(ui): keep theme toggle accessible before hydration
docs: clarify tool registration steps
chore(ci): cache npm dependencies
```

`feat` and `fix` commits drive semantic-release version bumps.

## Pull request checklist

- [ ] Linked issue or clear problem statement
- [ ] Types, lint, and tests pass locally
- [ ] UI remains keyboard accessible and responsive
- [ ] Docs updated when behavior or contribution flow changes
- [ ] No unrelated refactors

## Adding a tool

See [docs/adding-a-tool.md](./docs/adding-a-tool.md) and open a proposal with the
**Tool proposal** issue template when introducing a substantial new utility.

## Code of conduct

Participation is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md).
