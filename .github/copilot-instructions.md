# Copilot Instructions

## Project overview

- Framework: Next.js (App Router) with React 19 + TypeScript.
- Styling: Tailwind CSS v4, utilities via `clsx` + `tailwind-merge`.
- Lint/format: Biome (`biome.json`).
- Content: MDX files in `content/` with utilities in `src/lib/mdx*`.

## Structure to know

- App routes live in `src/app/**/page.tsx` and `src/app/layout.tsx`.
- Shared UI in `src/components/` and `src/components/ui/`.
- Theme system in `src/lib/theme/` (provider + script).
- Use path alias `@/*` for `src/*`.

## Coding conventions

- Prefer server components by default; add `"use client"` only when needed.
- Keep components small and focused; colocate route-specific UI under the route.
- Use `Metadata` and `Viewport` exports in layout/page when needed.
- Favor `async`/`await` for data loading in App Router pages.

## Styling conventions

- Prefer Tailwind utility classes; keep class lists readable and stable.
- Use `clsx` + `tailwind-merge` when building conditional classes.
- Avoid inline styles unless required for dynamic values.

## Commands

- Dev: `bun dev`.
- Build: `bun run build`.
- Lint: `bun run lint`.
- Format: `bun run format`.

## Instructions for Agent

- Use the `bun` package manager.
- Assume Dev server is already running on localhost:3000. Don't spin it again.
- Check linting and formatting, fix build errors(if any) after all code changes.
