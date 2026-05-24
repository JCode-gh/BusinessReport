<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Languages,
  Loader2,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-vue-next";
import {buildBusinessKitHtml, businessKitFileName, createBusinessKit, ESTIMATED_RESPONSE_CHARS, type RetryInfo} from "./businessKit";

type GenerateStatus = "idle" | "loading" | "success" | "error";
type ReportLanguage = "en" | "nl" | "fr" | "de";
type GenerationStep = {
  title: string;
  detail: string;
};

const languageOptions: Array<{ value: ReportLanguage; label: string }> = [
  {value: "nl", label: "Nederlands"},
  {value: "en", label: "English"},
  {value: "fr", label: "Français"},
  {value: "de", label: "Deutsch"},
];

const homepageCopy = {
  nl: {
    brandHomeAria: "GrowthKit Studio startpagina",
    brandSubtitle: "Rapportbouwer van jcode.be",
    footerByline: "Een tool van",
    languageSwitcherLabel: "Taal wijzigen",
    loadingAria: "Rapport wordt gegenereerd",
    generatingReport: "Genereert rapport in",
    generationProgress: "Voortgang van generatie",
    waitingRoomTitle: "Limiet bereikt - probeert automatisch opnieuw",
    waitingRoomUnit: "sec",
    waitingRoomNote: "De gratis API-laag is tijdelijk druk. Je hoeft niets te doen: het rapport gaat verder zodra er modelcapaciteit vrijkomt.",
    resultEyebrow: "Rapport voltooid",
    resultTitle: "Je Growth Kit is klaar.",
    resultDescription: "Het rapport is in je browser gegenereerd, gelokaliseerd voor {language}, en voorbereid als stijlvol HTML-rapport met PDF-export.",
    openReport: "Rapport openen",
    downloadPdf: "PDF downloaden",
    preparingPdf: "PDF voorbereiden...",
    downloadingPdf: "PDF downloaden...",
    backToBrief: "Terug naar brief",
    generatedReportDetails: "Details van gegenereerd rapport",
    ready: "Klaar",
    language: "Taal",
    output: "Output",
    outputFormat: "HTML + PDF",
    includes: "Bevat",
    includesText: "Scorecard, templates, actieplan",
    heroEyebrow: "Browserbouwer voor strategierapporten",
    heroTitle: "Ondernemers Groeikit",
    heroCopy: "Zet een ruwe businessbrief om in een gepolijst consultant-rapport met positionering, aanbod, scorecards, outreach-templates en een praktisch actieplan.",
    heroPrimary: "Genereer je rapport",
    growthScore: "Groeiscore",
    insightPlan: "30-dagenplan",
    insightChip: "Aanbodrewrite klaar",
    productHighlights: "Producthighlights",
    statsLanguages: "Talen",
    statsPlan: "Dagenplan",
    statsPdf: "Exportklaar",
    proofAria: "Rapportoutput",
    proofCards: [
      {
        title: "Positioneringsaudit",
        body: "Scherpere marktdiagnose, klantprofiel, aanbodrewrite en groeirisico's.",
      },
      {
        title: "Kopie klaar om te versturen",
        body: "E-mail-, sales- en contentprompts rond de businesscontext.",
      },
      {
        title: "Statische Netlify-flow",
        body: "Generatie in de browser met stijlvolle HTML-output en PDF-export met één klik.",
      },
    ],
    briefEyebrow: "Strategiebrief",
    briefTitle: "Geef de strategie-engine de businesscontext die telt.",
    briefCopy: "Het rapport wordt lokaal vanuit de brief hieronder gegenereerd en pas geopend in een nieuw tabblad wanneer het resultaat klaar is.",
    businessName: "Bedrijfsnaam",
    businessNamePlaceholder: "Northstar Studio",
    market: "Markt",
    marketPlaceholder: "België, EU, online, lokaal...",
    reportLanguage: "Rapporttaal",
    reportTone: "Rapporttoon",
    reportTonePlaceholder: "Premium, praktisch, uitgesproken, rustig...",
    tonePresets: [
      "Premium consultant, direct en praktisch",
      "Gedurfde startup-adviseur, scherp en punchy",
      "Rustige operator, helder en realistisch",
      "Luxe merkstrateeg, gepolijst en bondig",
    ],
    tonePresetsAria: "Toonpresets",
    businessType: "Type bedrijf",
    businessTypePlaceholder: "Voorbeeld: B2B-servicebureau voor lokale bedrijven",
    currentOffer: "Huidig aanbod",
    currentOfferPlaceholder: "Wat verkoop je nu?",
    targetCustomer: "Doelklant",
    targetCustomerPlaceholder: "Wie moet dit kopen?",
    mainProblem: "Belangrijkste probleem",
    mainProblemPlaceholder: "Wat blokkeert groei?",
    goal: "Doel",
    goalPlaceholder: "Wat moet binnen 30 dagen verbeteren?",
    channels: "Kanalen",
    channelsPlaceholder: "LinkedIn, e-mail, referrals, advertenties, website...",
    pricePoint: "Prijsniveau",
    pricePointPlaceholder: "Huidige en gewenste prijzen",
    actionGenerating: "Genereren",
    actionGenerate: "Groeikit genereren",
    statusLoading: "Je kit wordt gebouwd",
    statusSuccessOpened: "Rapport geopend",
    statusSuccessReady: "Rapport klaar",
    statusError: "Generatie mislukt",
    statusIdle: "Klaar om te genereren",
    reportStatus: "Rapportstatus",
    idleMetrics: ["Businessdiagnose", "Aanbod en positionering", "Sales-templates", "Printbaar PDF-rapport"],
    loadingLine: "Generatie draait lokaal. Het rapporttabblad opent zodra de browser de HTML afrondt.",
    readyLine: "Klaar om {time}. Als het tabblad niet verscheen, open je het rapport hier opnieuw.",
    popupError: "Kon het rapport niet in een nieuw tabblad openen. Je browser blokkeert mogelijk pop-ups.",
    printError: "Kon het printvenster niet openen. Sta pop-ups toe voor deze site en probeer opnieuw.",
    generationSteps: [
      {
        title: "De businessbrief lezen",
        detail: "Het aanbod, de doelgroep, markt, beperkingen en sterkste groeisignalen vinden.",
      },
      {
        title: "De diagnose vormen",
        detail: "De ruwe input omzetten naar positionering, risico's, quick wins en aannames.",
      },
      {
        title: "Het groeisysteem bouwen",
        detail: "De scorecard, strategische acties, metrics en het 30-dagenactieplan opstellen.",
      },
      {
        title: "De sales-assets schrijven",
        detail: "Follow-up templates, contentideeën en praktische next-step copy maken.",
      },
      {
        title: "Het rapport lokaliseren",
        detail: "De gekozen taal controleren in titels, tabellen, templates en aanbevelingen.",
      },
      {
        title: "Het eindrapport polijsten",
        detail: "Het browserklare HTML-rapport renderen en PDF-export voorbereiden.",
      },
    ] satisfies GenerationStep[],
  },
  en: {
    brandHomeAria: "GrowthKit Studio home",
    brandSubtitle: "Report builder by jcode.be",
    footerByline: "A tool by",
    languageSwitcherLabel: "Change language",
    loadingAria: "Report is being generated",
    generatingReport: "Generating report in",
    generationProgress: "Generation progress",
    waitingRoomTitle: "Rate limit - retrying automatically",
    waitingRoomUnit: "sec",
    waitingRoomNote: "The free API tier is temporarily busy. No action needed: the report will continue as soon as a model slot opens.",
    resultEyebrow: "Report complete",
    resultTitle: "Your Growth Kit is ready.",
    resultDescription: "The report has been generated in your browser, localised for {language}, and prepared as a styled HTML report with PDF export.",
    openReport: "Open report",
    downloadPdf: "Download PDF",
    preparingPdf: "Preparing PDF...",
    downloadingPdf: "Downloading PDF...",
    backToBrief: "Back to brief",
    generatedReportDetails: "Generated report details",
    ready: "Ready",
    language: "Language",
    output: "Output",
    outputFormat: "HTML + PDF",
    includes: "Includes",
    includesText: "Scorecard, templates, action plan",
    heroEyebrow: "Browser strategy report builder",
    heroTitle: "Entrepreneur Growth Kit",
    heroCopy: "Turn a rough business brief into a polished consultant-style growth report with positioning, offers, scorecards, outreach templates, and a practical action plan.",
    heroPrimary: "Generate your report",
    growthScore: "Growth score",
    insightPlan: "30-day plan",
    insightChip: "Offer rewrite ready",
    productHighlights: "Product highlights",
    statsLanguages: "Languages",
    statsPlan: "Day plan",
    statsPdf: "Ready export",
    proofAria: "Report output",
    proofCards: [
      {
        title: "Positioning audit",
        body: "Sharper market diagnosis, customer profile, offer rewrite, and growth risks.",
      },
      {
        title: "Ready-to-send copy",
        body: "Email, sales, and content prompts shaped around the business context.",
      },
      {
        title: "Static Netlify flow",
        body: "Browser-only generation with styled HTML output and one-click PDF export.",
      },
    ],
    briefEyebrow: "Strategy brief",
    briefTitle: "Give the strategy engine the business context that matters.",
    briefCopy: "The report is generated locally from the brief below, then opened in a new tab only after the result is ready.",
    businessName: "Business name",
    businessNamePlaceholder: "Northstar Studio",
    market: "Market",
    marketPlaceholder: "Belgium, EU, online, local...",
    reportLanguage: "Report language",
    reportTone: "Report tone",
    reportTonePlaceholder: "Premium, practical, bold, calm...",
    tonePresets: [
      "Premium consultant, direct and practical",
      "Bold startup advisor, sharp and punchy",
      "Calm operator, clear and realistic",
      "Luxury brand strategist, polished and concise",
    ],
    tonePresetsAria: "Tone presets",
    businessType: "Business type",
    businessTypePlaceholder: "Example: B2B service agency for local businesses",
    currentOffer: "Current offer",
    currentOfferPlaceholder: "What do you sell right now?",
    targetCustomer: "Target customer",
    targetCustomerPlaceholder: "Who should buy this?",
    mainProblem: "Main problem",
    mainProblemPlaceholder: "What is blocking growth?",
    goal: "Goal",
    goalPlaceholder: "What should improve in 30 days?",
    channels: "Channels",
    channelsPlaceholder: "LinkedIn, email, referrals, ads, website...",
    pricePoint: "Price point",
    pricePointPlaceholder: "Current and target pricing",
    actionGenerating: "Generating",
    actionGenerate: "Generate growth kit",
    statusLoading: "Building your kit",
    statusSuccessOpened: "Report opened",
    statusSuccessReady: "Report ready",
    statusError: "Generation failed",
    statusIdle: "Ready to generate",
    reportStatus: "Report status",
    idleMetrics: ["Business diagnosis", "Offer and positioning", "Sales templates", "Printable PDF report"],
    loadingLine: "Generation is running locally. The report tab opens after the browser finishes the HTML.",
    readyLine: "Ready at {time}. If the tab did not appear, open the report again here.",
    popupError: "Could not open the report in a new tab. Your browser may be blocking popups.",
    printError: "Could not open the print dialog. Allow popups for this site and try again.",
    generationSteps: [
      {
        title: "Reading the business brief",
        detail: "Finding the offer, audience, market, constraints, and strongest growth signals.",
      },
      {
        title: "Shaping the diagnosis",
        detail: "Turning the raw inputs into positioning, risks, quick wins, and assumptions.",
      },
      {
        title: "Building the growth system",
        detail: "Drafting the scorecard, strategic moves, metrics, and 30-day action plan.",
      },
      {
        title: "Writing the sales assets",
        detail: "Creating follow-up templates, content ideas, and practical next-step copy.",
      },
      {
        title: "Localising the report",
        detail: "Checking the selected language across titles, tables, templates, and recommendations.",
      },
      {
        title: "Polishing the final report",
        detail: "Rendering the browser-ready HTML report and preparing PDF export actions.",
      },
    ] satisfies GenerationStep[],
  },
  fr: {
    brandHomeAria: "Accueil GrowthKit Studio",
    brandSubtitle: "Générateur de rapport par jcode.be",
    footerByline: "Un outil de",
    languageSwitcherLabel: "Changer la langue",
    loadingAria: "Rapport en cours de génération",
    generatingReport: "Génération du rapport en",
    generationProgress: "Progression de la génération",
    waitingRoomTitle: "Limite atteinte - nouvelle tentative automatique",
    waitingRoomUnit: "s",
    waitingRoomNote: "Le niveau gratuit de l'API est temporairement chargé. Aucune action requise: le rapport continuera dès qu'un créneau modèle sera disponible.",
    resultEyebrow: "Rapport terminé",
    resultTitle: "Votre Growth Kit est prêt.",
    resultDescription: "Le rapport a été généré dans votre navigateur, localisé en {language}, et préparé comme rapport HTML stylé avec export PDF.",
    openReport: "Ouvrir le rapport",
    downloadPdf: "Télécharger le PDF",
    preparingPdf: "Préparation du PDF...",
    downloadingPdf: "Téléchargement du PDF...",
    backToBrief: "Retour au brief",
    generatedReportDetails: "Détails du rapport généré",
    ready: "Prêt",
    language: "Langue",
    output: "Sortie",
    outputFormat: "HTML + PDF",
    includes: "Inclut",
    includesText: "Scorecard, modèles, plan d'action",
    heroEyebrow: "Générateur de rapport stratégique dans le navigateur",
    heroTitle: "Kit de croissance entrepreneur",
    heroCopy: "Transformez un brief business brut en rapport de consultant soigné avec positionnement, offres, scorecards, modèles d'outreach et plan d'action pratique.",
    heroPrimary: "Générer votre rapport",
    growthScore: "Score de croissance",
    insightPlan: "Plan 30 jours",
    insightChip: "Réécriture de l'offre prête",
    productHighlights: "Points forts du produit",
    statsLanguages: "Langues",
    statsPlan: "Plan jours",
    statsPdf: "Export prêt",
    proofAria: "Sortie du rapport",
    proofCards: [
      {
        title: "Audit de positionnement",
        body: "Diagnostic marché, profil client, reformulation d'offre et risques de croissance plus nets.",
      },
      {
        title: "Copy prêt à envoyer",
        body: "Prompts e-mail, vente et contenu façonnés autour du contexte business.",
      },
      {
        title: "Flux Netlify statique",
        body: "Génération dans le navigateur avec sortie HTML stylée et export PDF en un clic.",
      },
    ],
    briefEyebrow: "Brief stratégique",
    briefTitle: "Donnez au moteur stratégique le contexte business qui compte.",
    briefCopy: "Le rapport est généré localement à partir du brief ci-dessous, puis ouvert dans un nouvel onglet seulement quand le résultat est prêt.",
    businessName: "Nom de l'entreprise",
    businessNamePlaceholder: "Northstar Studio",
    market: "Marché",
    marketPlaceholder: "Belgique, UE, en ligne, local...",
    reportLanguage: "Langue du rapport",
    reportTone: "Ton du rapport",
    reportTonePlaceholder: "Premium, pratique, audacieux, calme...",
    tonePresets: [
      "Consultant premium, direct et pratique",
      "Conseiller startup audacieux, net et percutant",
      "Opérateur calme, clair et réaliste",
      "Stratège de marque luxe, poli et concis",
    ],
    tonePresetsAria: "Préréglages de ton",
    businessType: "Type d'entreprise",
    businessTypePlaceholder: "Exemple: agence de services B2B pour entreprises locales",
    currentOffer: "Offre actuelle",
    currentOfferPlaceholder: "Que vendez-vous aujourd'hui?",
    targetCustomer: "Client cible",
    targetCustomerPlaceholder: "Qui devrait acheter cela?",
    mainProblem: "Problème principal",
    mainProblemPlaceholder: "Qu'est-ce qui bloque la croissance?",
    goal: "Objectif",
    goalPlaceholder: "Qu'est-ce qui doit s'améliorer en 30 jours?",
    channels: "Canaux",
    channelsPlaceholder: "LinkedIn, e-mail, recommandations, ads, site web...",
    pricePoint: "Niveau de prix",
    pricePointPlaceholder: "Prix actuels et visés",
    actionGenerating: "Génération",
    actionGenerate: "Générer le kit de croissance",
    statusLoading: "Construction de votre kit",
    statusSuccessOpened: "Rapport ouvert",
    statusSuccessReady: "Rapport prêt",
    statusError: "Échec de génération",
    statusIdle: "Prêt à générer",
    reportStatus: "Statut du rapport",
    idleMetrics: ["Diagnostic business", "Offre et positionnement", "Modèles de vente", "Rapport PDF imprimable"],
    loadingLine: "La génération tourne localement. L'onglet du rapport s'ouvre lorsque le navigateur termine le HTML.",
    readyLine: "Prêt à {time}. Si l'onglet n'est pas apparu, ouvrez à nouveau le rapport ici.",
    popupError: "Impossible d'ouvrir le rapport dans un nouvel onglet. Votre navigateur bloque peut-être les pop-ups.",
    printError: "Impossible d'ouvrir la boîte de dialogue d'impression. Autorisez les pop-ups pour ce site et réessayez.",
    generationSteps: [
      {
        title: "Lecture du brief business",
        detail: "Repérer l'offre, l'audience, le marché, les contraintes et les signaux de croissance.",
      },
      {
        title: "Structuration du diagnostic",
        detail: "Transformer les inputs bruts en positionnement, risques, quick wins et hypothèses.",
      },
      {
        title: "Construction du système de croissance",
        detail: "Rédiger la scorecard, les mouvements stratégiques, les métriques et le plan 30 jours.",
      },
      {
        title: "Rédaction des assets de vente",
        detail: "Créer les modèles de relance, idées de contenu et copy de prochaine étape.",
      },
      {
        title: "Localisation du rapport",
        detail: "Vérifier la langue choisie dans les titres, tableaux, modèles et recommandations.",
      },
      {
        title: "Finition du rapport",
        detail: "Rendre le rapport HTML prêt pour le navigateur et préparer l'export PDF.",
      },
    ] satisfies GenerationStep[],
  },
  de: {
    brandHomeAria: "GrowthKit Studio Startseite",
    brandSubtitle: "Report-Builder von jcode.be",
    footerByline: "Ein Tool von",
    languageSwitcherLabel: "Sprache ändern",
    loadingAria: "Report wird generiert",
    generatingReport: "Report wird generiert auf",
    generationProgress: "Generierungsfortschritt",
    waitingRoomTitle: "Limit erreicht - automatischer neuer Versuch",
    waitingRoomUnit: "Sek.",
    waitingRoomNote: "Die kostenlose API-Stufe ist vorübergehend ausgelastet. Keine Aktion nötig: Der Report läuft weiter, sobald ein Modellplatz frei wird.",
    resultEyebrow: "Report fertig",
    resultTitle: "Dein Growth Kit ist bereit.",
    resultDescription: "Der Report wurde in deinem Browser generiert, für {language} lokalisiert und als gestalteter HTML-Report mit PDF-Export vorbereitet.",
    openReport: "Report öffnen",
    downloadPdf: "PDF herunterladen",
    preparingPdf: "PDF wird vorbereitet...",
    downloadingPdf: "PDF wird heruntergeladen...",
    backToBrief: "Zurück zum Briefing",
    generatedReportDetails: "Details zum generierten Report",
    ready: "Bereit",
    language: "Sprache",
    output: "Output",
    outputFormat: "HTML + PDF",
    includes: "Enthält",
    includesText: "Scorecard, Templates, Aktionsplan",
    heroEyebrow: "Strategie-Report-Builder im Browser",
    heroTitle: "Wachstumskit für Unternehmer",
    heroCopy: "Verwandle ein grobes Business-Briefing in einen polierten Consultant-Report mit Positionierung, Angeboten, Scorecards, Outreach-Templates und praktischem Aktionsplan.",
    heroPrimary: "Report generieren",
    growthScore: "Wachstumsscore",
    insightPlan: "30-Tage-Plan",
    insightChip: "Angebotsrewrite bereit",
    productHighlights: "Produkthighlights",
    statsLanguages: "Sprachen",
    statsPlan: "Tageplan",
    statsPdf: "Exportbereit",
    proofAria: "Report-Output",
    proofCards: [
      {
        title: "Positionierungs-Audit",
        body: "Schärfere Marktdiagnose, Kundenprofil, Angebotsrewrite und Wachstumsrisiken.",
      },
      {
        title: "Copy zum Versenden",
        body: "E-Mail-, Sales- und Content-Prompts passend zum Business-Kontext.",
      },
      {
        title: "Statischer Netlify-Flow",
        body: "Browserbasierte Generierung mit gestaltetem HTML-Output und PDF-Export per Klick.",
      },
    ],
    briefEyebrow: "Strategie-Briefing",
    briefTitle: "Gib der Strategie-Engine den Business-Kontext, der zählt.",
    briefCopy: "Der Report wird lokal aus dem Briefing unten generiert und erst in einem neuen Tab geöffnet, wenn das Ergebnis bereit ist.",
    businessName: "Unternehmensname",
    businessNamePlaceholder: "Northstar Studio",
    market: "Markt",
    marketPlaceholder: "Belgien, EU, online, lokal...",
    reportLanguage: "Report-Sprache",
    reportTone: "Report-Ton",
    reportTonePlaceholder: "Premium, praktisch, mutig, ruhig...",
    tonePresets: [
      "Premium-Consultant, direkt und praktisch",
      "Mutiger Startup-Berater, scharf und pointiert",
      "Ruhiger Operator, klar und realistisch",
      "Luxus-Markenstratege, poliert und knapp",
    ],
    tonePresetsAria: "Ton-Voreinstellungen",
    businessType: "Unternehmenstyp",
    businessTypePlaceholder: "Beispiel: B2B-Serviceagentur für lokale Unternehmen",
    currentOffer: "Aktuelles Angebot",
    currentOfferPlaceholder: "Was verkaufst du aktuell?",
    targetCustomer: "Zielkunde",
    targetCustomerPlaceholder: "Wer soll das kaufen?",
    mainProblem: "Hauptproblem",
    mainProblemPlaceholder: "Was blockiert Wachstum?",
    goal: "Ziel",
    goalPlaceholder: "Was soll sich in 30 Tagen verbessern?",
    channels: "Kanäle",
    channelsPlaceholder: "LinkedIn, E-Mail, Empfehlungen, Ads, Website...",
    pricePoint: "Preisniveau",
    pricePointPlaceholder: "Aktuelle und angestrebte Preise",
    actionGenerating: "Generieren",
    actionGenerate: "Growth Kit generieren",
    statusLoading: "Dein Kit wird gebaut",
    statusSuccessOpened: "Report geöffnet",
    statusSuccessReady: "Report bereit",
    statusError: "Generierung fehlgeschlagen",
    statusIdle: "Bereit zum Generieren",
    reportStatus: "Reportstatus",
    idleMetrics: ["Businessdiagnose", "Angebot und Positionierung", "Sales-Templates", "Druckbarer PDF-Report"],
    loadingLine: "Die Generierung läuft lokal. Der Report-Tab öffnet sich, sobald der Browser das HTML fertigstellt.",
    readyLine: "Bereit um {time}. Falls der Tab nicht erschienen ist, öffne den Report hier erneut.",
    popupError: "Der Report konnte nicht in einem neuen Tab geöffnet werden. Dein Browser blockiert möglicherweise Pop-ups.",
    printError: "Der Druckdialog konnte nicht geöffnet werden. Erlaube Pop-ups für diese Seite und versuche es erneut.",
    generationSteps: [
      {
        title: "Business-Briefing lesen",
        detail: "Angebot, Zielgruppe, Markt, Einschränkungen und stärkste Wachstumssignale finden.",
      },
      {
        title: "Diagnose formen",
        detail: "Rohe Inputs in Positionierung, Risiken, Quick Wins und Annahmen übersetzen.",
      },
      {
        title: "Wachstumssystem bauen",
        detail: "Scorecard, strategische Schritte, Metriken und 30-Tage-Aktionsplan entwerfen.",
      },
      {
        title: "Sales-Assets schreiben",
        detail: "Follow-up-Templates, Content-Ideen und praktische Next-Step-Copy erstellen.",
      },
      {
        title: "Report lokalisieren",
        detail: "Gewählte Sprache in Titeln, Tabellen, Templates und Empfehlungen prüfen.",
      },
      {
        title: "Finalen Report polieren",
        detail: "Browserfertigen HTML-Report rendern und PDF-Export vorbereiten.",
      },
    ] satisfies GenerationStep[],
  },
} as const;

const draftStorageKey = "business-kit-draft";

const form = reactive({
  businessName: "Northstar Studio",
  businessType: "B2B webdesign- en automatiseringsbureau voor kleine dienstverleners",
  offer: "Een vaste-scope website- en automatiseringssprint die ondernemers helpt meer gekwalificeerde leads te krijgen",
  audience: "Lokale dienstverleners met 5 tot 30 medewerkers die sterk op referrals vertrouwen",
  problem: "Ze hebben een verouderde website, zwakke follow-up en een inconsistente salespipeline",
  goal: "Meer gekwalificeerde salesgesprekken boeken en binnen 30 dagen hogere pakketten verkopen",
  channels: "LinkedIn, e-mailoutreach, referrals, website",
  pricePoint: "Huidige projecten zijn 1500 tot 3500 EUR, doel is 5000 tot 9000 EUR",
  region: "België en Nederland",
  tone: "Premium consultant, direct en praktisch",
  language: "nl" as ReportLanguage,
});

const status = ref<GenerateStatus>("idle");
const errorMessage = ref("");
const reportUrl = ref("");
const fileName = ref("");
const lastGeneratedAt = ref("");
const pdfDownloading = ref(false);
const reportHtml = ref("");
const reportOpened = ref(false);
const showResultScreen = ref(false);
const apiCharsReceived = ref(0);

const waitingRoom = reactive({
  active: false,
  secondsLeft: 0,
  totalSeconds: 0,
  attempt: 0,
  totalAttempts: 5,
});
let waitingRoomTimer: number | null = null;

const ui = computed(() => homepageCopy[form.language]);

const tonePresets = computed(() => ui.value.tonePresets);

const generationSteps = computed<GenerationStep[]>(() => [...ui.value.generationSteps]);

const hasBusinessContext = computed(() => {
  return Boolean(
    form.businessType.trim() ||
    form.offer.trim() ||
    form.audience.trim() ||
    form.problem.trim() ||
    form.goal.trim(),
  );
});

const canGenerate = computed(() => hasBusinessContext.value && status.value !== "loading");

const actionLabel = computed(() => {
  if (status.value === "loading") {
    return ui.value.actionGenerating;
  }

  return ui.value.actionGenerate;
});

const statusLabel = computed(() => {
  if (status.value === "loading") {
    return ui.value.statusLoading;
  }

  if (status.value === "success") {
    return reportOpened.value ? ui.value.statusSuccessOpened : ui.value.statusSuccessReady;
  }

  if (status.value === "error") {
    return ui.value.statusError;
  }

  return ui.value.statusIdle;
});

const selectedLanguageLabel = computed(() => {
  return languageOptions.find((language) => language.value === form.language)?.label ?? "Nederlands";
});

const loadingProgress = computed(() => {
  if (apiCharsReceived.value === 0) return 3;
  return Math.min(Math.round((apiCharsReceived.value / ESTIMATED_RESPONSE_CHARS) * 100), 95);
});

const loadingStepIndex = computed(() => {
  const total = generationSteps.value.length;
  return Math.min(Math.floor((loadingProgress.value / 100) * total), total - 1);
});

const currentLoadingStep = computed(() => {
  return generationSteps.value[loadingStepIndex.value];
});

const waitingCountdownPercent = computed(() => {
  if (waitingRoom.totalSeconds === 0) return 0;
  return Math.round(((waitingRoom.totalSeconds - waitingRoom.secondsLeft) / waitingRoom.totalSeconds) * 100);
});

const resultDescription = computed(() => {
  return ui.value.resultDescription.replace("{language}", selectedLanguageLabel.value);
});

const readyLine = computed(() => {
  return ui.value.readyLine.replace("{time}", lastGeneratedAt.value);
});

function changeLanguage(event: Event) {
  const nextLanguage = normalizeLanguage((event.target as HTMLSelectElement).value);
  const currentToneIsPreset = Object.values(homepageCopy).some((copy) => {
    return (copy.tonePresets as readonly string[]).includes(form.tone);
  });

  form.language = nextLanguage;

  if (currentToneIsPreset) {
    form.tone = homepageCopy[nextLanguage].tonePresets[0];
  }

  setDocumentLanguage(nextLanguage);
}

function setDocumentLanguage(language: ReportLanguage) {
  document.documentElement.lang = language;
}

async function generateBusinessKit() {
  if (!canGenerate.value) {
    return;
  }

  window.scrollTo({top: 0, left: 0, behavior: "auto"});
  status.value = "loading";
  errorMessage.value = "";
  reportOpened.value = false;
  showResultScreen.value = false;
  apiCharsReceived.value = 0;
  revokeReportUrl();
  saveDraft();

  try {
    await wait(650);
    const kit = await createBusinessKit(
      {...form},
      startWaitingRoom,
      (chars) => { apiCharsReceived.value = chars; },
    );
    const htmlText = buildBusinessKitHtml(kit);
    const nextFileName = businessKitFileName(kit);
    const nextReportUrl = setReportHtml(htmlText);

    fileName.value = nextFileName;
    lastGeneratedAt.value = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    apiCharsReceived.value = ESTIMATED_RESPONSE_CHARS;
    status.value = "success";
    reportOpened.value = openReportUrl(nextReportUrl);
    showResultScreen.value = true;
  } catch (error) {
    status.value = "error";
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    stopWaitingRoom();
  }
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

function startWaitingRoom(info: RetryInfo) {
  const secs = Math.ceil(info.retryAfterSeconds);
  waitingRoom.active = true;
  waitingRoom.secondsLeft = secs;
  waitingRoom.totalSeconds = secs;
  waitingRoom.attempt = info.attempt;
  waitingRoom.totalAttempts = info.totalAttempts;

  if (waitingRoomTimer !== null) window.clearInterval(waitingRoomTimer);
  waitingRoomTimer = window.setInterval(() => {
    if (waitingRoom.secondsLeft > 1) {
      waitingRoom.secondsLeft -= 1;
    } else {
      stopWaitingRoom();
    }
  }, 1000);
}

function stopWaitingRoom() {
  waitingRoom.active = false;
  if (waitingRoomTimer !== null) {
    window.clearInterval(waitingRoomTimer);
    waitingRoomTimer = null;
  }
}

function setReportHtml(html: string): string {
  reportHtml.value = html;

  if (reportUrl.value) {
    try {
      URL.revokeObjectURL(reportUrl.value);
    } catch { }
  }

  const blob = new Blob([injectBase(html)], {type: "text/html"});
  reportUrl.value = URL.createObjectURL(blob);
  return reportUrl.value;
}

function injectBase(html: string): string {
  try {
    const base = `${window.location.origin}/`;
    return html.replace(/<head(\s[^>]*)?>/i, (match) => `${match}<base href="${base}">`);
  } catch {
    return html;
  }
}

function openReportUser() {
  if (!reportUrl.value && reportHtml.value) {
    setReportHtml(reportHtml.value);
  }

  if (!reportUrl.value) {
    return;
  }

  const opened = openReportUrl(reportUrl.value);
  reportOpened.value = opened;

  if (!opened) {
    errorMessage.value = ui.value.popupError;
  }
}

function openReportUrl(url: string): boolean {
  try {
    const tab = window.open(url, "_blank");

    if (tab) {
      try {
        tab.opener = null;
        tab.focus();
      } catch { }

      return true;
    }
  } catch { }

  try {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.style.position = "fixed";
    anchor.style.left = "-9999px";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    return true;
  } catch {
    return false;
  }
}

function downloadPdf() {
  if (!reportHtml.value) return;

  pdfDownloading.value = true;
  errorMessage.value = "";

  try {
    // Inject a print-trigger script so the browser's native Save as PDF dialog
    // opens automatically. Native print preserves all CSS: gradients, backgrounds,
    // custom fonts — everything html2canvas cannot handle.
    const autoprint = [
      "<script>",
      "window.addEventListener('load',function(){",
      "  (document.fonts?document.fonts.ready:Promise.resolve()).then(function(){",
      "    setTimeout(function(){window.print();},500);",
      "  });",
      "});",
      "<\/script>",
    ].join("");

    const html = injectBase(reportHtml.value).replace("</body>", autoprint + "</body>");
    const blob = new Blob([html], {type: "text/html"});
    const url = URL.createObjectURL(blob);

    const tab = window.open(url, "_blank");
    if (!tab) {
      errorMessage.value = ui.value.printError;
    }

    // Revoke after 2 min — the tab holds the content in memory independently.
    window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    pdfDownloading.value = false;
  }
}

function useTone(tone: string) {
  form.tone = tone;
}

function saveDraft() {
  localStorage.setItem(draftStorageKey, JSON.stringify(form));
}

function restoreDraft() {
  const rawDraft = localStorage.getItem(draftStorageKey);

  if (!rawDraft) {
    return;
  }

  try {
    const draft = JSON.parse(rawDraft) as Partial<typeof form>;
    Object.assign(form, {
      ...draft,
      language: normalizeLanguage(draft.language),
    });
  } catch {
    localStorage.removeItem(draftStorageKey);
  }
}

function normalizeLanguage(value: unknown): ReportLanguage {
  if (value === "en" || value === "nl" || value === "fr" || value === "de") {
    return value;
  }

  return "nl";
}

function revokeReportUrl() {
  if (reportUrl.value) {
    try {
      URL.revokeObjectURL(reportUrl.value);
    } catch { }

    reportUrl.value = "";
  }

  reportHtml.value = "";
}

onMounted(() => {
  restoreDraft();
  setDocumentLanguage(form.language);
});

onBeforeUnmount(() => {
  revokeReportUrl();
  stopWaitingRoom();
});
</script>

<template>
  <main class="product-shell" :lang="form.language">
    <div v-if="status === 'loading'" class="loading-overlay" role="status" aria-live="polite" :aria-label="ui.loadingAria">
      <div class="generation-screen">
        <div class="generation-status">
          <p class="eyebrow">{{ ui.generatingReport }} {{ selectedLanguageLabel }}</p>
          <h3>{{ currentLoadingStep.title }}</h3>
          <p>{{ currentLoadingStep.detail }}</p>

          <div class="progress-wrap" aria-hidden="true">
            <div
              class="progress-bar"
              :class="{indeterminate: apiCharsReceived === 0}"
              :style="{width: `${loadingProgress}%`}"
            ></div>
          </div>

          <div class="loading-meta">
            <span>{{ loadingProgress }}%</span>
            <span>{{ form.businessName || ui.heroTitle }}</span>
          </div>
        </div>

        <div class="generation-steps-col">
          <ol class="generation-steps" :aria-label="ui.generationProgress">
            <li
              v-for="(step, index) in generationSteps"
              :key="step.title"
              :class="{active: index === loadingStepIndex, done: index < loadingStepIndex}"
            >
              <span>{{ String(index + 1).padStart(2, "0") }}</span>
              <div>
                <strong>{{ step.title }}</strong>
                <small>{{ step.detail }}</small>
              </div>
            </li>
          </ol>

          <div v-if="waitingRoom.active" class="waiting-room" role="status" aria-live="polite">
            <div class="waiting-room-header">
              <Clock :size="15" aria-hidden="true" />
              <span>{{ ui.waitingRoomTitle }}</span>
              <span class="waiting-room-attempt">{{ waitingRoom.attempt }}/{{ waitingRoom.totalAttempts }}</span>
            </div>
            <div class="waiting-room-countdown">
              <span class="countdown-number">{{ waitingRoom.secondsLeft }}</span>
              <span class="countdown-unit">{{ ui.waitingRoomUnit }}</span>
            </div>
            <div class="waiting-room-track" aria-hidden="true">
              <div class="waiting-room-fill" :style="{width: waitingCountdownPercent + '%'}"></div>
            </div>
            <p class="waiting-room-note">{{ ui.waitingRoomNote }}</p>
          </div>
        </div>
      </div>
    </div>

    <section v-if="showResultScreen && status === 'success'" class="result-screen" aria-labelledby="result-title">
      <div class="result-hero">
        <div class="result-copy">
          <p class="eyebrow">{{ ui.resultEyebrow }}</p>
          <h2 id="result-title">{{ ui.resultTitle }}</h2>
          <p>{{ resultDescription }}</p>

          <div class="result-actions">
            <button class="result-primary" type="button" @click="openReportUser" :disabled="!reportHtml">
              <ExternalLink :size="19" />
              {{ ui.openReport }}
            </button>
            <button class="result-secondary" type="button" @click="downloadPdf" :disabled="!reportHtml || pdfDownloading">
              <FileText :size="19" />
              <span v-if="pdfDownloading">{{ ui.preparingPdf }}</span>
              <span v-else>{{ ui.downloadPdf }}</span>
            </button>
            <button class="result-secondary" type="button" @click="showResultScreen = false">
              {{ ui.backToBrief }}
            </button>
          </div>
        </div>

        <div class="result-card" :aria-label="ui.generatedReportDetails">
          <div class="result-card-top">
            <span class="success-badge">
              <CheckCircle2 :size="17" />
              {{ ui.ready }}
            </span>
            <span>{{ lastGeneratedAt }}</span>
          </div>
          <h3>{{ fileName }}</h3>
          <div class="result-list">
            <div>
              <span>{{ ui.language }}</span>
              <strong>{{ selectedLanguageLabel }}</strong>
            </div>
            <div>
              <span>{{ ui.output }}</span>
              <strong>{{ ui.outputFormat }}</strong>
            </div>
            <div>
              <span>{{ ui.includes }}</span>
              <strong>{{ ui.includesText }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <header class="site-nav">
      <div class="nav-inner">
        <a class="brand-lockup" href="#" :aria-label="ui.brandHomeAria">
          <span class="brand-mark" aria-hidden="true">
            <BriefcaseBusiness :size="24" />
          </span>
          <span>
            <strong>GrowthKit Studio</strong>
            <small>{{ ui.brandSubtitle }}</small>
          </span>
        </a>

        <div class="nav-controls">
          <label class="language-switcher">
            <Languages :size="17" aria-hidden="true" />
            <span class="sr-only">{{ ui.languageSwitcherLabel }}</span>
            <select :value="form.language" :aria-label="ui.languageSwitcherLabel" @change="changeLanguage">
              <option v-for="language in languageOptions" :key="language.value" :value="language.value">
                {{ language.label }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </header>

    <section class="hero-section" aria-labelledby="page-title">
      <div class="hero-product" aria-hidden="true">
        <div class="report-preview">
          <div class="preview-topline">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="preview-title"></div>
          <div class="preview-subtitle"></div>
          <div class="preview-grid">
            <div class="preview-column tall"></div>
            <div class="preview-column medium"></div>
            <div class="preview-column short"></div>
          </div>
          <div class="preview-row"></div>
          <div class="preview-row small"></div>
          <div class="preview-score">
            <span>83</span>
            <strong>{{ ui.growthScore }}</strong>
          </div>
        </div>

        <div class="insight-board">
          <div class="insight-label">{{ ui.insightPlan }}</div>
          <div class="insight-bars">
            <span style="--value: 74%"></span>
            <span style="--value: 58%"></span>
            <span style="--value: 86%"></span>
          </div>
          <div class="insight-chip">{{ ui.insightChip }}</div>
        </div>
      </div>

      <div class="hero-content">
        <p class="eyebrow">{{ ui.heroEyebrow }}</p>
        <h1 id="page-title">{{ ui.heroTitle }}</h1>
        <p class="hero-copy">{{ ui.heroCopy }}</p>

        <div class="hero-actions">
          <a class="primary-link" href="#brief">
            <Sparkles :size="19" />
            {{ ui.heroPrimary }}
            <ArrowRight :size="18" />
          </a>
        </div>

        <dl class="hero-stats" :aria-label="ui.productHighlights">
          <div>
            <dt>4</dt>
            <dd>{{ ui.statsLanguages }}</dd>
          </div>
          <div>
            <dt>30</dt>
            <dd>{{ ui.statsPlan }}</dd>
          </div>
          <div>
            <dt>PDF</dt>
            <dd>{{ ui.statsPdf }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="output" class="proof-section" :aria-label="ui.proofAria">
      <article class="proof-card">
        <TrendingUp :size="24" />
        <h2>{{ ui.proofCards[0].title }}</h2>
        <p>{{ ui.proofCards[0].body }}</p>
      </article>
      <article class="proof-card">
        <MessageSquareText :size="24" />
        <h2>{{ ui.proofCards[1].title }}</h2>
        <p>{{ ui.proofCards[1].body }}</p>
      </article>
      <article class="proof-card">
        <ShieldCheck :size="24" />
        <h2>{{ ui.proofCards[2].title }}</h2>
        <p>{{ ui.proofCards[2].body }}</p>
      </article>
    </section>

    <section id="brief" class="brief-section" aria-labelledby="brief-title">
      <div class="section-heading">
        <p class="eyebrow">{{ ui.briefEyebrow }}</p>
        <h2 id="brief-title">{{ ui.briefTitle }}</h2>
        <p>{{ ui.briefCopy }}</p>
      </div>

      <div class="builder-grid">
        <form class="brief-form" @submit.prevent="generateBusinessKit">
          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <BriefcaseBusiness :size="18" />
                {{ ui.businessName }}
              </span>
              <input v-model="form.businessName" type="text" :placeholder="ui.businessNamePlaceholder" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <Target :size="18" />
                {{ ui.market }}
              </span>
              <input v-model="form.region" type="text" :placeholder="ui.marketPlaceholder" />
            </label>
          </div>

          <div class="field-grid compact">
            <label class="field-block">
              <span class="field-label">
                <Languages :size="18" />
                {{ ui.reportLanguage }}
              </span>
              <select :value="form.language" @change="changeLanguage">
                <option v-for="language in languageOptions" :key="language.value" :value="language.value">
                  {{ language.label }}
                </option>
              </select>
            </label>

            <label class="field-block">
              <span class="field-label">
                <Sparkles :size="18" />
                {{ ui.reportTone }}
              </span>
              <input v-model="form.tone" type="text" :placeholder="ui.reportTonePlaceholder" />
            </label>
          </div>

          <div class="preset-row" :aria-label="ui.tonePresetsAria">
            <button
              v-for="preset in tonePresets"
              :key="preset"
              type="button"
              class="preset-button"
              @click="useTone(preset)"
            >
              {{ preset }}
            </button>
          </div>

          <label class="field-block">
            <span class="field-label">
              <Sparkles :size="18" />
              {{ ui.businessType }}
            </span>
            <textarea
              v-model="form.businessType"
              rows="3"
              :placeholder="ui.businessTypePlaceholder"
            />
          </label>

          <label class="field-block">
            <span class="field-label">
              <FileText :size="18" />
              {{ ui.currentOffer }}
            </span>
            <textarea v-model="form.offer" rows="3" :placeholder="ui.currentOfferPlaceholder" />
          </label>

          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <Target :size="18" />
                {{ ui.targetCustomer }}
              </span>
              <textarea v-model="form.audience" rows="4" :placeholder="ui.targetCustomerPlaceholder" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <AlertCircle :size="18" />
                {{ ui.mainProblem }}
              </span>
              <textarea v-model="form.problem" rows="4" :placeholder="ui.mainProblemPlaceholder" />
            </label>
          </div>

          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <BarChart3 :size="18" />
                {{ ui.goal }}
              </span>
              <textarea v-model="form.goal" rows="4" :placeholder="ui.goalPlaceholder" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <Sparkles :size="18" />
                {{ ui.channels }}
              </span>
              <textarea v-model="form.channels" rows="4" :placeholder="ui.channelsPlaceholder" />
            </label>
          </div>

          <label class="field-block">
            <span class="field-label">
              <BarChart3 :size="18" />
              {{ ui.pricePoint }}
            </span>
            <input v-model="form.pricePoint" type="text" :placeholder="ui.pricePointPlaceholder" />
          </label>

          <button class="generate-button" type="submit" :disabled="!canGenerate">
            <Loader2 v-if="status === 'loading'" class="spin" :size="20" />
            <Send v-else :size="20" />
            <span>{{ actionLabel }}</span>
          </button>
        </form>

        <aside class="report-panel" aria-live="polite">
          <div class="status-header">
            <div class="status-icon" :data-state="status">
              <Loader2 v-if="status === 'loading'" class="spin" :size="26" />
              <CheckCircle2 v-else-if="status === 'success'" :size="26" />
              <AlertCircle v-else-if="status === 'error'" :size="26" />
              <FileText v-else :size="26" />
            </div>
            <div>
              <p class="eyebrow">{{ ui.reportStatus }}</p>
              <h2>{{ statusLabel }}</h2>
            </div>
          </div>

          <div class="report-content">
            <div v-if="status === 'idle'" class="output-stack">
              <div v-for="(metric, index) in ui.idleMetrics" :key="metric" class="mini-metric">
                <span>{{ String(index + 1).padStart(2, "0") }}</span>
                <strong>{{ metric }}</strong>
              </div>
            </div>

            <p v-if="status === 'loading'" class="muted-line">{{ ui.loadingLine }}</p>

            <div v-if="status === 'success'" class="download-block">
              <span class="file-chip">
                <FileText :size="18" />
                {{ fileName }}
              </span>
              <p class="muted-line">{{ readyLine }}</p>

              <div class="action-row">
                <button class="secondary-action" type="button" @click="openReportUser" :disabled="!reportHtml">
                  <ExternalLink :size="18" />
                  {{ ui.openReport }}
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  @click="downloadPdf"
                  :disabled="!reportHtml || pdfDownloading"
                >
                  <FileText :size="18" />
                  <span v-if="pdfDownloading">{{ ui.downloadingPdf }}</span>
                  <span v-else>{{ ui.downloadPdf }}</span>
                </button>
              </div>
            </div>

            <p v-if="status === 'error'" class="error-text">{{ errorMessage }}</p>
          </div>
        </aside>
      </div>
    </section>

    <footer class="site-footer">
      <p>
        {{ ui.footerByline }}
        <a href="https://jcode.be" target="_blank" rel="noopener noreferrer">jcode.be</a>
      </p>
    </footer>
  </main>
</template>
