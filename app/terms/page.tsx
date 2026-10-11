'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function TermsPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. Acceptance</h2>
      <p>By creating an account or using Ékié, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>

      <h2>2. Who can use Ékié</h2>
      <ul>
        <li>You must be 18 or older.</li>
        <li>You must provide accurate information when creating your account and keep it up to date.</li>
        <li>Vendors and service providers must be legally authorised to operate a business in Cameroon or in the country where they offer services through our platform.</li>
        <li>If you add beneficiaries (children, family members, students), you must have the right to act on their behalf for the transaction in question.</li>
      </ul>

      <h2>3. About Ékié</h2>
      <p>Ékié is a payment coordination and non-custodial orchestration platform. We help senders pay verified recipients directly for specific outcomes (school fees, foodstuffs, bookings, construction materials, pharmacy) and help families coordinate contributions through Care Circles. Ékié is operated by EKIE LTD (Yaoundé, Cameroon, D-U-N-S 369982596).</p>
      <p><strong>Important: Ékié never holds user funds.</strong> Funds move from you, through licensed payment processors, to the recipient&apos;s account. For Akao contributions, funds are held by a licensed financial-institution partner, not by Ékié.</p>

      <h2>4. Your account</h2>
      <p>You are responsible for:</p>
      <ul>
        <li>Keeping your login credentials (PIN, biometric, phone number) secure</li>
        <li>All activity under your account</li>
        <li>Providing accurate information and updating it when it changes</li>
        <li>Any beneficiary data you provide</li>
      </ul>

      <h2>5. Features</h2>
      <p><strong>School Fees.</strong> You pay a verified school directly for a named student&apos;s tuition or related fees. Funds go to the school, not to Ékié.</p>
      <p><strong>Skip the Queue.</strong> You pre-pay a verified vendor for a specific item or service; the vendor confirms with a photo on pickup. Your purchase is complete when the pickup is confirmed.</p>
      <p><strong>Bookings.</strong> You book services (travel, health, home services, cakes, tables and more) through verified providers. Terms specific to each booking are set by the provider.</p>
      <p><strong>Marketplace.</strong> You buy from vetted vendors. Each vendor is responsible for their own products, descriptions, pricing and delivery. Ékié provides the discovery and payment layer.</p>
      <p><strong>Akao.</strong> A daily contribution feature. Funds you contribute are held by a licensed financial-institution partner, not by Ékié. You may withdraw contributions in line with the plan terms. Ékié is not a bank, is not licensed to accept deposits, and does not pay interest.</p>
      <p><strong>Care Circles.</strong> You and other members coordinate shared contributions toward a beneficiary. Each member is responsible for their own contribution. Ékié provides the coordination and tracking layer only.</p>
      <p><strong>Vendors and schools.</strong> Vendors, service providers, and school partners are also subject to a separate Vendor Agreement or School Partnership Agreement at onboarding, which covers business-specific terms including payout schedules, service levels, and data handling in the vendor and school portals.</p>

      <h2>6. Payments and fees</h2>
      <p>Payments are processed by <strong>CinetPay</strong> (for mobile money in Cameroon &mdash; <strong>MTN Mobile Money</strong> and <strong>Orange Money</strong>), <strong>dLocal</strong>, and <strong>Kora</strong> (for international card payments and cross-border payouts). Ékié&apos;s own fees are disclosed at checkout and on our pricing page.</p>
      <p>Refunds depend on the vendor&apos;s or provider&apos;s refund policy. For disputes, see §9.</p>

      <h2>7. Acceptable use</h2>
      <p>You may not:</p>
      <ul>
        <li>Use Ékié for any illegal activity, including money laundering or terrorism financing</li>
        <li>Post false, misleading or harmful content</li>
        <li>Impersonate any person or organisation</li>
        <li>Create multiple accounts to evade restrictions</li>
        <li>Attempt to probe, scan or breach our systems</li>
        <li>Use automated means (bots, scrapers) to access the service without written permission</li>
        <li>Harass, threaten or exploit other users</li>
      </ul>

      <h2>8. Suspension and termination</h2>
      <p>We may suspend or close accounts that:</p>
      <ul>
        <li>Violate these Terms</li>
        <li>Are suspected of fraud, abuse, or money laundering</li>
        <li>Pose a risk to other users or to the platform</li>
        <li>Have been inactive for extended periods (we will notify you first where feasible)</li>
      </ul>
      <p>You may close your account at any time; see our Privacy Policy for how long data is retained after closure.</p>

      <h2>9. Dispute resolution</h2>
      <p>If you have a dispute:</p>
      <ol className="list-decimal pl-6 space-y-1.5 my-3 text-[15px] leading-relaxed">
        <li>First, contact the vendor or provider directly through the app.</li>
        <li>If unresolved, contact Ékié at <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a>; we will try to mediate within 15 business days.</li>
        <li>If still unresolved, disputes are subject to the courts of Yaoundé, Cameroon.</li>
      </ol>

      <h2>10. Limitation of liability</h2>
      <p>Ékié provides the platform &quot;as is.&quot; To the fullest extent permitted by law, Ékié is only liable for damages <strong>directly caused by Ékié&apos;s negligence or willful misconduct</strong>.</p>
      <p><strong>We are not liable for:</strong></p>
      <ul>
        <li>Fraud, non-delivery, misconduct or quality issues attributable to vendors, service providers, schools, or other users</li>
        <li>Failure, malfunction or delay of mobile networks, SMS gateways, internet connectivity, or third-party payment processors (including CinetPay, dLocal, Kora and others)</li>
        <li>Losses arising from you sharing your PIN, biometric, phone, device or login credentials with any person</li>
        <li>Force majeure events (natural disasters, strikes, pandemics, government action, war)</li>
        <li>Regulatory changes outside Ékié&apos;s control</li>
        <li>Currency fluctuations, exchange-rate movements or inflation</li>
        <li>Indirect, incidental, consequential or punitive damages; loss of profits, data, goodwill or opportunity</li>
      </ul>
      <p>Where we are liable, our total liability for any claim is limited to the <strong>greater</strong> of: (a) the fees you paid to Ékié in the 12 months preceding the incident, or (b) <strong>500,000 XAF (approximately $850)</strong>.</p>
      <p><strong>Claim process.</strong> Claims must be made in writing to <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a> within <strong>30 days</strong> of the incident, with specific details, supporting evidence and the amount claimed. You bear the burden of proving the loss and that it was directly caused by Ékié. Claims not meeting these requirements will not be considered.</p>
      <p><strong>No class actions.</strong> Each claim must be brought individually. No aggregated or class claims are permitted.</p>
      <p><strong>Bad-faith claims.</strong> Ékié reserves the right to suspend or terminate the accounts of users who repeatedly file unsubstantiated claims or act in bad faith.</p>

      <h2>11. Governing law</h2>
      <p>These Terms are governed by the laws of the Republic of Cameroon. Disputes are subject to the courts of Yaoundé, Cameroon.</p>

      <h2>12. Changes to these Terms</h2>
      <p>We may update these Terms. Material changes will be communicated in-app and by email at least 30 days before taking effect, where feasible. Your continued use of Ékié after the effective date constitutes acceptance.</p>

      <h2>13. Contact</h2>
      <p>General questions: <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. Legal and formal notices: <a href="mailto:admin@myekie.com" className="text-green font-medium">admin@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Acceptation</h2>
      <p>En créant un compte ou en utilisant Ékié, vous acceptez ces Conditions d&apos;utilisation. Si vous n&apos;êtes pas d&apos;accord, veuillez ne pas utiliser le service.</p>

      <h2>2. Qui peut utiliser Ékié</h2>
      <ul>
        <li>Vous devez avoir 18 ans ou plus.</li>
        <li>Vous devez fournir des informations exactes lors de la création de votre compte et les maintenir à jour.</li>
        <li>Les commerçants et prestataires de services doivent être légalement autorisés à exploiter une entreprise au Cameroun ou dans le pays où ils offrent leurs services via notre plateforme.</li>
        <li>Si vous ajoutez des bénéficiaires (enfants, membres de la famille, étudiants), vous devez avoir le droit d&apos;agir en leur nom pour la transaction en question.</li>
      </ul>

      <h2>3. À propos d&apos;Ékié</h2>
      <p>Ékié est une plateforme de coordination de paiements et d&apos;orchestration non-dépositaire. Nous aidons les expéditeurs à payer directement des bénéficiaires vérifiés pour des résultats spécifiques (frais de scolarité, alimentation, réservations, matériaux de construction, pharmacie) et aidons les familles à coordonner les contributions via les Cercles de Soin. Ékié est exploité par EKIE LTD (Yaoundé, Cameroun, D-U-N-S 369982596).</p>
      <p><strong>Important : Ékié ne détient jamais les fonds des utilisateurs.</strong> Les fonds passent de vous, via les processeurs de paiement agréés, vers le compte du destinataire. Pour les contributions Akao, les fonds sont détenus par un partenaire institutionnel financier agréé, et non par Ékié.</p>

      <h2>4. Votre compte</h2>
      <p>Vous êtes responsable de :</p>
      <ul>
        <li>Garder vos identifiants de connexion (PIN, biométrie, numéro de téléphone) sécurisés</li>
        <li>Toute activité sur votre compte</li>
        <li>Fournir des informations exactes et les mettre à jour lorsqu&apos;elles changent</li>
        <li>Toutes les données de bénéficiaires que vous fournissez</li>
      </ul>

      <h2>5. Fonctionnalités</h2>
      <p><strong>Frais de scolarité.</strong> Vous payez directement à une école vérifiée les frais de scolarité ou associés d&apos;un étudiant nommé. Les fonds vont à l&apos;école, pas à Ékié.</p>
      <p><strong>Skip the Queue (Éviter la file).</strong> Vous prépayez un commerçant vérifié pour un article ou un service spécifique ; le commerçant confirme par une photo lors du retrait. Votre achat est terminé lorsque le retrait est confirmé.</p>
      <p><strong>Réservations.</strong> Vous réservez des services (voyage, santé, services à domicile, gâteaux, tables et plus) via des prestataires vérifiés. Les conditions spécifiques à chaque réservation sont définies par le prestataire.</p>
      <p><strong>Marketplace.</strong> Vous achetez auprès de commerçants sélectionnés. Chaque commerçant est responsable de ses propres produits, descriptions, prix et livraison. Ékié fournit la couche de découverte et de paiement.</p>
      <p><strong>Akao.</strong> Une fonctionnalité de contribution quotidienne. Les fonds que vous contribuez sont détenus par un partenaire institutionnel financier agréé, et non par Ékié. Vous pouvez retirer les contributions conformément aux conditions du plan. Ékié n&apos;est pas une banque, n&apos;est pas agréé pour accepter des dépôts, et ne verse pas d&apos;intérêts.</p>
      <p><strong>Cercles de Soin.</strong> Vous et d&apos;autres membres coordonnez des contributions partagées envers un bénéficiaire. Chaque membre est responsable de sa propre contribution. Ékié fournit uniquement la couche de coordination et de suivi.</p>
      <p><strong>Commerçants et écoles.</strong> Les commerçants, prestataires de services et partenaires scolaires sont également soumis à un Contrat Commerçant ou à un Accord de Partenariat Scolaire distinct lors de l&apos;intégration, qui couvre les conditions commerciales spécifiques, y compris les calendriers de versement, les niveaux de service et le traitement des données dans les portails des commerçants et des écoles.</p>

      <h2>6. Paiements et frais</h2>
      <p>Les paiements sont traités par <strong>CinetPay</strong> (pour le mobile money au Cameroun &mdash; <strong>MTN Mobile Money</strong> et <strong>Orange Money</strong>), <strong>dLocal</strong>, et <strong>Kora</strong> (pour les paiements internationaux par carte et les versements transfrontaliers). Les frais propres à Ékié sont divulgués lors du paiement et sur notre page de tarification.</p>
      <p>Les remboursements dépendent de la politique de remboursement du commerçant ou du prestataire. Pour les litiges, voir §9.</p>

      <h2>7. Utilisation acceptable</h2>
      <p>Vous ne pouvez pas :</p>
      <ul>
        <li>Utiliser Ékié pour toute activité illégale, y compris le blanchiment d&apos;argent ou le financement du terrorisme</li>
        <li>Publier du contenu faux, trompeur ou nuisible</li>
        <li>Vous faire passer pour une personne ou une organisation</li>
        <li>Créer plusieurs comptes pour contourner les restrictions</li>
        <li>Tenter de sonder, scanner ou violer nos systèmes</li>
        <li>Utiliser des moyens automatisés (bots, scrapers) pour accéder au service sans autorisation écrite</li>
        <li>Harceler, menacer ou exploiter d&apos;autres utilisateurs</li>
      </ul>

      <h2>8. Suspension et résiliation</h2>
      <p>Nous pouvons suspendre ou fermer les comptes qui :</p>
      <ul>
        <li>Violent ces Conditions</li>
        <li>Sont soupçonnés de fraude, d&apos;abus ou de blanchiment d&apos;argent</li>
        <li>Posent un risque pour les autres utilisateurs ou pour la plateforme</li>
        <li>Sont restés inactifs pendant de longues périodes (nous vous informerons au préalable dans la mesure du possible)</li>
      </ul>
      <p>Vous pouvez fermer votre compte à tout moment ; consultez notre Politique de confidentialité pour la durée de conservation des données après fermeture.</p>

      <h2>9. Résolution des litiges</h2>
      <p>Si vous avez un litige :</p>
      <ol className="list-decimal pl-6 space-y-1.5 my-3 text-[15px] leading-relaxed">
        <li>Contactez d&apos;abord le commerçant ou le prestataire directement via l&apos;application.</li>
        <li>Si non résolu, contactez Ékié à <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a> ; nous essaierons de médier dans un délai de 15 jours ouvrables.</li>
        <li>Si toujours non résolu, les litiges sont soumis aux tribunaux de Yaoundé, Cameroun.</li>
      </ol>

      <h2>10. Limitation de responsabilité</h2>
      <p>Ékié fournit la plateforme « telle quelle ». Dans toute la mesure permise par la loi, Ékié n&apos;est responsable que des dommages <strong>directement causés par la négligence ou la faute intentionnelle d&apos;Ékié</strong>.</p>
      <p><strong>Nous ne sommes pas responsables de :</strong></p>
      <ul>
        <li>Fraude, non-livraison, inconduite ou problèmes de qualité imputables aux commerçants, prestataires de services, écoles ou autres utilisateurs</li>
        <li>Défaillance, dysfonctionnement ou retard des réseaux mobiles, des passerelles SMS, de la connectivité Internet ou des processeurs de paiement tiers (y compris CinetPay, dLocal, Kora et autres)</li>
        <li>Pertes résultant du partage de votre PIN, biométrie, téléphone, appareil ou identifiants de connexion avec toute personne</li>
        <li>Événements de force majeure (catastrophes naturelles, grèves, pandémies, action gouvernementale, guerre)</li>
        <li>Changements réglementaires hors du contrôle d&apos;Ékié</li>
        <li>Fluctuations monétaires, mouvements de taux de change ou inflation</li>
        <li>Dommages indirects, accessoires, consécutifs ou punitifs ; perte de profits, de données, de clientèle ou d&apos;opportunité</li>
      </ul>
      <p>Lorsque nous sommes responsables, notre responsabilité totale pour toute réclamation est limitée au <strong>plus élevé</strong> de : (a) les frais que vous avez payés à Ékié dans les 12 mois précédant l&apos;incident, ou (b) <strong>500 000 F CFA (environ 850 $US)</strong>.</p>
      <p><strong>Processus de réclamation.</strong> Les réclamations doivent être faites par écrit à <a href="mailto:support@myekie.com" className="text-green font-medium">support@myekie.com</a> dans les <strong>30 jours</strong> suivant l&apos;incident, avec des détails spécifiques, des preuves à l&apos;appui et le montant réclamé. Vous assumez la charge de prouver la perte et qu&apos;elle a été directement causée par Ékié. Les réclamations ne répondant pas à ces exigences ne seront pas prises en compte.</p>
      <p><strong>Pas d&apos;actions collectives.</strong> Chaque réclamation doit être intentée individuellement. Aucune réclamation agrégée ou collective n&apos;est autorisée.</p>
      <p><strong>Réclamations de mauvaise foi.</strong> Ékié se réserve le droit de suspendre ou de fermer les comptes des utilisateurs qui déposent à plusieurs reprises des réclamations non fondées ou agissent de mauvaise foi.</p>

      <h2>11. Droit applicable</h2>
      <p>Ces Conditions sont régies par les lois de la République du Cameroun. Les litiges sont soumis aux tribunaux de Yaoundé, Cameroun.</p>

      <h2>12. Modifications de ces Conditions</h2>
      <p>Nous pouvons mettre à jour ces Conditions. Les modifications importantes seront communiquées dans l&apos;application et par e-mail au moins 30 jours avant leur entrée en vigueur, dans la mesure du possible. Votre utilisation continue d&apos;Ékié après la date d&apos;entrée en vigueur constitue une acceptation.</p>

      <h2>13. Contact</h2>
      <p>Questions générales : <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. Avis légaux et formels : <a href="mailto:admin@myekie.com" className="text-green font-medium">admin@myekie.com</a>.</p>
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
