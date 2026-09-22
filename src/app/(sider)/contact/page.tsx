import Icon from '@/components/Icon';
import { site, mailtoHref } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import s from '@/styles/pages/contact.module.css';

export const metadata = pageMetadata(
  'Kontakt',
  'Ta kontakt med Gruppe 14 på e-post. Vi hører gjerne fra bedrifter, samarbeidspartnere og andre nysgjerrige.',
  '/contact/'
);

/**
 * Kontaktsiden har med vilje ikke noe skjema.
 *
 * Et skjema som virker trenger en server til å holde en API-nøkkel for
 * e-postutsending. Dette prosjektet har ingen API-ruter, og skal ikke ha det.
 * mailto-lenka ER den fungerende løsningen — den åpner besøkendes eget
 * e-postprogram med emnefeltet ferdig utfylt.
 */
const reasons = [
  {
    title: 'Samarbeid om et prosjekt',
    body: 'Har dere en problemstilling som fortjener friske øyne? Vi er på jakt etter en bacheloroppgave.',
  },
  {
    title: 'Praksis og jobb',
    body: 'Vi nærmer oss slutten av studiet, og hører gjerne fra bedrifter som trenger nysgjerrige folk.',
  },
  {
    title: 'Bare et spørsmål',
    body: 'Lurer du på hvordan vi jobber, eller hvem vi er? Spør i vei — det koster deg to minutter.',
  },
];

export default function Kontakt() {
  return (
    <>
      <section className={s.hero}>
        <div className={`container ${s['hero__inner']}`}>
          <p className="label">Kontakt</p>
          <h1>
            En god samtale
            <br />
            kan starte her.
          </h1>

          <a className={s.mail} href={mailtoHref}>
            <Icon name="mail" size={22} />
            <span className={s['mail__address']}>{site.email}</span>
            <span className={s['mail__hint']}>Åpner e-postprogrammet ditt</span>
          </a>

          <p className={s['hero__note']}>
            Vi er alltid nysgjerrige på nye mennesker og nye problemstillinger. Fortell kort hvem du
            er og hva du har på hjertet, så svarer vi så raskt vi kan.
          </p>
        </div>
      </section>

      <section className={`section ${s.reasons}`}>
        <div className="container">
          <h2 className={s['reasons__title']}>Hva vil du snakke om?</h2>
          <ul className={s['reasons__list']}>
            {reasons.map((reason) => (
              <li key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
