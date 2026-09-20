// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Bytt til gruppas faktiske adresse nar siden publiseres.
  // Brukes til absolutte URL-er i sitemap og meta-tagger.
  site: 'https://gruppe14.example.no',

  // Hver side blir sin egen mappe: /about/ i stedet for /about.html
  build: {
    format: 'directory',
  },

  // Skriftene lastes ned ved bygg og serveres fra vart eget domene.
  // Ingen foresporsel til Google nar noen besoker siden — raskere, og
  // ingen tredjepart som far vite hvem som leser.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
});
