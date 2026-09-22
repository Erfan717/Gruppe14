# Bilder og video

Legg de store filene her. Siden plukker dem opp automatisk ved neste
`pnpm build` — du trenger ikke endre noe i koden. Kjører `pnpm dev` allerede,
kjør `pnpm images` og last siden på nytt.

Filnavnet uten endelse er det som teller: `gruppebilde.jpg`, `.png`, `.webp`
og `.avif` fungerer like godt.

| Fil                        | Hvor den vises                          |
| -------------------------- | --------------------------------------- |
| `gruppebilde.jpg`          | Bakgrunn på forsiden, i fullskjerm      |
| `gruppepresentasjon.mp4`   | Videospilleren under forsiden           |
| `video-poster.jpg`         | Stillbildet som vises før video spilles |

Mangler en fil, viser siden «Bilde kommer» eller «Video kommer» i stedet.
Det er meningen — siden skal se hel ut mens dere venter på innholdet.

## Krav til filene

- **Gruppebildet** bør være liggende og minst 2400 px bredt. Det beskjæres til
  skjermformat, så la det være litt luft rundt personene.
  Komprimerte varianter lages automatisk i `public/_images/`.
- **Videoen** bør være `.mp4` (H.264). Hold den under ~50 MB — alt som ligger
  her havner i Git, og store filer gjør repoet tregt for alle.

Profilbildene til gruppa ligger et annet sted: `public/team/`.
