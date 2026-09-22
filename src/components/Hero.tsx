import MediaPlaceholder from './MediaPlaceholder';
import Icon from './Icon';
import ResponsiveImage from './ResponsiveImage';
import { heroImage } from '@/lib/media';
import s from '@/styles/components/Hero.module.css';

/**
 * Forsidebildet i fullskjerm, med headeren liggende gjennomsiktig oppå.
 *
 * data-header-watch er det headeren følger med på: så lenge denne seksjonen
 * er i bildet, er headeren gjennomsiktig. Scroller du forbi, blir den mørk.
 */
export default function Hero() {
  return (
    <section className={s.hero} data-header-watch>
      <div className={s['hero__media']}>
        {heroImage ? (
          <ResponsiveImage
            src={heroImage}
            alt="Gruppe 14 samlet"
            sizes="100vw"
            priority
            className={s['hero__image']}
          />
        ) : (
          <MediaPlaceholder label="Bilde kommer" tone="dark" />
        )}
        <div className={s['hero__scrim']}></div>
        <div className={s['hero__grid']} aria-hidden="true"></div>
      </div>

      <div className={`container ${s['hero__content']}`}>
        <p className={s['hero__label']}>Bachelorprosjekt — Universitetet i Agder</p>
        <h1 className={s['hero__title']}>
          Vi bygger ting
          <br />
          som betyr noe.
        </h1>
        <p className={s['hero__lead']}>
          Fem studenter med ulike faglige interesser som utfyller hverandre gjennom hele prosessen
          — fra idé og planlegging til utvikling og ferdig løsning.
        </p>
      </div>

      <a className={s['hero__cue']} href="#presentasjon" aria-label="Se presentasjonen">
        <span>Se presentasjonen</span>
        <Icon name="arrowDown" size={15} />
      </a>
    </section>
  );
}
