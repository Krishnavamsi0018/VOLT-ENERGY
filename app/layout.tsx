import type { Metadata, Viewport } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VOLT Energy | Charge Beyond Limits',
  description:
    'Premium performance energy drinks engineered for peak human output.',
  openGraph: {
    title: 'VOLT Energy | Charge Beyond Limits',
    description:
      'Premium performance energy drinks engineered for peak human output.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
