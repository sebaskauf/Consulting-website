import type { Metadata } from "next";
import "./globals.css";

// Die eigentliche Seite liegt statisch in public/ (index.html + Rechtsseiten).
// Dieses Layout rendert nur noch die 404-Seite.
export const metadata: Metadata = {
  title: "Seite nicht gefunden · SKAILE",
  robots: { index: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
