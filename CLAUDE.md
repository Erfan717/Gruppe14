# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio site for a student group's bachelor project (Gruppe 14, Universitetet i Agder). Plain HTML/CSS/JS — no build step, no package manager, no dependencies, no tests, no server-side code. All user-facing copy is Norwegian (`<html lang="no">`); keep new copy in Norwegian, with proper æ/ø/å. (The README is the lone ASCII-only holdout.)

## Running

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

There is nothing to build, lint, or test — changes are visible on reload.

## Architecture

Four sibling pages ([index.html](index.html), [about.html](about.html), [projects.html](projects.html), [contact.html](contact.html)), all linking the single [styles.css](styles.css) and [script.js](script.js). There is no templating or includes: **the `<header>` nav and `<footer>` are copy-pasted inline into every page**. Changing the logo, group name, nav links, or footer means editing all four files. Each page marks its own nav item with `class="active"`.

[script.js](script.js) is three lines: it fills every `[data-year]` element with the current year, used in all four footers. It is wired through a data attribute rather than an id or class so behavior stays opt-in per element — keep that pattern if you add anything.

[styles.css](styles.css) is the whole design system, in one file with no nesting or preprocessor:

- **Tokens.** Palette and fonts as custom properties on `:root` — warm paper `--paper`, terracotta `--accent`, serif `--display` for headings, sans `--body` for text. Reach for these rather than literal colors.
- **Flat class names**, roughly one cluster per page section: `.container`, `.section`, `.page-hero`, `.hero`, `.intro-grid`, `.project-grid`, `.timeline`, `.team-grid`, `.contact-layout`, `.dark-band`.
- **One breakpoint.** A single `@media (max-width: 760px)` block at the bottom collapses the grids. Add mobile overrides there rather than scattering media queries through the file.

Beware one ordering trap in that block: it collapses `.section-head` to `display: block`, so the centered variant has to re-assert `display: flex` afterwards. A new `.section-head` modifier likely needs the same treatment.

## Page-specific structure

**[about.html](about.html) — team section.** The most involved markup in the repo. `.team-grid` holds two `.team-row` flex rows (two cards on top, three below) of `.team-card` articles. Each card is a `.team-photo`, a `.team-card-body`, and `.team-links` with **inline SVG** icons for GitHub and LinkedIn — the icon paths are pasted into the markup, once per card, so there are ten SVG blocks. Editing an icon means editing every copy.

The photo fallback is non-obvious: `.team-photo` grid-stacks an `<img>` on top of a `.team-photo-placeholder` span reading "Bilde kommer". The image carries `onerror="this.style.display='none'"`, so a missing file hides the img and uncovers the placeholder. This is the only inline JS on the site, and it is what makes the page look intentional while `assets/team/` is still empty.

**[contact.html](contact.html) — no form, by design.** A `.contact-card` explaining why someone would get in touch, plus a `mailto:` button to `mariusgg@student.uia.no`. It used to be a real form backed by a Resend serverless function; that was removed deliberately, because a working form needs a server to hold an email-API key and this project intentionally has no backend. If asked to "make the contact form work", the mailto link *is* the working answer — don't reintroduce a form without also solving where the key lives.

## Markup style

Page bodies are written very densely. [about.html](about.html), [projects.html](projects.html) and [contact.html](contact.html) put whole sections on a single line (up to ~1900 characters). [index.html](index.html) is broken across more lines. Match whichever style the file you are editing already uses — and expect `git diff` to report a one-line change even when a whole section was rewritten. `git diff --word-diff` is far more readable on this codebase.

## Known rough edges

- **`assets/` does not exist at all**, but six files are referenced from it: `assets/group-presentation.mp4` on the front page, and `assets/team/member-1.jpg` … `member-5.jpg` on the about page. The team photos degrade gracefully via the `onerror` fallback; the video does not.
- **The team bios are placeholder text.** All five start with "Eksempeltekst:" and contain bracketed prompts like `[rolle, f.eks. backend-utvikling]`. Every GitHub and LinkedIn link still points at `brukernavn`. Real content is pending, so don't treat that copy as finished.
- `.timeline-year` in [styles.css](styles.css) uses `var(--teal)`, which is never defined; that text falls back to inherited color. It is the only undefined variable in the file.
- All photos are hotlinked from Unsplash URLs, so the site needs network access to look right.
- [.gitignore](.gitignore) still ignores `.env*` and `.vercel`, left over from the removed Resend backend. Harmless, but nothing in the project uses them now.
