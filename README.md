# DevToolkit

Free, fast, and modern developer tools that run entirely in your browser.

[![CI](https://github.com/HarolTorrado73/DevToolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/HarolTorrado73/DevToolkit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

> **EN** · Privacy by default. Open source. Built to scale for years.  
> **ES** · Privacidad por defecto. Código abierto. Diseñado para crecer durante años.

---

## English

### Why DevToolkit?

DevToolkit is a curated collection of everyday developer utilities with a product-quality shell:

- **Local-first** — tools are designed to process data in the browser
- **Modular** — each tool is an isolated module with shared UX contracts
- **Maintainable** — TypeScript strict mode, tests, CI, Conventional Commits, semantic-release
- **Contributor-friendly** — clear docs, issue templates, and a predictable architecture

### Available tools

**Phase 1**

- [JSON Formatter](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/json-formatter)
- [UUID Generator](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/uuid-generator)
- [Base64 Encoder / Decoder](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/base64)

**Phase 2**

- [Password Generator](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/password-generator)
- [Hash Generator](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/hash-generator)
- [JWT Decoder](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/jwt-decoder)
- [JWT Generator](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/jwt-generator)
- [Timestamp Converter](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/timestamp-converter)

**Phase 3**

- [SQL Formatter](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/sql-formatter)
- [YAML Formatter](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/yaml-formatter)
- [XML Formatter](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/xml-formatter)
- [Markdown Preview](https://github.com/HarolTorrado73/DevToolkit/blob/main/src/tools/markdown-preview)

### Stack

Next.js 15 · React · TypeScript · Tailwind CSS · shadcn/ui · Zustand · Vitest · Playwright

### Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                 | Description                 |
| ----------------------- | --------------------------- |
| `npm run dev`           | Development server          |
| `npm run build`         | Production build            |
| `npm run lint`          | ESLint                      |
| `npm run format`        | Prettier                    |
| `npm run typecheck`     | TypeScript checks           |
| `npm run test`          | Unit tests                  |
| `npm run test:coverage` | Unit tests + coverage gates |
| `npm run test:e2e`      | Playwright smoke tests      |

### Documentation

- [Architecture](./docs/architecture.md)
- [Adding a tool](./docs/adding-a-tool.md)
- [Testing](./docs/testing.md)
- [Roadmap](./docs/roadmap.md)
- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security](./SECURITY.md)

### License

MIT © DevToolkit contributors

---

## Español

### ¿Por qué DevToolkit?

DevToolkit es una colección de utilidades para desarrolladores con calidad de producto:

- **Local-first** — las herramientas procesan datos en el navegador
- **Modular** — cada herramienta es un módulo aislado con contratos UX compartidos
- **Mantenible** — TypeScript estricto, pruebas, CI, Conventional Commits y semantic-release
- **Amigable para contribuidores** — docs claras, plantillas de issues y arquitectura predecible

### Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Documentación

La documentación técnica principal está en inglés para maximizar el alcance internacional.
La guía de contribución y el roadmap viven en `docs/` y en la raíz del repositorio.

### Licencia

MIT © contribuidores de DevToolkit
