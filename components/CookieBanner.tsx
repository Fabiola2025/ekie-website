// components/CookieBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'ekie_cookie_consent'; // 'accepted' | 'declined'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no choice has been made
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) setVisible(true);
    } catch {
      // SSR or storage disabled — do nothing
    }
  }, []);

  const persist = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore storage failure
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[9999] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-[#0D3B2E] text-[#F7F6F1] shadow-2xl ring-1 ring-black/10">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex-1">
            <h2 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-semibold text-[#DCAE33]">
              A quick note on cookies
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#F7F6F1]/85">
              We use essential cookies to keep the site running, and optional ones to understand how
              you use it so we can improve. Nothing is sold or shared with third-party advertisers.{' '}
              <Link
                href="/cookies"
                className="underline underline-offset-2 hover:text-[#DCAE33] transition-colors"
              >
                Read our cookie policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-3">
            <button
              onClick={() => persist('declined')}
              className="rounded-full border border-[#F7F6F1]/30 px-5 py-2.5 text-sm font-medium text-[#F7F6F1] transition-colors hover:border-[#F7F6F1]/60 hover:bg-[#F7F6F1]/5"
            >
              Decline optional
            </button>
            <button
              onClick={() => persist('accepted')}
              className="rounded-full bg-[#DCAE33] px-5 py-2.5 text-sm font-semibold text-[#0D3B2E] shadow-md transition-transform hover:scale-[1.02] hover:bg-[#E6BB4A]"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
