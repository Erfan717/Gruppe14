import PageHeader from '@/components/PageHeader';
import TeamCard from '@/components/TeamCard';
import TechStack from '@/components/TechStack';
import { team } from '@/data/team';
import { pageMetadata } from '@/lib/metadata';
import s from '@/styles/pages/about.module.css';

export const metadata = pageMetadata(
  'Om oss',
  'Fem studenter ved Universitetet i Agder med ulike faglige interesser, samlet om ett bachelorprosjekt.',
  '/about/'
);

/**
 * Gruppas mål, skrevet av gruppa selv (Elise, 18. september, på main).
 * Gjengitt ordrett — ikke skriv dem om.
 */
const goals = [
  {
    title: 'Våre ambisjoner',
    body: [
      'Vi er en motivert og arbeidsvillig gruppe med høye ambisjoner for bachelorprosjektet. Målet vårt er å levere et prosjekt av høy faglig kvalitet.',
      'Vi ønsker samtidig å utfordre oss selv, utvikle kompetansen vår og få erfaring med å gjennomføre et større prosjekt sammen.',
    ],
  },
  {
    title: 'Dette kan vi tilby',
    body: [
      'Gruppen består av studenter med ulike styrker, interesser og erfaringer. Gjennom studiet har vi opparbeidet kompetanse innen blant annet programmering, webutvikling, databaser, design, UX og informasjonssystemer.',
      'Vi legger vekt på godt samarbeid, tydelig kommunikasjon, struktur og kvalitet i arbeidet vårt.',
    ],
  },
  {
    title: 'Dette ser vi etter',
    body: [
      'Vi ser etter et prosjekt der vi kan kombinere kunnskapen fra studiet med en reell problemstilling.',
      'Vi er åpne for ulike typer prosjekter og bedrifter, men ønsker gjerne å utvikle en digital løsning med en tydelig hensikt som skaper verdi for brukerne og/eller bedriften.',
    ],
  },
];

export default function OmOss() {
  return (
    <>
      <PageHeader
        label="Samarbeid med oss"
        title="Et bachelorprosjekt med ambisjoner"
        lead="Vi ønsker å kombinere faglig utvikling med en reel problemstilling og skape en løsning som gir verdi."
        className={s.intro}
      />

      <section className="section section--tight">
        <div className={`container ${s.intro}`}>
          <ul className={s.goals}>
            {goals.map((goal, i) => (
              <li key={goal.title} className={s.goal}>
                <span className={s['goal__num']}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s['goal__title']}>{goal.title}</h3>
                {goal.body.map((paragraph, j) => (
                  <p key={j} className={s['goal__text']}>
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${s.team}`}>
        <div className="container">
          <div className={s['team__head']}>
            <p className="label">Teamet</p>
            <h2>Møt medlemmene.</h2>
          </div>

          <div className={s['team__grid']}>
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
      <TechStack />
    </>
  );
}
