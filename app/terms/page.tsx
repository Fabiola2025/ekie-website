'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function TermsPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. Acceptance of terms</h2>
      <p>By using Ékié, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>

      <h2>2. Eligibility</h2>
      <p>You must be 18 or older to use Ékié. Service providers and vendors must be legally able to operate a business in Cameroon.</p>

      <h2>3. Account responsibilities</h2>
      <p>You are responsible for keeping your login credentials secure, all activity that occurs under your account, and providing accurate information.</p>

      <h2>4. Akao contributions</h2>
      <p>Akao is a savings and contribution feature. Funds you contribute remain accessible to you per the contribution plan terms. Ékié is not a bank — Akao operates as a digital savings tool.</p>

      <h2>5. Marketplace and bookings</h2>
      <p>Ékié facilitates transactions between customers and vendors/service providers. We are not the seller of products or the provider of services listed on the platform. Disputes between customers and vendors should be resolved directly; Ékié may assist as a mediator.</p>

      <h2>6. Payments and fees</h2>
      <p>Transactions are processed via Flutterwave, MTN MoMo, and Orange Money. Ékié charges service fees as disclosed during checkout. Refunds depend on individual vendor or provider policies.</p>

      <h2>7. Acceptable use</h2>
      <p>You may not: use Ékié for illegal activities, post false or misleading content, impersonate others, attempt to bypass security measures, or harass other users.</p>

      <h2>8. Termination</h2>
      <p>We may suspend or terminate accounts that violate these terms, engage in fraud, or harm the platform community.</p>

      <h2>9. Limitation of liability</h2>
      <p>Ékié provides the platform &quot;as is.&quot; We are not liable for indirect, incidental, or consequential damages arising from your use of the service.</p>

      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Cameroon.</p>

      <h2>11. Contact</h2>
      <p>For questions about these terms: <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Acceptation</h2>
      <p>En utilisant Ékié, vous acceptez ces Conditions d&apos;utilisation. Si vous n&apos;êtes pas d&apos;accord, veuillez ne pas utiliser la plateforme.</p>

      <h2>2. Éligibilité</h2>
      <p>Vous devez avoir au moins 18 ans. Les prestataires et vendeurs doivent être légalement autorisés à exercer une activité commerciale au Cameroun.</p>

      <h2>3. Responsabilités du compte</h2>
      <p>Vous êtes responsable de la sécurité de vos identifiants, de toute activité sur votre compte, et de l&apos;exactitude des informations fournies.</p>

      <h2>4. Contributions Akao</h2>
      <p>Akao est une fonction d&apos;épargne et de contribution. Les fonds que vous contribuez restent accessibles selon les conditions du plan. Ékié n&apos;est pas une banque — Akao est un outil d&apos;épargne numérique.</p>

      <h2>5. Marché et réservations</h2>
      <p>Ékié facilite les transactions entre clients et vendeurs/prestataires. Nous ne sommes pas le vendeur des produits ou le fournisseur des services listés. Les litiges doivent être résolus directement ; Ékié peut intervenir comme médiateur.</p>

      <h2>6. Paiements et frais</h2>
      <p>Les transactions sont traitées via Flutterwave, MTN MoMo et Orange Money. Ékié facture des frais de service indiqués au paiement. Les remboursements dépendent des politiques des vendeurs.</p>

      <h2>7. Utilisation acceptable</h2>
      <p>Vous ne devez pas : utiliser Ékié pour des activités illégales, publier du contenu mensonger, usurper l&apos;identité d&apos;autrui, contourner la sécurité, ou harceler d&apos;autres utilisateurs.</p>

      <h2>8. Résiliation</h2>
      <p>Nous pouvons suspendre ou résilier des comptes en cas de violation, fraude, ou préjudice à la communauté.</p>

      <h2>9. Limitation de responsabilité</h2>
      <p>Ékié fournit la plateforme « en l&apos;état ». Nous ne sommes pas responsables des dommages indirects ou consécutifs.</p>

      <h2>10. Droit applicable</h2>
      <p>Ces conditions sont régies par les lois de la République du Cameroun.</p>

      <h2>11. Contact</h2>
      <p>Pour toute question : <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  return (
    <>
      <Nav />
      <article className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-green mb-2">{t.legal.terms.title}</h1>
          <p className="text-sm text-muted mb-10">{t.legal.terms.lastUpdated}</p>
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
