# Agents.md: Developer / AI Agent Guidelines — portfolio-v2

This file is a concise set of instructions to help AI agents and humans become productive in this repository quickly.

## Summary

- Next.js 16 app-router project (React 19, TS, Tailwind v4, Shadcn UI bits)
- _Features-driven_ structure: UI library under `core/`, feature modules under `features/`, and content under `features/**/content` (MDX + content-collections)
- Content pages (portfolio, blog) are authored in MDX and wired with `@content-collections`.

## Quick commands

Use these commands in the project root:

```bash
# Dev server
npm run dev

# Build for production
npm run build
npm run start

# Type-check and lint
npm run type-check
npm run lint
```

## Architecture & Important Files

- `app/` — Next.js app router. Each subfolder is a route; `app/layout.tsx` wraps the app.
- `core/components/ui` — shared UI primitives (Radix + Tailwind). Follow existing components (e.g. `Accordion`, `Card`)
- `core/components/providers` — global providers (themes, etc.). `Providers` is imported by `app/layout.tsx`.
- `features/` — feature-based code. Examples:
  - `features/marketing` — header/footer and marketing sections.
  - `features/portfolio` — project content (MDX) and components.
- `features/*/content/*.mdx` — content files; frontmatter is validated via `content-collections.ts`.
- `content-collections.ts` — zod schema for the `projects` collection. This is the single source of truth for frontmatter fields used across the site.
- `components.json` — shadcn config with `aliases` used by the project to resolve imports (e.g. `@/core/components` and `@/core/lib/utils`).
- `tsconfig.json` — includes path mapping for `@/*` and `content-collections` (maps to `.content-collections/generated`). Don't commit `.content-collections/generated`.

## Data & Content Flow

- A content collection is defined by `content-collections.ts` (zod schema). Each MDX page corresponds to a collection entry used throughout the site.
- Generated `allProjects` is imported from `content-collections` (path alias via `tsconfig`), and pages are created using `generateStaticParams()` in `app/portfolio/[slug]/page.tsx`.
- MDX files import React components and UI primitives at the top (e.g. `import { Badge } from '@/core/components/ui/badge'`). Keep this pattern.

## Coding Conventions & Patterns

- Use RSC (async) server components for data fetching: `async function Component()`.
- Mark client components explicitly with `"use client"` (e.g. interactive components and theme toggles).
- Use `cn()` (`core/lib/utils.ts`) + Tailwind to combine class names with `tailwind-merge`.
- UI building:
  - Reuse `core/components/ui/*` for consistency.
  - Keep `data-slot` attributes for testability and composition (many components already use this).
- Keep `mdx` content's frontmatter compatible with `content-collections.ts` (Zod schema). Required fields: `title`, `description`, `author`, `createdAt`, `updatedAt`, `coverImagePath`, `coverImageAlt`, `content`.

## MDX — Adding a content entry (portfolio example)

1. Place file in `features/portfolio/content/<slug>.mdx`.
2. Make sure frontmatter matches `content-collections.ts` schema. Minimal example:

```mdx
---
title: "My Project"
description: "What the project is about"
author: "Terry"
createdAt: "2025-11-27"
updatedAt: "2025-11-27"
coverImagePath: "/images/portfolio/my-project/hero.png"
coverImageAlt: "Project hero image"
tags: ["TypeScript", "Next.js"]
---

import { Badge } from '@/core/components/ui/badge'

# Example

Project text here...
```

## Notes & Gotchas

- `@content-collections` automatically generates `.content-collections/generated`. This folder is ignored — do not commit it.
- The app uses Next.js 16 features (App Router, RSC) and React 19. Avoid client-only patterns in server components.
- `app/layout.tsx` includes `Providers` and two feature components: `Header` (features/marketing) and `Footer` (features/marketing). When adding a global provider, wrap in `Providers`.
- Image sources under `public/images/portfolio/` are referenced in MDX frontmatter; keep file names/dimensions consistent for responsive behavior with `next/image`.

## Debugging & Developer Flow

- Local dev server: `npm run dev` — Next dev overlay will give runtime + compilation errors.
- Lint: `npm run lint` and TypeCheck: `npm run type-check`.
- For UI debugging, inspect `data-slot` attributes to locate UI component states quickly.

## Testing & CI

- No unit tests or CI are present. Helpful baseline PR checks:
  - `npm ci && npm run type-check && npm run build && npm run lint` for CI.

## When to open a PR / ask for review

- Add or update a UI primitive in `core/components/ui/` → request review for accessibility and small visual regressions.
- Add or modify content schema in `content-collections.ts` → verify all MDX files compile and update content frontmatter to match new schema.
- Add new feature UI under `features/*` → prefer code reuse from `core/components/ui`.

## Final Tips

- Keep PRs small and focused.
- Prefer consistent utility classes using `cn()`.
- Use `generateStaticParams()` for all dynamic pages that should be statically generated.

If anything in this project is unclear or you need a task example (add new portfolio page, build UI, add provider, etc.), ask for a specific action and I'll walk through the exact steps.
