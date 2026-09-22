/**
 * Lager de komprimerte bildevariantene i public/_images/ før siden bygges.
 *
 * Kjøres automatisk av `pnpm dev` og `pnpm build`. Legger du inn et nytt bilde
 * mens dev-serveren kjører, kjør `pnpm images` (eller start dev på nytt).
 *
 * Hvorfor ikke Next sin innebygde bildetjeneste? Den skalerer bare etter
 * bredde. Astro-versjonen skalerte etter bredde OG høyde, og det gir litt
 * andre piksler. Dette skriptet gjør nøyaktig det samme kallet til sharp som
 * Astro gjorde, så bildene er identiske med dem siden hadde før.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGE_WIDTHS, OUTPUT_DIR, variantWidths, variantPath } from '../src/lib/image-widths.mjs';

const root = process.cwd();
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

let made = 0;
let skipped = 0;

for (const dir of Object.keys(IMAGE_WIDTHS)) {
  const source = path.join(root, 'public', dir);
  if (!fs.existsSync(source)) continue;

  for (const file of fs.readdirSync(source).filter((f) => IMAGE_EXT.test(f))) {
    const input = path.join(source, file);
    const { width, height } = await sharp(input).metadata();

    for (const w of variantWidths(dir, width)) {
      const output = path.join(root, 'public', variantPath(dir, file, w));

      // Hopp over varianter som allerede er nyere enn originalen.
      if (fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(input).mtimeMs) {
        skipped++;
        continue;
      }

      fs.mkdirSync(path.dirname(output), { recursive: true });
      await sharp(input, { failOn: 'none', pages: -1 })
        .rotate()
        .resize({ width: w, height: Math.round((height * w) / width), withoutEnlargement: true })
        .webp()
        .toFile(output);
      made++;
    }
  }
}

console.log(`bilder: ${made} laget, ${skipped} uendret (public/${OUTPUT_DIR}/)`);
