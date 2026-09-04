'use client';
/**
 * useCountry — client-side hook for country/currency selection.
 *
 * SHARED STATE MODEL:
 *   Country selection is stored at MODULE level (not per-component) so that
 *   every component calling useCountry() sees the same value. When the user
 *   picks a new country in the CountryPicker, ALL other useCountry() consumers
 *   (like the student page's fee display) get notified and re-render.
 *
 *   Without this, each hook instance had its own independent React state
 *   and a page refresh was needed to pick up changes made elsewhere.
 *
 * Resolution order for initial load (first match wins):
 *   1. localStorage 'ekie-country' — explicit user override, sticky across visits
 *   2. Server API /api/geo (uses Vercel's x-vercel-ip-country header)
 *   3. Browser ipapi.co fallback (for local dev / non-Vercel)
 *   4. DEFAULT_COUNTRY (Cameroon)
 */
import { useEffect, useState, useCallback } from 'react';
import {
  CountryInfo, DEFAULT_COUNTRY, SUPPORTED_COUNTRIES,
  getCountryByCode, detectCountryFromIpapi,
} from './geo';

const STORAGE_KEY = 'ekie-country';

// ─── Shared module-level state ─────────────────────────────────────────
// Every useCountry() call subscribes to this. When it changes, all
// subscribers re-render with the new value.

type Listener = (country: CountryInfo) => void;
let sharedCountry: CountryInfo = DEFAULT_COUNTRY;
let hasInitialized = false;
const listeners = new Set<Listener>();

function notifyAll() {
  listeners.forEach(fn => fn(sharedCountry));
}

function updateShared(next: CountryInfo) {
  sharedCountry = next;
  notifyAll();
}

/**
 * Initialize the shared country from localStorage / server / ipapi.
 * Runs ONCE across the entire app lifetime (per browser session).
 */
async function initializeSharedCountry() {
  if (hasInitialized) return;
  hasInitialized = true;

  // 1) localStorage first
  try {
    const stored = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const match = getCountryByCode(stored);
      if (match) {
        updateShared({ ...match, detectionSource: 'default' });
        return;
      }
    }
  } catch {
    // localStorage disabled — proceed to detection
  }

  // 2) Server API (Vercel header)
  try {
    const res = await fetch('/api/geo', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.code) {
        const match = getCountryByCode(data.code) ?? {
          code: data.code,
          name: data.name || data.code,
          currency: data.currency || 'USD',
          flag: data.flag || '🌍',
          detectionSource: 'vercel-header' as const,
        };
        updateShared(match);
        return;
      }
    }
  } catch {
    // Server unreachable — fall through
  }

  // 3) ipapi.co client-side fallback
  try {
    const detected = await detectCountryFromIpapi();
    updateShared(detected);
  } catch {
    updateShared(DEFAULT_COUNTRY);
  }
}

// ─── Public hook ───────────────────────────────────────────────────────

export function useCountry() {
  const [country, setLocalCountry] = useState<CountryInfo>(sharedCountry);
  const [loading, setLoading] = useState(!hasInitialized);

  useEffect(() => {
    // Subscribe: re-render this component when shared state changes.
    const listener: Listener = (next) => setLocalCountry(next);
    listeners.add(listener);

    // Trigger initial detection if this is the first useCountry() call.
    // Detection updates sharedCountry, which fires the listener above.
    if (!hasInitialized) {
      initializeSharedCountry().finally(() => setLoading(false));
    } else {
      // Already initialized elsewhere — sync to current shared value.
      setLocalCountry(sharedCountry);
      setLoading(false);
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setCountry = useCallback((code: string) => {
    const match = getCountryByCode(code);
    if (!match) return;
    updateShared({ ...match, detectionSource: 'default' });
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // localStorage disabled — the change lives only in memory
    }
  }, []);

  const clearOverride = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    country,
    loading,
    setCountry,
    clearOverride,
    supportedCountries: SUPPORTED_COUNTRIES,
  };
}
