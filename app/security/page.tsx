'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function SecurityPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>Our commitment</h2>
      <p>Protecting your financial information and personal data is at the heart of Ékié. We follow industry best practices to keep your account safe.</p>
      <h2>Data encryption</h2>
      <p>All data in transit between your device and our servers is encrypted using TLS (HTTPS). Sensitive data at rest is encrypted on our AWS infrastructure.</p>
      <h2>Authentication</h2>
      <p>Ékié uses phone number + PIN authentication. Your PIN is never stored in plain text — it&apos;s hashed before being saved.</p>
      <h2>Payment security</h2>
      <p>We do not store your card details. All payments are processed through PCI-DSS certified providers (Flutterwave, MTN MoMo, Orange Money).</p>
      <h2>Account safety tips</h2>
      <p>Never share your PIN with anyone, including someone claiming to be from Ékié support. Always download the app from official sources. Report suspicious activity to <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a>.</p>
      <h2>Vulnerability disclosure</h2>
      <p>Discovered a security issue? Please email <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a> (or <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>). We appreciate responsible disclosure.</p>
    </>
  );

  const fr = (
    <>
      <h2>Notre engagement</h2>
      <p>Protéger vos informations financières et personnelles est au cœur d&apos;Ékié. Nous suivons les meilleures pratiques du secteur pour sécuriser votre compte.</p>
      <h2>Chiffrement des données</h2>
      <p>Toutes les données en transit entre votre appareil et nos serveurs sont chiffrées via TLS (HTTPS). Les données sensibles au repos sont chiffrées sur notre infrastructure AWS.</p>
      <h2>Authentification</h2>
      <p>Ékié utilise l&apos;authentification par numéro de téléphone + PIN. Votre PIN n&apos;est jamais stocké en clair — il est haché avant d&apos;être enregistré.</p>
      <h2>Sécurité des paiements</h2>
      <p>Nous ne stockons pas vos données de carte. Tous les paiements sont traités via des prestataires certifiés PCI-DSS (Flutterwave, MTN MoMo, Orange Money).</p>
      <h2>Conseils de sécurité</h2>
      <p>Ne partagez jamais votre PIN, même avec quelqu&apos;un se faisant passer pour le support Ékié. Téléchargez toujours l&apos;app via les sources officielles. Signalez toute activité suspecte à <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a>.</p>
      <h2>Divulgation de vulnérabilités</h2>
      <p>Vous avez trouvé une faille ? Écrivez à <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a>. Merci de votre divulgation responsable.</p>
    </>
  );

  return (
    <>
      <Nav />
      <article className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-green mb-2">{t.legal.security.title}</h1>
          <p className="text-sm text-muted mb-10">{t.legal.security.lastUpdated}</p>
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
