# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio site for a student group's bachelor project (Gruppe 14, Universitetet i Agder). **Next.js 15 (App Router) + React 19 + TypeScript**, no backend, no API routes. All user-facing copy is Norwegian (`lang="no"`) — keep new copy in Norwegian with proper æ/ø/å. Code comments are Norwegian too, since the group reads them.

History, newest first: Next.js since 2026-09-22 (commit `26ac28c`, "Endret til next.js"); before that a short-lived Astro 7 version; before that four hand-written flat HTML files. Comments that say "slik Astro gjorde" refer to the middle version — several decisions (image widths, trailing slashes) were made to keep output identical across that migration.

**`about.html`, `projects.html` and `styles.css` at the repo root are dead leftovers** from the flat-HTML version. They were deleted on the Astro branch but came back through a merge from `main`. Next does not serve them and nothing imports them; don't edit them thinking you are changing the site. The [README.md](README.md) is also still written for Astro (port 4321, `src/pages/`, `.astro` files, `team.js`) — trust this file and the code over it.

## Commands

```sh
pnpm install     # once
pnpm dev         # generates image variants, then next dev --turbo on http://localhost:3000
pnpm build       # generates image variants, then next build
pnpm start       # serve the production build (pnpm preview is an alias)
pnpm images      # regenerate image variants only (see "Images" below)
pnpm check       # tsc --noEmit — 0 errors expected
```

There is no test suite and no linter. `pnpm check` is the closest thing to a gate; run it before declaring work done. `next build` also type-checks (`ignoreBuildErrors: false`).

Use **pnpm** (`packageManager` is pinned in [package.json](package.json)); `pnpm-lock.yaml` is the real lockfile. A `package-lock.json` was committed alongside it by an `npm install` in `3488dc2` — don't update it, and don't mix in npm commands. `sharp` is a direct dependency used both by the image script and at render time, and `pnpm.onlyBuiltDependencies` must keep listing it or pnpm blocks its install script.

## Architecture

App Router with **two route groups that exist only to choose the header mode**:

```
src/app/layout.tsx                  <html>, fonts, skip link, <Footer> — every page
src/app/(forside)/layout.tsx        <Header overlay />, <main> with no offset
src/app/(forside)/page.tsx          →  /
src/app/(sider)/layout.tsx          <Header />, <main class="is-offset">
src/app/(sider)/{about,projects,contact}/page.tsx  →  /about/  /projects/  /contact/
```

`trailingSlash: true` in [next.config.ts](next.config.ts) keeps the `/about/`-style URLs from earlier versions; internal links are written with the trailing slash. Each page exports `metadata = pageMetadata(title, description, path)` from [src/lib/metadata.ts](src/lib/metadata.ts), which builds title, canonical and Open Graph in one place. Imports use the `@/*` → `src/*` alias.

Everything is a server component except [Header.tsx](src/components/Header.tsx), the only `'use client'` file. Several components read the filesystem at render time (`fs`, `sharp`), so **they must stay server components** — don't import [src/lib/media.ts](src/lib/media.ts) or [ResponsiveImage.tsx](src/components/ResponsiveImage.tsx) from anything client-side.

**Single source of truth is the organizing principle here**, because the original version's core problem was duplication — nav and footer pasted into four files, the GitHub/LinkedIn SVG pasted ten times:

- [src/data/site.ts](src/data/site.ts) — group name, email, `nav` (rendered in both header and footer), prebuilt `mailtoHref`, and the `stack` list shown on `/about/`.
- [src/data/team.ts](src/data/team.ts) — the five members, typed as `Member`. `/about/`'s cards are generated from this array; there is no per-person markup. Absent `photo` → "Bilde kommer"; absent link → not rendered.
- [src/data/projects.ts](src/data/projects.ts) — the project cards on `/projects/`.
- [src/components/Icon.tsx](src/components/Icon.tsx) — every SVG path on the site, in one `paths` map.

### Styling

[src/styles/tokens.css](src/styles/tokens.css) holds every color, type step and spacing value; [src/styles/global.css](src/styles/global.css) holds the reset, base typography and a handful of shared primitives (`.container`, `.section`, `.button`, `.prose`, `.label`) used as plain global class names. Everything else is **CSS Modules**, kept *not* next to the components but in [src/styles/components/](src/styles/components/) and [src/styles/pages/](src/styles/pages/), imported as `s` and accessed BEM-style: `s['card__photo']`, `s['is-active']`. (global.css's header comment still says "`<style>` i den komponenten" — that's the Astro wording; the rule is the same, the mechanism is now a module.)

**Do not grow global.css with component styles** — that is how the original 154-line stylesheet became unmaintainable. Reach for tokens rather than literal values.

Fonts are **self-hosted** via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx): downloaded at build time, so a visitor's browser never contacts Google. next/font sets `--font-sans`/`--font-mono`; tokens.css wraps them with fallback stacks as `--font-body`/`--font-code`, which is what components use. Do not replace this with a `<link>` to Google Fonts.

### Images

Deliberately **not** `next/image`. Originals live in `public/{team,projects,media}/`. [scripts/images.mjs](scripts/images.mjs) (run automatically by `pnpm dev`/`build`) writes resized WebP variants to `public/_images/` (gitignored), skipping any that are newer than their source. [ResponsiveImage.tsx](src/components/ResponsiveImage.tsx) is an async server component that reads the original's dimensions with sharp and emits an `<img srcset>`. The widths per folder are defined once in [src/lib/image-widths.mjs](src/lib/image-widths.mjs) and shared by both sides, so they can't drift.

If a variant is missing, `ResponsiveImage` **throws on purpose** ("Mangler … Kjør «pnpm images»") rather than shipping broken images. If you add an image while the dev server runs, run `pnpm images`.

### Missing media is a designed state, not a bug

[src/lib/media.ts](src/lib/media.ts) looks files up on disk by basename (any listed extension works) and returns `null` when absent; components then render [MediaPlaceholder.tsx](src/components/MediaPlaceholder.tsx) ("Bilde kommer" / "Video kommer"). The build succeeds and the page looks finished while files are pending. Don't replace this with direct imports or hardcoded paths.

Expected files in `public/media/`: `gruppebilde.*` (hero), `gruppe14.*` (video), `gruppe14-poster.*` (optional; the group photo from the end of the video). All three exist on `dev` now. `VideoSection` always declares `type="video/mp4"`, so keep the video as H.264 `.mp4` even though `.webm`/`.mov` are matched. The lookups are module-level constants, so a dev server started before a file was added won't see it — restart it. Everything in `public/` is committed, so keep video files small (the README asks for under ~50 MB).

## The header's two states

The one piece of real client behavior on the site, and it is easy to break.

`Header` renders either `is-overlay` (transparent, light text over the front-page photo) or `is-solid` (dark surface with blur). Only the `(forside)` layout passes `overlay`; on every other page `useState(!overlay)` starts solid, so the server-rendered HTML is already correct and nothing flickers.

On the front page, an `IntersectionObserver` watches whatever carries `data-header-watch` — the `<section>` in [Hero.tsx](src/components/Hero.tsx) — and flips to solid once it scrolls past. Its `rootMargin` is read from the `--header-height` token at runtime, so changing that token (68px, 58px under 760px) moves the switch point automatically. No `data-header-watch` element → the effect no-ops and the header stays as rendered.

Because the header is `position: fixed`, `(sider)` pages get `padding-top: var(--header-height)` via `main.is-offset` in [pages-layout.module.css](src/styles/pages/pages-layout.module.css). Move a page out of `(sider)` or drop that class and the first section slides under the header.

## The visual system

Dark graphite, greyscale, technical. Three rules carry it, and each was arrived at by the group rejecting the alternative:

1. **No accent colour anywhere.** An earlier pass used violet for labels and links; it was rejected. Emphasis is carried by *lightness* — `--hi` for buttons and the active nav item, the four `--text-*` steps for hierarchy. `--steel` exists solely for hover and focus. If you find yourself wanting a colour, use a brighter grey.
2. **Graphite, never black, and never light.** The surface steps (`--bg-deep` → `--surface`, plus `--surface-hover`) sit deliberately close in value and are separated by hairlines. A light theme was tried and rejected as too bright.
3. **Monospace is the texture.** `--font-code` (JetBrains Mono) carries labels, metadata, numbering, file paths and the contact address — anything that is data. `--font-body` (Inter) carries prose and headings. There is no serif; headings are semibold sans with negative tracking (`--tracking-display`).

**All four `--text-*` steps clear WCAG AA (4.5:1) against every surface**, including the weakest step on the lightest card. This is a real constraint: the scale has been rebalanced twice (once when `--text-faint` fell to 2.86:1, once in September 2026 when text read too dark — weakest pair is now 6.37:1). If you lighten a surface or darken a text step, recheck the whole matrix.

## Layout constraints worth knowing

- **Never put `aspect-ratio` on a full-viewport section.** The hero once paired `min-height: 100svh` with `aspect-ratio: 16/9`; on a tall narrow window that forced the width past the viewport and the page scrolled sideways. The hero sets width and min-height only and lets `object-fit: cover` adapt. `html { overflow-x: hidden }` is a safety net, not the fix. (The video player *does* use `aspect-ratio`, safely, because its width is clamped by `min(…, 100vw - gutters, 117svh)`.)
- The `/about/` team grid is `auto-fit`, so it handles any number of members. A `:has(> :last-child:nth-child(5))` rule centers the trailing two cards in the exactly-five case; it is scoped so a group of four or six is not broken by it.

## Content status

- **Bios are verbatim**, written in first person by the members themselves. Do not shorten, merge or reword them — that was done once and had to be reverted. The same applies to the project descriptions in `projects.ts` and the three `goals` on `/about/` (written by the group, inline in [about/page.tsx](src/app/(sider)/about/page.tsx)). All five members have photos and GitHub links.
- **`/projects/` shows three real projects**: the group's SafeMap (GIS, with Kartverket and Norkart) and AOR (with Norsk Luftambulanse and Kartverket), and Samdel, Marius's own live web app that started as a school assignment at UiA. Samdel sits in the same `projects` list at Marius's request; its description names him in the third person, and its `url` renders a live link. The text is Marius's own — verbatim, like the others. `ProjectCard` also supports an optional `author` ("Laget av …") for a member's project, currently unused. Two *invented* projects ("Prosjekt Aurora", "Prosjekt Kompass") with stock photos existed in the original markup; they were dropped and must not come back. Below the real ones, a section says the bachelor assignment itself is still unchosen and invites one.
- **`/contact/` has no form, on purpose.** A working form needs a server to hold an email API key, and this project has no backend. The `mailto:` link *is* the working answer. Don't add an API route or form without first agreeing where the key lives.
- No stock imagery and no hotlinking; the site renders offline.
- The `stack` list in `site.ts` is there for employers — only add things the group can answer questions about.
- `metadataBase` in the root layout is still the placeholder `https://gruppe14.example.no`; set the real domain when the site is published.

## Git

Work happens on `dev`, merges to `main` via pull requests on GitHub (`Erfan717/Gruppe14`). [push-dev.command](push-dev.command) is a double-clickable script for non-CLI teammates that pushes to `origin dev`.

**The repo once carried two branches, `Dev` and `dev`, with different content.** GitHub treats them as distinct; a case-insensitive macOS filesystem cannot hold both, so `git fetch` silently left the local remote-tracking refs pointing at each other's commits. A rewrite was built from what looked like the tip of `dev` and missed two commits (the SafeMap/AOR projects, and Elise's photo and bio). Resolved 2026-09-21 by fast-forwarding `dev` and deleting `Dev`. **`dev` in lower case is the only development branch — do not recreate `Dev`.** If a branch ever again differs only by case, do not trust local refs:

```sh
git ls-remote --heads origin          # the truth, unaffected by the local filesystem
git show <sha>:<path>                 # read a file from a branch you cannot check out
```

Several people edit the same files, and the original version once had **committed merge-conflict markers** that produced a duplicate team card on the live page. After any merge, run `grep -rn '^<<<<<<<' src/` before committing.
