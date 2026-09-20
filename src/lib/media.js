/**
 * Finner gruppebildet og presentasjonsvideoen i src/assets/media/.
 *
 * Poenget er at siden skal bygge selv om filene ikke finnes ennå: er mappa tom,
 * returnerer disse null, og komponentene viser en «kommer»-plassholder i stedet.
 * Legg fila inn med riktig navn, så plukkes den opp ved neste bygg — ingen
 * kode trenger å endres.
 */

const images = import.meta.glob('../assets/media/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

const videos = import.meta.glob('../assets/media/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Finner en fil på filnavn uten filendelse, så .jpg og .webp funker like godt. */
function findByBasename(files, basename) {
  const match = Object.keys(files).find((path) => {
    const filename = path.split('/').pop() ?? '';
    return filename.replace(/\.[^.]+$/, '') === basename;
  });
  return match ? files[match] : null;
}

/** Gruppebildet bak forsiden. Legg det i src/assets/media/gruppebilde.jpg */
export const heroImage = findByBasename(images, 'gruppebilde');

/** Presentasjonsvideoen. Legg den i src/assets/media/gruppepresentasjon.mp4 */
export const groupVideo = findByBasename(videos, 'gruppepresentasjon');

/** Valgfritt plakatbilde som vises før videoen spilles av. */
export const videoPoster = findByBasename(images, 'video-poster');
