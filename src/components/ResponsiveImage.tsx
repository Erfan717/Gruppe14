import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGE_WIDTHS, variantPath, variantWidths } from '@/lib/image-widths.mjs';

/**
 * Et bilde fra public/ i flere bredder, ferdig komprimert til WebP.
 *
 * Variantene lages av scripts/images.mjs før bygg, og breddene står i
 * src/lib/image-widths.mjs. Hvilke bredder bildet får, bestemmes av mappa det
 * ligger i: public/team/, public/projects/ eller public/media/.
 *
 * Kjøres bare på serveren: originalens størrelse leses fra fila ved bygg.
 */
type Props = {
  /** Sti i public/, f.eks. /team/marius.jpg */
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Forsidebildet skal lastes med en gang, alt annet når det nærmer seg. */
  priority?: boolean;
};

type Dir = keyof typeof IMAGE_WIDTHS;

export default async function ResponsiveImage({ src, alt, sizes, className, priority }: Props) {
  const [, dir, filename] = src.split('/') as [string, Dir, string];
  const { width = 0, height = 0 } = await sharp(path.join(process.cwd(), 'public', src)).metadata();
  const widths = variantWidths(dir, width);

  // Mangler en variant, er bildeskriptet ikke kjørt. Stopp bygget med en
  // forklaring i stedet for å publisere en side med ødelagte bilder.
  for (const w of widths) {
    if (!fs.existsSync(path.join(process.cwd(), 'public', variantPath(dir, filename, w)))) {
      throw new Error(`Mangler ${variantPath(dir, filename, w)}. Kjør «pnpm images» og prøv igjen.`);
    }
  }

  const srcSet = widths.map((w) => `${variantPath(dir, filename, w)} ${w}w`).join(', ');

  return (
    <img
      src={variantPath(dir, filename, widths[widths.length - 1])}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
    />
  );
}
