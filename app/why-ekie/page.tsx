'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WaitlistForm } from '@/components/Forms';
import { useLang } from '@/lib/LanguageProvider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WhyEkiePage() {
  const { t } = useLang();
  const w = t.whyEkie;

  return (
    <>
      <Nav />

      <article className="bg-cream min-h-screen pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-green transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> {w.backLink}
          </Link>

          {/* Title */}
          <header className="mb-14">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-green leading-[1.05] mb-4 tracking-tight">
              {w.title}
            </h1>
            <p className="text-base text-muted italic">{w.subtitle}</p>
          </header>

          {/* Section 1 — Uncle */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section1Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>{w.section1Body1}</p>
              <p>{w.section1Body2}</p>
              <p>
                {w.section1Body3}
                <strong className="text-green">{w.section1Amount}</strong>
                {w.section1Body4}
              </p>
              <p>{w.section1Body5}</p>
              <p>{w.section1Body6}</p>
              <p>{w.section1Body7}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section1Emphasis}
              </p>
            </div>
          </section>

          {/* Section 2 — Textbook + Sister */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section2Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>
                {w.section2Body1}
                <em className="text-green">{w.section2Quote1}</em>
                {w.section2Body2}
              </p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section2Emphasis}
              </p>
              <p>{w.section2Body3}</p>
              <p>{w.section2Body4}</p>
              <p>{w.section2Body5}</p>
              <p>
                {w.section2Body6}
                <strong className="text-green">{w.section2Amount}</strong>
                {w.section2Body7}
              </p>
              <p className="font-bold text-green text-lg italic mt-6">
                {w.section2Emphasis2}
              </p>
            </div>
          </section>

          {/* Section 3 — Our story */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section3Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>{w.section3Body1}</p>
              <p>{w.section3Body2}</p>
              <p>
                {w.section3Body3}
                <em>{w.section3Quote}</em>
              </p>
              <p className="font-bold text-green text-xl md:text-2xl italic">
                {w.section3Emphasis1}
              </p>
              <p className="font-bold text-gold text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section3Emphasis2}
              </p>
              <p>{w.section3Body4}</p>
              <p>{w.section3Body5}</p>
            </div>
          </section>

          {/* Section 4 — Ekie is what we build */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section4Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5">
                {w.section4Emphasis1}
              </p>
              <p>{w.section4Body1}</p>
              <p>{w.section4Body2}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-black text-green mb-2">{w.section4Category1Title}</h3>
                  <p>{w.section4Category1Body}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-black text-green mb-2">{w.section4Category2Title}</h3>
                  <p>{w.section4Category2Body}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-black text-green mb-2">{w.section4Category3Title}</h3>
                  <p>{w.section4Category3Body}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-black text-green mb-2">{w.section4Category4Title}</h3>
                  <p>{w.section4Category4Body}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-black text-green mb-2">{w.section4Category5Title}</h3>
                  <p>{w.section4Category5Body}</p>
                </div>
              </div>

              <p className="mt-8">{w.section4Body3}</p>
            </div>
          </section>

          {/* Section 4.5 — Akao: the trust that keeps breaking */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section4_5Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>{w.section4_5Body1}</p>
              <p>{w.section4_5Body2}</p>
              <p>{w.section4_5Body3}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section4_5Emphasis1}
              </p>

              {/* Story anchor — anonymized friend */}
              <p>{w.section4_5StoryBody1}</p>
              <p>{w.section4_5StoryBody2}</p>
              <p>{w.section4_5StoryBody3}</p>
              <p>{w.section4_5StoryBody4}</p>
              <p>{w.section4_5StoryBody5}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section4_5StoryEmphasis}
              </p>

              {/* Systemic pattern */}
              <p>{w.section4_5PatternBody1}</p>
              <p>{w.section4_5PatternBody2}</p>
              <p>{w.section4_5PatternBody3}</p>
              <p className="font-bold text-gold text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section4_5PatternEmphasis}
              </p>

              {/* Ékié solution */}
              <p>{w.section4_5SolutionBody1}</p>
              <p>{w.section4_5SolutionBody2}</p>
              <p>{w.section4_5SolutionBody3}</p>
              <p>{w.section4_5SolutionBody4}</p>
              <p>{w.section4_5SolutionKyc}</p>
              <p>{w.section4_5SolutionNjangi}</p>
              <p>{w.section4_5SolutionDomestic}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section4_5SolutionEmphasis}
              </p>
              <p className="font-bold text-green text-lg italic mt-6">
                {w.section4_5SolutionClosing}
              </p>

              {/* Closing — ties back to trust infrastructure */}
              <p>{w.section4_5FinalBody1}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section4_5FinalEmphasis}
              </p>
              <p className="font-bold text-gold text-xl md:text-2xl italic mt-6">
                {w.section4_5FinalClosing}
              </p>
            </div>
          </section>
          {/* Section 5 — Not about control */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section5Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>{w.section5Body1}</p>
              <p>{w.section5Body2}</p>
              <p>{w.section5Body3}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section5Emphasis}
              </p>
              <p>{w.section5Body4}</p>
            </div>
          </section>

          {/* Section 6 — Why I get up */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-black text-green leading-tight mb-6">
              {w.section6Title}
            </h2>
            <div className="prose-content space-y-5 text-ink text-lg leading-relaxed">
              <p>{w.section6Body1}</p>
              <p>{w.section6Body2}</p>
              <p>{w.section6Body3}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic">
                {w.section6Emphasis1}
              </p>
              <p>{w.section6Body4}</p>
              <p className="font-bold text-gold text-xl md:text-2xl italic border-l-4 border-gold pl-5 my-8">
                {w.section6Emphasis2}
              </p>
              <p>{w.section6Body5}</p>
              <p className="font-bold text-green text-xl md:text-2xl italic mt-8">
                {w.section6Emphasis3}
              </p>
              <p className="font-display text-2xl md:text-3xl font-black text-green mt-8">
                {w.section6Signoff}
              </p>
              <p className="text-right text-lg italic text-muted mt-6">
                {w.signature}
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 pt-12 border-t border-border text-center">
            <h3 className="font-display text-xl md:text-2xl font-black text-green mb-3">
              {w.ctaTitle}
            </h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              {w.ctaSub}
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </section>

        </div>
      </article>

      <Footer />
    </>
  );
}
