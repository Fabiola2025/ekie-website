/**
 * fx.ts — FX rate service for approximate cost display on the pay page.
 *
 * Strategy:
 *   1. Fetch EUR-based rates from Frankfurter (free, unlimited, no API key).
 *   2. Compute XAF conversion via the fixed EUR ↔ XAF peg (655.957).
 *      This peg is a legal fixed rate guaranteed by the French Treasury,
 *      unchanged since 1999. Using it means our XAF rates don't depend
 *      on any service supporting XAF directly.
 *   3. Cache rates in-memory for 4 hours (Frankfurter updates once daily
 *      at 4pm CET — no benefit from more frequent polling).
 *   4. Fall back gracefully if Frankfurter is unreachable.
 *
 * IMPORTANT: This is for DISPLAY ONLY. The real currency conversion
 * happens at dLocal's checkout using their own rate at the moment of
 * charge. Our display always shows "~$XXX" with a disclaimer that the
 * final amount depends on the payer's card issuer / dLocal's rate.
 */

/**
 * Fixed peg: 1 EUR = 655.957 XAF.
 * Set by France in 1999 during the euro transition, guaranteed by the
 * French Treasury for the CFA franc zone. Do not modify.
 */
export const EUR_XAF_PEG = 655.957;

/** Currencies we support for display, in the priority order of our launch markets. */
export const SUPPORTED_DISPLAY_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD'] as const;
export type DisplayCurrency = typeof SUPPORTED_DISPLAY_CURRENCIES[number];

/**
 * Result of a rate lookup. `rate` is the number of local currency units per 1 XAF.
 * e.g. rate=0.00166 for USD means 1 XAF = $0.00166, so 140,000 XAF = $232.4.
 */
export type FxRate = {
  fromCurrency: 'XAF';
  toCurrency: DisplayCurrency;
  rate: number;              // local currency per 1 XAF
  fetchedAt: number;         // epoch ms of when we last fetched
  source: 'frankfurter' | 'fallback-static';
  isFallback: boolean;       // true if we're using a hardcoded stale rate
};

// ─── In-memory cache ───────────────────────────────────────────────────
// Node/browser both have module-level state. In serverless (Vercel edge),
// each invocation may hit a fresh instance — that's fine, we just re-fetch.
// The 4-hour cache primarily helps a warm instance handle many requests.

const CACHE_TTL_MS = 4 * 60 * 60 * 1000;   // 4 hours
let cache: {
  fetchedAt: number;
  rates: Partial<Record<DisplayCurrency, number>>;   // rates PER 1 XAF
} | null = null;

/**
 * Fallback rates — used when Frankfurter is unreachable. Set to conservative
 * values a bit worse than real (protects us from wildly under-quoting).
 * These will be stale but the "~" prefix + disclaimer text handles that.
 * Reflect roughly XAF at Q4 2025 levels. Update if drift is significant.
 */
const FALLBACK_RATES_PER_XAF: Record<DisplayCurrency, number> = {
  USD: 1 / 605,      // ~605 XAF per USD → 1 XAF ≈ $0.00165
  EUR: 1 / 655.957,  // exact peg
  GBP: 1 / 780,      // ~780 XAF per GBP
  CAD: 1 / 440,      // ~440 XAF per CAD
};

// ─── Public API ────────────────────────────────────────────────────────

/**
 * Get an FX rate to convert XAF to the given currency.
 * Uses cache if fresh; refreshes from Frankfurter otherwise.
 * Never throws — always returns a rate (fallback if all else fails).
 */
export async function getRate(toCurrency: DisplayCurrency): Promise<FxRate> {
  if (toCurrency === 'EUR') {
    return {
      fromCurrency: 'XAF',
      toCurrency: 'EUR',
      rate: 1 / EUR_XAF_PEG,
      fetchedAt: Date.now(),
      source: 'frankfurter',      // technically not — it's the peg — but semantically live
      isFallback: false,
    };
  }
  const now = Date.now();
  if (cache && (now - cache.fetchedAt) < CACHE_TTL_MS && cache.rates[toCurrency] != null) {
    return {
      fromCurrency: 'XAF',
      toCurrency,
      rate: cache.rates[toCurrency]!,
      fetchedAt: cache.fetchedAt,
      source: 'frankfurter',
      isFallback: false,
    };
  }
  const fresh = await fetchFrankfurterRates();
  if (fresh) {
    cache = { fetchedAt: now, rates: fresh };
    if (fresh[toCurrency] != null) {
      return {
        fromCurrency: 'XAF',
        toCurrency,
        rate: fresh[toCurrency]!,
        fetchedAt: now,
        source: 'frankfurter',
        isFallback: false,
      };
    }
  }
  // All else failed — fallback.
  return {
    fromCurrency: 'XAF',
    toCurrency,
    rate: FALLBACK_RATES_PER_XAF[toCurrency],
    fetchedAt: now,
    source: 'fallback-static',
    isFallback: true,
  };
}

/**
 * Convert an XAF amount to the target currency using the current rate.
 * Rounds to 2 decimal places for currency display.
 */
export async function convertFromXaf(
  xafAmount: number,
  toCurrency: DisplayCurrency
): Promise<{ amount: number; rate: FxRate }> {
  const rate = await getRate(toCurrency);
  const converted = xafAmount * rate.rate;
  return {
    amount: Math.round(converted * 100) / 100,
    rate,
  };
}

/**
 * Format a number as a currency string for display.
 * Uses browser/Node's Intl.NumberFormat.
 * Example: formatCurrency(232.45, 'USD') → '$232.45'
 */
export function formatCurrency(amount: number, currency: string, locale = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'XAF' ? 0 : 2,
    }).format(amount);
  } catch {
    // Fallback if currency code is not recognized by Intl
    return `${amount.toFixed(2)} ${currency}`;
  }
}

// ─── Internal: Frankfurter fetch ───────────────────────────────────────

/**
 * Fetch USD, GBP, CAD rates from Frankfurter (EUR base) and derive
 * XAF-based rates using the fixed peg.
 * Returns null on any failure.
 */
async function fetchFrankfurterRates(): Promise<Partial<Record<DisplayCurrency, number>> | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
    const url = 'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,GBP,CAD';
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json() as { rates?: Record<string, number> };
    if (!data.rates) return null;
    // data.rates gives us: { USD: 1.09, GBP: 0.84, CAD: 1.48 }
    // These are per 1 EUR. We want per 1 XAF.
    // 1 EUR = 655.957 XAF, so 1 XAF = (1/655.957) EUR
    // Therefore rate per XAF = rate per EUR × (1/655.957)
    const perXaf: Partial<Record<DisplayCurrency, number>> = {
      EUR: 1 / EUR_XAF_PEG,   // exact
    };
    if (typeof data.rates.USD === 'number') perXaf.USD = data.rates.USD / EUR_XAF_PEG;
    if (typeof data.rates.GBP === 'number') perXaf.GBP = data.rates.GBP / EUR_XAF_PEG;
    if (typeof data.rates.CAD === 'number') perXaf.CAD = data.rates.CAD / EUR_XAF_PEG;
    return perXaf;
  } catch {
    // Timeout, network error, or other — treat as unavailable.
    return null;
  }
}

/**
 * For debugging / operations: force a cache refresh on next call.
 * Not used by normal code paths; exposed for admin tooling.
 */
export function invalidateFxCache(): void {
  cache = null;
}
