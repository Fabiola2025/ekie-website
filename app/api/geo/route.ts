/**
 * GET /api/geo
 *
 * Server-side country detection. Reads Vercel's edge headers, which are set
 * automatically for every request routed through Vercel's network:
 *   - x-vercel-ip-country (ISO alpha-2, e.g. 'US', 'CM')
 *   - x-vercel-ip-country-region (regional detail, sometimes)
 *
 * If the header isn't present (local dev, non-Vercel origin), returns a
 * default CM entry — the client-side hook will then fall through to
 * ipapi.co as its next attempt.
 *
 * Response shape: { code, name, currency, flag }
 */
import { headers } from 'next/headers';
import { detectCountryFromVercelHeaders, DEFAULT_COUNTRY } from '@/lib/geo';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hdrs = headers();
    const info = detectCountryFromVercelHeaders(hdrs);
    return Response.json({
      code: info.code,
      name: info.name,
      currency: info.currency,
      flag: info.flag,
      source: info.detectionSource,
    });
  } catch {
    return Response.json({
      code: DEFAULT_COUNTRY.code,
      name: DEFAULT_COUNTRY.name,
      currency: DEFAULT_COUNTRY.currency,
      flag: DEFAULT_COUNTRY.flag,
      source: 'default',
    });
  }
}
