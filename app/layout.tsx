import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import 'remixicon/fonts/remixicon.css'; // Import RemixIcon CSS globally

import ParticleBackground from "@/components/ParticleBackground";
import Providers from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";
import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import LiveCursors from "@/components/LiveCursors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pratikkadole.dev'),
  title: {
    default: 'Pratik Kadole | Systems & Full-Stack Engineer',
    template: '%s | Pratik Kadole',
  },
  description: 'Senior Systems & Full-Stack Engineer specializing in ambient web desktop environments, distributed architectures, high-performance web applications, and resilient cloud systems.',
  applicationName: 'Pratik Kadole Portfolio',
  authors: [{ name: 'Pratik Kadole', url: 'https://pratikkadole.dev' }],
  creator: 'Pratik Kadole',
  publisher: 'Pratik Kadole',
  keywords: [
    'Pratik Kadole',
    'Systems Engineer',
    'Full-Stack Engineer',
    'Distributed Systems',
    'AetherOS',
    'Next.js 16',
    'React 19',
    'TypeScript',
    'WebGL',
    'Tailwind CSS',
    'Software Architect',
    'Frontend Lead',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pratikkadole.dev',
    siteName: 'Pratik Kadole | Systems & Full-Stack Engineer',
    title: 'Pratik Kadole | Systems & Full-Stack Engineer',
    description: 'Senior Systems & Full-Stack Engineer specializing in ambient web desktop environments, distributed architectures, high-performance web applications, and resilient cloud systems.',
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
    card: 'summary_large_image',
    title: 'Pratik Kadole | Systems & Full-Stack Engineer',
    description: 'Senior Systems & Full-Stack Engineer specializing in ambient web desktop environments, distributed architectures, high-performance web applications, and resilient cloud systems.',
    creator: '@pratikkadole',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <body>
        <div className="bg-mesh"></div>
        <ParticleBackground />

        <LiveBlocksProvider>
          <LiveCursors />
          <CommandPalette />
          <Navbar />
          <Providers>{children}</Providers>
          <Footer />
        </LiveBlocksProvider>
      </body>
    </html>
  );
}
