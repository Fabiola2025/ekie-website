'use client';

// app/pay/[slug]/success/page.tsx
//
// Post-payment receipt view. User lands here via redirect from
// /api/payments/return?status=success&payment_id=<uuid>
//
// Flow:
//   1. Read payment_id from query string
//   2. Fetch public-status/:id from API (retries if PENDING)
//   3. Show receipt: student, school, amount, breakdown, timestamp
//   4. Show soft app promotion CTAs (App Store + Play Store)
//   5. "Pay for another child" -> back to /pay/[slug]
//
// Real note on PENDING: CinetPay webhook may lag ~1-2 sec behind the
// redirect. If status is still PENDING on first fetch, we poll every
// 2 sec up to 10 times (~20 sec) before giving up and showing whatever
// state we have. Real: polling is defensive — most redirects arrive
// after webhook fires, but occasionally not.

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, ArrowRight, Loader2, AlertCircle,
  Smartphone, Download, Apple,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';
import { fetchPaymentStatus, formatXAF, type PublicPaymentStatus } from '@/lib/pay-api';
import { payCopy } from '@/lib/pay-i18n';

// Store URLs — placeholder until real app store submissions land
const APP_STORE_URL = 'https://apps.apple.com/app/ekie';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ekie.app';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 10;

export default function PaySuccessPage() {
  const params = useParams();
  const search = useSearchParams();
  const { lang } = useLang();
  const c = payCopy[lang];

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as string;
  const paymentId = search.get('payment_id');

  const [payment, setPayment] = useState<PublicPaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!paymentId) {
      setError('Missing payment reference.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    let attempts = 0;

    const tick = async () => {
      if (cancelled) return;
      attempts++;
      try {
        const p = await fetchPaymentStatus(paymentId);
        if (cancelled) return;
        if (!p) {
          setError('Payment record not found.');
          setLoading(false);
          return;
        }
        if (p.status === 'SUCCESS' || p.status === 'FAILED' || attempts >= POLL_MAX_ATTEMPTS) {
          setPayment(p);
          setLoading(false);
          return;
        }
        // Still PENDING/INITIATED — try again
        setTimeout(tick, POLL_INTERVAL_MS);
      } catch (err) {
        if (cancelled) return;
        setError('Could not fetch payment status.');
        setLoading(false);
      }
    };

    tick();
    return () => { cancelled = true; };
  }, [paymentId]);

  // ── Loading (still polling for webhook confirmation) ──
  if (loading) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream flex items-center justify-center pt-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-green animate-spin mx-auto mb-4" />
            <p className="text-muted text-sm">Confirming your payment...</p>
          </div>
        </main>
      </>
    );
  }

  // ── Error ──
  if (error || !payment) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="font-display text-2xl text-green mb-3">
              {error || 'Payment not found'}
            </h1>
            <p className="text-muted mb-6">
              If you completed a payment, please check your MoMo history or contact hello@myekie.com.
            </p>
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-full font-semibold hover:bg-green-2 transition-colors"
            >
              {c.success.backToSchool}
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── If backend still shows PENDING after all polls — treat as inconclusive ──
  if (payment.status === 'PENDING' || payment.status === 'INITIATED') {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream border-2 border-border flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-muted" />
            </div>
            <h1 className="font-display text-2xl text-green mb-3">
              Payment is still processing
            </h1>
            <p className="text-muted mb-2">
              Reference: <span className="font-mono text-xs">{payment.merchant_transaction_id}</span>
            </p>
            <p className="text-muted mb-6 leading-relaxed max-w-md mx-auto">
              Your payment may still be confirming with your MoMo provider.
              Please check back in a few minutes — you can also contact us at
              hello@myekie.com if you have concerns.
            </p>
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-ink rounded-full font-semibold hover:bg-cream transition-colors"
            >
              {c.success.backToSchool}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── If backend says FAILED (shouldn't happen on success URL but defensive) ──
  if (payment.status === 'FAILED') {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="font-display text-2xl text-green mb-3">
              {c.failed.title}
            </h1>
            <p className="text-muted mb-6">{c.failed.noCharge}</p>
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-full font-semibold hover:bg-green-2 transition-colors"
            >
              {c.failed.retry}
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── SUCCESS — the real receipt ──
  const completedDate = payment.completed_at ? new Date(payment.completed_at) : new Date();
  const dateStr = completedDate.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = completedDate.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20 pb-16">

        {/* Success hero */}
        <section className="bg-gradient-to-b from-mint to-cream pt-10 pb-8">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-soft flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green" strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-green mb-2">
              {c.success.title}
            </h1>
            <p className="text-muted text-lg">{c.success.subtitle}</p>
          </div>
        </section>

        {/* Receipt card */}
        <section className="max-w-2xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Amount hero */}
            <div className="bg-cream/50 p-6 text-center border-b border-border">
              <p className="text-xs uppercase tracking-wide text-muted mb-1">
                {c.success.amountLabel}
              </p>
              <p className="font-display text-4xl text-green font-bold">
                {formatXAF(payment.amount)}
              </p>
            </div>

            {/* Meta rows */}
            <div className="p-6 space-y-3 text-sm">
              {payment.studentName && (
                <Row label={c.success.studentLabel}>
                  <div className="text-right">
                    <p className="font-semibold text-ink">{payment.studentName}</p>
                    {payment.studentId && (
                      <p className="text-xs text-muted mt-0.5">{payment.studentId}</p>
                    )}
                    {payment.className && (
                      <p className="text-xs text-muted">{payment.className}</p>
                    )}
                  </div>
                </Row>
              )}
              {payment.schoolName && (
                <Row label={c.success.schoolLabel}>
                  <p className="font-semibold text-ink text-right">{payment.schoolName}</p>
                </Row>
              )}
              {payment.payerName && (
                <Row label={lang === 'fr' ? 'Payé par' : 'Paid by'}>
                  <p className="font-semibold text-ink text-right">{payment.payerName}</p>
                </Row>
              )}
              <Row label={c.success.dateLabel}>
                <p className="text-ink text-right">{dateStr}<br/><span className="text-xs text-muted">{timeStr}</span></p>
              </Row>
              <Row label={c.success.receiptNumber}>
                <p className="font-mono text-xs text-muted text-right break-all">
                  {payment.merchant_transaction_id}
                </p>
              </Row>
            </div>

            {/* Fee items breakdown */}
            {payment.feeItemNames && payment.feeItemNames.length > 0 && (
              <div className="border-t border-border p-6 bg-cream/30">
                <p className="text-xs uppercase tracking-wide text-muted mb-2">
                  {c.success.breakdownLabel}
                </p>
                <ul className="space-y-1 text-sm text-ink">
                  {payment.feeItemNames.map((name, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green">•</span>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* App promo CTA */}
          <div className="mt-6 bg-white rounded-2xl shadow-card border border-border p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-green" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-1">
                  {c.success.appPromo.heading}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {c.success.appPromo.sub}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-black transition-colors flex-1"
              >
                <Apple size={16} />
                {c.success.appPromo.appStore}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-black transition-colors flex-1"
              >
                <Download size={16} />
                {c.success.appPromo.playStore}
              </a>
            </div>
          </div>

          {/* Pay for another */}
          <div className="mt-6 text-center">
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-ink rounded-full font-semibold hover:bg-cream transition-colors"
            >
              {c.success.backToSchool}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ── Small helper for receipt rows ──
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-muted flex-shrink-0">{label}</span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
