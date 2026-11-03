import React from 'react';
import { Link } from 'react-router-dom';
import {} from './ui';

const Shell: React.FC<{ eyebrow: string; title?: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <section className="py-16 lg:py-24 bg-[#F3F1F8]">
    <div className="max-w-[860px] mx-auto px-6 lg:px-12">
      {title && (
        <h1 className="font-bricolage font-bold text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1] tracking-[-0.015em] text-[#15173D]">
          {title}
        </h1>
      )}
      <div className="mt-8 space-y-4 font-atkinson text-[1.05rem] leading-[1.7] text-[#15173D]/90">{children}</div>
    </div>
  </section>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bricolage font-semibold text-[1.4rem] text-[#15173D] pt-6">{children}</h2>
);

const Ul = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc pl-6 space-y-1">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

const DATA_ROWS: [string, string, string, string][] = [
  ['Vous visitez le site', 'Pages consultées, type d\'appareil, adresse IP tronquée', 'Mesurer l\'audience et améliorer le site', 'Votre consentement (cookies de mesure)'],
  ['Vous faites un test d\'auto-évaluation', 'Votre score, l\'interprétation et la date, sans nom ni numéro de téléphone', 'Vous afficher votre résultat ; établir des statistiques anonymes', 'Votre consentement'],
  ['Vous choisissez d\'envoyer votre résultat sur WhatsApp', 'Votre numéro WhatsApp et le message que vous envoyez (qui contient votre résultat)', 'Vous répondre avec une analyse détaillée et vous proposer un premier échange', 'Votre consentement explicite : c\'est vous qui envoyez le message'],
  ['Vous nous écrivez (WhatsApp, e-mail, formulaire)', 'Nom, prénom, e-mail, téléphone, message', 'Vous répondre et organiser votre appel découverte', 'Votre demande (mesures précontractuelles)'],
  ['Vous commentez un article', 'Prénom, pseudonyme ou « Aiglon anonyme », commentaire, date', 'Publier votre commentaire', 'Votre consentement'],
  ['Vous achetez un programme ou le livre', 'Nom, coordonnées, commande', 'Exécuter votre commande', 'Le contrat'],
];

export const PrivacyPage: React.FC = () => (
  <Shell eyebrow="Politique de confidentialité" title="Vos données, et ce que nous en faisons">
    <p className="text-[#5A5D7E]">Dernière mise à jour : 14/10/2026</p>

    <H>1. Qui est responsable de vos données ?</H>
    <p>
      Le site psygbevimi.com est édité par l'initiative Psy Gbevimi représentée par GBÈVIMI Cécil Fortuné HOUENON
      psychologue clinicien, psychothérapeute. Psy Gbevimi est le responsable du traitement de vos données personnelles.
    </p>
    <p>Contact : psygbevimi@gmail.com · +229 01 29 23 12 12 (téléphone et WhatsApp).</p>
    <p>
      Vos données sont traitées conformément à la loi n° 2017-20 du 20 avril 2018 portant Code du numérique en
      République du Bénin, notamment son Livre V relatif à la protection des données à caractère personnel, telle que
      modifiée par la loi n° 2020-35 du 6 janvier 2021.
    </p>

    <H>2. Quelles données collectons-nous, et pourquoi ?</H>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[15px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#15173D]/20 font-bricolage">
            <th className="py-2 pr-4">Quand</th>
            <th className="py-2 pr-4">Données</th>
            <th className="py-2 pr-4">Pourquoi</th>
            <th className="py-2">Sur quelle base</th>
          </tr>
        </thead>
        <tbody>
          {DATA_ROWS.map((row) => (
            <tr key={row[0]} className="border-b border-[#15173D]/10 align-top">
              {row.map((cell, i) => (
                <td key={i} className="py-3 pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <H>3. Données de santé</H>
    <p>
      Les réponses aux tests et les informations que vous partagez sur votre bien-être sont des données relatives à la
      santé, que la loi considère comme sensibles. Nous les traitons uniquement avec votre consentement explicite. Seuls
      les membres de l'équipe habilités, tenus au secret professionnel ou à une obligation de confidentialité, y ont accès.
    </p>
    <p>
      Ces données ne sont jamais vendues, jamais utilisées à des fins publicitaires et jamais transmises à votre
      employeur, à votre famille ou à un tiers sans votre accord, sauf obligation légale. Les tests en ligne ne
      constituent pas un diagnostic médical.
    </p>

    <H>4. Qui peut accéder à vos données ?</H>
    <p>
      Vos données sont destinées à Psy Gbevimi et, selon leurs missions, aux seuls membres habilités de son équipe.
      Certains prestataires techniques les traitent pour notre compte, sans pouvoir les utiliser à leurs propres fins :
    </p>
    <Ul
      items={[
        'Hébergement du site : Vercel Inc., États-Unis',
        'Hébergement de la base de données et de l\'API : YOUPIHOST, Womey, Bénin',
        'Messagerie : WhatsApp (Meta Platforms)',
        'Vente en ligne et paiement : Chariow et les opérateurs de paiement',
        'Vidéos : YouTube (Google)',
      ]}
    />

    <H>5. Transferts hors du Bénin</H>
    <p>
      Certains de ces prestataires sont situés hors du Bénin. Ces transferts ne sont réalisés que vers des pays ou des
      prestataires offrant un niveau de protection suffisant, ou avec les garanties et autorisations exigées par le Code
      du numérique et l'Autorité de Protection des Données à caractère Personnel (APDP).
    </p>

    <H>6. Combien de temps les conservons-nous ?</H>
    <Ul
      items={[
        'Résultats de tests anonymes : 36 mois, puis uniquement sous forme de statistiques globales.',
        'Demandes de contact sans suite : 12 mois.',
        'Commentaires : tant que l\'article est en ligne.',
      ]}
    />

    <H>7. Vos droits</H>
    <p>Conformément au Code du numérique, vous pouvez :</p>
    <Ul
      items={[
        'être informé·e de l\'utilisation de vos données, comme dans cette politique ;',
        'y accéder et en obtenir une copie ;',
        'les faire rectifier, compléter ou mettre à jour ;',
        'les faire supprimer ou verrouiller ;',
        'vous opposer à leur traitement, notamment à toute prospection ;',
        'retirer votre consentement à tout moment, sans remettre en cause les traitements déjà effectués.',
      ]}
    />
    <p>
      Pour exercer ces droits, écrivez à psygbevimi@gmail.com ou sur WhatsApp au +229 01 29 23 12 12. Nous pourrons vous
      demander de justifier de votre identité. Nous répondons dans les meilleurs délais et au plus tard dans 72 heures
      ouvrables.
    </p>
    <p>
      Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l'Autorité de Protection des Données à
      caractère Personnel (APDP), Cotonou, apdp.bj
    </p>

    <H>8. Mineurs</H>
    <p>
      Les tests et programmes destinés aux jeunes peuvent être consultés par des mineurs. Nous ne collectons pas
      sciemment les coordonnées d'un mineur sans l'accord de son parent ou représentant légal. Si vous êtes parent et
      pensez que votre enfant nous a transmis des données, contactez-nous pour les faire supprimer.
    </p>

    <H>9. Cookies</H>
    <p>
      Le site utilise des cookies nécessaires à son fonctionnement et à l'espace d'administration. Les cookies de mesure
      d'audience ne sont déposés qu'avec votre accord. Les vidéos YouTube s'ouvrent sur YouTube.
    </p>

    <H>10. Sécurité</H>
    <p>
      Nous protégeons vos données par une connexion chiffrée (HTTPS) et un accès à l'administration réservé et protégé.
      Nous ne collectons que les données nécessaires. En cas de violation de données susceptible de porter atteinte à vos
      droits, nous informerons l'APDP et les personnes concernées conformément à la loi.
    </p>

    <H>11. Formalités</H>

    <H>12. Modifications</H>
    <p>
      Nous pouvons mettre à jour cette politique. La date de dernière mise à jour figure en haut de la page. En cas de
      changement important, nous vous en informerons sur le site.
    </p>
  </Shell>
);

export const LegalNoticePage: React.FC = () => (
  <Shell eyebrow="Mentions légales" title="Qui édite ce site">
    <H>Éditeur</H>
    <p>Fortuné HOUENON, Psychologue clinicien Abomey-Calavi, République du Bénin.</p>
    <p>Contact : psygbevimi@gmail.com · +229 01 29 23 12 12</p>

    <H>Hébergement</H>
    <p>Site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
    <p>API et base de données : Youpihost, Womey, Bénin</p>

    <H>Propriété intellectuelle</H>
    <p>
      Les textes, images, vidéos, le logo et le livre « Accédez au bonheur authentique » présentés sur ce site sont
      protégés. Toute reproduction sans autorisation écrite de Psy Gbevimi est interdite.
    </p>

    <H>Données personnelles</H>
    <p>
      Voir notre{' '}
      <Link to="/confidentialite" className="underline">
        politique de confidentialité
      </Link>
      .
    </p>
  </Shell>
);

export const TermsPage: React.FC = () => (
  <Shell eyebrow="Conditions générales d'utilisation" title="Règles d'utilisation du site">
    <p className="text-[#5A5D7E]">Dernière mise à jour : 02/11/2026</p>

    <H>1. Objet</H>
    <p>
      Les présentes conditions encadrent l'utilisation du site psygbevimi.com, édité par l'initiative Psy Gbevimi.
      En naviguant sur le site, vous les acceptez. Si vous ne les acceptez pas, merci de ne pas utiliser le site.
    </p>

    <H>2. Ce que propose le site</H>
    <Ul
      items={[
        'des informations sur l\'initiative, ses accompagnements et son équipe ;',
        'des articles et des vidéos sur le bien-être et la santé mentale ;',
        'des tests gratuits d\'auto-évaluation ;',
        'la possibilité de réserver un appel découverte ou de nous écrire, notamment sur WhatsApp ;',
        'la présentation du livre « Accédez au bonheur authentique ».',
      ]}
    />

    <H>3. Un contenu informatif, pas un soin</H>
    <p>
      Les contenus du site et les résultats des tests sont donnés à titre d'information et d'auto-évaluation. Ils ne
      constituent ni un diagnostic, ni un avis médical, ni un traitement, et ne remplacent pas une consultation avec un
      professionnel de santé.
    </p>
    <p>
      En cas de détresse intense, de pensées de mettre fin à vos jours ou de danger pour vous ou pour quelqu'un d'autre,
      contactez sans attendre les services d'urgence de votre pays.
    </p>

    <H>4. Tests d'auto-évaluation</H>
    <p>
      Les tests sont gratuits et facultatifs. Vos réponses doivent refléter votre situation réelle pour que le résultat
      soit utile. Le résultat est une indication, pas une conclusion. Si vous choisissez de nous l'envoyer sur WhatsApp,
      vous le faites de votre propre initiative et nous le traitons selon notre{' '}
      <Link to="/confidentialite" className="underline">
        politique de confidentialité
      </Link>
      .
    </p>

    <H>5. Rendez-vous et accompagnements</H>
    <p>
      La réservation d'un appel découverte se fait par WhatsApp ou par les moyens de contact indiqués sur le site. Les
      conditions d'un accompagnement (format, durée, tarif, modalités d'annulation) vous sont communiquées avant son
      début et sont acceptées par vous avant toute séance.
    </p>

    <H>6. Achats</H>
    <p>
      Les achats en ligne, comme le livre ou certains programmes, passent par notre prestataire de vente et de paiement.
      Les prix et conditions sont affichés au moment de la commande.
    </p>

    <H>7. Commentaires et messages</H>
    <p>
      Si vous commentez un article ou nous écrivez, vous vous engagez à rester respectueux·se et à ne publier ni propos
      injurieux, discriminatoires ou diffamatoires, ni information personnelle concernant un tiers. Nous pouvons retirer
      tout commentaire contraire à ces règles.
    </p>

    <H>8. Propriété intellectuelle</H>
    <p>
      Les textes, images, vidéos, le logo et le livre présentés sur le site sont protégés. Vous pouvez les consulter et
      en partager un court extrait en citant la source. Toute autre reproduction ou réutilisation nécessite notre
      autorisation écrite.
    </p>

    <H>9. Liens et services tiers</H>
    <p>
      Le site renvoie vers des services tiers (WhatsApp, YouTube, plateforme de paiement). Leurs propres conditions
      s'appliquent et nous ne sommes pas responsables de leur contenu ni de leur disponibilité.
    </p>

    <H>10. Responsabilité</H>
    <p>
      Nous veillons à la qualité et à l'exactitude des informations publiées, sans pouvoir garantir l'absence d'erreur
      ou une disponibilité continue du site. Nous ne pouvons être tenus responsables de l'usage que vous faites des
      contenus du site, ni d'une interruption due à un incident technique.
    </p>

    <H>11. Données personnelles</H>
    <p>
      Le traitement de vos données est décrit dans notre{' '}
      <Link to="/confidentialite" className="underline">
        politique de confidentialité
      </Link>{' '}
      et dans la page{' '}
      <Link to="/rgpd" className="underline">
        protection des données
      </Link>
      .
    </p>

    <H>12. Droit applicable</H>
    <p>
      Les présentes conditions sont soumises au droit béninois. En cas de litige, nous privilégions d'abord une
      solution amiable. À défaut, les tribunaux compétents du Bénin seront saisis.
    </p>

    <H>13. Modifications et contact</H>
    <p>
      Nous pouvons modifier ces conditions. La date de dernière mise à jour figure en haut de la page. Pour toute
      question : psygbevimi@gmail.com ou +229 01 29 23 12 12.
    </p>
  </Shell>
);

export const GdprPage: React.FC = () => (
  <Shell eyebrow="Protection des données (RGPD)" title="Vos droits sur vos données">
    <p className="text-[#5A5D7E]">Dernière mise à jour : 02/11/2026</p>

    <p>
      Cette page résume vos droits et la manière de les exercer. Elle complète notre{' '}
      <Link to="/confidentialite" className="underline">
        politique de confidentialité
      </Link>
      , qui détaille les données collectées, leur durée de conservation et nos prestataires.
    </p>

    <H>Le cadre qui s'applique</H>
    <p>
      Psy Gbevimi est basé au Bénin. Vos données sont d'abord protégées par le Code du numérique béninois et le contrôle
      de l'Autorité de Protection des Données à caractère Personnel (APDP). Nous appliquons les mêmes principes que le
      Règlement général sur la protection des données (RGPD) européen : finalité précise, minimisation des données,
      consentement, sécurité et respect de vos droits. Ils valent pour tous nos visiteurs, y compris ceux qui se
      trouvent dans l'Union européenne.
    </p>

    <H>Nos engagements</H>
    <Ul
      items={[
        'nous ne collectons que les données utiles à votre demande ;',
        'nous demandons votre consentement explicite pour les données de santé, comme les résultats de tests ;',
        'nous ne vendons jamais vos données et ne les utilisons pas à des fins publicitaires ;',
        'nous limitons l\'accès aux membres de l\'équipe habilités, tenus à la confidentialité ;',
        'nous conservons vos données uniquement le temps nécessaire.',
      ]}
    />

    <H>Vos droits</H>
    <Ul
      items={[
        'droit d\'accès : savoir quelles données nous détenons sur vous et en recevoir une copie ;',
        'droit de rectification : corriger ou compléter des données inexactes ;',
        'droit à l\'effacement : demander la suppression de vos données ;',
        'droit à la limitation : demander que vos données soient gelées le temps d\'une vérification ;',
        'droit d\'opposition : vous opposer à un traitement, notamment à toute prospection ;',
        'droit à la portabilité : recevoir vos données dans un format courant ;',
        'droit de retirer votre consentement à tout moment, sans effet sur les traitements déjà réalisés.',
      ]}
    />

    <H>Comment exercer vos droits</H>
    <p>
      Écrivez-nous à psygbevimi@gmail.com ou sur WhatsApp au +229 01 29 23 12 12 en précisant le droit que vous
      souhaitez exercer. Nous pouvons vous demander de justifier de votre identité afin de protéger vos données.
      Nous répondons dans les meilleurs délais et au plus tard dans 72 heures ouvrables.
    </p>

    <H>Réclamation</H>
    <p>
      Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l'Autorité de Protection des Données à
      caractère Personnel (APDP), Cotonou, apdp.bj. Si vous résidez dans l'Union européenne, vous pouvez aussi saisir
      l'autorité de protection des données de votre pays.
    </p>

    <H>Violation de données</H>
    <p>
      En cas de violation de données susceptible de porter atteinte à vos droits, nous informons l'APDP et les
      personnes concernées conformément à la loi.
    </p>
  </Shell>
);
