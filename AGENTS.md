# AGENTS.md

## Purpose

This file defines repository-level contribution and release rules for `reload-terminal`.

## Commit Standard

Use Conventional Commits for all commits and PR titles:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`
- `ci: ...`

Rules:

- Keep subject lines imperative and concise.
- Add scope when useful, for example `feat(terminal): add reload command`.
- Use `!` or `BREAKING CHANGE:` in the body for breaking changes.

## Release Please Requirements

Release automation depends on Conventional Commit parsing.

- Non-conventional commit messages can cause `release-please` to report zero releasable commits.
- Merge/squash PR titles must also be conventional (the merge commit message is parsed).

## Versioning Rule

Always increment `package.json` version for each branch/release update in this repository.

## Pre-merge Checklist

- `pnpm run lint`
- `pnpm run check-types`
- `pnpm run compile`
- Confirm commit/PR title follows Conventional Commits.
