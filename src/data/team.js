/**
 * Gruppemedlemmene. Kortene på /about/ genereres fra denne lista,
 * så et nytt medlem legges til ved å skrive én ny oppføring her.
 *
 * Bioene er skrevet av medlemmene selv. De er gjengitt ordrett slik de sto i
 * den opprinnelige about.html — ikke kort dem ned, og ikke skriv dem om.
 *
 * photo:  filnavnet i src/assets/team/. Utelat feltet, eller sett det til
 *         null, så viser kortet «Bilde kommer» i stedet.
 * links:  utelat en lenke du ikke har ennå — da rendres den ikke.
 *         Ikke la det stå «brukernavn»; en død lenke er verre enn ingen.
 */
export const team = [
  {
    name: 'Marius G. Gundersen',
    photo: 'marius.jpg',
    bio: [
      'Jeg er utdannet sykepleier med erfaring fra sykehus, ambulanse og kommunehelsetjenesten, der jeg har sett på nært hold hvordan teknologi fungerer i en travel arbeidshverdag. Nå fullfører jeg bachelorgraden i IT og informasjonssystemer ved UiA, og jobber ved siden av i familiebedriften Kulien ANS.',
      'Helseteknologi er et stort interessefelt, men også det å være med helt fra ide til ferdig løsning er veldig spennende.Jeg har også selv flere små prosjekter ved siden av studiene.',
    ],
    links: {
      github: 'https://github.com/MGumpen',
      linkedin: 'https://www.linkedin.com/in/mariusgumpen/',
      website: 'https://mariusgg.no',
    },
  },
  {
    name: 'Erfan Sarwari',
    photo: 'erfan.jpg',
    bio: [
      'Jeg er 21 år og kommer fra Kristiansand. Jeg er en nysgjerrig student som liker å sette meg inn i nye ting, lære og få praktisk erfaring. Jeg studerer IT og informasjonssystemer fordi jeg er interessert i teknologi og digitale løsninger. På egen hånd liker jeg å utforske nye verktøy, utvikle små prosjekter og finne ut hvordan en idé kan bli til en fungerende løsning. Det jeg synes er mest gøy, er å gå fra et problem til et ferdig resultat og se hvordan tiden og arbeidet jeg legger ned blir til noe konkret.',
    ],
    links: {
      github: 'https://github.com/Erfan717',
      linkedin: 'https://www.linkedin.com/in/erfan-sarwari-4b652b3a0/',
      website: 'https://erfan717.github.io/Portofolio/',
    },
  },
  {
    name: 'Zent D. Stefansen',
    photo: 'zent.jpg',
    bio: [
      'Jeg heter Zent, er 21 år og studerer IT og informasjonssystemer ved UiA. Jeg er interessert i det meste innen utvikling, som frontend, backend, databaser og datasikkerhet, og trives best med å forstå hele kjeden i et system, fra det brukeren ser og klikker på, til hvordan dataene lagres og sikres i bunn. Denne brede interessen gjør at jeg liker å bevege meg litt på tvers i prosjekter, enten det er å sette opp en database, bygge et grensesnitt eller tenke gjennom hvordan løsningen skal sikres mot feil bruk. Jeg lærer best ved å faktisk bygge noe selv og teste det i praksis, fremfor å bare lese meg opp på teori.',
      'Ved siden av studiene jobber jeg deltid på Oslo lufthavn, noe som har lært meg mye om struktur, ansvar og det å holde hodet kaldt når det er travelt.',
    ],
    links: {
      github: 'https://github.com/zentpresgaa',
      linkedin: 'https://www.linkedin.com/in/zentstefansen/',
    },
  },
  {
    name: 'Elise Fjeldstad',
    photo: 'elise.jpg',
    bio: [
      'Jeg liker spesielt godt å jobbe med UX/UI design, prosjektstyring og frontend. Jeg synes det er spennende å utvikle løsninger som er brukervennlige, tilgjengelige og visuelt gjennomtenkte. Jeg er også opptatt av universell utforming og hvordan gode designvalg kan bidra til at digitale løsninger fungerer for flest mulig. Gjennom bachelorprosjektet ønsker jeg å få erfaring med hele prosessen fra idé og planlegging til utvikling av en ferdig løsning.',
      'Ved siden av studiene jobber jeg som nattsykepleier. Gjennom jobben har jeg fått mye erfaring med samarbeid, kommunikasjon, struktur og det å finne gode løsninger i ulike situasjoner.',
    ],
    links: {
      // TODO: mangler GitHub-brukernavn
      linkedin: 'https://www.linkedin.com/in/elise-fjeldstad-939430328/',
    },
  },
  {
    name: 'Matias Lekva',
    photo: 'matias.jpg',
    bio: [
      'Jeg studerer IT og informasjonssystemer ved UiA og er interessert i det meste innen utvikling, både frontend, backend, databaser og informasjonssikkerhet. Jeg liker å forstå hvordan de ulike delene av et system henger sammen, fra det brukeren ser til dataene som ligger bak, i stedet for å holde meg til én rolle.',
      'Ved siden av studiene er jeg også interessert i business, og bruker gjerne tid på egne prosjekter hvor jeg får teste ut idéer i praksis. På fritiden prioriterer jeg trening, å henge med sønnen min og snowboardturer når det er sesong.',
    ],
    links: {
      github: 'https://github.com/Felovax',
      linkedin: 'https://www.linkedin.com/in/matias-lekva-15a6823b8/',
    },
  },
];
