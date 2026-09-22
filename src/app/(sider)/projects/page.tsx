import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { mailtoHref } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import s from '@/styles/pages/projects.module.css';

export const metadata = pageMetadata(
  'Prosjekter',
  'SafeMap og AOR — prosjekter utviklet i samarbeid med Kartverket, Norkart og Norsk Luftambulanse.',
  '/projects/'
);

export default function Prosjekter() {
  return (
    <>
      <PageHeader
        label="Det vi lager"
        title="Prosjekter i praksis."
        lead="Arbeider utviklet sammen med eksterne partnere, der løsningen skulle brukes av noen utenfor klasserommet."
      />

      <section className="section">
        <div className="container">
          <div className={s.projects}>
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${s.bachelor}`}>
        <div className={`container ${s['bachelor__inner']}`}>
          <div>
            <p className="label">Bacheloroppgaven</p>
            <h2>Den er ikke valgt ennå.</h2>
            <p className="prose">
              Vi er i gang med å finne bacheloroppgaven vår, og har plass til én ordentlig
              problemstilling. Vi ser etter en reell oppgave fra en bedrift eller organisasjon, der
              vi kan kombinere kunnskapen fra studiet med noe som faktisk skal brukes av noen.
            </p>
          </div>

          <ul className={s.criteria}>
            <li>
              <span className={s['criteria__num']}>01</span>
              <div>
                <h3>En tydelig hensikt</h3>
                <p>Noe som skaper verdi for brukerne eller for bedriften, ikke en øvelse.</p>
              </div>
            </li>
            <li>
              <span className={s['criteria__num']}>02</span>
              <div>
                <h3>Hele veien</h3>
                <p>Fra kartlegging og planlegging til utvikling, testing og ferdig løsning.</p>
              </div>
            </li>
            <li>
              <span className={s['criteria__num']}>03</span>
              <div>
                <h3>Rom for fem</h3>
                <p>Bredt nok til at frontend, backend, data og sikkerhet alle får en rolle.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className={`section ${s.invite}`}>
        <div className={`container container--narrow ${s['invite__inner']}`}>
          <h2>Har dere en oppgave til oss?</h2>
          <p className="prose">
            Fortell kort hvem dere er og hva dere har på hjertet, så svarer vi så raskt vi kan.
          </p>
          <a className="button" href={mailtoHref}>
            Send oss en e-post
          </a>
        </div>
      </section>
    </>
  );
}
