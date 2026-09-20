# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio site for a student group's bachelor project (Gruppe 14, Universitetet i Agder). Astro 7, static output, no backend. All user-facing copy is Norwegian (`lang="no"`) — keep new copy in Norwegian with proper æ/ø/å. Code comments are Norwegian too, since the group reads them.

This replaced a hand-written set of four flat HTML files in September 2026. If you see `index.html`/`styles.css`/`script.js` at the repo root in an old branch, that is the previous version.

## Commands

```sh
pnpm install     # once
pnpm dev         # dev server, http://localhost:4321
pnpm build       # static output to dist/
pnpm preview     # serve dist/ as it will be in production
pnpm check       # astro check — type/template diagnostics, 0 errors expected
```

There is no test suite and no linter. `pnpm check` is the closest thing to a gate; run it before declaring work done.

`sharp` is a direct dependency, not optional — Astro 7's image service fails the build without it. `pnpm.onlyBuiltDependencies` in [package.json](package.json) must keep listing `esbuild` and `sharp`, or pnpm blocks their install scripts and the build breaks again. `typescript` is pinned to `^6` because `@astrojs/check` 0.9 does not accept TypeScript 7.

## Architecture

File-based routing, one directory per page, `build.format: 'directory'` so URLs are `/about/` not `/about.html`:

```
src/pages/index.astro          →  /
src/pages/about/index.astro    →  /about/
src/pages/projects/index.astro →  /projects/
src/pages/contact/index.astro  →  /contact/
```

**Single source of truth is the organizing principle here**, because the previous version's core problem was duplication — nav and footer pasted into four files, the GitHub/LinkedIn SVG pasted ten times. Three places now hold what used to be scattered:

- [src/data/site.js](src/data/site.js) — group name, email, nav array, prebuilt `mailtoHref`. The nav renders from this in both header and footer.
- [src/data/team.js](src/data/team.js) — the five members. `/about/`'s cards are generated from this array; there is no per-person markup. A member without a `photo` gets a "Bilde kommer" card, and links that are absent from `links` simply do not render.
- [src/components/Icon.astro](src/components/Icon.astro) — every SVG path on the site, in one `paths` map.

[src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) owns `<head>`, `<Header>` and `<Footer>`. Pages supply `title`, `description`, and optionally `overlayHeader`.

Styling is scoped-by-default: [src/styles/tokens.css](src/styles/tokens.css) holds every color, type step and spacing value; [src/styles/global.css](src/styles/global.css) holds the reset, base typography and a handful of shared primitives (`.container`, `.section`, `.button`, `.prose`, `.label`). Everything else lives in `<style>` inside the component that uses it. **Do not grow global.css with component styles** — that is how the old single 154-line stylesheet became unmaintainable. Reach for tokens rather than literal values.

## The visual system

Dark graphite, greyscale, technical. Three rules carry it, and each was arrived at by the group rejecting the alternative:

1. **No accent colour anywhere.** An earlier pass used violet for labels and links; it was rejected. Emphasis is carried by *lightness* instead — `--hi` for buttons and the active nav item, the four `--text-*` steps for hierarchy. `--steel` exists solely for focus rings. If you find yourself wanting a colour, use a brighter grey.
2. **Graphite, never black, and never light.** Four surface steps (`--bg-deep` → `--surface`) sit deliberately close in value and are separated by hairlines, the way technical UIs do it. A light theme was tried and rejected as too bright.
3. **Monospace is the texture.** `--font-code` (JetBrains Mono) carries labels, metadata, numbering, file paths and the contact address — anything that is data. `--font-body` (Inter) carries prose and headings. There is no serif; headings are semibold sans with negative tracking (`--tracking-display`).

**All four `--text-*` steps clear WCAG AA (4.5:1) against all four surfaces**, including the weakest step on the lightest card. This is a real constraint, not an aspiration — the scale was rebalanced once because `--text-faint` fell to 2.86:1 on `--surface`. If you lighten a surface or darken a text step, recheck the whole matrix.

Fonts are **self-hosted**, declared in [astro.config.mjs](astro.config.mjs) via `fontProviders.google()` and emitted by `<Font>` in the layout. Astro downloads them at build time, so a visitor's browser never contacts Google. Do not replace this with a `<link>` to Google Fonts.

## The header's two states

This is the one piece of real behavior on the site, and it is easy to break.

`Header.astro` renders either `is-overlay` (transparent, white text, sitting on top of the front-page photo) or `is-solid` (white with a blur, dark text). `BaseLayout` passes `overlayHeader`; **only the front page sets it**. Every other page gets `is-solid` rendered server-side and needs no JavaScript at all.

The swap is done by an `IntersectionObserver` watching whatever carries `data-header-watch` — in practice the `<section>` in [Hero.astro](src/components/Hero.astro). Its `rootMargin` is pulled from the `--header-height` token at runtime, so if you change that token the switch point follows automatically. If no `data-header-watch` element exists, the script no-ops and the header stays solid, which is the correct fallback.

Because the header is `position: fixed`, pages without an overlay header get `padding-top: var(--header-height)` via `main.is-offset`. Drop that and the first section slides under the header.

## Missing media is a designed state, not a bug

The group photo and the video do not exist yet. [src/lib/media.js](src/lib/media.js) resolves them with `import.meta.glob` over `src/assets/media/`, returning `null` when the folder is empty, and the components fall back to [MediaPlaceholder.astro](src/components/MediaPlaceholder.astro) ("Bilde kommer" / "Video kommer" with the expected filename as a hint).

The point is that the build succeeds and the page looks finished while the files are pending. **Do not "fix" this by importing the files directly** — a static `import` of a non-existent asset fails the build. Dropping `gruppebilde.jpg` or `gruppepresentasjon.mp4` into `src/assets/media/` is all that is needed; lookup is by basename so any extension works.

`TeamCard.astro` does the same thing for profile photos via its own glob over `src/assets/team/`.

## Layout constraints worth knowing

- **Never put `aspect-ratio` on a full-viewport section.** The hero originally paired `min-height: 100svh` with `aspect-ratio: 16/9`; on a tall narrow window the ratio forced the width past the viewport and the whole page scrolled sideways. The hero now sets width and min-height only, and lets `object-fit: cover` adapt the photo. `html { overflow-x: hidden }` is a safety net, not the fix.
- The `/about/` team grid is `auto-fit`, so it handles any number of members. A `:has(> :last-child:nth-child(5))` rule centers the trailing two cards in the exactly-five case; it is deliberately scoped so a group of four or six is not broken by it.

## Content status

- **Bios are real** for Marius, Erfan, Zent and Matias, written in first person. Elise's is real too but she has no photo (`photo: null`) and no GitHub username — both marked `TODO` in `team.js`. Do not invent a username; an absent link renders as nothing, which is the intended behavior.
- **`/projects/` has no projects, on purpose.** The old page showed two invented projects ("Prosjekt Aurora", "Prosjekt Kompass") with Unsplash stock photos. It now says plainly that the bachelor assignment is not chosen yet and invites one. Do not repopulate it with sample projects.
- **`/contact/` has no form, on purpose.** A working form needs a server to hold an email API key, and this project has no backend. The `mailto:` link *is* the working answer. Don't reintroduce a form without first solving where the key lives.
- All stock imagery was dropped in the rewrite. The site no longer hotlinks Unsplash, so it renders correctly offline.
- `/about/` carries a **tech stack section** driven by `stack` in [src/data/site.js](src/data/site.js). Keep that list honest — it is there for employers, so only add things the group can answer questions about.

## Git

Work happens on `dev`, merges to `main`. Note the remote carries both `origin/Dev` and `origin/dev` — a casing split from earlier merges — and [push-dev.command](push-dev.command) (a double-clickable script for non-CLI teammates) pushes to `origin Dev` specifically. Check which you track before pushing.

Several people edit the same files. The previous version had **committed merge-conflict markers** sitting in `about.html` for weeks, which produced a duplicate team card on the live page. Moving per-person content into `team.js` makes that far less likely, but after any merge it is still worth running `grep -rn '^<<<<<<<' src/` before committing.
