'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function SecurityPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. Our commitment</h2>
      <p>Protecting your financial information and personal data is at the heart of Ékié. We follow industry best practices to keep your account safe.</p>

      <h2>2. Encryption</h2>
      <ul>
        <li><strong>In transit</strong>: TLS 1.2 or higher (HTTPS) between your device, our servers, and our payment processors.</li>
        <li><strong>At rest</strong>: AES-256 encryption on our AWS RDS databases.</li>
        <li><strong>Biometric data</strong> (fingerprint, face): stays on your device. Ékié never receives or stores it.</li>
        <li><strong>PINs</strong>: never stored in plain text; hashed using bcrypt.</li>
        <li><strong>Sensitive on-device values</strong> are stored in your platform&apos;s secure storage (iOS Secure Enclave, Android Keystore).</li>
      </ul>

      <h2>3. Authentication</h2>
      <ul>
        <li>Phone number + SMS one-time PIN (OTP) at sign-in &mdash; for Cameroon-based users</li>
        <li>Email address + email one-time PIN at sign-in &mdash; for diaspora users (sent via SendGrid)</li>
        <li>A 6-digit PIN set during onboarding</li>
        <li>Optional biometric unlock (fingerprint or face) on supported devices</li>
      </ul>

      <h2>4. Payment security</h2>
      <p>We do not store your card details. Payments are processed through PCI-DSS certified providers:</p>
      <ul>
        <li><strong>CinetPay</strong> &mdash; mobile money in Cameroon (MTN Mobile Money and Orange Money)</li>
        <li><strong>dLocal</strong> &mdash; international card payments and cross-border payouts</li>
        <li><strong>Kora</strong> &mdash; international card payments and cross-border payouts</li>
      </ul>

      <h2>5. Infrastructure</h2>
      <ul>
        <li>Hosted on Amazon Web Services (eu-west-1, Europe)</li>
        <li>Automated monitoring and alerting on infrastructure and application metrics</li>
        <li>Regular backups with a documented disaster recovery plan</li>
      </ul>

      <h2>6. Account safety tips</h2>
      <ul>
        <li><strong>Never share your PIN</strong> with anyone, including someone claiming to be from Ékié support. We will never ask for it.</li>
        <li>Only download the Ékié app from the official Google Play Store or Apple App Store.</li>
        <li>Enable biometric unlock on your device if available.</li>
        <li>Report suspicious activity to <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a>.</li>
      </ul>

      <h2>7. Vulnerability disclosure</h2>
      <p>Found a security issue? Please email <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a> with:</p>
      <ul>
        <li>A description of the issue</li>
        <li>Steps to reproduce it</li>
        <li>The potential impact</li>
      </ul>
      <p>We aim to acknowledge your report within <strong>2 business days</strong> and will keep you informed as we investigate. Please do not publicly disclose the issue until we have had a reasonable opportunity to address it. We appreciate responsible disclosure.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Notre engagement</h2>
      <p>La protection de vos informations financières et de vos données personnelles est au cœur d&apos;Ékié. Nous suivons les meilleures pratiques de l&apos;industrie pour garder votre compte en sécurité.</p>

      <h2>2. Chiffrement</h2>
      <ul>
        <li><strong>En transit</strong> : TLS 1.2 ou supérieur (HTTPS) entre votre appareil, nos serveurs et nos processeurs de paiement.</li>
        <li><strong>Au repos</strong> : chiffrement AES-256 sur nos bases de données AWS RDS.</li>
        <li><strong>Données biométriques</strong> (empreinte digitale, visage) : restent sur votre appareil. Ékié ne les reçoit ni ne les stocke jamais.</li>
        <li><strong>PINs</strong> : jamais stockés en clair ; hachés avec bcrypt.</li>
        <li>Les <strong>valeurs sensibles sur l&apos;appareil</strong> sont stockées dans le stockage sécurisé natif (iOS Secure Enclave, Android Keystore).</li>
      </ul>

      <h2>3. Authentification</h2>
      <ul>
        <li>Numéro de téléphone + code à usage unique (OTP) par SMS lors de la connexion &mdash; pour les utilisateurs basés au Cameroun</li>
        <li>Adresse e-mail + code à usage unique par e-mail lors de la connexion &mdash; pour les utilisateurs de la diaspora (envoyé via SendGrid)</li>
        <li>Un PIN à 6 chiffres défini lors de l&apos;intégration</li>
        <li>Déverrouillage biométrique facultatif (empreinte digitale ou visage) sur les appareils compatibles</li>
      </ul>

      <h2>4. Sécurité des paiements</h2>
      <p>Nous ne stockons pas vos détails de carte. Les paiements sont traités via des fournisseurs certifiés PCI-DSS :</p>
      <ul>
        <li><strong>CinetPay</strong> &mdash; mobile money au Cameroun (MTN Mobile Money et Orange Money)</li>
        <li><strong>dLocal</strong> &mdash; paiements internationaux par carte et versements transfrontaliers</li>
        <li><strong>Kora</strong> &mdash; paiements internationaux par carte et versements transfrontaliers</li>
      </ul>

      <h2>5. Infrastructure</h2>
      <ul>
        <li>Hébergé sur Amazon Web Services (eu-west-1, Europe)</li>
        <li>Surveillance et alertes automatisées sur les métriques d&apos;infrastructure et d&apos;application</li>
        <li>Sauvegardes régulières avec un plan de reprise après sinistre documenté</li>
      </ul>

      <h2>6. Conseils de sécurité du compte</h2>
      <ul>
        <li><strong>Ne partagez jamais votre PIN</strong> avec qui que ce soit, y compris une personne prétendant être du support Ékié. Nous ne vous le demanderons jamais.</li>
        <li>Téléchargez l&apos;application Ékié uniquement depuis le Google Play Store ou l&apos;Apple App Store officiels.</li>
        <li>Activez le déverrouillage biométrique sur votre appareil si disponible.</li>
        <li>Signalez toute activité suspecte à <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a>.</li>
      </ul>

      <h2>7. Divulgation de vulnérabilité</h2>
      <p>Vous avez découvert un problème de sécurité ? Veuillez envoyer un e-mail à <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a> avec :</p>
      <ul>
        <li>Une description du problème</li>
        <li>Les étapes pour le reproduire</li>
        <li>L&apos;impact potentiel</li>
      </ul>
      <p>Nous nous efforçons d&apos;accuser réception de votre signalement dans un délai de <strong>2 jours ouvrables</strong> et vous tiendrons informé de notre enquête. Veuillez ne pas divulguer publiquement le problème tant que nous n&apos;avons pas eu une occasion raisonnable d&apos;y répondre. Nous apprécions la divulgation responsable.</p>
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
            [&_p]:text-[15px] [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:my-3
            [&_li]:text-[15px] [&_li]:leading-relaxed
            [&_strong]:font-semibold [&_strong]:text-ink">
            {lang === 'fr' ? fr : en}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
