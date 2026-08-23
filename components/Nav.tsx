'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageProvider';

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/#services', label: t.nav.services },
    { href: '/#business', label: t.nav.business },
    { href: '/#about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/ekie-logo.png" alt="Ékié" className="h-16" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-white/75 hover:text-gold transition-colors text-sm font-medium link-underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-white/75 hover:text-gold text-xs font-bold tracking-wider transition-colors"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <Link href="/#download" className="bg-gold text-green px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
            {t.nav.cta}
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-green border-t border-gold/10 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="text-white/85 text-sm font-medium block py-1">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="text-gold text-xs font-bold tracking-wider"
              >
                {lang === 'en' ? 'Switch to FR' : 'Switch to EN'}
              </button>
              <Link href="/#download" onClick={() => setOpen(false)} className="bg-gold text-green px-4 py-2 rounded-full text-xs font-bold">
                {t.nav.cta}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
