'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function CookiesPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience on myekie.com.</p>
      <h2>How we use cookies</h2>
      <p>Ékié uses cookies for: language preference (English / French), session management (keeping you logged in), and basic analytics (understanding how the site is used so we can improve it).</p>
      <h2>Third-party cookies</h2>
      <p>We do not currently use third-party advertising cookies. Form submissions are processed through Formsubmit.co, which may set its own cookies.</p>
      <h2>Managing cookies</h2>
      <p>You can disable cookies in your browser settings. Doing so may limit some site functionality (e.g. your language preference won&apos;t persist).</p>
      <h2>Contact</h2>
      <p>Questions? Reach out at <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site. Ils nous aident à mémoriser vos préférences et à améliorer votre expérience sur myekie.com.</p>
      <h2>Utilisation des cookies</h2>
      <p>Ékié utilise les cookies pour : préférence de langue (anglais / français), gestion de session (rester connecté), et analyses de base (comprendre l&apos;utilisation du site pour l&apos;améliorer).</p>
      <h2>Cookies tiers</h2>
      <p>Nous n&apos;utilisons pas de cookies publicitaires tiers. Les formulaires sont traités via Formsubmit.co, qui peut définir ses propres cookies.</p>
      <h2>Gestion des cookies</h2>
      <p>Vous pouvez désactiver les cookies dans votre navigateur. Cela peut limiter certaines fonctionnalités (par ex. votre préférence de langue ne sera pas mémorisée).</p>
      <h2>Contact</h2>
      <p>Questions ? Écrivez-nous à <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  return (
    <>
      <Nav />
      <article className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-green mb-2">{t.legal.cookies.title}</h1>
          <p className="text-sm text-muted mb-10">{t.legal.cookies.lastUpdated}</p>
          <div className="prose-content text-ink/85 leading-relaxed space-y-4
            [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-green [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
            [&_p]:text-[15px] [&_p]:leading-relaxed">
            {lang === 'fr' ? fr : en}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
