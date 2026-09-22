/**
 * Hvilke bredder hvert bilde lages i, per mappe i public/.
 *
 * Brukes av både scripts/images.mjs (som lager filene før bygg) og
 * src/components/ResponsiveImage.tsx (som skriver srcset). Står breddene bare
 * ett sted, kan de ikke drifte fra hverandre.
 *
 * Tallene er de samme som Astro-versjonen brukte, så bildene blir like.
 */
export const IMAGE_WIDTHS = {
  team: [400, 700],
  projects: [600, 900, 1400],
  media: [900, 1400, 1920, 2560],
};

/** Mappa de ferdige variantene legges i, under public/. Står i .gitignore. */
export const OUTPUT_DIR = '_images';

/**
 * Breddene et bilde faktisk får. Større enn originalen gir ikke skarpere
 * bilde, så da brukes originalens egen bredde i stedet — slik Astro gjorde.
 */
export function variantWidths(dir, originalWidth) {
  const widths = IMAGE_WIDTHS[dir].map((w) => Math.min(w, originalWidth));
  return [...new Set(widths)].sort((a, b) => a - b);
}

/** Stien en variant serveres fra, f.eks. /_images/team/marius-400.webp */
export function variantPath(dir, filename, width) {
  const base = filename.replace(/\.[^.]+$/, '');
  return `/${OUTPUT_DIR}/${dir}/${base}-${width}.webp`;
}
