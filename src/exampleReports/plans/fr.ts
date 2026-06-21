import type { BusinessKitPlan } from '../../businessKit';

/** Public sample report — anonymised freelance web studio (BE market). */
const plan: BusinessKitPlan = {
  language: 'fr',
  theme: 'purple',
  title: 'Digit Studio — Stratégie de croissance 2026',
  subtitle: 'Passer de la dépendance aux recommandations à des projets à €3.000+ en 30 jours',
  executiveSummary:
    'Digit Studio propose un travail sur mesure de qualité, mais perd des contrats sur le prix parce que les acheteurs ne voient pas la différence avec Wix. Le levier est un positionnement premium autour des résultats de conversion, pas des pixels.',
  executiveSummaryChips: {
    lever: 'Se repositionner comme partenaire conversion pour les PME de services — pas comme « créateur de sites web ».',
    blocker: 'Le portfolio et les rendez-vous commerciaux mettent en avant les fonctionnalités et le taux horaire ; les acheteurs vous comparent à des modèles à €500.',
    action: 'Lancer une offre signature (€2.950, 21 jours, objectif de leads mesurable) et remplacer la prospection froide par LinkedIn basé sur la preuve + e-mails de cas clients.',
  },
  positioning:
    'Digit Studio est perçu aujourd\'hui comme « un freelance de plus qui fait des sites web ». Les acheteurs estiment la valeur en heures × tarif au lieu de l\'impact sur le chiffre d\'affaires. Le positionnement doit évoluer vers : partenaire stratégique en conversion pour les PME belges de services qui ont épuisé le bouche-à-oreille mais n\'ont pas de pipeline prévisible.',
  coreOfferRewrite:
    'Signature Growth Site — en 21 jours, un site web orienté conversion + suivi des leads qui génère au minimum 5 demandes qualifiées par mois, incluant 90 jours d\'optimisation. Prix fixe €2.950, pas de facturation à l\'heure.',
  idealCustomerProfile:
    'Dirigeant ou responsable marketing d\'une PME belge de services (comptable, coach, thérapeute, entrepreneur) avec 3 à 15 employés, €500k–€3M de chiffre d\'affaires, qui sait que son site « manque de personnalité » mais reporte l\'investissement parce que les précédents projets web n\'ont généré aucun lead.',
  biggestRisks: [
    'La pression sur les prix persiste si vous ne pouvez pas prouver une promesse de conversion concrète avant la vente.',
    'Le pipeline de recommandations se tarit sans inbound — un mauvais mois = trou de trésorerie.',
    'La concurrence des plateformes bon marché + des généralistes locaux réduit la valeur perçue.',
    'Les projets sous €1.500 grignotent la marge et le temps sans parcours d\'upsell.',
  ],
  quickWins: [
    '[HIGH effort] Rédiger une étude de cas (métriques avant/après) et la placer en tête de la homepage.',
    '[HIGH effort] Ajouter un aimant à leads « Audit ROI Site Web » (revue vidéo gratuite de 15 min).',
    '[MED effort] Reformuler le titre LinkedIn autour du résultat : « Je crée des sites qui génèrent des leads pour les PME de services ».',
    '[MED effort] Envoyer 10 e-mails personnalisés à des comptables locaux avec une erreur spécifique sur leur site.',
    '[LOW effort] Augmenter le prix minimum de projet sur la page contact à €2.500.',
    '[LOW effort] Ajouter 3 témoignages clients au modèle de proposition.',
  ],
  strategySections: [
    {
      title: 'Offre & tarification',
      diagnosis: 'Votre offre est trop large (sites, boutiques, care plans), ce qui vous fait passer pour une commodité. Regroupez tout sous un résultat signature unique.',
      moves: [
        'Arrêter les devis sur mesure sous €2.500 — orienter vers le care plan ou un partenaire template.',
        'Introduire la Signature Growth Site à €2.950 comme offre par défaut sur la homepage et en rendez-vous.',
        'Ajouter un care plan à €99/mois comme upsell obligatoire après livraison (hébergement + optimisation).',
      ],
    },
    {
      title: 'Acquisition',
      diagnosis: 'Les recommandations sont imprévisibles ; LinkedIn est sporadique. Vous n\'avez pas de système outbound reproductible.',
      moves: [
        '20 e-mails ciblés/semaine vers des PME de services en Flandre.',
        '2 posts LinkedIn/semaine : une métrique de cas client, un hook « erreur de site web ».',
        'Sponsoriser ou intervenir à 1 événement réseau local par mois avec une takeaway concrète.',
      ],
    },
    {
      title: 'Conversion',
      diagnosis: 'Les rendez-vous commerciaux commencent par « que voulez-vous sur le site » au lieu de l\'objectif business. Les propositions affichent des heures, pas des résultats.',
      moves: [
        'Ouvrir la découverte avec : « Combien de leads par mois vous manquez-vous aujourd\'hui ? »',
        'Remplacer le détail horaire dans les propositions par une roadmap en 3 phases + objectif KPI.',
        'Ajouter une séquence de relance 48 h après chaque proposition.',
      ],
    },
    {
      title: 'Rétention & expansion',
      diagnosis: 'Les care plans existent mais ne sont pas vendus proactivement comme partenariat de croissance.',
      moves: [
        'Pitcher le care plan lors de l\'appel de livraison comme « phase 2 de la génération de leads ».',
        'Appel de revue trimestriel avec métriques trafic + conversion formulaire.',
        'Upsell landing pages ou funnels après 90 jours.',
      ],
    },
    {
      title: 'Opérations & levier',
      diagnosis: 'Tout sur mesure = faible marge. Vous n\'avez ni composants réutilisables ni système d\'intake.',
      moves: [
        'Standardiser le formulaire d\'intake + template homepage 5 sections.',
        'Regrouper la collecte de contenu en un seul appel client (pas de ping-pong async par e-mail).',
        'Documenter la checklist de livraison pour déléguer à un VA/freelance.',
      ],
    },
  ],
  scorecard: [
    { label: 'Offer Clarity', score: 42, rationale: 'Trop de services, aucun résultat signature sur la homepage.', nextMove: 'Une offre hero + prix sur la homepage.' },
    { label: 'Pricing Power', score: 38, rationale: 'Deal moyen €1.800 alors que l\'objectif est €3.000 — pas de cadrage premium.', nextMove: 'Minimum €2.500 + cadrage garantie ROI.' },
    { label: 'Lead Generation', score: 35, rationale: 'Recommandations + LinkedIn sporadique = pas de système.', nextMove: '20 cold e-mails/semaine + aimant à leads.' },
    { label: 'Conversion System', score: 48, rationale: 'Propositions orientées fonctionnalités ; relance incohérente.', nextMove: 'Propositions orientées résultat + séquence 48 h.' },
    { label: 'Customer Retention', score: 55, rationale: 'Care plans existants mais faible taux d\'attachement.', nextMove: 'Upsell obligatoire lors de l\'appel de livraison.' },
    { label: 'Operational Leverage', score: 40, rationale: 'Chaque projet sur mesure ; pas de templates.', nextMove: 'Template 5 sections + SOP intake.' },
  ],
  competitorAnalysis: [
    { competitor: 'Wix / Squarespace DIY', weakness: 'Pas de stratégie, pas d\'optimisation conversion, templates génériques.', ourAdvantage: 'Sur mesure + suivi leads + 90 jours d\'optimisation avec périmètre fixe.' },
    { competitor: 'Agences généralistes locales', weakness: 'Lentes, chères, souvent sans résultats leads mesurables.', ourAdvantage: 'Livraison 21 jours, prix fixe, orienté KPI.' },
    { competitor: 'Freelances Fiverr bon marché', weakness: 'Pas de compréhension locale, mauvais support, pas de partenariat croissance.', ourAdvantage: 'Focus PME belges + care plan en retainer.' },
  ],
  actionPlan: [
    { day: 'Jour 1', task: 'Refondre le hero homepage vers Signature Growth Site (€2.950, 21 jours, 5+ leads/mois).', outcome: 'Les visiteurs voient une offre claire en 5 secondes.' },
    { day: 'Jour 2', task: 'Rédiger et publier une étude de cas avec chiffres concrets (trafic, soumissions formulaire).', outcome: 'Les rendez-vous commerciaux ont du matériel de preuve.' },
    { day: 'Jour 3', task: 'Créer la landing page aimant à leads « Audit ROI Site Web » + post LinkedIn.', outcome: 'Premiers leads inbound hors recommandations.' },
    { day: 'Jour 4-5', task: 'Envoyer 20 e-mails personnalisés à des comptables flamands.', outcome: 'Au minimum 3 réponses ou 1 appel découverte.' },
    { day: 'Jour 6-7', task: 'Réécrire le modèle de proposition : résultat d\'abord, 3 phases, pas de détail horaire.', outcome: 'Les propositions vous positionnent comme partenaire, pas fournisseur.' },
    { day: 'Semaine 2 (partie 1)', task: 'Publier 2 posts LinkedIn (métrique cas client + erreur courante).', outcome: 'Visibilité + conversations en DM.' },
    { day: 'Semaine 2 (partie 2)', task: 'Tenir 3 appels découverte avec nouvelles questions d\'intake (écart de leads d\'abord).', outcome: 'Pipeline avec opportunités €2.950+.' },
    { day: 'Semaine 3 (partie 1)', task: 'Envoyer propositions + lancer séquence de relance 48 h.', outcome: 'Au minimum 1 projet signé.' },
    { day: 'Semaine 3 (partie 2)', task: 'Pitcher le care plan à la livraison ou à un client en cours.', outcome: '€99/mois de revenus récurrents.' },
    { day: 'Semaine 4 (partie 1)', task: 'Standardiser template homepage 5 sections + formulaire intake.', outcome: 'Prochain projet livré 20 % plus vite.' },
    { day: 'Semaine 4 (partie 2)', task: 'Revoir les métriques : taux de réponse cold, appels bookés, deals closés.', outcome: 'Données pour le prochain cycle de 30 jours.' },
    { day: 'Revue Jour 30', task: 'Évaluer : 3+ nouveaux projets €2.500+ ? Sinon, doubler le volume outbound.', outcome: 'Décision de scaler ou ajuster l\'offre.' },
  ],
  templates: [
    {
      title: 'E-mail froid — pitch ROI site web',
      channel: 'E-mail',
      body: 'Objet : Votre site web vous coûte probablement 2 à 3 leads par mois\n\nBonjour [Nom],\n\nJ\'ai jeté un œil au site web de [Société] et repéré trois lacunes qui coûtent souvent des demandes qualifiées : pas de preuve sociale au-dessus de la ligne de flottaison, un formulaire de contact sans qualification, et un titre qui décrit ce que vous faites au lieu de ce que le client obtient.\n\nJe dirige Digit Studio — nous créons des sites orientés conversion pour les PME belges de services. Nos clients passent typiquement du bouche-à-oreille seul à 5–8 demandes inbound par mois en 60 jours.\n\nPartant pour un court échange de 20 minutes cette semaine ? Je peux vous montrer exactement ce que je changerais avant d\'en parler budget.\n\nCordialement,\n[Nom]',
    },
    {
      title: 'Relance sans réponse (3 jours)',
      channel: 'E-mail',
      body: 'Objet : Re: ROI site web — courte relance\n\nBonjour [Nom],\n\nJe voulais faire un suivi sur mon e-mail de mardi. Pas de pression — si le timing ne convient pas, dites-le moi sans hésiter.\n\nSi utile : je peux vous envoyer en 5 minutes un enregistrement d\'écran avec les 3 plus grandes opportunités de conversion sur votre site actuel. Gratuit, sans engagement.\n\nBien à vous,\n[Nom]',
    },
    {
      title: 'Confirmation appel découverte',
      channel: 'E-mail',
      body: 'Objet : Confirmation rendez-vous [date] — Digit Studio\n\nBonjour [Nom],\n\nMerci d\'avoir planifié l\'appel. Nous nous parlons le [date] à [heure].\n\nPour préparer : combien de demandes qualifiées recevez-vous en moyenne par mois via votre site web ? Et quel serait un objectif réaliste sous 90 jours ?\n\nÀ bientôt,\n[Nom]',
    },
    {
      title: 'Relance proposition (3 jours de silence)',
      channel: 'E-mail',
      body: 'Objet : Des questions sur la proposition ?\n\nBonjour [Nom],\n\nJ\'ai envoyé la proposition pour la Signature Growth Site le [date]. Avez-vous des questions sur le périmètre, le timing ou l\'objectif de leads ?\n\nJe suis ouvert à ajuster la proposition si les priorités ont évolué entre-temps.\n\nBien à vous,\n[Nom]',
    },
    {
      title: 'Demande de connexion LinkedIn',
      channel: 'LinkedIn',
      body: 'Bonjour [Nom], j\'aide les PME de services en Belgique à passer du bouche-à-oreille seul à des leads web prévisibles. J\'ai vu votre profil via [contexte] — partant pour se connecter ?',
    },
  ],
  contentIdeas: [
    { title: '3 erreurs de site web qui coûtent des leads aux PME', angle: 'Éducatif + autorité', hook: 'Votre homepage décrit ce que vous faites. Votre client veut savoir ce qu\'il obtient — cette différence vous coûte des leads.' },
    { title: 'Cas client : de 0 à 7 soumissions formulaire/mois', angle: 'Preuve sociale', hook: 'Ce comptable pensait que « plus de trafic » était le problème. C\'était le titre.' },
    { title: 'Pourquoi un site à €500 coûte plus cher qu\'un site à €3.000', angle: 'Recadrage tarifaire', hook: 'Un site bon marché sans stratégie de conversion n\'est pas une économie — c\'est une charge mensuelle.' },
  ],
  metrics: [
    { metric: 'Taux de réponse e-mail froid', target: '≥ 8 %', why: 'Plus bas = mauvaise liste ou pitch trop générique.' },
    { metric: 'Appels découverte / semaine', target: '≥ 2', why: 'Le pipeline reste vide sans cadence fixe.' },
    { metric: 'Valeur moyenne des deals', target: '≥ €2.950', why: 'Sous €2.500 = érosion de marge et mauvais signal de positionnement.' },
    { metric: 'Taux d\'attachement care plan', target: '≥ 60 %', why: 'Les revenus récurrents stabilisent la trésorerie entre les projets.' },
    { metric: 'Conversion homepage (inscription audit)', target: '≥ 2 %', why: 'L\'aimant à leads valide l\'inbound avant d\'envisager des ads.' },
    { metric: 'Taux de closing proposition', target: '≥ 30 %', why: 'Plus bas = découverte ou proposition à affûter.' },
  ],
  upsellIdeas: [
    { title: 'Care Plan (hébergement + optimisation)', price: '€99/mois', scope: 'Hébergement, mises à jour, contrôle conversion mensuel.', trigger: 'Directement après livraison du site signature.' },
    { title: 'Sprint landing page', price: '€750–€1.200', scope: 'Une LP campagne en 5 jours ouvrables.', trigger: 'Le client lance des ads Google/Meta.' },
    { title: 'Funnel build (LP + séquence e-mail)', price: '€2.000–€3.500', scope: 'Aimant à leads + 5 e-mails + LP.', trigger: 'Client care plan demande plus de leads.' },
  ],
  assumptions: [
    'Nous partons du principe que Digit Studio peut montrer au minimum 2 projets de référence avec résultats mesurables — sinon, construire d\'abord un cas pro bono.',
    'Nous partons du principe que le marché cible reste la Flandre / Belgique francophone ; le marché NL nécessite des études de cas séparées.',
    'Nous partons du principe que vous pouvez investir 10+ heures/semaine en outbound et contenu.',
  ],
  disclaimer: 'Ce rapport a été généré comme inspiration stratégique sur la base des informations fournies. Validez toujours les recommandations par rapport à vos propres données de marché et votre contexte juridique.',
};

export default plan;
