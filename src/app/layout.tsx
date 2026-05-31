import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { LenisProvider } from '@/lib/lenis/provider';
import { Header } from '@/components/layout/header/Header';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apexultra.vercel.app'),
  title: {
    default: 'Apex Ultra — O Notebook Mais Fino do Mundo',
    template: '%s | Apex Ultra',
  },
  description:
    'Apex Ultra: 8.9mm de espessura, 890g, 24h de bateria. O notebook ultrafino que redefine o que é possível.',
  keywords: [
    'notebook ultrafino',
    'notebook premium',
    'laptop fino',
    'Apex Ultra',
    'melhor notebook 2025',
  ],
  authors: [{ name: 'Apex Ultra' }],
  creator: 'Apex Ultra',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://apexultra.vercel.app',
    siteName: 'Apex Ultra',
    title: 'Apex Ultra — O Notebook Mais Fino do Mundo',
    description: 'Apex Ultra: 8.9mm de espessura, 890g, 24h de bateria.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apex Ultra notebook',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Ultra — O Notebook Mais Fino do Mundo',
    description: 'Apex Ultra: 8.9mm de espessura, 890g, 24h de bateria.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body suppressHydrationWarning>
        <LenisProvider>
          <Header />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
