import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Hver side får adresse med skråstrek til slutt: /about/ i stedet for /about,
  // slik at lenkene fra Astro-versjonen fortsatt virker.
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
