import Link from 'next/link';
import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import { pageMetadata } from '@/lib/metadata';
import s from '@/styles/pages/home.module.css';

export const metadata = pageMetadata(
  'Gruppe 14',
  'Fem bachelorstudenter ved Universitetet i Agder som bygger digitale løsninger med en tydelig hensikt.',
  '/'
);

export default function Forside() {
  return (
    <>
      <Hero />
      <VideoSection />

      <section className={`section ${s.next}`}>
        <div className={`container ${s['next__inner']}`}>
          <div>
            <p className="label">Veien videre</p>
            <h2>
              Ulike styrker.
              <br />
              Felles retning.
            </h2>
          </div>
          <div>
            <p className="prose">
              Vi ser etter et prosjekt der vi kan kombinere kunnskapen fra studiet med en reell
              problemstilling. Vi er åpne for ulike typer prosjekter og bedrifter, men ønsker
              gjerne å utvikle en digital løsning som skaper verdi for brukerne eller bedriften.
            </p>
            <div className={s['next__actions']}>
              <Link className="button" href="/about/">
                Bli kjent med oss
              </Link>
              <Link className="button button--quiet" href="/contact/">
                Ta kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
