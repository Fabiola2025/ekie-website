'use client';
/**
 * FeeBreakdownCard — currency-aware payment breakdown display.
 *
 * Two rendering modes based on the fee shape from computeFees():
 *
 *   MoMo (Cameroon in-country):
 *     Single-currency XAF breakdown, "You pay" total in XAF only.
 *
 *   Card (diaspora, US/UK/EU/CA):
 *     Two-currency hero display — "YOU PAY ≈ $X.XX USD" as the
 *     visual anchor, with "→ School receives 19,500 XAF" prominently
 *     beside it. Full XAF breakdown below (school + Ékié fee +
 *     card processing = total XAF).
 *
 * Trust design: parent always sees exactly what arrives at the school in XAF,
 * even when they're paying in their local currency. No hidden conversion.
 *
 * Styling follows the pay page palette (green/mint/cream, rounded-2xl, font-display).
 */
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LanguageProvider';
import { payCopy } from '@/lib/pay-i18n';
import { formatCurrency } from '@/lib/fx';
import type { FeeBreakdown } from '@/lib/pay-fees';

// Local i18n for the two card-only labels not in pay-i18n.ts yet.
// Kept inline so we don't need another patch to pay-i18n.ts.
const CARD_FEE_LABEL = { en: 'Card processing', fr: 'Frais de carte' };
const SCHOOL_GETS_LABEL = { en: 'School receives', fr: "L'école reçoit" };

type Props = {
  breakdown: FeeBreakdown;
};

export default function FeeBreakdownCard({ breakdown }: Props) {
  const { lang } = useLang();
  const c = payCopy[lang];
  const pickerCopy = (payCopy[lang] as any).countryPicker ?? payCopy.en.countryPicker;

  const isCardDiaspora = breakdown.method === 'card' && breakdown.isApproximate;

  // ─── Cameroon MoMo (single currency) ─────────────────────────────────
  if (!isCardDiaspora) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-border p-5 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted mb-2">
          {c.student.paying}
        </p>

        <div className="flex justify-between text-sm">
          <span className="text-ink">{SCHOOL_GETS_LABEL[lang] ?? SCHOOL_GETS_LABEL.en}</span>
          <span className="font-semibold text-ink">
            {formatCurrency(breakdown.schoolReceivesXaf, 'XAF')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted">{c.student.ekieFee} (1.5%)</span>
          <span className="text-muted">{formatCurrency(breakdown.ekieFeeXaf, 'XAF')}</span>
        </div>

        {breakdown.method === 'momo' && (
          <div className="flex justify-between text-sm">
            <span className="text-muted">{c.student.cinetpayFee} (1%)</span>
            <span className="text-muted">{formatCurrency(breakdown.processorFeeXaf, 'XAF')}</span>
          </div>
        )}

        <div className="border-t border-border pt-3 mt-3 flex justify-between items-baseline">
          <span className="text-ink font-semibold">{c.student.youPay}</span>
          <span className="font-display text-2xl text-green font-bold">
            {breakdown.totalXafDisplay}
          </span>
        </div>
      </div>
    );
  }

  // ─── Diaspora Card (dual-currency hero) ──────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      {/* Hero: YOU PAY (local currency) → SCHOOL GETS (XAF) */}
      <div className="bg-gradient-to-br from-mint to-cream p-6 border-b border-border">
        <p className="text-xs uppercase tracking-wide text-muted mb-3">
          {c.student.paying}
        </p>
        <div className="flex items-center justify-between gap-4">
          {/* You pay side */}
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted mb-1">
              {c.student.youPay}
            </p>
            <p className="font-display text-3xl md:text-4xl text-green font-bold leading-tight">
              {pickerCopy.approximateCost} {breakdown.totalInLocalCurrencyDisplay}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 text-green">
            <ArrowRight size={28} strokeWidth={2.5} />
          </div>

          {/* School gets side */}
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs uppercase tracking-wide text-muted mb-1">
              {SCHOOL_GETS_LABEL[lang] ?? SCHOOL_GETS_LABEL.en}
            </p>
            <p className="font-display text-2xl md:text-3xl text-green font-bold leading-tight">
              {formatCurrency(breakdown.schoolReceivesXaf, 'XAF')}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed XAF breakdown */}
      <div className="p-5 space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted mb-2">
          {lang === 'fr' ? 'Détail en XAF' : 'Breakdown in XAF'}
        </p>

        <div className="flex justify-between text-sm">
          <span className="text-ink">{SCHOOL_GETS_LABEL[lang] ?? SCHOOL_GETS_LABEL.en}</span>
          <span className="text-ink">{formatCurrency(breakdown.schoolReceivesXaf, 'XAF')}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted">{c.student.ekieFee} (1.5%)</span>
          <span className="text-muted">{formatCurrency(breakdown.ekieFeeXaf, 'XAF')}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted">
            {CARD_FEE_LABEL[lang] ?? CARD_FEE_LABEL.en} (3%)
          </span>
          <span className="text-muted">{formatCurrency(breakdown.processorFeeXaf, 'XAF')}</span>
        </div>

        <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
          <span className="text-ink font-semibold">
            {lang === 'fr' ? 'Total en XAF' : 'Total in XAF'}
          </span>
          <span className="text-ink font-semibold">{breakdown.totalXafDisplay}</span>
        </div>

        <p className="pt-2 text-xs text-muted italic leading-snug">
          {pickerCopy.finalRateNote}
          {breakdown.rateFallbackUsed && (
            <span className="block mt-1">
              {lang === 'fr'
                ? '(taux temporairement indisponible — estimation récente)'
                : '(rate temporarily unavailable — using recent estimate)'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
