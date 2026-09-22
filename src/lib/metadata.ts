import type { Metadata } from 'next';
import { site } from '@/data/site';

/**
 * Tittel, beskrivelse, canonical og Open Graph for én side, satt sammen ett
 * sted så alle sidene får de samme taggene.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      locale: 'nb_NO',
    },
    twitter: { card: 'summary_large_image' },
  };
}
