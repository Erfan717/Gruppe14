import MediaPlaceholder from './MediaPlaceholder';
import { groupVideo, videoPoster } from '@/lib/media';
import s from '@/styles/components/VideoSection.module.css';

/**
 * Videoseksjonen rett under forsidebildet.
 *
 * Det er her siden slipper fotoet og blir «vanlig nettside», og det er her
 * headeren har rukket å bli mørk. Spilleren står midtstilt med luft rundt,
 * ikke i fullbredde.
 */
export default function VideoSection() {
  return (
    <section className={s['video-section']} id="presentasjon">
      <div className="container">
        <div className={s['video-section__head']}>
          <p className="label">Møt gruppen</p>
          <h2>Dette er oss.</h2>
          <p className={`prose ${s['video-section__lead']}`}>
            Trykk play for å høre oss fortelle om bakgrunnen, samarbeidet og ambisjonene våre.
          </p>
        </div>

        <figure className={s.player}>
          {groupVideo ? (
            <video controls preload="metadata" poster={videoPoster ?? undefined} playsInline>
              <source src={groupVideo} type="video/mp4" />
              Nettleseren din støtter ikke videoavspilling.
            </video>
          ) : (
            <MediaPlaceholder label="Video kommer" tone="light" />
          )}
        </figure>
      </div>
    </section>
  );
}
