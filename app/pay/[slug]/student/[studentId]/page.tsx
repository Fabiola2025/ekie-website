'use client';

// app/pay/[slug]/student/[studentId]/page.tsx
//
// Student payment page — the heart of the /pay/[slug] flow.
//
// URL: myekie.com/pay/<slug>/student/<studentId>?last_name=<lastName>
//
// Flow:
//   1. Load school + student + fees in parallel on mount
//   2. If any load fails -> show error state with "back to search" button
//   3. Display student header + fee items with checkboxes (all pre-selected)
//   4. Compute live total as parent checks/unchecks fees
//   5. Collect payer info (name, phone, email optional)
//   6. On "Pay with MoMo" -> initiatePayment -> window.location = CinetPay URL
//
// Server-side amount validation happens on backend — client just sends
// fee item IDs, backend recomputes the true total from the DB.

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Shield,
  CheckCircle2,
  User,
  Phone,
  Mail,
  GraduationCap,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';
import {
  fetchSchool,
  fetchStudent,
  fetchStudentFees,
  initiatePayment,
  formatXAF,
  num,
  type School,
  type Student,
  type FeeItem,
} from '@/lib/pay-api';
import { payCopy } from '@/lib/pay-i18n';

export default function StudentPayPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const { lang } = useLang();
  const c = payCopy[lang];

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as string;
  const studentId = (Array.isArray(params.studentId) ? params.studentId[0] : params.studentId) as string;
  const lastName = search.get('last_name') || '';

  // ── Load state ──
  const [school, setSchool] = useState<School | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // ── Selection state (fee item IDs selected for payment) ──
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // ── Payer info state ──
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [payerEmail, setPayerEmail] = useState('');

  // ── Submit state ──
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ── Load data ──
  useEffect(() => {
    if (!slug || !studentId || !lastName) {
      // Missing last_name query param — redirect back to landing
      router.replace(`/pay/${encodeURIComponent(slug)}`);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [s, st, fs] = await Promise.all([
          fetchSchool(slug),
          fetchStudent(slug, studentId, lastName),
          fetchStudentFees(slug, studentId),
        ]);
        if (cancelled) return;
        if (!s || !st) {
          setLoadError(c.landing.notFound);
          return;
        }
        setSchool(s);
        setStudent(st);
        setFees(fs);
        // Pre-select all fees that still have balance owing
        const owingIds = fs
          .filter((f) => num(f.amount) - num(f.amount_paid) > 0)
          .map((f) => f.id);
        setSelected(new Set(owingIds));
      } catch (err) {
        if (!cancelled) setLoadError(c.landing.notFound);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, studentId, lastName]);

  // ── Derived: selected fees with per-item breakdown ──
  const feeBreakdown = useMemo(() => {
    return fees.map((f) => {
      const total = num(f.amount);
      const paid = num(f.amount_paid);
      const owing = Math.max(0, total - paid);
      return {
        ...f,
        totalNum: total,
        paidNum: paid,
        owing,
        isSelected: selected.has(f.id),
        isFullyPaid: owing === 0,
      };
    });
  }, [fees, selected]);

  // ── Derived: total selected + fee math ──
  const totals = useMemo(() => {
    const schoolAmount = feeBreakdown
      .filter((f) => f.isSelected)
      .reduce((s, f) => s + f.owing, 0);
    // 1.5% Ékié + 1% CinetPay MoMo (matches current fee model)
    // Real note: these RATES are display-only — server recomputes final
    // charge for security. Kept in sync with services/paymentConfig.ts
    // in ekie-app. If rates change there, update here too.
    const ekieFee = Math.round(schoolAmount * 0.015);
    const cinetpayFee = Math.round(schoolAmount * 0.01);
    const totalCharged = schoolAmount + ekieFee + cinetpayFee;
    return { schoolAmount, ekieFee, cinetpayFee, totalCharged };
  }, [feeBreakdown]);

  // ── Toggle selection ──
  const toggle = (feeId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(feeId)) next.delete(feeId);
      else next.add(feeId);
      return next;
    });
  };

  const toggleAll = () => {
    const owingFees = feeBreakdown.filter((f) => !f.isFullyPaid);
    const allSelected = owingFees.every((f) => selected.has(f.id));
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(owingFees.map((f) => f.id)));
    }
  };

  // ── Submit ──
  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (selected.size === 0) {
      setSubmitError(c.student.minOne);
      return;
    }
    if (payerName.trim().length < 2) {
      setSubmitError(c.student.needName);
      return;
    }
    if (payerPhone.trim().length < 6) {
      setSubmitError(c.student.needPhone);
      return;
    }

    setSubmitting(true);
    try {
      const res = await initiatePayment({
        slug,
        studentId,
        feeItemIds: Array.from(selected),
        payerName: payerName.trim(),
        payerPhone: payerPhone.trim(),
        payerEmail: payerEmail.trim() || undefined,
      });
      if (!res.success || !res.paymentUrl) {
        setSubmitError(res.message || 'Payment could not be started. Please try again.');
        setSubmitting(false);
        return;
      }
      // Redirect the browser to CinetPay's hosted checkout page
      window.location.href = res.paymentUrl;
    } catch (err: any) {
      setSubmitError(err?.message || 'Payment could not be started. Please try again.');
      setSubmitting(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream flex items-center justify-center pt-20">
          <Loader2 className="w-8 h-8 text-green animate-spin" />
        </main>
      </>
    );
  }

  // ── Load error ──
  if (loadError || !school || !student) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="font-display text-3xl text-green mb-3">
              {c.landing.notFound}
            </h1>
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-full font-semibold hover:bg-green-2 transition-colors mt-4"
            >
              <ArrowLeft size={18} />
              {c.student.backToSearch}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── All fees fully paid ──
  const allPaid = feeBreakdown.length > 0 && feeBreakdown.every((f) => f.isFullyPaid);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20 pb-16">

        {/* Header */}
        <section className="bg-gradient-to-b from-mint to-cream pt-8 pb-6">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href={`/pay/${encodeURIComponent(slug)}`}
              className="inline-flex items-center gap-1.5 text-sm text-green hover:text-green-2 mb-4"
            >
              <ArrowLeft size={16} />
              {c.student.backToSearch}
            </Link>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-white shadow-soft flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-green" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted mb-0.5">
                  {c.student.welcome}
                </p>
                <h1 className="font-display text-2xl md:text-3xl text-green truncate">
                  {student.full_name}
                </h1>
                <p className="text-sm text-muted mt-0.5 truncate">
                  {student.student_id}
                  {student.class_name && <span> · {student.class_name}</span>}
                </p>
                <p className="text-sm text-ink font-medium mt-1 truncate">
                  {school.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-8 space-y-6">

          {/* All-paid state */}
          {allPaid ? (
            <div className="bg-white rounded-2xl shadow-card border border-border p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mint flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green" />
              </div>
              <h2 className="font-display text-2xl text-green mb-2">
                {c.student.fullyPaid}
              </h2>
              <p className="text-muted">{c.student.allPaid}</p>
            </div>
          ) : (
            <>
              {/* Fees list */}
              <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-cream/50">
                  <h2 className="font-semibold text-ink">{c.student.selectFees}</h2>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-xs font-semibold text-green hover:text-green-2"
                  >
                    {c.student.selectAll}
                  </button>
                </div>
                <ul className="divide-y divide-border">
                  {feeBreakdown.map((f) => {
                    const disabled = f.isFullyPaid;
                    return (
                      <li key={f.id}>
                        <label
                          className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${
                            disabled
                              ? 'opacity-50 cursor-not-allowed'
                              : f.isSelected
                              ? 'bg-mint/30'
                              : 'hover:bg-cream/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={f.isSelected}
                            disabled={disabled}
                            onChange={() => toggle(f.id)}
                            className="mt-1 w-5 h-5 rounded border-2 border-border text-green focus:ring-green/30 accent-green"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium text-ink truncate">{f.fee_name}</p>
                              <p className="text-sm font-bold text-ink flex-shrink-0">
                                {formatXAF(f.owing)}
                              </p>
                            </div>
                            {f.paidNum > 0 && !f.isFullyPaid && (
                              <p className="text-xs text-muted mt-1">
                                {c.student.partial}: {formatXAF(f.paidNum)} / {formatXAF(f.totalNum)}
                              </p>
                            )}
                            {f.isFullyPaid && (
                              <p className="text-xs text-green font-medium mt-1">
                                {c.student.fullyPaid}
                              </p>
                            )}
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Payment breakdown card */}
              {selected.size > 0 && (
                <div className="bg-white rounded-2xl shadow-card border border-border p-5 space-y-2">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    {c.student.paying}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">School receives</span>
                    <span className="font-semibold text-ink">{formatXAF(totals.schoolAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{c.student.ekieFee} (1.5%)</span>
                    <span className="text-muted">{formatXAF(totals.ekieFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{c.student.cinetpayFee} (1%)</span>
                    <span className="text-muted">{formatXAF(totals.cinetpayFee)}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex justify-between items-baseline">
                    <span className="text-ink font-semibold">{c.student.youPay}</span>
                    <span className="font-display text-2xl text-green font-bold">
                      {formatXAF(totals.totalCharged)}
                    </span>
                  </div>
                </div>
              )}

              {/* Payer form */}
              <form
                onSubmit={handlePay}
                className="bg-white rounded-2xl shadow-card border border-border p-5 md:p-6 space-y-4"
              >
                <div>
                  <label htmlFor="payerName" className="text-sm font-medium text-ink mb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-muted" />
                    {c.student.payerLabel}
                  </label>
                  <input
                    id="payerName"
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder={c.student.payerPlaceholder}
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:bg-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/10 transition-colors text-ink placeholder:text-muted/60"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="payerPhone" className="text-sm font-medium text-ink mb-1.5 flex items-center gap-1.5">
                    <Phone size={14} className="text-muted" />
                    {c.student.phoneLabel}
                  </label>
                  <input
                    id="payerPhone"
                    type="tel"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder={c.student.phonePlaceholder}
                    autoComplete="tel"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:bg-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/10 transition-colors text-ink placeholder:text-muted/60"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="payerEmail" className="text-sm font-medium text-ink mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} className="text-muted" />
                    {c.student.emailLabel}
                  </label>
                  <input
                    id="payerEmail"
                    type="email"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder={c.student.emailPlaceholder}
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:bg-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/10 transition-colors text-ink placeholder:text-muted/60"
                  />
                </div>

                {/* Errors */}
                {submitError && (
                  <div className="flex gap-2 items-start p-3 rounded-xl bg-coral border border-red-200">
                    <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                {/* Redirect note */}
                <p className="text-xs text-muted text-center leading-relaxed">
                  {c.student.redirectNote}
                </p>

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={submitting || selected.size === 0}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green text-white rounded-xl font-semibold hover:bg-green-2 disabled:bg-muted/30 disabled:cursor-not-allowed transition-colors text-base"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {c.student.preparingPayment}
                    </>
                  ) : (
                    <>
                      {c.student.payNow}
                      {selected.size > 0 && <span>· {formatXAF(totals.totalCharged)}</span>}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted">
                  <Shield size={12} className="text-green" />
                  {c.landing.trustBadge}
                </div>
              </form>
            </>
          )}

        </section>
      </main>
      <Footer />
    </>
  );
}
