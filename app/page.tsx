'use client';
import { Shield, Users, Zap, Smartphone, Heart, ArrowRight, Play, Bell, Home, CreditCard, User } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WaitlistForm, VendorForm, ContactForm, SchoolForm } from '@/components/Forms';
import { useLang } from '@/lib/LanguageProvider';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLang();

  const serviceCards = [
  { id: 'school-fees', emoji: '🎓', title: t.services.schoolFees.title, sub: t.services.schoolFees.sub, color: 'bg-[#FEF3D7]', accent: 'text-[#92400E]', badge: t.services.badges.launchingSep, badgeType: 'launch' },
  { id: 'marketplace', emoji: '🛒', title: t.services.marketplace.title, sub: t.services.marketplace.sub, color: 'bg-coral', accent: 'text-[#C2410C]', badge: t.services.badges.launchingSep, badgeType: 'launch' },
  { id: 'skip-the-queue', emoji: '⚡', title: t.services.skipTheQueue.title, sub: t.services.skipTheQueue.sub, color: 'bg-[#FFE8D6]', accent: 'text-[#B45309]', badge: t.services.badges.launchingSep, badgeType: 'launch' },
  { id: 'bookings', emoji: '📅', title: t.services.bookings.title, sub: t.services.bookings.sub, color: 'bg-[#F1ECFF]', accent: 'text-[#6D28D9]', badge: t.services.badges.launchingSep, badgeType: 'launch' },
  { id: 'akao', emoji: '💚', title: t.services.akao.title, sub: t.services.akao.sub, color: 'bg-mint', accent: 'text-green', badge: t.services.badges.comingNov, badgeType: 'soon' },
  { id: 'care-circles', emoji: '🫂', title: 'Care Circles', sub: 'Share the care — pay together for the people you love', color: 'bg-mint', accent: 'text-green', badge: t.services.badges.comingNov, badgeType: 'soon' },
];

  const businessCards = [
    { icon: '🛍', title: t.business.cards.sell.title, sub: t.business.cards.sell.sub },
    { icon: '📅', title: t.business.cards.book.title, sub: t.business.cards.book.sub },
    { icon: '📸', title: t.business.cards.show.title, sub: t.business.cards.show.sub },
    { icon: '⭐', title: t.business.cards.reputation.title, sub: t.business.cards.reputation.sub },
  ];

  const features = [
    { Icon: Shield, ...t.features.secure },
    { Icon: Users, ...t.features.community },
    { Icon: Zap, ...t.features.fast },
    { Icon: Smartphone, ...t.features.allinone },
    { Icon: Heart, ...t.features.cameroon },
  ];

  return (
    <>
      <Nav />

      {/* HERO — ChatGPT mockup layout: copy left, floating cards around phone right */}
      <section className="relative bg-cream pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Decorative leaf shape */}
        <svg className="absolute -left-12 top-32 w-72 h-72 opacity-15 hidden lg:block" viewBox="0 0 200 200" fill="none">
          <path d="M100 20 Q60 60 50 120 Q70 160 100 180 Q130 160 150 120 Q140 60 100 20Z" fill="#0D3B2E"/>
          <path d="M100 30 Q70 70 70 130 M100 30 Q130 70 130 130" stroke="#0D3B2E" strokeWidth="2" fill="none" opacity="0.4"/>
        </svg>
        {/* Decorative dot pattern */}
        <div className="absolute right-0 bottom-0 w-40 h-40 opacity-20 hidden lg:block"
             style={{ backgroundImage: 'radial-gradient(circle, #0D3B2E 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center">
            {/* LEFT — copy */}
            <div className="animate-fade-up relative z-10">
              <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider">✨ {t.hero.eyebrow.replace('✨ ', '')}</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-[64px] font-black text-green leading-[1.05] mb-5 tracking-tight">
                {t.hero.title} <span className="text-gold">{t.hero.titleAccent}</span>
              </h1>

              <p className="font-display text-xl md:text-2xl italic text-gold mb-5 tracking-wide">
                Your world, cared for.
              </p>

              <p className="text-lg text-muted leading-relaxed mb-7 max-w-md">{t.hero.copy}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a href="#download" className="inline-flex items-center gap-2 bg-green hover:bg-green-2 text-white rounded-full px-6 py-3.5 text-sm font-bold transition-colors shadow-soft">
                  {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/why-ekie" className="inline-flex items-center gap-2 text-ink hover:text-green text-sm font-medium transition-colors group">
                  <span className="w-10 h-10 rounded-full border-2 border-green flex items-center justify-center group-hover:bg-green group-hover:text-white transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  {t.hero.ctaSecondary}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['FN', 'AK', 'MB', 'CN'].map(initials => (
                    <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-cream flex items-center justify-center text-[10px] font-black text-green">
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted">{t.hero.trustCopy}</span>
              </div>
            </div>

            {/* RIGHT — phone with floating cards (desktop) / phone alone (mobile) */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* DESKTOP: phone surrounded by floating cards */}
              <div className="hidden lg:flex relative items-center justify-center">
                <div className="absolute left-0 top-8 z-10 space-y-3 -translate-x-2">
                  <FloatCard emoji="💚" title={t.services.akao.title} sub="Contribute daily — every franc tracked" delay="0s" iconBg="bg-mint" />
                  <FloatCard emoji="⚡" title={t.services.skipTheQueue.title} sub="Pre-order, skip the line, grab & go" delay="0.75s" iconBg="bg-[#FFE8D6]" />
                  <FloatCard emoji="📅" title={t.services.bookings.title} sub="Salons, restaurants, wedding services" delay="1s" iconBg="bg-[#F1ECFF]" />
                </div>
                <PhoneInline />
                <div className="absolute right-0 top-4 z-10 space-y-3 translate-x-2">
                  <FloatCard emoji="🛍" title={t.services.marketplace.title} sub="Send exact items to family — QR pickup" delay="0.5s" iconBg="bg-coral" />
                  <FloatCard emoji="🎓" title={t.services.schoolFees.title} sub="Direct to the school — with a receipt" delay="1.5s" iconBg="bg-[#FEF3D7]" />
                </div>
              </div>

              {/* MOBILE / TABLET: phone centered on its own (cards moved below) */}
              <div className="lg:hidden flex justify-center">
                <PhoneInline />
              </div>
            </div>
          </div>

          {/* MOBILE-ONLY service preview cards — 5 features in compact grid */}
          <div className="lg:hidden mt-10 grid grid-cols-2 gap-3">
            <MobileFeatureCard emoji="🎓" title={t.services.schoolFees.title} sub="Direct to school" iconBg="bg-[#FEF3D7]" />
            <MobileFeatureCard emoji="⚡" title={t.services.skipTheQueue.title} sub="Grab & go, no queue" iconBg="bg-[#FFE8D6]" />
            <MobileFeatureCard emoji="📅" title={t.services.bookings.title} sub="Salons, tables, weddings" iconBg="bg-[#F1ECFF]" />
            <MobileFeatureCard emoji="💚" title={t.services.akao.title} sub="Contribute daily" iconBg="bg-mint" />
            <MobileFeatureCard emoji="🛍" title={t.services.marketplace.title} sub="QR pickup" iconBg="bg-coral" />
          </div>

          {/* WAITLIST inline below hero */}
          <div className="mt-12 max-w-2xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* TRUST STRIP — feature row */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map(({ Icon, title, sub }, i) => {
              const colors = ['bg-mint', 'bg-coral', 'bg-[#F1ECFF]', 'bg-[#FEF3D7]', 'bg-[#FDE2E4]'];
              const iconColors = ['text-green', 'text-[#C2410C]', 'text-[#6D28D9]', 'text-[#92400E]', 'text-[#BE185D]'];
              return (
                <div key={title} className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${colors[i]} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColors[i]}`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{title}</div>
                    <div className="text-xs text-muted leading-tight">{sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORY TEASER — Read Fabi's story */}
<section className="bg-cream py-16 lg:py-20 border-y border-border">
  <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
    <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
      <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider">{t.story.eyebrow}</span>
    </div>
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green leading-tight mb-6 max-w-3xl mx-auto">
      {t.story.title}
    </h2>
    <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-8">
      {t.story.copy}
    </p>
    <Link
      href="/why-ekie"
      className="inline-flex items-center gap-2 bg-green hover:bg-green-2 text-white rounded-full px-6 py-3.5 text-sm font-bold transition-colors shadow-soft"
    >
      {t.story.cta} <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</section>

      {/* SERVICES — Explore Ékié with hover-zoom cards */}
      <section id="services" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-3">{t.services.heading}</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">{t.services.sub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {serviceCards.map((s) => (
              <article key={s.id} id={s.id}
                className={`${s.color} rounded-3xl p-6 hover:scale-105 hover:shadow-card transition-all duration-300 cursor-default group relative overflow-hidden`}>
                <div className="mb-3">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    s.badgeType === 'launch'
                      ? 'bg-gold text-[#0D3B2E]'
                      : 'bg-white/70 text-ink/60 border border-ink/10'
                  }`}>
                    {s.badge}
                  </span>
                </div>
                <h3 className={`font-display text-xl font-black ${s.accent} mb-2`}>{s.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-6">{s.sub}</p>
                <div className="text-5xl text-right group-hover:scale-110 transition-transform duration-300">{s.emoji}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-green py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {[
            { num: 'Live', label: 'On Google Play', icon: '🚀' },
            { num: 'Verified', label: 'Every vendor', icon: '✅' },
            { num: 'Direct', label: 'To source', icon: '🎯' },
            { num: 'Built', label: 'For Cameroon', icon: '🇨🇲' },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">{s.icon}</div>
              <div>
                <div className="text-2xl font-black text-gold">{s.num}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ CORRIDORS — who we serve ══════ */}
      <section className="py-16 md:py-24 bg-white border-y border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green/5 border border-green/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-bold text-green uppercase tracking-wider">{t.corridors.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-4 leading-tight">
              {t.corridors.heading}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">{t.corridors.sub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Send from */}
            <div className="bg-cream rounded-2xl p-6 border border-border">
              <div className="text-xs font-bold text-green uppercase tracking-wider mb-2">{t.corridors.sendFromLabel}</div>
              <div className="text-xl md:text-2xl font-display font-bold text-ink mb-3 leading-tight">
                {t.corridors.sendFromList}
              </div>
              <p className="text-xs text-muted italic">{t.corridors.sendFromNote}</p>
            </div>

            {/* Receive in */}
            <div className="bg-mint/40 rounded-2xl p-6 border border-green/15">
              <div className="text-xs font-bold text-green uppercase tracking-wider mb-2">{t.corridors.receiveInLabel}</div>
              <div className="text-xl md:text-2xl font-display font-bold text-green mb-3 leading-tight">
                {t.corridors.receiveInList}
              </div>
              <p className="text-xs text-green/80 italic">{t.corridors.receiveInNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      {/* ══════ WAYS TO PAY ══════ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-3">
              {t.waysToPay.heading}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">{t.waysToPay.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🇨🇲</span>
                <h3 className="font-display text-xl font-bold text-green">{t.waysToPay.cameroon.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{t.waysToPay.cameroon.sub}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌍</span>
                <h3 className="font-display text-xl font-bold text-green">{t.waysToPay.diaspora.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{t.waysToPay.diaspora.sub}</p>
            </div>
          </div>
          <div className="bg-mint/50 rounded-xl p-5 text-center">
            <p className="text-sm text-green/90 leading-relaxed">
              🔒 {t.waysToPay.compliance}
            </p>
          </div>
        </div>
      </section>

      <section id="business" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green/5 border border-green/15 rounded-full px-4 py-1.5 mb-5">
                <span className="text-xs font-bold text-green uppercase tracking-wider">{t.business.eyebrow}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-5 leading-tight">{t.business.title}</h2>
              <p className="text-muted text-lg leading-relaxed mb-8">{t.business.copy}</p>
              <a href="#vendor" className="inline-flex items-center gap-2 bg-gold text-green rounded-full px-7 py-3.5 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-transform">
                {t.business.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {businessCards.map((c) => (
                <div key={c.title} className="bg-cream rounded-2xl p-5 border border-border hover:scale-105 hover:shadow-card transition-all duration-300">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <h3 className="text-sm font-bold text-green mb-1">{c.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER — full essay + circular photo */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider">{t.aboutFounder.eyebrow}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green leading-tight">
              {t.aboutFounder.title}<span className="text-gold">{t.aboutFounder.titleAccent}</span>{t.aboutFounder.titleEnd}
            </h2>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            <div className="aspect-square rounded-full overflow-hidden shadow-card border-4 border-gold relative bg-green mx-auto md:mx-0 w-full max-w-[280px]">
              <img src="/founder.jpg" alt="Fabiola Nsuh, founder of Ékié" className="w-full h-full object-cover object-[center_top]" />
            </div>

            <div className="space-y-4 text-ink/85 text-[15px] leading-relaxed">
              <p>{t.aboutFounder.p1}</p>
              <p>{t.aboutFounder.p2}</p>
              <p className="font-bold text-green">{t.aboutFounder.p3}</p>
              <p>{t.aboutFounder.p4}</p>
              <p>{t.aboutFounder.p5}</p>
              <p className="font-bold text-green">{t.aboutFounder.p6}</p>
              <p>{t.aboutFounder.p7}</p>
              <p>{t.aboutFounder.p8}</p>
              <blockquote className="font-display text-xl text-green italic font-bold border-l-4 border-gold pl-5 py-2 my-2">
                {t.aboutFounder.quote}
              </blockquote>
              <p>{t.aboutFounder.p9}</p>
              <p className="font-bold text-green">{t.aboutFounder.p10}</p>
              <p>{t.aboutFounder.p11}</p>
              <p className="pt-2">
                <Link href="/why-ekie" className="inline-flex items-center gap-2 text-green font-bold hover:text-gold transition-colors group">
                  {t.aboutFounder.readMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
              <p className="text-green font-bold text-lg pt-3">{t.aboutFounder.welcome}</p>
              <p className="font-display text-base text-muted italic">{t.aboutFounder.signature}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-3">{t.how.heading}</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">{t.how.sub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[t.how.step1, t.how.step2, t.how.step3, t.how.step4].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-green text-gold border-4 border-gold rounded-full mx-auto mb-4 flex items-center justify-center font-display text-xl font-black group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-bold text-green mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENDOR APPLICATION */}
      <section id="vendor" className="py-24 bg-mint/40">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <VendorForm />
        </div>
      </section>

      {/* SCHOOLS */}
      <section id="schools" className="py-24 bg-cream border-y border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <SchoolForm />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ContactForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="download" className="py-24 bg-[#002820] text-white text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 lg:px-10 relative">
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight">{t.cta.heading}</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">{t.cta.sub}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.ekie.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="inline-block rounded-xl shadow-lg hover:scale-[1.04] active:scale-95 transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badge-google-play.png" alt="Get it on Google Play" className="h-14 w-auto block" />
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/badge-app-store.png"
              alt="Download on the App Store — coming soon"
              className="h-14 w-auto block opacity-40"
            />
          </div>
          <p className="text-white/50 text-xs mt-4">{t.cta.iosSoon}</p>
          <div className="mt-6">
            <a href="#vendor" className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/5 rounded-full px-7 py-3.5 text-sm font-medium transition-colors">
              {t.cta.business}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ── Floating service card for hero ───────────────────────────────────────────
function FloatCard({ emoji, title, sub, delay, iconBg }: { emoji: string; title: string; sub: string; delay: string; iconBg: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-border p-3.5 w-44 hover:scale-105 transition-transform animate-float-slow" style={{ animationDelay: delay }}>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center text-base`}>{emoji}</div>
        <strong className="text-green text-sm font-bold">{title}</strong>
      </div>
      <p className="text-[11px] text-muted leading-tight">{sub}</p>
    </div>
  );
}

// ── Mobile-only stacked service card ─────────────────────────────────────────
function MobileFeatureCard({ emoji, title, sub, iconBg }: { emoji: string; title: string; sub: string; iconBg: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-border p-3 hover:scale-105 active:scale-95 transition-transform">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-9 h-9 ${iconBg} rounded-full flex items-center justify-center text-lg`}>{emoji}</div>
        <strong className="text-green text-sm font-bold">{title}</strong>
      </div>
      <p className="text-[11px] text-muted leading-tight">{sub}</p>
    </div>
  );
}

// ── Phone mockup (inline; mirrors the real Ékié app home screen) ───
function PhoneInline() {
  return (
    <div className="relative" style={{ width: 270 }}>
      <div className="absolute -inset-8 bg-gradient-to-br from-gold/20 to-mint/30 rounded-full blur-2xl -z-10" />
      <div className="bg-ink rounded-[40px] p-3 shadow-card border border-white/10 relative z-10">
        <div className="bg-cream rounded-[32px] overflow-hidden flex flex-col" style={{ height: 540 }}>

          {/* ═══ GREEN HEADER ═══ */}
          <div className="bg-green px-5 pt-3 pb-4 relative">
            {/* Status bar */}
            <div className="flex justify-between items-center text-[9px] text-white/70 mb-3">
              <span>9:41</span><span>•••</span>
            </div>
            {/* Top bar: logo + actions */}
            <div className="flex justify-between items-center mb-5">
              <span className="font-display text-xl font-black text-gold">Ékié</span>
              <div className="flex gap-1.5 items-center">
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-[9px] font-bold text-white/85">EN</div>
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                  <Bell className="w-3 h-3 text-white/85" />
                </div>
                <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-green" />
                </div>
              </div>
            </div>
            {/* Big greeting */}
            <div className="text-[11px] text-white/70 mb-0.5">Good morning,</div>
            <div className="font-display text-[26px] font-black text-white leading-tight mb-1">Fabiola</div>
            <div className="text-[11px] text-white/60 italic mb-4">Your world, cared for.</div>
            {/* Stats row — inset card */}
            <div className="bg-white/[0.07] border border-white/10 rounded-xl px-2 py-2.5 flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-base font-black text-white">3</div>
                <div className="text-[7.5px] text-white/60 uppercase tracking-wider">People</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-center flex-1">
                <div className="text-base font-black text-white">2</div>
                <div className="text-[7.5px] text-white/60 uppercase tracking-wider">Commitments</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-center flex-1">
                <div className="text-base font-black text-white">5</div>
                <div className="text-[7.5px] text-white/60 uppercase tracking-wider">Activity</div>
              </div>
              <ArrowRight className="w-3 h-3 text-white/60 ml-1" />
            </div>
          </div>

          {/* ═══ CREAM BODY ═══ */}
          <div className="flex-1 bg-cream px-5 pt-4 pb-3">
            {/* Your people */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display text-base font-black text-ink">Your people</h4>
              <span className="text-[10px] text-green font-bold flex items-center gap-0.5">View all <ArrowRight className="w-2.5 h-2.5" /></span>
            </div>
            <div className="flex gap-2 mb-4">
              {[
                { initial: 'M', label: 'Maman', bg: 'bg-coral', textColor: 'text-[#C2410C]' },
                { initial: 'J', label: 'Junia', bg: 'bg-[#F1ECFF]', textColor: 'text-[#6D28D9]' },
                { initial: '+', label: 'Add', bg: 'bg-mint', textColor: 'text-green' },
              ].map((p) => (
                <div key={p.label} className="flex-1 bg-white rounded-xl p-2 flex flex-col items-center gap-1 border border-border">
                  <div className={`w-8 h-8 ${p.bg} rounded-full flex items-center justify-center text-[11px] font-black ${p.textColor}`}>
                    {p.initial}
                  </div>
                  <div className="text-[9px] font-bold text-ink">{p.label}</div>
                </div>
              ))}
            </div>
            {/* Activity card — green with gold arrow (mirrors real app) */}
            <div className="bg-green rounded-2xl p-3.5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gold/10 blur-xl" />
              <div className="flex-1 relative z-10">
                <div className="text-[9px] text-gold uppercase tracking-wider font-bold mb-1">Your activity</div>
                <div className="font-display text-sm font-black text-white leading-tight mb-0.5">See your care<br/>history.</div>
                <div className="text-[9px] text-white/60 mt-1">Payments, gifts, receipts</div>
              </div>
              <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center flex-shrink-0 ml-2 relative z-10">
                <ArrowRight className="w-4 h-4 text-green" />
              </div>
            </div>
          </div>

          {/* ═══ BOTTOM NAV ═══ */}
          <div className="bg-white border-t border-border px-4 pt-2 pb-3 flex justify-around">
            {[
              { Icon: Home, label: 'Home', active: true },
              { Icon: Heart, label: 'Care', active: false },
              { Icon: CreditCard, label: 'Pay', active: false },
              { Icon: User, label: 'You', active: false },
            ].map((nav) => (
              <div key={nav.label} className="flex flex-col items-center gap-0.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${nav.active ? 'bg-mint' : ''}`}>
                  <nav.Icon className={`w-3.5 h-3.5 ${nav.active ? 'text-green' : 'text-ink/40'}`} />
                </div>
                <div className={`text-[8px] font-bold ${nav.active ? 'text-green' : 'text-ink/40'}`}>{nav.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
