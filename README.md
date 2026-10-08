# Rehan Mallik, portfolio

Live at **https://soemon007.github.io**

A one-page portfolio built with [Lovable](https://lovable.dev) and maintained as a typed, modular codebase:
TanStack Start, React 19, TypeScript, Tailwind CSS 4.

## Quick start

```sh
bun install
bun run dev        # local site with live reload
bun run check      # type check, lint, tests, static build and build verification
```

## Changing the site

| I want to… | Go to |
| --- | --- |
| Edit text, projects, experience, skills, links | `src/data/` (the only place content lives) |
| Change colours or fonts | `src/styles/tokens.css` |
| Add a section or a page | see the recipes in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Know the visual rules before adding anything | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |

Most edits are one object in a file in `src/data/`. For example, a new project is a copy of an existing block in
`src/data/projects.ts`; nothing else needs to change.

## Project layout

```
src/data/          content (typed)            src/components/sections/   one file per page section
src/routes/        URLs only                  src/components/cards/      project cards
src/styles/        tokens, utilities, motion  src/components/layout/     Section, Container, header, footer
src/test/          tests that guard the rules src/components/common/     PillLink, TagList, ProjectLinks
scripts/           static export + checks     docs/                      architecture and design system
```

## Publishing

The live site is served from the [`Soemon007.github.io`](https://github.com/Soemon007/Soemon007.github.io)
repo, which holds only the built output of this one. `bun run build:static` builds it into `dist/`;
publishing copies `dist/` there. Details, and how to switch on automatic publishing, are in
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#how-the-live-site-works).

## Working with Lovable and other assistants

[AGENTS.md](AGENTS.md) holds the project's rules in a form Lovable and other AI assistants read. The tests in
`src/test/` enforce them, so a change that breaks the design pattern fails `bun run check` with a message
saying which rule was broken.
