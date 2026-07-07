import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ékié | Trust infrastructure for African families',
  description: 'Ékié lets diaspora families pay directly for what matters — school fees, foodstuffs, medical care, construction, everyday support — to verified vendors in Cameroon. With receipts. With QR pickup. Launching September 2026.',
  keywords: ['Ékié', 'Cameroon', 'diaspora', 'Akao', 'purpose-locked payments', 'family support', 'remittance', 'trust infrastructure', 'verified vendors', 'school fees', 'construction materials', 'foodstuffs'],
  openGraph: {
    title: 'Ékié — Trust infrastructure for African families',
    description: 'Send outcomes, not just cash. Purpose-locked family support across Cameroon.',
    // keep any existing image + url + siteName fields
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ékié — Trust infrastructure for African families',
    description: 'Send outcomes, not just cash. Purpose-locked family support across Cameroon.',
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
