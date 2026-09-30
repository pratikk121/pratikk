import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import 'remixicon/fonts/remixicon.css';

import Providers from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pratikk.site'),
  title: {
    default: 'Pratik Kadole | Software Engineer',
    template: '%s | Pratik Kadole',
  },
  description: 'Software engineer building practical web applications, developer tools, and systems. Portfolio, open source projects, and case studies.',
  applicationName: 'Pratik Kadole Portfolio',
  authors: [{ name: 'Pratik Kadole', url: 'https://github.com/pratikk121' }],
  creator: 'Pratik Kadole',
  publisher: 'Pratik Kadole',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pratikk.site',
    siteName: 'Pratik Kadole',
    title: 'Pratik Kadole | Software Engineer',
    description: 'Software engineer building practical web applications, developer tools, and systems.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Pratik Kadole Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Pratik Kadole | Software Engineer',
    description: 'Software engineer building practical web applications, developer tools, and systems.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#000000] text-[#f0f0f0] antialiased min-h-screen flex flex-col selection:bg-[#9281f7]/30 selection:text-white">
        <CommandPalette />
        <Navbar />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Footer />
      </body>
    </html>
  );
}
