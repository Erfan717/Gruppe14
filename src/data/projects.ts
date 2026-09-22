/**
 * Prosjekter gruppa har levert. Kortene på /projects/ genereres herfra.
 *
 * Teksten er skrevet av gruppa selv (lagt inn av Erfan 15. september) og er
 * gjengitt ordrett — ikke kort den ned, og ikke skriv den om.
 *
 * image: filnavnet i public/projects/. Utelat feltet, eller sett det til
 *        null, så viser kortet «Bilde kommer» i stedet.
 */
export type Project = {
  title: string;
  tag: string;
  image?: string | null;
  description: string;
  partners?: string[];
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
];
