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

export default function OmOss() {
  return (
    <>
      <PageHeader
        label="Om gruppen"
        title="Sammen skaper vi løsninger."
        lead="Med ulike faglige interesser og erfaringer utfyller vi hverandre gjennom hele prosessen — fra idé og planlegging til utvikling og ferdig løsning."
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <p className="prose">
            Vi er en motivert og arbeidsvillig gruppe med høye ambisjoner for bachelorprosjektet.
            Målet er å levere et prosjekt av høy faglig kvalitet, og vi er innstilt på å legge ned
            tiden og innsatsen som kreves. Samtidig ønsker vi å utfordre oss selv, utvikle
            kompetansen vår og få erfaring med å gjennomføre et større prosjekt sammen.
          </p>
          <p className="prose">
            Vi ser etter et prosjekt der vi kan kombinere kunnskapen fra studiet med en reell
            problemstilling. Vi er åpne for ulike typer prosjekter og bedrifter, men ønsker gjerne
            å utvikle en digital løsning med en tydelig hensikt som skaper verdi for brukerne eller
            bedriften.
          </p>
          <p className="prose">
            Som gruppe har vi ulike styrker og interesser, noe vi ser på som en fordel. Vi ønsker å
            utnytte disse forskjellene, samtidig som alle får mulighet til å utfordre seg selv og
            lære noe nytt. Vi legger vekt på godt samarbeid, tydelig kommunikasjon, struktur og
            jevn arbeidsinnsats gjennom hele prosjektperioden.
          </p>
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
