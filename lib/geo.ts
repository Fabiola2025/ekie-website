/**
 * geo.ts — Country / currency detection for the pay page.
 *
 * Strategy (in priority order):
 *   1. Vercel's x-vercel-ip-country header (server-side, free, no external call, no rate limit)
 *   2. ipapi.co lookup (client-side fallback for local dev or non-Vercel origins)
 *   3. Default to Cameroon (safe fallback — this IS a Cameroon-first product)
 *
 * The country code returned is always ISO 3166-1 alpha-2 (US, GB, CM, etc.).
 * The user can always override via the visible country chip on the pay page.
 */

export type CountryInfo = {
  code: string;         // ISO alpha-2, e.g. 'US', 'CM', 'GB'
  name: string;         // Display name, e.g. 'United States'
  currency: string;     // ISO currency, e.g. 'USD', 'XAF'
  flag: string;         // Emoji flag, e.g. '🇺🇸'
  detectionSource: 'vercel-header' | 'ipapi' | 'default';
};

/**
 * Supported countries at launch.
 * Add to this list when new currency/country combinations are added.
 * Keep alphabetical by country name for the picker dropdown.
 */
export const SUPPORTED_COUNTRIES: Omit<CountryInfo, 'detectionSource'>[] = [
  { code: 'CM', name: 'Cameroon',      currency: 'XAF', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada',        currency: 'CAD', flag: '🇨🇦' },
  { code: 'FR', name: 'France',        currency: 'EUR', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany',       currency: 'EUR', flag: '🇩🇪' },
  { code: 'BE', name: 'Belgium',       currency: 'EUR', flag: '🇧🇪' },
  { code: 'IT', name: 'Italy',         currency: 'EUR', flag: '🇮🇹' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
];

/** Fallback country when detection fails. This is a Cameroon-first product,
 *  so Cameroon is the safest default. */
export const DEFAULT_COUNTRY: CountryInfo = {
  code: 'CM',
  name: 'Cameroon',
  currency: 'XAF',
  flag: '🇨🇲',
  detectionSource: 'default',
};

/**
 * Look up country info by ISO code. Returns null if not in supported list.
 * For unsupported countries (e.g. 'ZA', 'NG'), the caller can fall through
 * to a generic "Card payment" flow using dLocal's default USD pricing.
 */
export function getCountryByCode(code: string): CountryInfo | null {
  const upper = (code || '').toUpperCase();
  const match = SUPPORTED_COUNTRIES.find(c => c.code === upper);
  if (!match) return null;
  return { ...match, detectionSource: 'vercel-header' };
}

/**
 * Detect country from Vercel edge headers (server-side).
 * Only works inside Next.js server components / API routes on Vercel.
 *
 * Usage in a server component:
 *   import { headers } from 'next/headers';
 *   const hdrs = headers();
 *   const country = detectCountryFromVercelHeaders(hdrs);
 */
export function detectCountryFromVercelHeaders(
  headers: Headers | { get: (name: string) => string | null }
): CountryInfo {
  const code = headers.get('x-vercel-ip-country');
  if (!code) return DEFAULT_COUNTRY;
  const match = getCountryByCode(code);
  if (match) return { ...match, detectionSource: 'vercel-header' };
  // Detected a country but not in our supported list — return a generic
  // entry so the UI can show "Paying from [Country], will charge in USD".
  const countryName = headers.get('x-vercel-ip-country-region') || code;
  return {
    code: code.toUpperCase(),
    name: countryName,
    currency: 'USD',        // fall back to USD for rest-of-world card payments
    flag: '🌍',
    detectionSource: 'vercel-header',
  };
}

/**
 * Detect country from ipapi.co (client-side, for local dev or non-Vercel).
 * Free tier: 1,000 requests/day. Falls back to DEFAULT_COUNTRY on error.
 *
 * IMPORTANT: only call from the browser. Do not call from a server render
 * loop — it will burn through the rate limit fast.
 */
export async function detectCountryFromIpapi(): Promise<CountryInfo> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s max
    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return DEFAULT_COUNTRY;
    const data = await res.json();
    const code = (data.country_code || '').toUpperCase();
    if (!code) return DEFAULT_COUNTRY;
    const match = getCountryByCode(code);
    if (match) return { ...match, detectionSource: 'ipapi' };
    // Detected but not in supported list — generic entry for rest-of-world.
    return {
      code,
      name: data.country_name || code,
      currency: 'USD',
      flag: '🌍',
      detectionSource: 'ipapi',
    };
  } catch (err) {
    // Network error, timeout, or abort — degrade to default silently.
    // No console.error so we don't spam production logs during ipapi outages.
    return DEFAULT_COUNTRY;
  }
}
