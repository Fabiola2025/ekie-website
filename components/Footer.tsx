'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageProvider';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-3xl font-black text-gold mb-3">Ékié</div>
            <p className="text-sm text-white/55 leading-relaxed mb-3">{t.footer.tagline}</p>
            <p className="text-xs text-white/40">🇨🇲 🇺🇸 {t.footer.madeIn}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#akao" className="hover:text-gold transition-colors">{t.footer.productLinks.akao}</Link></li>
              <li><Link href="/#marketplace" className="hover:text-gold transition-colors">{t.footer.productLinks.marketplace}</Link></li>
              <li><Link href="/#bookings" className="hover:text-gold transition-colors">{t.footer.productLinks.bookings}</Link></li>
              <li><Link href="/#school-fees" className="hover:text-gold transition-colors">{t.footer.productLinks.schoolFees}</Link></li>
              <li><Link href="/why-ekie" className="hover:text-gold transition-colors">{t.footer.companyLinks.whyEkie}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-gold transition-colors">{t.footer.companyLinks.about}</Link></li>
              <li><Link href="/#contact" className="hover:text-gold transition-colors">{t.footer.companyLinks.contact}</Link></li>
              <li><Link href="/#vendor" className="hover:text-gold transition-colors">{t.footer.companyLinks.vendor}</Link></li>
              <li className="pt-3 text-xs text-white/40 space-y-1">
                <div><a href="mailto:hello@myekie.com" className="hover:text-gold">hello@myekie.com</a></div>
                <div><a href="mailto:support@myekie.com" className="hover:text-gold">support@myekie.com</a></div>
                <div><a href="mailto:partners@myekie.com" className="hover:text-gold">partners@myekie.com</a></div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-gold transition-colors">{t.footer.legalLinks.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition-colors">{t.footer.legalLinks.terms}</Link></li>
              <li><Link href="/cookies" className="hover:text-gold transition-colors">{t.footer.legalLinks.cookies}</Link></li>
              <li><Link href="/security" className="hover:text-gold transition-colors">{t.footer.legalLinks.security}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {year} Ékié. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">{t.footer.legalLinks.privacy}</Link>
            <Link href="/terms" className="hover:text-gold">{t.footer.legalLinks.terms}</Link>
            <Link href="/security" className="hover:text-gold">{t.footer.legalLinks.security}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
