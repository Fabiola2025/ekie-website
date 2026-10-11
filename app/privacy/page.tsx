'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function PrivacyPage() {
  const { lang, t } = useLang();

  const en = (
    <>
      <h2>1. Who we are</h2>
      <p>Ékié is operated by <strong>EKIE LTD</strong>, a company registered in Yaoundé, Cameroon (D-U-N-S Number 369982596). EKIE LTD is the data controller for personal information collected through all Ékié surfaces: the Ékié mobile app, the website at myekie.com, the vendor portal, and the school portal.</p>
      <p>Contact for privacy matters: <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. For security concerns: <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a>.</p>

      <h2>2. What we collect</h2>
      <p><strong>When you create an account</strong></p>
      <ul>
        <li>Name, and either a phone number or an email address as your primary identifier (whichever you sign up with); the other may be added later as a secondary contact</li>
        <li>Profile photo (optional)</li>
        <li>Mobile money number used for transactions</li>
        <li>Location data when you grant permission</li>
        <li>Your PIN, stored only as a bcrypt hash &mdash; never in plain text</li>
        <li>A biometric indicator when you enable fingerprint or face unlock; the biometric itself never leaves your device</li>
        <li>Push notification tokens for transaction and account alerts</li>
      </ul>
      <p><strong>When you add beneficiaries</strong> (children for school fees, family members for Care Circles, students you support)</p>
      <ul>
        <li>The beneficiary&apos;s name, your relationship to them, and the information needed for the transaction (for example, a child&apos;s school, grade, and student ID). You are responsible for ensuring you have the right to share that information.</li>
      </ul>
      <p><strong>When you apply as a vendor or service provider, or request higher KYC tiers for Akao</strong></p>
      <ul>
        <li>A government-issued ID (passport, national ID, or driver&apos;s licence)</li>
        <li>A selfie for identity verification</li>
        <li>Business registration documents (for vendors)</li>
        <li>Source-of-funds documentation (for Akao Tier 3)</li>
      </ul>
      <p><strong>If you are a vendor or school administrator using our portals</strong></p>
      <ul>
        <li>Business name, registration documents, tax ID</li>
        <li>Admin name, email address, and phone number</li>
        <li>Portal login credentials (email + password hash)</li>
        <li>Bank account or MoMo number for vendor payouts</li>
        <li>Business operating details (location, hours, service categories, student roster for schools)</li>
        <li>Messages you send through the portal to customers or to Ékié</li>
      </ul>
      <p><strong>Collected automatically</strong></p>
      <ul>
        <li>Device type, operating system, app version</li>
        <li>IP address and approximate network location</li>
        <li>Usage events for product improvement and fraud prevention</li>
        <li>Your transaction history on Ékié</li>
      </ul>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To provide the Ékié service: processing payments, running Care Circles, confirming Akao contributions, verifying vendors</li>
        <li>To secure your account: fraud detection, suspicious-activity monitoring, authentication</li>
        <li>To communicate with you: transaction confirmations, security alerts, service updates</li>
        <li>To comply with legal and regulatory obligations under Cameroonian law and the laws of countries where you access the service</li>
        <li>To improve the product through anonymised usage analytics</li>
      </ul>

      <h2>4. Who we share with</h2>
      <p>We do not sell your personal data. We share with:</p>
      <ul>
        <li><strong>Payment processors</strong>: CinetPay (for mobile money in Cameroon &mdash; MTN Mobile Money and Orange Money), dLocal, and Kora (for international card payments and cross-border payouts). They collect, process and settle your transactions on our behalf.</li>
        <li><strong>Service providers and vendors you transact with</strong>: limited to what they need to fulfil your request. For example, a school receives your child&apos;s student ID when you pay school fees; a vendor sees your pickup code.</li>
        <li><strong>Care Circle members</strong>: when you join a Circle, other members can see what you contribute to that Circle.</li>
        <li><strong>Infrastructure providers</strong>: Amazon Web Services (eu-west-1, Europe) hosts our servers; your data stays in the EU region.</li>
        <li><strong>Legal and regulatory authorities</strong>: when required by Cameroonian law, by a court order, or to protect the rights, safety and property of our users or the public.</li>
      </ul>

      <h2>5. Data storage and security</h2>
      <p>Your data is stored on AWS infrastructure in Europe (eu-west-1). We use:</p>
      <ul>
        <li>TLS 1.2 or higher for data in transit</li>
        <li>AES-256 encryption at rest for our databases (AWS RDS encryption)</li>
        <li>Bcrypt hashing for PINs</li>
        <li>Platform secure storage (iOS Secure Enclave, Android Keystore) for sensitive values on your device</li>
        <li>Biometric data never leaves your device</li>
      </ul>
      <p>No system is completely secure. If we discover a breach that affects you, we will notify you promptly and in line with applicable law.</p>

      <h2>6. How long we keep your data</h2>
      <ul>
        <li><strong>Active account data</strong>: for as long as your account is open</li>
        <li><strong>Transaction records</strong>: at least 10 years, as required by Cameroonian financial-services record-keeping rules</li>
        <li><strong>Closed accounts</strong>: retained in archived form for the period required by law, then permanently deleted</li>
        <li><strong>Beneficiary data</strong>: deleted along with the account that added it, except where regulations require longer retention</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under Cameroonian law (Law No. 2010/012 on Cybersecurity and Cybercrime), the EU GDPR where applicable, and comparable frameworks, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct data that is inaccurate or incomplete</li>
        <li>Request deletion of your account and associated data, subject to the legal retention periods above</li>
        <li>Withdraw consent for non-essential processing</li>
        <li>Receive your data in a portable format</li>
        <li>Object to processing you believe is unlawful</li>
        <li>Lodge a complaint with Cameroon&apos;s <strong>ANTIC</strong> (Agence Nationale des Technologies de l&apos;Information et de la Communication) or your local data protection authority</li>
      </ul>
      <p>Exercise any of these rights by emailing <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>

      <h2>8. Beneficiaries and children</h2>
      <p>Ékié is intended for users aged 18 and over. However, our service is designed to help you support others, including minors (your children, your siblings&apos; children, students you sponsor). When you add a child as a beneficiary:</p>
      <ul>
        <li>You confirm you have the right to share their information for the purpose stated</li>
        <li>We collect only what is needed to complete the transaction</li>
        <li>The child&apos;s data is used solely for that transaction; we do not profile minors and we do not market to them</li>
        <li>You are responsible for the lawful basis under which you share a minor&apos;s data with us</li>
      </ul>
      <p>We do not knowingly let anyone under 18 create their own Ékié account.</p>

      <h2>9. International transfers</h2>
      <p>Your data is stored and processed in the EU (via AWS eu-west-1). If you access Ékié from the US, UK, EU or elsewhere, we transfer your data to the EU under appropriate safeguards and only for the purposes described in this policy.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy as the product evolves. Material changes will be communicated in-app and by email at least 30 days before taking effect, where feasible.</p>

      <h2>11. Contact us</h2>
      <p>Privacy questions: <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. Security questions or vulnerability disclosure: <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Qui sommes-nous</h2>
      <p>Ékié est exploité par <strong>EKIE LTD</strong>, une société enregistrée à Yaoundé, Cameroun (Numéro D-U-N-S 369982596). EKIE LTD est le responsable du traitement des données personnelles collectées via toutes les surfaces Ékié : l&apos;application mobile Ékié, le site Web myekie.com, le portail des commerçants et le portail des écoles.</p>
      <p>Contact pour les questions de confidentialité : <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. Pour les questions de sécurité : <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a>.</p>

      <h2>2. Ce que nous collectons</h2>
      <p><strong>Lors de la création de votre compte</strong></p>
      <ul>
        <li>Nom, et soit un numéro de téléphone, soit une adresse e-mail comme identifiant principal (selon ce avec quoi vous vous inscrivez) ; l&apos;autre peut être ajouté ultérieurement comme contact secondaire</li>
        <li>Photo de profil (facultatif)</li>
        <li>Numéro de mobile money utilisé pour les transactions</li>
        <li>Données de localisation lorsque vous accordez l&apos;autorisation</li>
        <li>Votre PIN, stocké uniquement sous forme de hachage bcrypt &mdash; jamais en clair</li>
        <li>Un indicateur biométrique lorsque vous activez le déverrouillage par empreinte digitale ou facial ; la biométrie elle-même ne quitte jamais votre appareil</li>
        <li>Jetons de notification push pour les alertes de transaction et de compte</li>
      </ul>
      <p><strong>Lorsque vous ajoutez des bénéficiaires</strong> (enfants pour les frais de scolarité, membres de la famille pour les Cercles de Soin, étudiants que vous soutenez)</p>
      <ul>
        <li>Le nom du bénéficiaire, votre relation avec lui, et les informations nécessaires à la transaction (par exemple, l&apos;école, le niveau et l&apos;identifiant d&apos;un enfant). Vous êtes responsable de vous assurer que vous avez le droit de partager ces informations.</li>
      </ul>
      <p><strong>Lorsque vous demandez un compte commerçant, prestataire de services, ou des niveaux KYC supérieurs pour Akao</strong></p>
      <ul>
        <li>Une pièce d&apos;identité émise par le gouvernement (passeport, carte nationale ou permis de conduire)</li>
        <li>Un selfie pour la vérification d&apos;identité</li>
        <li>Documents d&apos;enregistrement d&apos;entreprise (pour les commerçants)</li>
        <li>Documentation sur la source des fonds (pour Akao Niveau 3)</li>
      </ul>
      <p><strong>Si vous êtes un commerçant ou un administrateur scolaire utilisant nos portails</strong></p>
      <ul>
        <li>Nom de l&apos;entreprise, documents d&apos;enregistrement, numéro fiscal</li>
        <li>Nom, adresse e-mail et numéro de téléphone de l&apos;administrateur</li>
        <li>Identifiants de connexion au portail (e-mail + hachage de mot de passe)</li>
        <li>Compte bancaire ou numéro MoMo pour les versements aux commerçants</li>
        <li>Détails d&apos;exploitation de l&apos;entreprise (emplacement, horaires, catégories de services, liste des élèves pour les écoles)</li>
        <li>Messages que vous envoyez via le portail aux clients ou à Ékié</li>
      </ul>
      <p><strong>Collectées automatiquement</strong></p>
      <ul>
        <li>Type d&apos;appareil, système d&apos;exploitation, version de l&apos;application</li>
        <li>Adresse IP et localisation réseau approximative</li>
        <li>Événements d&apos;utilisation pour l&apos;amélioration du produit et la prévention de la fraude</li>
        <li>Votre historique de transactions sur Ékié</li>
      </ul>

      <h2>3. Comment nous utilisons vos informations</h2>
      <ul>
        <li>Pour fournir le service Ékié : traitement des paiements, gestion des Cercles de Soin, confirmation des contributions Akao, vérification des commerçants</li>
        <li>Pour sécuriser votre compte : détection de fraude, surveillance d&apos;activités suspectes, authentification</li>
        <li>Pour communiquer avec vous : confirmations de transactions, alertes de sécurité, mises à jour du service</li>
        <li>Pour respecter les obligations légales et réglementaires selon la loi camerounaise et les lois des pays depuis lesquels vous accédez au service</li>
        <li>Pour améliorer le produit grâce à des analyses d&apos;utilisation anonymisées</li>
      </ul>

      <h2>4. Avec qui nous partageons</h2>
      <p>Nous ne vendons pas vos données personnelles. Nous partageons avec :</p>
      <ul>
        <li><strong>Processeurs de paiement</strong> : CinetPay (pour le mobile money au Cameroun &mdash; MTN Mobile Money et Orange Money), dLocal, et Kora (pour les paiements internationaux par carte et les versements transfrontaliers). Ils collectent, traitent et règlent vos transactions en notre nom.</li>
        <li><strong>Prestataires de services et commerçants avec qui vous effectuez des transactions</strong> : limité à ce dont ils ont besoin pour satisfaire votre demande. Par exemple, une école reçoit l&apos;identifiant d&apos;étudiant de votre enfant lorsque vous payez les frais de scolarité ; un commerçant voit votre code de retrait.</li>
        <li><strong>Membres du Cercle de Soin</strong> : lorsque vous rejoignez un Cercle, les autres membres peuvent voir ce que vous contribuez à ce Cercle.</li>
        <li><strong>Fournisseurs d&apos;infrastructure</strong> : Amazon Web Services (eu-west-1, Europe) héberge nos serveurs ; vos données restent dans la région UE.</li>
        <li><strong>Autorités légales et réglementaires</strong> : lorsque requis par la loi camerounaise, par ordonnance du tribunal, ou pour protéger les droits, la sécurité et la propriété de nos utilisateurs ou du public.</li>
      </ul>

      <h2>5. Stockage et sécurité des données</h2>
      <p>Vos données sont stockées sur l&apos;infrastructure AWS en Europe (eu-west-1). Nous utilisons :</p>
      <ul>
        <li>TLS 1.2 ou supérieur pour les données en transit</li>
        <li>Chiffrement AES-256 au repos pour nos bases de données (chiffrement AWS RDS)</li>
        <li>Hachage bcrypt pour les PIN</li>
        <li>Stockage sécurisé natif (iOS Secure Enclave, Android Keystore) pour les valeurs sensibles sur votre appareil</li>
        <li>Les données biométriques ne quittent jamais votre appareil</li>
      </ul>
      <p>Aucun système n&apos;est totalement sécurisé. Si nous découvrons une violation qui vous affecte, nous vous en informerons rapidement et conformément à la loi applicable.</p>

      <h2>6. Durée de conservation de vos données</h2>
      <ul>
        <li><strong>Données du compte actif</strong> : tant que votre compte est ouvert</li>
        <li><strong>Enregistrements de transactions</strong> : au moins 10 ans, comme l&apos;exigent les règles camerounaises de conservation des enregistrements des services financiers</li>
        <li><strong>Comptes fermés</strong> : conservés sous forme archivée pour la période requise par la loi, puis définitivement supprimés</li>
        <li><strong>Données de bénéficiaires</strong> : supprimées en même temps que le compte qui les a ajoutées, sauf si les réglementations exigent une conservation plus longue</li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>En vertu de la loi camerounaise (Loi n° 2010/012 sur la cybersécurité et la cybercriminalité), du RGPD de l&apos;UE lorsqu&apos;applicable, et des cadres comparables, vous avez le droit de :</p>
      <ul>
        <li>Accéder aux données personnelles que nous détenons sur vous</li>
        <li>Corriger les données inexactes ou incomplètes</li>
        <li>Demander la suppression de votre compte et des données associées, sous réserve des périodes de conservation légales ci-dessus</li>
        <li>Retirer votre consentement pour le traitement non essentiel</li>
        <li>Recevoir vos données dans un format portable</li>
        <li>Vous opposer à tout traitement que vous estimez illégal</li>
        <li>Déposer une plainte auprès de l&apos;<strong>ANTIC</strong> (Agence Nationale des Technologies de l&apos;Information et de la Communication) du Cameroun ou de votre autorité locale de protection des données</li>
      </ul>
      <p>Exercez l&apos;un de ces droits en envoyant un e-mail à <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>

      <h2>8. Bénéficiaires et enfants</h2>
      <p>Ékié est destiné aux utilisateurs âgés de 18 ans et plus. Cependant, notre service est conçu pour vous aider à soutenir d&apos;autres personnes, y compris des mineurs (vos enfants, les enfants de vos frères et sœurs, les étudiants que vous parrainez). Lorsque vous ajoutez un enfant comme bénéficiaire :</p>
      <ul>
        <li>Vous confirmez que vous avez le droit de partager ses informations dans le but indiqué</li>
        <li>Nous collectons uniquement ce qui est nécessaire pour compléter la transaction</li>
        <li>Les données de l&apos;enfant sont utilisées uniquement pour cette transaction ; nous ne profilons pas les mineurs et ne leur faisons pas de marketing</li>
        <li>Vous êtes responsable de la base légale selon laquelle vous partagez les données d&apos;un mineur avec nous</li>
      </ul>
      <p>Nous ne permettons pas sciemment à toute personne de moins de 18 ans de créer son propre compte Ékié.</p>

      <h2>9. Transferts internationaux</h2>
      <p>Vos données sont stockées et traitées dans l&apos;UE (via AWS eu-west-1). Si vous accédez à Ékié depuis les États-Unis, le Royaume-Uni, l&apos;UE ou ailleurs, nous transférons vos données vers l&apos;UE sous des garanties appropriées et uniquement aux fins décrites dans cette politique.</p>

      <h2>10. Modifications de cette politique</h2>
      <p>Nous pouvons mettre à jour cette politique à mesure que le produit évolue. Les modifications importantes seront communiquées dans l&apos;application et par e-mail au moins 30 jours avant leur entrée en vigueur, dans la mesure du possible.</p>

      <h2>11. Nous contacter</h2>
      <p>Questions de confidentialité : <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>. Questions de sécurité ou divulgation de vulnérabilité : <a href="mailto:security@myekie.com" className="text-green font-medium">security@myekie.com</a>.</p>
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
