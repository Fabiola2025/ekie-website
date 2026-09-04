'use client';

// app/pay/[slug]/page.tsx
//
// Ékié web payment landing page.
// URL: myekie.com/pay/<school-slug>  (e.g. /pay/lycee-mambanda)
//
// Flow:
//   1. Fetch school by slug on mount
//   2. If school not found (or slug is invalid) -> show notFound state
//   3. If found -> show branded landing + "find student" form
//   4. On form submit -> fetchStudent, then navigate to
//      /pay/[slug]/student/[studentId] with last_name in query
//
// Every partnered school gets this page automatically once it has a
// slug in the database. Zero per-school engineering work.

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Search, Shield, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';
import { fetchSchool, fetchStudent, type School } from '@/lib/pay-api';
import { payCopy } from '@/lib/pay-i18n';
import CountryPicker from '@/components/CountryPicker';

export default function PayLandingPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const c = payCopy[lang];

  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as string;

  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const [studentId, setStudentId] = useState('');
  const [lastName, setLastName] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // ── Load school ──
  useEffect(() => {
    if (!slug) return;
    fetchSchool(slug)
      .then((s) => {
        if (!s) setNotFound(true);
        else setSchool(s);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Submit handler ──
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const sid = studentId.trim();
    const ln = lastName.trim();
    if (!sid || !ln) return;

    setSearching(true);
    try {
      const student = await fetchStudent(slug, sid, ln);
      if (!student) {
        setSearchError(c.landing.notFound);
      } else {
        router.push(
          `/pay/${encodeURIComponent(slug)}/student/${encodeURIComponent(sid)}?last_name=${encodeURIComponent(ln)}`
        );
      }
    } catch (err) {
      setSearchError(c.landing.notFound);
    } finally {
      setSearching(false);
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

  // ── School not found ──
  if (notFound || loadError) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-cream pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-green mb-3">
              {c.notFound.title}
            </h1>
            <p className="text-muted text-lg mb-2">{c.notFound.subtitle}</p>
            <p className="text-muted mb-8 leading-relaxed">{c.notFound.body}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-full font-semibold hover:bg-green-2 transition-colors"
            >
              {c.notFound.backHome}
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── School found — show branded landing + form ──
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-20 pb-16">

        {/* Hero section */}
        <section className="bg-gradient-to-b from-mint to-cream pt-10 pb-8">
          <div className="max-w-3xl mx-auto px-6 text-center">
            {/* School logo circle (letter-based, no image needed) */}
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white shadow-soft flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-green" strokeWidth={2} />
            </div>

            {/* School name */}
            <h1 className="font-display text-2xl md:text-3xl text-green mb-2">
              {school?.name}
            </h1>
            {school?.location && (
              <p className="text-muted text-sm mb-1">📍 {school.location}</p>
            )}
            {school?.academic_year && (
              <p className="text-muted text-sm mb-4">{school.academic_year}</p>
            )}

            {/* Ékié badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-border">
              <Shield size={14} className="text-green" />
              <span className="text-xs font-semibold text-green">
                {c.landing.poweredBy}
              </span>
            </div>

            {/* Country picker — where the payer is paying from */}
            <div className="mt-4 flex justify-center">
              <CountryPicker />
            </div>
          </div>
        </section>

        {/* Main copy + form */}
        <section className="max-w-2xl mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-green mb-3">
              {c.landing.heading}
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              {c.landing.subheading}
            </p>
          </div>

          {/* Search form card */}
          <div className="bg-white rounded-2xl shadow-card border border-border p-6 md:p-8">
            <h3 className="font-semibold text-ink mb-5 flex items-center gap-2">
              <Search size={18} className="text-green" />
              {c.landing.searchLabel}
            </h3>

            <form onSubmit={handleSearch} className="space-y-4">
              {/* Student ID */}
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-ink mb-1.5">
                  {c.landing.studentIdLabel}
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder={c.landing.studentIdPlaceholder}
                  autoComplete="off"
                  autoCapitalize="characters"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:bg-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/10 transition-colors text-ink placeholder:text-muted/60"
                  required
                />
              </div>

              {/* Last name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-ink mb-1.5">
                  {c.landing.lastNameLabel}
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={c.landing.lastNamePlaceholder}
                  autoComplete="family-name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:bg-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/10 transition-colors text-ink placeholder:text-muted/60"
                  required
                />
              </div>

              {/* Search error */}
              {searchError && (
                <div className="flex gap-2 items-start p-3 rounded-xl bg-coral border border-red-200">
                  <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{searchError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={searching || !studentId.trim() || !lastName.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green text-white rounded-xl font-semibold hover:bg-green-2 disabled:bg-muted/30 disabled:cursor-not-allowed transition-colors"
              >
                {searching ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {c.landing.searching}
                  </>
                ) : (
                  <>
                    {c.landing.lookupBtn}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Trust footer */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-muted">
              <Shield size={12} className="text-green" />
              {c.landing.trustBadge}
            </div>
            <p className="text-sm text-muted mt-6 leading-relaxed max-w-lg mx-auto">
              {c.landing.about}
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
