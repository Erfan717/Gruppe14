import ResponsiveImage from './ResponsiveImage';
import MediaPlaceholder from './MediaPlaceholder';
import { findImage } from '@/lib/media';
import type { Project } from '@/data/projects';
import s from '@/styles/components/ProjectCard.module.css';

/**
 * Ett prosjektkort. Alle genereres fra src/data/projects.ts.
 *
 * Mangler bildet i public/projects/, faller kortet tilbake til plassholderen
 * uten at bygget knekker.
 */
export default function ProjectCard({
  title,
  tag,
  image,
  description,
  url,
  partners = [],
  author,
}: Project) {
  const picture = findImage('projects', image);

  return (
    <article className={s.project}>
      <div className={s['project__shot']}>
        {picture ? (
          <ResponsiveImage
            src={picture}
            alt={`Skjermbilde fra ${title}`}
            sizes="(max-width: 860px) 92vw, 560px"
            className={s['project__image']}
          />
        ) : (
          <MediaPlaceholder label="Bilde kommer" tone="light" />
        )}
      </div>

      <div className={s['project__body']}>
        <p className={s['project__tag']}>{tag}</p>
        <h3 className={s['project__title']}>{title}</h3>
        {author && <p className={s['project__author']}>Laget av {author}</p>}
        <p className={s['project__text']}>{description}</p>

        {url && (
          <a className={s['project__link']} href={url} target="_blank" rel="noopener noreferrer">
            {new URL(url).hostname.replace(/^www\./, '')}
            <span aria-hidden="true"> ↗</span>
            <span className="visually-hidden"> (åpnes i ny fane)</span>
          </a>
        )}

        {partners.length > 0 && (
          <ul className={s['project__partners']}>
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}

        
      </div>
    </article>
  );
}
