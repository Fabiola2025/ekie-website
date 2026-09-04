/**
 * ReceiptDownloadButtons.tsx
 * Client component for /pay/[slug]/success — two buttons that hit the
 * PUBLIC receipt endpoints (no auth) since anonymous web payments have
 * user_id = ANONYMOUS_WEB_PAYER_ID. Once claimed via Feature 1, these
 * endpoints will 403 and the parent will need to use the app.
 *
 * Usage in the success page:
 *   <ReceiptDownloadButtons paymentId={payment.id} />
 */

'use client';

import React, { useState } from 'react';

type Props = {
  paymentId: string;
  apiBase?: string; // override for staging; defaults to NEXT_PUBLIC_API_BASE
};

export default function ReceiptDownloadButtons({ paymentId, apiBase }: Props) {
  const [busy, setBusy] = useState<'pdf' | 'png' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const base = apiBase || process.env.NEXT_PUBLIC_API_BASE || '';

  const trigger = async (kind: 'pdf' | 'png') => {
    if (busy) return;
    setError(null);
    setBusy(kind);
    try {
      const url = `${base}/api/payments/public-receipt/${paymentId}.${kind}`;
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed (${res.status})`);
      }
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      // Download-and-open pattern — works cross-browser without popups
      const a = document.createElement('a');
      a.href = objUrl;
      a.download = `ekie-receipt-${paymentId}.${kind}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Slight delay before revoke so download starts
      setTimeout(() => URL.revokeObjectURL(objUrl), 2000);
    } catch (e: any) {
      setError(e?.message || 'Could not download receipt');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => trigger('pdf')}
        disabled={!!busy}
        className="flex-1 rounded-xl bg-slate-900 py-3 px-4 text-sm font-semibold
                   text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {busy === 'pdf' ? 'Preparing PDF…' : 'Download PDF receipt'}
      </button>
      <button
        onClick={() => trigger('png')}
        disabled={!!busy}
        className="flex-1 rounded-xl bg-slate-100 py-3 px-4 text-sm font-semibold
                   text-slate-900 transition hover:bg-slate-200 disabled:opacity-60"
      >
        {busy === 'png' ? 'Preparing image…' : 'Save as image'}
      </button>
      {error && (
        <p className="w-full text-xs text-red-600 sm:mt-2">{error}</p>
      )}
    </div>
  );
}
