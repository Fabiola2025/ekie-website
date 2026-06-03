'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function PrivacyPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. Introduction</h2>
      <p>Ékié (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a Cameroonian platform operated by Fabiola Nsuh. This Privacy Policy explains how we collect, use, and protect information when you use our app and website (myekie.com).</p>

      <h2>2. Information we collect</h2>
      <p>When you create an Ékié account, we collect: your name, phone number, email address (if provided), profile photo (optional), location data when you allow it, mobile money number for transactions, and ID documents when you apply to become a service provider or vendor.</p>
      <p>We automatically collect technical data such as device type, operating system, IP address, and app usage analytics.</p>

      <h2>3. How we use your information</h2>
      <p>We use your information to: provide and improve the Ékié service, process Akao contributions, marketplace purchases, bookings, and other transactions, verify service providers and vendors, send you notifications about your account and transactions, prevent fraud and ensure platform safety, and comply with Cameroonian law.</p>

      <h2>4. Information sharing</h2>
      <p>We do not sell your personal data. We share information only with: service providers and vendors you transact with (limited to what they need to fulfill your order), payment processors (Flutterwave, MTN MoMo, Orange Money), and legal authorities when required by Cameroonian law.</p>

      <h2>5. Data storage and security</h2>
      <p>Your data is stored on secure AWS servers in the EU (eu-west-1 region). We use industry-standard encryption for data in transit and at rest. Despite our best efforts, no system is completely secure — we cannot guarantee absolute security.</p>

      <h2>6. Your rights</h2>
      <p>You have the right to: access your personal data, correct inaccurate data, delete your account and associated data, and withdraw consent for non-essential processing. Contact us at <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a> to exercise these rights.</p>

      <h2>7. Children</h2>
      <p>Ékié is not directed at children under 18. We do not knowingly collect data from anyone under 18 without parental consent.</p>

      <h2>8. Changes to this policy</h2>
      <p>We may update this policy from time to time. Significant changes will be communicated through the app or by email.</p>

      <h2>9. Contact us</h2>
      <p>Questions about this policy? Reach out at <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Introduction</h2>
      <p>Ékié (« nous », « notre ») est une plateforme camerounaise gérée par Fabiola Nsuh. Cette Politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application et notre site (myekie.com).</p>

      <h2>2. Informations collectées</h2>
      <p>Lors de la création d&apos;un compte Ékié, nous collectons : votre nom, numéro de téléphone, email (si fourni), photo de profil (facultative), données de localisation lorsque vous l&apos;autorisez, numéro Mobile Money pour les transactions, et documents d&apos;identité pour les vendeurs/prestataires.</p>
      <p>Nous collectons automatiquement des données techniques : type d&apos;appareil, système d&apos;exploitation, adresse IP et analyses d&apos;utilisation.</p>

      <h2>3. Utilisation des informations</h2>
      <p>Vos informations servent à : fournir et améliorer Ékié, traiter les contributions Akao, les achats marché, les réservations et autres transactions, vérifier les prestataires et vendeurs, vous envoyer des notifications, prévenir la fraude, et nous conformer à la loi camerounaise.</p>

      <h2>4. Partage d&apos;informations</h2>
      <p>Nous ne vendons pas vos données personnelles. Nous partageons uniquement avec : les prestataires et vendeurs (limité à ce qui est nécessaire), les processeurs de paiement (Flutterwave, MTN MoMo, Orange Money), et les autorités légales si requis par la loi camerounaise.</p>

      <h2>5. Stockage et sécurité</h2>
      <p>Vos données sont stockées sur des serveurs AWS sécurisés en UE (région eu-west-1). Nous utilisons un chiffrement standard de l&apos;industrie. Aucun système n&apos;est totalement sécurisé — nous ne pouvons pas garantir une sécurité absolue.</p>

      <h2>6. Vos droits</h2>
      <p>Vous avez le droit d&apos; : accéder à vos données, corriger les données inexactes, supprimer votre compte et données associées, et retirer le consentement pour le traitement non essentiel. Contactez-nous à <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>

      <h2>7. Enfants</h2>
      <p>Ékié n&apos;est pas destiné aux mineurs de moins de 18 ans. Nous ne collectons pas sciemment de données auprès de mineurs sans consentement parental.</p>

      <h2>8. Modifications</h2>
      <p>Cette politique peut être mise à jour. Les modifications importantes seront communiquées via l&apos;app ou par email.</p>

      <h2>9. Contact</h2>
      <p>Questions ? Écrivez-nous à <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  return (
    <>
      <Nav />
      <article className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-green mb-2">{t.legal.privacy.title}</h1>
          <p className="text-sm text-muted mb-10">{t.legal.privacy.lastUpdated}</p>
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
