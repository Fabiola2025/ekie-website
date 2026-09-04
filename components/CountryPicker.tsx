'use client';
/**
 * CountryPicker — the chip + modal for country/currency selection.
 *
 * Usage:
 *   <CountryPicker />
 *
 * Renders as a small chip: "🇨🇲 Paying from Cameroon · Change"
 * On click of Change, opens a modal with the supported countries.
 * On selection, persists via useCountry hook + closes modal.
 *
 * Styling follows the pay page palette:
 *   - bg-white/80 with subtle border-border for the chip
 *   - font-display for the modal title
 *   - green primary CTA (rounded-full)
 *   - lucide-react icons
 */
import { useState } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageProvider';
import { payCopy } from '@/lib/pay-i18n';
import { useCountry } from '@/lib/useCountry';

export default function CountryPicker() {
  const { lang } = useLang();
  const c = (payCopy[lang] as any).countryPicker ?? payCopy.en.countryPicker;
  const { country, setCountry, supportedCountries, loading } = useCountry();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-border text-sm text-muted">
        <Globe size={14} className="animate-pulse" />
        <span>...</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-border text-sm hover:bg-white hover:border-green transition-colors"
        aria-label={`${c.payingFrom} ${country.name}. ${c.change}.`}
      >
        <span className="text-base leading-none" aria-hidden>{country.flag}</span>
        <span className="text-muted">{c.payingFrom}</span>
        <span className="font-semibold text-green">{country.name}</span>
        <span className="text-muted">·</span>
        <span className="text-green underline">{c.change}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-soft p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-xl text-green mb-1">{c.modalTitle}</h2>
                <p className="text-sm text-muted">{c.modalSubtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 -m-1 rounded-full hover:bg-cream transition-colors"
                aria-label={c.close}
              >
                <X size={20} className="text-muted" />
              </button>
            </div>

            <ul className="space-y-1 max-h-80 overflow-y-auto">
              {supportedCountries.map((opt) => {
                const isSelected = opt.code === country.code;
                return (
                  <li key={opt.code}>
                    <button
                      onClick={() => {
                        setCountry(opt.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-left ${
                        isSelected
                          ? 'bg-mint text-green'
                          : 'hover:bg-cream text-green'
                      }`}
                    >
                      <span className="text-2xl leading-none" aria-hidden>{opt.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{opt.name}</div>
                        <div className="text-xs text-muted">{opt.currency}</div>
                      </div>
                      {isSelected && <Check size={18} className="text-green flex-shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
