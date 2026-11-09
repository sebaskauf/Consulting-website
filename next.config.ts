import type { NextConfig } from "next";

// Die Seite selbst ist statisch und liegt in public/ (Startseite + Rechtsseiten).
// Next liefert sie aus, setzt die Sicherheitsheader und leitet alte Adressen um.
const staticPages = ["impressum", "datenschutz", "agb", "widerruf"];

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
      ...staticPages.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
    ];
  },
  async redirects() {
    return [
      { source: "/quiz", destination: "/", permanent: true },
      { source: "/ueber-uns", destination: "/", permanent: true },
      { source: "/kontakt", destination: "/#unternehmen", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      ...staticPages.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/assets/fonts/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
