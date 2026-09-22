import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import '@/styles/global.css';

/**
 * Rammen rundt alle sider: <html>, <head>, skriftene og footeren.
 *
 * Headeren og <main> ligger ett nivå ned, i (forside)/layout.tsx og
 * (sider)/layout.tsx, fordi det er der det avgjøres om headeren skal ligge
 * gjennomsiktig oppå et bilde eller ikke.
 */

// Skriftene lastes ned ved bygg og serveres fra vårt eget domene.
// Ingen forespørsel til Google når noen besøker siden — raskere, og
// ingen tredjepart som får vite hvem som leser.
const inter = Inter({
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  // Bytt til gruppas faktiske adresse når siden publiseres.
  // Brukes til absolutte URL-er i canonical og meta-tagger.
  metadataBase: new URL('https://gruppe14.example.no'),
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafafb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#innhold">
          Hopp til innhold
        </a>

        {children}

        <Footer />
      </body>
    </html>
  );
}
