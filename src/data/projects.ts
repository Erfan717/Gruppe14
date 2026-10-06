/**
 * Prosjektene på /projects/. Kortene genereres herfra.
 *
 * Teksten til SafeMap og AOR er skrevet av gruppa selv (lagt inn av Erfan
 * 15. september). Teksten til Samdel er skrevet av Marius (6. oktober). Alt er
 * gjengitt ordrett — ikke kort det ned, og ikke skriv det om.
 *
 * image:  filnavnet i public/projects/. Utelat feltet, eller sett det til
 *         null, så viser kortet «Bilde kommer» i stedet.
 * author: settes når prosjektet er laget av ett medlem, ikke av gruppa,
 *         så kortet viser hvem som står bak.
 * url:    adressen til løsningen hvis den er live. Utelat, så vises ingen lenke.
 */
export type Project = {
  title: string;
  tag: string;
  image?: string | null;
  description: string;
  url?: string;
  partners?: string[];
  author?: string;
};

export const projects: Project[] = [
  {
    title: 'SafeMap',
    tag: 'Geodata',
    image: 'safemap.png',
    description:
      'Et GIS-prosjekt som kartlegger Norges totalberedskap – sårbarheter og tilgjengelighet til kritisk infrastruktur for befolkningen, utviklet i samarbeid med Kartverket og Norkart som en del av IS-218 Geografiske informasjonssystemer ved UiA.',
    partners: ['Kartverket', 'Norkart', 'UiA'],
  },
  {
    title: 'AOR',
    tag: 'Luftfart',
    image: 'aor.png',
    description:
      'Aviation Obstacle Registration – et system utviklet i samarbeid med Norsk Luftambulanse og Kartverket, der flybesetning kan rapportere luftfartshindre via et kartbasert grensesnitt, med godkjenning og saksbehandling for registrarer og administratorer.',
    partners: ['Norsk Luftambulanse', 'Kartverket'],
  },
  {
    title: 'Samdel',
    tag: 'Webapp',
    image: 'samdel.png',
    description:
      'Samdel er en web-app som startet som en skoleoppgave for å lære å bruke AI, og python backend til å lage en app. Videre har Marius jobbet med å utvikle Samdel som en hobby, og har utviklet det til en live app som har flere brukere.',
    url: 'https://www.samdel.no',
    partners: ['UiA', 'Marius G. Gundersen'],
  },
];
