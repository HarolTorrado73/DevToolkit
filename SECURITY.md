# Security Policy

## Supported versions

Security fixes are applied to the latest release on `main`.

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Prefer one of these channels:

1. GitHub Security Advisories for this repository (once enabled)
2. A private email to the maintainers listed in the repository profile

Include:

- A description of the issue and its impact
- Steps to reproduce or a proof of concept
- Affected versions / commit SHA if known

We aim to acknowledge reports within 5 business days and will coordinate a fix
and disclosure timeline with the reporter.

## Client-side processing note

DevToolkit tools are designed to run in the browser. Still treat pasted secrets
carefully, and report any accidental persistence, logging, or network leakage.
