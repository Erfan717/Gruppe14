# Gruppe 14 — portefølje

Nettsiden til Gruppe 14, bachelorprosjekt ved Universitetet i Agder.
Bygget med [Astro](https://astro.build). Resultatet er rene statiske filer —
ingen server, ingen database.

## Kom i gang

Du trenger [Node](https://nodejs.org) 20 eller nyere og
[pnpm](https://pnpm.io/installation).

```sh
pnpm install     # én gang, henter avhengighetene
pnpm dev         # start siden lokalt på http://localhost:4321
```

Lagre en fil, så oppdaterer nettleseren seg selv.

| Kommando       | Hva den gjør                                        |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | Utviklingsserver med automatisk oppdatering          |
| `pnpm build`   | Bygger den ferdige siden til `dist/`                 |
| `pnpm preview` | Viser `dist/` slik den blir i produksjon             |
| `pnpm check`   | Sjekker sidene for feil før du committer             |

## Hvor ting ligger

```
src/
  pages/        én mappe per side — mappenavnet blir adressen
    index.astro         →  /
    about/index.astro   →  /about/
    projects/...        →  /projects/
    contact/...         →  /contact/
  components/   byggeklossene sidene settes sammen av
  layouts/      rammen rundt alle sider (header, footer, <head>)
  data/         teksten som endrer seg ofte — se under
  styles/       farger, skrift og avstander
  assets/       bilder og video
```

## Det du oftest skal endre

**Legge inn gruppebildet eller videoen.** Legg fila i `src/assets/media/`
med riktig navn — `gruppebilde.jpg` og `gruppepresentasjon.mp4`. Det er alt;
plassholderen «Bilde kommer» forsvinner av seg selv.
Se [src/assets/media/README.md](src/assets/media/README.md).

**Endre din egen tekst eller dine lenker.** Alt om gruppemedlemmene ligger i
[`src/data/team.js`](src/data/team.js) — navn, bio, GitHub, LinkedIn.
Du trenger ikke røre HTML-en; kortene på *Om oss* lages fra denne lista.

**Legge inn profilbildet ditt.** Legg det i `src/assets/team/` som
`fornavn.jpg`, og sett `photo: 'fornavn.jpg'` på din oppføring i `team.js`.

**Endre e-postadresse, gruppenavn eller menyen.**
[`src/data/site.js`](src/data/site.js). Ett sted, slår gjennom overalt.

**Endre farger eller skrift.** [`src/styles/tokens.css`](src/styles/tokens.css).

## Ting som er verdt å vite

- **Header og footer finnes bare ett sted**, i `src/layouts/BaseLayout.astro`.
  Legger du til en menylenke, legger du den til én gang.
- **Kontaktsiden har med vilje ikke noe skjema.** Et skjema som virker må ha en
  server til å oppbevare en API-nøkkel for e-post, og dette prosjektet har ingen
  backend. `mailto:`-lenka *er* den fungerende løsningen.
- **Prosjektsiden står bevisst tom** til vi har en reell bacheloroppgave.
  Den forrige versjonen viste to oppdiktede prosjekter, og det ser en bedrift
  gjennom med en gang.

## Publisering

`pnpm build` lager mappa `dist/`. Den kan legges rett ut på Netlify, Vercel,
GitHub Pages eller en hvilken som helst webserver — det er bare filer.
Husk å sette riktig adresse i `site:` i [astro.config.mjs](astro.config.mjs)
før første publisering.
