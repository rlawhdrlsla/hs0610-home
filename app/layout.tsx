import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'HS Tools — Free Online Utility Tools',
  description: 'Free browser-based tools for developers, designers, and everyday users. Color conversion, developer utilities, text processing, CSS generation, file conversion, and sleep cycle calculation. No login required.',
  keywords: 'free online tools, color converter, developer tools, text tools, CSS generator, file converter, HEX RGB converter, JSON formatter, Base64, UUID generator',
  openGraph: {
    title: 'HS Tools — Free Online Utility Tools',
    description: 'Free browser-based tools for developers and designers. No login, no install, completely free.',
    type: 'website',
    url: 'https://hs0610.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2550387699417589"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
