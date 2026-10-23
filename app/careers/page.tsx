// app/careers/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | Ékié',
  description:
    'Join us. We are building the trust layer for African families — in Cameroon, with a view across the continent. Open roles with Ékié.',
};

const ROLES = [
  {
    title: 'Country Operations Lead',
    location: 'Yaoundé or Douala, Cameroon',
    type: 'Full-time contract',
    reportsTo: 'CEO',
    tagline:
      'Run the engine that keeps every payment on the rails.',
    description:
      'You own daily transaction review across every partner platform — CinetPay, Flutterwave, Afriland First Bank, dLocal, Kora — and make sure every franc moves where families intend. You manage our in-country team as it grows: our Marketing & Community Lead and our Customer Care Associate. You are our eyes on the ground, our voice in Yaoundé, and the reason diaspora families can trust that Ékié is real.',
    responsibilities: [
      'Review and reconcile every transaction, every day — flag anomalies before anyone else sees them',
      'Own partner relationships: processors, banks, verified vendors, pilot schools',
      'Manage and grow the Cameroon team as we scale',
      'Translate CEO strategy into weekly operational plans',
      'Represent Ékié in-country for partnerships, press, and public interactions',
    ],
    youBring: [
      'Operational experience in Cameroonian or regional fintech, banking, or payments',
      'Fluent French and English, written and spoken',
      'Comfortable with numbers, dashboards, and process ownership',
      'Trustworthy under pressure — this role sees the money move',
      'Based in Yaoundé or Douala, or ready to relocate',
    ],
    setup: [
      'Your own reliable laptop (Windows, macOS, or Linux)',
      'Stable home internet (fibre, LTE/4G, or reliable DSL — not shared mobile data)',
      'External monitor (we review a lot of dashboards side-by-side)',
      'Quiet workspace for calls and partner meetings',
    ],
  },
  {
    title: 'Marketing & Community Lead',
    location: 'Remote or Cameroon',
    type: 'Full-time contract',
    reportsTo: 'Country Operations Lead',
    tagline:
      'Tell the story of families who finally feel seen.',
    description:
      'You grow Ékié’s presence where our people already are — diaspora WhatsApp groups, hometown associations, TikTok, Facebook, and the quiet corners of the internet where Cameroonians abroad talk about home. You craft the stories, the campaigns, and the community rituals that make Ékié feel like family. This is a founding voice role.',
    responsibilities: [
      'Run our WhatsApp community and group — the engine of trust',
      'Create TikTok and Facebook content in English and French, tuned for diaspora and Cameroon-based audiences',
      'Build a referral and advocacy flywheel — our users are our best growth channel',
      'Partner with hometown associations and diaspora groups across North America and Europe',
      'Own our launch, product, and story moments',
    ],
    youBring: [
      'A portfolio of stories, campaigns, or communities you have grown — not just metrics',
      'Fluent French and English; deep familiarity with Cameroonian culture',
      'Comfort on-camera for short-form video',
      'A nose for what Cameroonians actually share with each other',
      'Patience for a product that moves at the speed of trust',
    ],
    setup: [
      'Your own reliable laptop (Windows, macOS, or Linux)',
      'Stable home internet (fibre, LTE/4G, or reliable DSL — not shared mobile data)',
      'Smartphone with a capable camera (short-form video is a core deliverable)',
      'Quiet workspace for recordings and community calls',
    ],
  },
  {
    title: 'Customer Care Associate',
    location: 'Cameroon (remote-friendly)',
    type: 'Part-time contract · 20 hrs/week · 9am–1pm WAT',
    reportsTo: 'Country Operations Lead',
    tagline:
      'Be the first voice families and vendors hear.',
    description:
      'When a diaspora mother cannot pay her son’s school fees because her card was declined at 2 a.m., you are who she talks to. When a vendor in Yaoundé needs help verifying a photo pickup, you are who they talk to. You carry the Ékié voice — warm, patient, bilingual, unflustered — and you keep careful notes so we fix things once, not twenty times.',
    responsibilities: [
      'Answer family and vendor messages across WhatsApp, email, and in-app chat during coverage hours',
      'Resolve payment, verification, and refund questions end-to-end',
      'Flag recurring issues to the Country Ops Lead so the product can fix them',
      'Keep a running log of every unusual case — this is our institutional memory',
    ],
    youBring: [
      'Fluent French and English, with real warmth in both',
      'Prior customer-facing experience in fintech, telco, or a professional service',
      'Reliable 9am–1pm WAT availability, Monday through Friday',
      'Honesty when you do not know the answer — we will teach you the rest',
    ],
    setup: [
      'Your own reliable laptop (Windows, macOS, or Linux)',
      'Stable home internet (fibre, LTE/4G, or reliable DSL — not shared mobile data)',
      'Headset with a clear microphone (for voice calls)',
      'Quiet workspace during coverage hours (9am–1pm WAT, Mon–Fri)',
    ],
  },
];

export default function CareersPage() {
  const subject = encodeURIComponent('Ékié — Role application');

  return (
    <main className="min-h-screen bg-[#F7F6F1] text-[#0D3B2E]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0D3B2E] text-[#F7F6F1]">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#0E7C6B] blur-3xl" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-[#DCAE33] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#0E7C6B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#DCAE33]">
            Join us
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight sm:text-6xl">
            Build the trust layer for African families.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#F7F6F1]/80">
            Ékié exists so a mother in Houston can send school fees to her son
            in Yaoundé with a receipt in her hand. We are hiring a small,
            senior founding team to launch this with us — in Cameroon, with a
            view across the continent.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#F7F6F1]/70">
            <span className="rounded-full bg-white/10 px-4 py-1.5">
              Based in Cameroon · remote-friendly where applicable
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5">
              Contract roles · bilingual EN/FR
            </span>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="mb-14 flex items-baseline justify-between gap-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold sm:text-4xl">
            Open roles
          </h2>
          <span className="text-sm text-[#0D3B2E]/60">
            {ROLES.length} positions
          </span>
        </div>

        <div className="space-y-6">
          {ROLES.map((role) => (
            <article
              key={role.title}
              className="group relative overflow-hidden rounded-3xl border border-[#0D3B2E]/10 bg-white p-8 shadow-sm transition-all hover:shadow-md sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold sm:text-3xl">
                    {role.title}
                  </h3>
                  <p className="mt-2 italic text-[#0E7C6B]">{role.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#0D3B2E]/70">
                    <span>📍 {role.location}</span>
                    <span>📄 {role.type}</span>
                    <span>Reports to: {role.reportsTo}</span>
                  </div>
                </div>

                <a
                  href={`mailto:careers@myekie.com?subject=${subject}%20—%20${encodeURIComponent(role.title)}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0D3B2E] px-6 py-3 text-sm font-semibold text-[#DCAE33] transition-transform hover:scale-[1.03] hover:bg-[#0E7C6B]"
                >
                  Apply
                </a>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-[#0D3B2E]/85">
                {role.description}
              </p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0D3B2E]/60">
                    What you&apos;ll own
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#0D3B2E]/85">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#DCAE33]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0D3B2E]/60">
                    What you bring
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#0D3B2E]/85">
                    {role.youBring.map((y) => (
                      <li key={y} className="flex gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E7C6B]" />
                        <span>{y}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Setup requirements — equipment + working conditions */}
              {role.setup && (
                <div className="mt-8 rounded-2xl bg-[#F7F6F1] p-6 sm:p-7 border border-[#0D3B2E]/5">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0D3B2E]/60">
                    Setup you need
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm leading-relaxed text-[#0D3B2E]/85">
                    {role.setup.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#DCAE33]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* PERKS */}
        <div className="mt-20 rounded-3xl bg-[#0D3B2E] p-10 text-[#F7F6F1] sm:p-14">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#DCAE33] sm:text-3xl">
            What you get in return
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Mission-driven work',
                body:
                  'You build a product your own family would use. Every feature is in service of outcomes a mother in diaspora can actually feel.',
              },
              {
                title: 'Founding team equity',
                body:
                  'You are joining a founding team, not a function. Your work shapes how Ékié exists in the market and how it feels to use.',
              },
              {
                title: 'Competitive pay',
                body:
                  'Compensation benchmarked to Cameroonian and regional fintech standards, with room to grow as the company grows.',
              },
              {
                title: 'A clear voice',
                body:
                  'Small team, direct line to the CEO, no layers between your idea and the product. We hire senior for a reason.',
              },
            ].map((p) => (
              <div key={p.title}>
                <h3 className="font-semibold text-[#F7F6F1]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F7F6F1]/75">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold sm:text-3xl">
            Don&apos;t see your role?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#0D3B2E]/75">
            We are a small team scaling carefully. If you believe you can
            carry a piece of Ékié we have not yet written down, write to us.
          </p>
          <a
            href={`mailto:careers@myekie.com?subject=${subject}%20—%20General`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#DCAE33] px-7 py-3 text-sm font-semibold text-[#0D3B2E] transition-transform hover:scale-[1.03]"
          >
            Reach out
          </a>
        </div>

        <p className="mt-16 text-center text-xs text-[#0D3B2E]/50">
          Ékié · EKIE LTD, Yaoundé · careers@myekie.com
        </p>
      </section>

      {/* Back link */}
      <div className="pb-16 text-center">
        <Link
          href="/"
          className="text-sm text-[#0D3B2E]/60 underline underline-offset-2 hover:text-[#0D3B2E]"
        >
          ← Back to Ékié
        </Link>
      </div>
    </main>
  );
}
