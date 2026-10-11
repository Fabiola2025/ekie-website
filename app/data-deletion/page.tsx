'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useLang } from '@/lib/LanguageProvider';

export default function DataDeletionPage() {
  const { lang } = useLang();

  const en = (
    <>
      <h2>1. How to request deletion</h2>
      <p>To delete your Ékié account and the personal data associated with it, send an email to <a href="mailto:hello@myekie.com?subject=Account%20Deletion%20Request" className="text-green font-medium">hello@myekie.com</a> with the subject line <strong>&quot;Account Deletion Request.&quot;</strong></p>
      <p>Please include in the email:</p>
      <ul>
        <li>The phone number or email address registered on your Ékié account</li>
        <li>Your full name as it appears on the account</li>
        <li>A brief confirmation that you want your account permanently closed</li>
      </ul>
      <p>We will verify your identity before processing the request. Verification helps protect you from someone else requesting your deletion.</p>

      <h2>2. What gets deleted</h2>
      <p>Within 30 days of a verified request, we delete:</p>
      <ul>
        <li>Your name, email, phone number, and profile photo</li>
        <li>Your PIN hash and biometric indicator</li>
        <li>Beneficiary data you added (children for school fees, Care Circle members)</li>
        <li>Push notification tokens linked to your account</li>
        <li>Your mobile money number and KYC documents (ID, selfie, source-of-funds documentation)</li>
      </ul>

      <h2>3. What is retained for legal reasons</h2>
      <p>Cameroonian financial-services law requires us to retain certain records for a minimum period, even after account closure:</p>
      <ul>
        <li><strong>Transaction records</strong> &mdash; at least 10 years. These are kept in archived form, de-identified from your profile where possible, as required by financial record-keeping rules.</li>
        <li><strong>Fraud and compliance records</strong> &mdash; retained for as long as required by applicable law and regulatory authorities.</li>
        <li><strong>Dispute records</strong> &mdash; retained for the duration of any open dispute plus the applicable statute of limitations.</li>
      </ul>
      <p>After the legal retention period expires, these records are permanently deleted.</p>

      <h2>4. Timeline</h2>
      <ul>
        <li><strong>Within 2 business days</strong>: we acknowledge your request by email</li>
        <li><strong>Within 7 business days</strong>: we verify your identity</li>
        <li><strong>Within 30 days</strong>: deletion is complete for all data not subject to legal retention</li>
      </ul>

      <h2>5. Before you delete</h2>
      <p>Please note that account deletion is permanent and cannot be undone. Once deleted:</p>
      <ul>
        <li>You will lose access to your transaction history and receipts</li>
        <li>Any pending Akao contributions should be withdrawn beforehand</li>
        <li>Any active Care Circles you created will be transferred to another member or dissolved</li>
        <li>If you re-register later, it will be as a new account; previous data cannot be restored</li>
      </ul>

      <h2>6. Alternative: close without full deletion</h2>
      <p>If you&apos;d prefer to simply pause your account rather than delete it permanently, email us at <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a> with the subject line <strong>&quot;Suspend Account.&quot;</strong> We&apos;ll close login access while retaining your historical data in case you want to return.</p>

      <h2>7. Questions</h2>
      <p>For questions about this process, data retention, or your rights under Cameroonian data protection law, see our <a href="/privacy" className="text-green font-medium">Privacy Policy</a> &sect;7 (Your rights) or contact <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  const fr = (
    <>
      <h2>1. Comment demander la suppression</h2>
      <p>Pour supprimer votre compte Ékié et les données personnelles qui y sont associées, envoyez un e-mail à <a href="mailto:hello@myekie.com?subject=Demande%20de%20suppression%20de%20compte" className="text-green font-medium">hello@myekie.com</a> avec l&apos;objet <strong>« Demande de suppression de compte ».</strong></p>
      <p>Veuillez inclure dans l&apos;e-mail :</p>
      <ul>
        <li>Le numéro de téléphone ou l&apos;adresse e-mail enregistré sur votre compte Ékié</li>
        <li>Votre nom complet tel qu&apos;il apparaît sur le compte</li>
        <li>Une brève confirmation que vous souhaitez fermer votre compte de manière permanente</li>
      </ul>
      <p>Nous vérifierons votre identité avant de traiter la demande. La vérification vous protège contre une suppression demandée par quelqu&apos;un d&apos;autre.</p>

      <h2>2. Ce qui est supprimé</h2>
      <p>Dans un délai de 30 jours suivant une demande vérifiée, nous supprimons :</p>
      <ul>
        <li>Votre nom, e-mail, numéro de téléphone et photo de profil</li>
        <li>Le hachage de votre PIN et votre indicateur biométrique</li>
        <li>Les données des bénéficiaires que vous avez ajoutés (enfants pour les frais de scolarité, membres de Cercle de Soin)</li>
        <li>Les jetons de notification push liés à votre compte</li>
        <li>Votre numéro de mobile money et vos documents KYC (pièce d&apos;identité, selfie, documentation sur la source des fonds)</li>
      </ul>

      <h2>3. Ce qui est conservé pour des raisons légales</h2>
      <p>La loi camerounaise sur les services financiers exige que nous conservions certains dossiers pendant une période minimale, même après la clôture du compte :</p>
      <ul>
        <li><strong>Enregistrements de transactions</strong> &mdash; au moins 10 ans. Ils sont conservés sous forme archivée, dépersonnalisés dans la mesure du possible, conformément aux règles de conservation des dossiers financiers.</li>
        <li><strong>Dossiers de fraude et de conformité</strong> &mdash; conservés aussi longtemps que requis par la loi applicable et les autorités réglementaires.</li>
        <li><strong>Dossiers de litige</strong> &mdash; conservés pendant la durée de tout litige ouvert plus le délai de prescription applicable.</li>
      </ul>
      <p>Après l&apos;expiration de la période de conservation légale, ces dossiers sont définitivement supprimés.</p>

      <h2>4. Délai</h2>
      <ul>
        <li><strong>Dans un délai de 2 jours ouvrables</strong> : nous accusons réception de votre demande par e-mail</li>
        <li><strong>Dans un délai de 7 jours ouvrables</strong> : nous vérifions votre identité</li>
        <li><strong>Dans un délai de 30 jours</strong> : la suppression est complète pour toutes les données non soumises à conservation légale</li>
      </ul>

      <h2>5. Avant de supprimer</h2>
      <p>Veuillez noter que la suppression du compte est permanente et ne peut pas être annulée. Une fois supprimé :</p>
      <ul>
        <li>Vous perdrez l&apos;accès à votre historique de transactions et à vos reçus</li>
        <li>Toute contribution Akao en attente doit être retirée au préalable</li>
        <li>Tout Cercle de Soin actif que vous avez créé sera transféré à un autre membre ou dissous</li>
        <li>Si vous vous inscrivez à nouveau plus tard, ce sera un nouveau compte ; les données précédentes ne peuvent pas être restaurées</li>
      </ul>

      <h2>6. Alternative : fermer sans suppression complète</h2>
      <p>Si vous préférez simplement suspendre votre compte plutôt que de le supprimer définitivement, envoyez-nous un e-mail à <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a> avec l&apos;objet <strong>« Suspendre le compte ».</strong> Nous fermerons l&apos;accès de connexion tout en conservant vos données historiques au cas où vous souhaiteriez revenir.</p>

      <h2>7. Questions</h2>
      <p>Pour toute question sur ce processus, la conservation des données ou vos droits en vertu de la loi camerounaise sur la protection des données, consultez notre <a href="/privacy" className="text-green font-medium">Politique de confidentialité</a> &sect;7 (Vos droits) ou contactez <a href="mailto:hello@myekie.com" className="text-green font-medium">hello@myekie.com</a>.</p>
    </>
  );

  return (
    <>
      <Nav />
      <article className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="font-display text-4xl md:text-5xl font-black text-green mb-2">
            {lang === 'fr' ? 'Suppression de compte' : 'Account Deletion'}
          </h1>
          <p className="text-sm text-muted mb-10">
            {lang === 'fr' ? 'Dernière mise à jour : octobre 2026' : 'Last updated: October 2026'}
          </p>
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
