import ResponsiveImage from './ResponsiveImage';
import SocialLinks from './SocialLinks';
import { findImage } from '@/lib/media';
import type { Member } from '@/data/team';
import s from '@/styles/components/TeamCard.module.css';

/**
 * Ett personkort. Alle fem genereres fra src/data/team.ts, så markupen
 * finnes bare her — ikke fem ganger nedover i about-sida.
 *
 * Mangler bildet i public/team/, faller kortet tilbake til «Bilde kommer»
 * uten at noe knekker.
 */
export default function TeamCard({ name, photo, tags, bio, links }: Member) {
  const image = findImage('team', photo);

  return (
    <article className={s.card}>
      <div className={s['card__photo']}>
        {image ? (
          <ResponsiveImage
            src={image}
            alt={`Portrett av ${name}`}
            sizes="(max-width: 760px) 90vw, 360px"
          />
        ) : (
          <span className={s['card__pending']}>Bilde kommer</span>
        )}
      </div>

      <div className={s['card__body']}>
        <h3 className={s['card__name']}>{name}</h3>
        {tags.length > 0 && <p className={s['card__tags']}>{tags.join(' · ')}</p>}
        {bio.map((paragraph, i) => (
          <p key={i} className={s['card__bio']}>
            {paragraph}
          </p>
        ))}
        <SocialLinks links={links} person={name} className={s.social} />
      </div>
    </article>
  );
}
