# reload-terminal

`reload-terminal` is a VS Code extension project focused on reloading terminal sessions in a predictable way.

## Current Status

This repository is in early development. The current command registration is a starter command:

- Command ID: `reload-terminal.helloWorld`
- Title: `Hello World`

## Goals

- Reload a terminal session in its original state.
- Keep the extension behavior simple and reliable.
- Ship changes through an automated release flow using Release Please.

## Development

Requirements:

- Node.js 22+
- `pnpm`
- VS Code 1.109.0+

Install dependencies:

```bash
pnpm install
```

Useful scripts:

- `pnpm run compile` - Type-check, lint, and build.
- `pnpm run watch` - Watch mode for TypeScript + esbuild.
- `pnpm run lint` - Lint `src`.
- `pnpm run test` - Run extension tests.

## Release Process

This repo uses Conventional Commits with Release Please.

- Use commit/PR titles like `feat: ...`, `fix: ...`, `chore: ...`.
- Avoid non-conventional merge titles, or Release Please will skip creating a release PR.
- Version updates are tracked in `package.json` and release artifacts.

## Contributing

- Keep changes small and reviewable.
- Ensure commits follow Conventional Commits.
- Update docs when behavior changes.
