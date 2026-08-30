'use client';

// app/pay/[slug]/failed/page.tsx
//
// Post-payment failure view. User lands here via redirect from
// /api/payments/return?status=failed&payment_id=<uuid>
//
// Also handles: user cancelled on CinetPay, insufficient funds,
// MoMo provider decline, connection interruption. We show a friendly
// error page with retry + support contact.
//
// Real note: unlike success page, we don't need to poll — failed is
// terminal. Just show what happened and next steps.

import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';
import { payCopy } from '@/lib/pay-i18n';

export default function PayFailedPage() {
  const params = useParams();
  const search = useSearchParams();
  const { lang } = useLang();
  const c = payCopy[lang];

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as string;
  const paymentId = search.get('payment_id');

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20 pb-16">

        {/* Failure hero */}
        <section className="bg-gradient-to-b from-coral to-cream pt-10 pb-8">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white shadow-soft flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-green mb-2">
              {c.failed.title}
            </h1>
            <p className="text-muted text-lg">{c.failed.subtitle}</p>
          </div>
        </section>

        {/* Reassurance card */}
        <section className="max-w-2xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-card border border-border p-6 mb-6">
            <p className="text-green font-semibold mb-3 flex items-center gap-2">
              ✓ {c.failed.noCharge}
            </p>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              {c.failed.possibleReasons}
            </p>
            <ul className="space-y-2 text-sm text-ink">
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>{c.failed.reason1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>{c.failed.reason2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>{c.failed.reason3}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>{c.failed.reason4}</span>
              </li>
            </ul>

            {paymentId && (
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted mb-1">Reference</p>
                <p className="font-mono text-xs text-muted break-all">{paymentId}</p>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green text-white rounded-xl font-semibold hover:bg-green-2 transition-colors"
            >
              {c.failed.retry}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-border text-ink rounded-xl font-semibold hover:bg-cream transition-colors"
            >
              <ArrowLeft size={18} />
              {c.failed.backToSchool}
            </Link>
          </div>

          {/* Support link */}
          <div className="mt-6 text-center">
            <a
              href="mailto:hello@myekie.com"
              className="inline-flex items-center gap-2 text-sm text-green hover:text-green-2 font-medium"
            >
              <Mail size={14} />
              {c.failed.support}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
