import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ékié | Contribute, Shop, Book & Grow Together',
  description: 'Ékié is a Cameroonian platform for Akao contributions, marketplace shopping, bookings, school fees and Njangi circles. Where your money is family.',
  keywords: ['Ékié', 'Cameroon', 'Akao', 'Njangi', 'mobile money', 'marketplace', 'bookings'],
  authors: [{ name: 'Fabiola Nsuh' }],
  openGraph: {
    title: 'Ékié — Where your money is family',
    description: 'One platform for Akao, marketplace, bookings, school fees and Njangi circles. Built for Cameroon.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ékié',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ékié — Where your money is family',
    description: 'Cameroonian platform for everyday financial life.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
