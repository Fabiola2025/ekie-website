'use client';
import { Shield, Users, Zap, Smartphone, Heart, ArrowRight, Play, Bell, ArrowUpRight, CalendarDays, ShoppingBag, GraduationCap } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WaitlistForm, VendorForm, ContactForm } from '@/components/Forms';
import { useLang } from '@/lib/LanguageProvider';

export default function HomePage() {
  const { t } = useLang();

  const serviceCards = [
    { id: 'akao', emoji: '💚', title: t.services.akao.title, sub: t.services.akao.sub, color: 'bg-mint', accent: 'text-green' },
    { id: 'marketplace', emoji: '🛒', title: t.services.marketplace.title, sub: t.services.marketplace.sub, color: 'bg-coral', accent: 'text-[#C2410C]' },
    { id: 'bookings', emoji: '📅', title: t.services.bookings.title, sub: t.services.bookings.sub, color: 'bg-[#F1ECFF]', accent: 'text-[#6D28D9]' },
    { id: 'school-fees', emoji: '🎓', title: t.services.schoolFees.title, sub: t.services.schoolFees.sub, color: 'bg-[#FEF3D7]', accent: 'text-[#92400E]' },
    { id: 'njangi', emoji: '👥', title: t.services.njangi.title, sub: t.services.njangi.sub, color: 'bg-[#FDE2E4]', accent: 'text-[#BE185D]' },
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

              <p className="text-lg text-muted leading-relaxed mb-7 max-w-md">{t.hero.copy}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a href="#download" className="inline-flex items-center gap-2 bg-green hover:bg-green-2 text-white rounded-full px-6 py-3.5 text-sm font-bold transition-colors shadow-soft">
                  {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 text-ink hover:text-green text-sm font-medium transition-colors group">
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

            {/* RIGHT — phone with floating cards (ChatGPT-mockup style) */}
            <div className="hidden md:block relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative flex items-center justify-center">
                {/* LEFT floating cards */}
                <div className="absolute left-0 top-12 z-10 space-y-3 -translate-x-2">
                  <FloatCard emoji="💚" title={t.services.akao.title} sub="Save & contribute toward your goals" delay="0s" iconBg="bg-mint" />
                  <FloatCard emoji="📅" title={t.services.bookings.title} sub="Book services with ease" delay="1s" iconBg="bg-[#F1ECFF]" />
                </div>

                {/* PHONE — centered */}
                <PhoneInline />

                {/* RIGHT floating cards */}
                <div className="absolute right-0 top-4 z-10 space-y-3 translate-x-2">
                  <FloatCard emoji="🛍" title={t.services.marketplace.title} sub="Buy & sell amazing products" delay="0.5s" iconBg="bg-coral" />
                  <FloatCard emoji="🎓" title={t.services.schoolFees.title} sub="Pay tuition instantly" delay="1.5s" iconBg="bg-[#FEF3D7]" />
                  <FloatCard emoji="👥" title={t.services.njangi.title} sub="Build circles, achieve together" delay="2s" iconBg="bg-[#FDE2E4]" />
                </div>
              </div>
            </div>
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

      {/* SERVICES — Explore Ékié with hover-zoom cards */}
      <section id="services" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green mb-3">{t.services.heading}</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">{t.services.sub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {serviceCards.map((s) => (
              <article key={s.id} id={s.id}
                className={`${s.color} rounded-3xl p-6 hover:scale-105 hover:shadow-card transition-all duration-300 cursor-default group relative overflow-hidden`}>
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
            { num: 'Coming', label: 'Akao plans', icon: '💚' },
            { num: 'Soon', label: 'Active circles', icon: '👥' },
            { num: 'Built', label: 'For Cameroon', icon: '🇨🇲' },
            { num: '24/7', label: 'Support', icon: '⭐' },
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

      {/* BUSINESS */}
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
              <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider">Meet the Founder</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-green leading-tight">
              Hi, I&apos;m <span className="text-gold">Fabiola</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            <div className="aspect-square rounded-full overflow-hidden shadow-card border-4 border-gold relative bg-green mx-auto md:mx-0 w-full max-w-[280px]">
              <img src="/founder.jpg" alt="Fabiola Nsuh, founder of Ékié" className="w-full h-full object-cover object-[center_top]" />
            </div>

            <div className="space-y-4 text-ink/85 text-[15px] leading-relaxed">
              <p>I&apos;m <strong className="text-green">Fabiola Nsuh</strong>, founder of Ékié.</p>
              <p>Growing up, I saw how everyday activities that should have been simple often became stressful and time-consuming. Whether it was managing contribution groups, participating in Njangi circles, paying school fees, supporting loved ones from afar, or finding trusted local services, many families and communities faced the same challenges.</p>
              <p className="text-ink font-medium">These weren&apos;t just problems I observed — they were experiences I lived.</p>
              <p>Over the years, I kept asking myself a simple question:</p>

              <blockquote className="my-8 relative">
                <div className="absolute -left-2 -top-4 text-gold/30 font-display text-7xl leading-none select-none">&ldquo;</div>
                <p className="font-display text-2xl md:text-3xl text-green italic font-black leading-tight pl-8 border-l-[6px] border-gold">
                  Why should something so important be so complicated?
                </p>
              </blockquote>

              <p>That question stayed with me and eventually became the foundation of Ékié.</p>
              <p>I envisioned a platform where people could contribute, shop, book services, support education, and manage community activities in one trusted place. A platform built not only around technology, but around the realities of everyday life.</p>
              <p>Today, Ékié is more than an app. It is a commitment to empowering families, communities, entrepreneurs, and businesses with tools that make life simpler, more connected, and full of opportunity.</p>
              <p>My hope is that every person who uses Ékié feels supported, empowered, and part of something bigger than a transaction — a community working and growing together.</p>
              <p className="text-green font-bold text-xl pt-3">Welcome to Ékié.</p>
              <p className="font-display text-base text-muted italic">— Fabiola Nsuh, Founder &amp; CEO, Ékié</p>
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

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ContactForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="download" className="py-24 bg-green text-white text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 lg:px-10 relative">
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight">{t.cta.heading}</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">{t.cta.sub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button disabled className="inline-flex items-center gap-2 bg-gold text-green rounded-full px-7 py-3.5 text-sm font-bold opacity-95 cursor-default">
              {t.cta.download}
            </button>
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

// ── Phone mockup (inline; same content as before but cleaner without external float cards) ───
function PhoneInline() {
  return (
    <div className="relative" style={{ width: 270 }}>
      <div className="absolute -inset-8 bg-gradient-to-br from-gold/20 to-mint/30 rounded-full blur-2xl -z-10" />
      <div className="bg-ink rounded-[40px] p-3 shadow-card border border-white/10 relative z-10">
        <div className="bg-cream rounded-[32px] overflow-hidden" style={{ height: 540 }}>
          {/* Status bar */}
          <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[10px] text-ink/70">
            <span>9:41</span><span>•••</span>
          </div>
          {/* Header */}
          <div className="px-5 pt-2 flex justify-between items-center">
            <div>
              <div className="text-[10px] text-muted">Good morning 👋</div>
              <div className="text-base font-bold text-ink">Fabiola</div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-border">
                <Bell className="w-3.5 h-3.5 text-ink" />
              </div>
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-[10px] font-black text-green">FN</span>
              </div>
            </div>
          </div>
          {/* Akao card */}
          <div className="mx-5 mt-3 bg-green rounded-2xl p-4 text-white">
            <div className="text-[10px] text-gold uppercase tracking-wider">Akao Contributions</div>
            <div className="text-2xl font-black text-gold mt-1">85,000 <span className="text-xs text-gold/70">XAF</span></div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
              <div className="flex-1">
                <div className="text-sm font-bold text-white">2</div>
                <div className="text-[9px] text-white/60">Active plans</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">10,000 XAF</div>
                <div className="text-[9px] text-white/60">Next in 2 days</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted px-5 pt-4 pb-2 font-bold uppercase tracking-wider">What would you like to do?</div>
          <div className="px-5 grid grid-cols-4 gap-2">
            {[
              { Icon: ArrowUpRight, label: 'Contribute', bg: 'bg-mint' },
              { Icon: CalendarDays, label: 'Book', bg: 'bg-[#F1ECFF]' },
              { Icon: ShoppingBag, label: 'Market', bg: 'bg-coral' },
              { Icon: GraduationCap, label: 'Fees', bg: 'bg-[#FEF3D7]' },
            ].map(({ Icon, label, bg }) => (
              <div key={label} className="bg-white rounded-xl border border-border py-2.5 flex flex-col items-center gap-1">
                <div className={`w-7 h-7 ${bg} rounded-full flex items-center justify-center`}>
                  <Icon className="w-3.5 h-3.5 text-green" />
                </div>
                <div className="text-[8px] font-bold text-ink">{label}</div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-muted px-5 pt-4 pb-2 font-bold uppercase tracking-wider">Discover near you</div>
          <div className="px-5 grid grid-cols-2 gap-2">
            {[
              { emoji: '💇🏽‍♀️', label: 'Hair & Beauty', sub: '25+ salons' },
              { emoji: '🍰', label: 'Bakeries', sub: 'Fresh & local' },
            ].map(({ emoji, label, sub }) => (
              <div key={label} className="bg-white rounded-xl p-2.5 border border-border flex items-center gap-2">
                <div className="text-xl">{emoji}</div>
                <div>
                  <div className="text-[10px] font-bold text-ink">{label}</div>
                  <div className="text-[8px] text-muted">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
