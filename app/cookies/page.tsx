'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function CookiesPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit myekie.com. They help us remember your preferences and keep the site working.</p>

      <h2>2. What we use cookies for</h2>
      <p>We use only <strong>essential</strong> and <strong>preference</strong> cookies. We do <strong>not</strong> run analytics tracking, advertising, or any other third-party tracking cookies on myekie.com.</p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Purpose</th>
            <th>Category</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ekie_lang</code></td>
            <td>Remembers your language choice (English or French)</td>
            <td>Preference</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>Session cookie (when signed in)</td>
            <td>Keeps you signed in while you use the site</td>
            <td>Strictly necessary</td>
            <td>Session (cleared when you close the browser)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Third parties</h2>
      <p>When you submit the contact form, submissions are processed through <strong>Formsubmit.co</strong>. Formsubmit.co may set its own cookies on your device while handling that form. Please see Formsubmit.co&apos;s own privacy and cookie practices for details.</p>

      <h2>4. Managing cookies</h2>
      <p>You can clear or disable cookies in your browser settings at any time. Disabling cookies means your language preference will not persist and you may need to sign in again on each visit.</p>
      <p>You can <strong>withdraw consent at any time</strong> by clearing the site&apos;s cookies in your browser.</p>

      <h2>5. Contact</h2>
      <p>Questions about this policy: <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Que sont les cookies ?</h2>
      <p>Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez myekie.com. Ils nous aident à mémoriser vos préférences et à faire fonctionner le site correctement.</p>

      <h2>2. À quoi nous utilisons les cookies</h2>
      <p>Nous utilisons uniquement des cookies <strong>essentiels</strong> et <strong>de préférence</strong>. Nous n&apos;utilisons <strong>pas</strong> de cookies de suivi analytique, publicitaires ou tout autre cookie de suivi tiers sur myekie.com.</p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Objectif</th>
            <th>Catégorie</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ekie_lang</code></td>
            <td>Mémorise votre choix de langue (anglais ou français)</td>
            <td>Préférence</td>
            <td>1 an</td>
          </tr>
          <tr>
            <td>Cookie de session (si connecté)</td>
            <td>Vous maintient connecté pendant que vous utilisez le site</td>
            <td>Strictement nécessaire</td>
            <td>Session (effacé lors de la fermeture du navigateur)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Tiers</h2>
      <p>Lorsque vous soumettez le formulaire de contact, les soumissions sont traitées via <strong>Formsubmit.co</strong>. Formsubmit.co peut déposer ses propres cookies sur votre appareil lors du traitement de ce formulaire. Veuillez consulter les propres pratiques de confidentialité et de cookies de Formsubmit.co pour plus de détails.</p>

      <h2>4. Gestion des cookies</h2>
      <p>Vous pouvez effacer ou désactiver les cookies dans les paramètres de votre navigateur à tout moment. Désactiver les cookies signifie que votre préférence de langue ne persistera pas et que vous devrez peut-être vous reconnecter à chaque visite.</p>
      <p>Vous pouvez <strong>retirer votre consentement à tout moment</strong> en effaçant les cookies du site dans votre navigateur.</p>

      <h2>5. Contact</h2>
      <p>Questions sur cette politique : <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
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
            [&_p]:text-[15px] [&_p]:leading-relaxed
            [&_strong]:font-semibold [&_strong]:text-ink
            [&_code]:bg-cream [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:text-green
            [&_table]:w-full [&_table]:text-sm [&_table]:my-5 [&_table]:border-collapse
            [&_th]:text-left [&_th]:font-semibold [&_th]:text-green [&_th]:border-b [&_th]:border-ink/15 [&_th]:py-2 [&_th]:pr-3
            [&_td]:border-b [&_td]:border-ink/10 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top">
            {lang === 'fr' ? fr : en}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
