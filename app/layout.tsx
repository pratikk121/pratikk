import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import 'remixicon/fonts/remixicon.css'; // Import RemixIcon CSS globally

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Pratik Kadole | Software Engineer',
  description: 'Building the future of digital experiences.',
  keywords: ['Software Engineer', 'Web Developer', 'Portfolio', 'Next.js'],
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
        {children}
      </body>
    </html>
  );
}
