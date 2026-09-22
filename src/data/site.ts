/**
 * Felles opplysninger om nettstedet.
 * Endrer du gruppenavn, e-post eller menyen, endrer du det her — én gang.
 */
export const site = {
  name: 'Gruppe 14',
  mark: 'G14',
  tagline: 'Bachelorprosjekt · Universitetet i Agder',
  email: 'mariusgg@student.uia.no',
  emailSubject: 'Henvendelse til Gruppe 14',
};

/** Menyen. Rekkefølgen her er rekkefølgen i headeren og i footeren. */
export const nav = [
  { label: 'Hjem', href: '/' },
  { label: 'Om oss', href: '/about/' },
  { label: 'Prosjekter', href: '/projects/' },
  { label: 'Kontakt', href: '/contact/' },
];

/** Ferdig mailto-lenke, satt sammen ett sted så den ikke drifter fra hverandre. */
export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`;

/**
 * Det gruppa faktisk har jobbet med gjennom studiet. Vises på /about/.
 * Hold lista ærlig — skriv bare opp noe dere kan svare på spørsmål om.
 */
export const stack = [
  { name: 'C#', note: 'backend' },
  { name: 'PHP', note: 'backend' },
  { name: 'JavaScript', note: 'frontend' },
  { name: 'HTML & CSS', note: 'frontend' },
  { name: 'SQL', note: 'databaser' },
  { name: 'Docker', note: 'drift' },
  { name: 'Git', note: 'samarbeid' },
  { name: 'Figma', note: 'design' },
];
