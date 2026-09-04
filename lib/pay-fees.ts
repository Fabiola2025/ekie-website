/**
 * pay-fees.ts — Currency-aware fee calculation for the pay page.
 *
 * Given a XAF amount (what the school receives) and a payer country,
 * returns the full fee breakdown in the shape the UI should render.
 *
 * Two entry points:
 *   - computeFees()     ASYNC — fetches FX rate as needed (for one-shot use)
 *   - computeFeesSync() SYNC  — uses a pre-fetched rate (for useMemo pattern
 *                                on hot render paths like the student page)
 *
 * Two shapes:
 *   1. In-country (Cameroon → CinetPay MoMo):
 *      school + ekieFee (1.5%) + momoFee (1%) = total in XAF only
 *   2. Diaspora (US/UK/CA/EU → dLocal card):
 *      school + ekieFee (1.5%) = total in XAF
 *      Approximate cost in local currency shown separately
 *      (Card processor's rate is what actually gets charged.)
 *
 * IMPORTANT: These rates are DISPLAY-only. Server recomputes final charge
 * for security. If backend rates change, update here too.
 */

import type { CountryInfo } from './geo';
import {
  convertFromXaf, formatCurrency, getRate,
  type DisplayCurrency, type FxRate,
  SUPPORTED_DISPLAY_CURRENCIES,
} from './fx';

// ─── Rate constants (in sync with backend) ─────────────────────────────
const EKIE_FEE_RATE = 0.015;          // 1.5% — Ékié platform fee
const MOMO_FEE_RATE = 0.01;           // 1% — CinetPay MoMo processing (in-country)
// PSP fee for card payments (diaspora path via dLocal).
// PLACEHOLDER: 3% — update once dLocal confirms actual Cameroon card rate.
// Cross-border card processing is typically 2.9-4%.
const CARD_FEE_RATE = 0.03;           // 3% — dLocal card processing (diaspora)

export type PaymentMethod = 'momo' | 'card';

export type FeeBreakdown = {
  method: PaymentMethod;
  schoolReceivesXaf: number;
  ekieFeeXaf: number;
  processorFeeXaf: number;           // 0 for card (dLocal absorbs)
  totalXaf: number;
  currency: string;                   // display currency (XAF, USD, EUR, ...)
  totalInLocalCurrency: number | null;  // null for XAF (no conversion needed)
  totalInLocalCurrencyDisplay: string;  // formatted with symbol, e.g. "~$247.87 USD"
  totalXafDisplay: string;              // always shown, e.g. "142,800 XAF"
  isApproximate: boolean;               // true for diaspora (rate estimate)
  rateFallbackUsed: boolean;            // true if FX API was unreachable
};

/**
 * Determine which payment method a country uses.
 * Cameroon → MoMo (CinetPay). Everyone else → Card (dLocal).
 */
export function paymentMethodForCountry(country: CountryInfo): PaymentMethod {
  return country.code === 'CM' ? 'momo' : 'card';
}

/**
 * Fetch just the FX rate for a country's currency.
 * Returns null for Cameroon (no conversion needed) or unsupported currencies.
 * Used by the useEffect + useMemo pattern on the student page.
 */
export async function fetchRateForCountry(country: CountryInfo): Promise<FxRate | null> {
  if (country.code === 'CM') return null;
  const currency = country.currency;
  if (!(SUPPORTED_DISPLAY_CURRENCIES as readonly string[]).includes(currency)) return null;
  return await getRate(currency as DisplayCurrency);
}

/**
 * Synchronous fee computation. Uses a pre-fetched FX rate (or null for XAF-only).
 * This is the hot path — safe to call from useMemo without triggering re-fetches.
 *
 * @param schoolReceivesXaf - amount the school will actually receive, in XAF
 * @param country - the payer's country (from useCountry hook)
 * @param rate - the pre-fetched FX rate for country's currency, or null if XAF
 */
export function computeFeesSync(
  schoolReceivesXaf: number,
  country: CountryInfo,
  rate: FxRate | null
): FeeBreakdown {
  const method = paymentMethodForCountry(country);
  const ekieFeeXaf = Math.round(schoolReceivesXaf * EKIE_FEE_RATE);

  if (method === 'momo') {
    // In-country: XAF only, MoMo fee shown separately.
    const processorFeeXaf = Math.round(schoolReceivesXaf * MOMO_FEE_RATE);
    const totalXaf = schoolReceivesXaf + ekieFeeXaf + processorFeeXaf;
    return {
      method,
      schoolReceivesXaf,
      ekieFeeXaf,
      processorFeeXaf,
      totalXaf,
      currency: 'XAF',
      totalInLocalCurrency: null,
      totalInLocalCurrencyDisplay: formatCurrency(totalXaf, 'XAF'),
      totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
      isApproximate: false,
      rateFallbackUsed: false,
    };
  }

  // Diaspora path: card via dLocal.
  const cardFeeXaf = Math.round(schoolReceivesXaf * CARD_FEE_RATE);
  const totalXaf = schoolReceivesXaf + ekieFeeXaf + cardFeeXaf;
  const currency = country.currency;
  const isSupported = (SUPPORTED_DISPLAY_CURRENCIES as readonly string[]).includes(currency);

  if (!isSupported || !rate) {
    // Country outside supported currencies, or rate not yet loaded.
    // Show XAF-only until rate arrives (or forever, if rest-of-world).
    return {
      method,
      schoolReceivesXaf,
      ekieFeeXaf,
      processorFeeXaf: cardFeeXaf,
      totalXaf,
      currency: 'XAF',
      totalInLocalCurrency: null,
      totalInLocalCurrencyDisplay: formatCurrency(totalXaf, 'XAF'),
      totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
      isApproximate: false,
      rateFallbackUsed: false,
    };
  }

  const localAmount = Math.round(totalXaf * rate.rate * 100) / 100;
  return {
    method,
    schoolReceivesXaf,
    ekieFeeXaf,
    processorFeeXaf: cardFeeXaf,
    totalXaf,
    currency,
    totalInLocalCurrency: localAmount,
    totalInLocalCurrencyDisplay: formatCurrency(localAmount, currency),
    totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
    isApproximate: true,
    rateFallbackUsed: rate.isFallback,
  };
}

/**
 * Async convenience wrapper — fetches rate and computes in one call.
 * Prefer computeFeesSync() + fetchRateForCountry() on hot render paths.
 */
export async function computeFees(
  schoolReceivesXaf: number,
  country: CountryInfo
): Promise<FeeBreakdown> {
  const method = paymentMethodForCountry(country);
  const ekieFeeXaf = Math.round(schoolReceivesXaf * EKIE_FEE_RATE);

  if (method === 'momo') {
    // In-country: XAF only, MoMo fee shown separately.
    const processorFeeXaf = Math.round(schoolReceivesXaf * MOMO_FEE_RATE);
    const totalXaf = schoolReceivesXaf + ekieFeeXaf + processorFeeXaf;
    return {
      method,
      schoolReceivesXaf,
      ekieFeeXaf,
      processorFeeXaf,
      totalXaf,
      currency: 'XAF',
      totalInLocalCurrency: null,
      totalInLocalCurrencyDisplay: formatCurrency(totalXaf, 'XAF'),
      totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
      isApproximate: false,
      rateFallbackUsed: false,
    };
  }

  // Diaspora path: card via dLocal.
  // Card processor fee shown as separate line (parent pays on top model).
  const cardFeeXaf = Math.round(schoolReceivesXaf * CARD_FEE_RATE);
  const totalXaf = schoolReceivesXaf + ekieFeeXaf + cardFeeXaf;

  // Convert to local currency for display.
  // Fall back to XAF-only display if we don't support the country's currency.
  const currency = country.currency;
  const isSupported = (SUPPORTED_DISPLAY_CURRENCIES as readonly string[]).includes(currency);
  if (!isSupported) {
    // Country outside our supported currencies (e.g. rest-of-world card fallback).
    return {
      method,
      schoolReceivesXaf,
      ekieFeeXaf,
      processorFeeXaf: cardFeeXaf,
      totalXaf,
      currency: 'XAF',
      totalInLocalCurrency: null,
      totalInLocalCurrencyDisplay: formatCurrency(totalXaf, 'XAF'),
      totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
      isApproximate: false,
      rateFallbackUsed: false,
    };
  }

  const { amount: localAmount, rate } = await convertFromXaf(totalXaf, currency as DisplayCurrency);
  return {
    method,
    schoolReceivesXaf,
    ekieFeeXaf,
    processorFeeXaf: cardFeeXaf,
    totalXaf,
    currency,
    totalInLocalCurrency: localAmount,
    totalInLocalCurrencyDisplay: formatCurrency(localAmount, currency),
    totalXafDisplay: formatCurrency(totalXaf, 'XAF'),
    isApproximate: true,
    rateFallbackUsed: rate.isFallback,
  };
}
