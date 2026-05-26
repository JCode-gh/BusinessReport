<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileText,
  Languages,
  Link2,
  LogIn,
  LogOut,
  MessageSquareText,
  Pencil,
  Printer,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  X,
} from "lucide-vue-next";
import {
  buildBusinessKitHtml,
  businessKitFileName,
  createBusinessKit,
  ESTIMATED_RESPONSE_CHARS,
  REPORT_THEMES,
  type BusinessKitPlan,
  type ReportThemeKey,
  type RetryInfo,
} from "./businessKit";
import AuthModal from "./AuthModal.vue";
import ConfirmModal from "./ConfirmModal.vue";
import { useAuth } from "./useAuth";
import { saveReport, loadReport, listReports, patchReport, renameReport, renameReportTitle, deleteReport, signOut, type ReportSummary } from "./firebase";
import { patchHtmlForEditing } from "./patchHtmlForEditing";

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
    openReport: "Naar rapport ↓",
    printReport: "Afdrukken / PDF",
    downloadPdf: "PDF downloaden",
    preparingPdf: "PDF voorbereiden...",
    downloadingPdf: "PDF downloaden...",
    backToBrief: "Terug naar start",
    errorEyebrow: "Generatie mislukt",
    errorTitle: "Het rapport kon niet worden afgerond.",
    errorRetry: "Brief opnieuw invullen",
    errorDismiss: "Terug naar start",
    popupBlockedNote: "Je browser blokkeerde het nieuwe tabblad. Open het rapport hieronder handmatig.",
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
    reportTheme: "Rapportkleur",
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
    signIn: "Aanmelden",
    signOut: "Afmelden",
    signInToSave: "Aanmelden om dit rapport op te slaan en terug te openen",
    reportSaved: "Rapport opgeslagen",
    accessDenied: "Geen toegang",
    accessDeniedMessage: "Je hebt geen toestemming om dit rapport te bekijken.",
    reportNotFound: "Rapport niet gevonden of geen toegang.",
    copy: "Kopiëren",
    copyLink: "Link kopiëren",
    savingLabel: "Opslaan…",
    saveToAccount: "Opslaan op account",
    savedLabel: "Opgeslagen!",
    saveChanges: "Wijzigingen opslaan",
    reportViewerTitle: "Rapportviewer",
    reportFallbackTitle: "Rapport",
    renamePlaceholder: "Rapportnaam…",
    savedReportsTitle: "Jouw opgeslagen rapporten",
    savedReportsLoading: "Laden…",
    savedReportsEmpty: "Nog geen opgeslagen rapporten.",
    savedReportOpen: "Openen",
    cancel: "Annuleren",
    deleteReport: "Verwijderen",
    deleteReportConfirm: "Weet je zeker dat je dit rapport permanent wil verwijderen? Dit kan niet ongedaan worden gemaakt.",
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
    openReport: "Go to report ↓",
    printReport: "Print / PDF",
    downloadPdf: "Download PDF",
    preparingPdf: "Preparing PDF...",
    downloadingPdf: "Downloading PDF...",
    backToBrief: "Back to home",
    errorEyebrow: "Generation failed",
    errorTitle: "The report could not be completed.",
    errorRetry: "Edit brief again",
    errorDismiss: "Back to home",
    popupBlockedNote: "Your browser blocked the new tab. Open the report manually below.",
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
    reportTheme: "Report color",
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
    signIn: "Sign in",
    signOut: "Sign out",
    signInToSave: "Sign in to save & re-access this report",
    reportSaved: "Report saved",
    accessDenied: "Access denied",
    accessDeniedMessage: "You don't have permission to view this report.",
    reportNotFound: "Report not found or access denied.",
    copy: "Copy",
    copyLink: "Copy link",
    savingLabel: "Saving…",
    saveToAccount: "Save to account",
    savedLabel: "Saved!",
    saveChanges: "Save changes",
    reportViewerTitle: "Report viewer",
    reportFallbackTitle: "Report",
    renamePlaceholder: "Report name…",
    savedReportsTitle: "Your saved reports",
    savedReportsLoading: "Loading…",
    savedReportsEmpty: "No saved reports yet.",
    savedReportOpen: "Open",
    cancel: "Cancel",
    deleteReport: "Delete",
    deleteReportConfirm: "Are you sure you want to permanently delete this report? This cannot be undone.",
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
    openReport: "Voir le rapport ↓",
    printReport: "Imprimer / PDF",
    downloadPdf: "Télécharger le PDF",
    preparingPdf: "Préparation du PDF...",
    downloadingPdf: "Téléchargement du PDF...",
    backToBrief: "Retour à l'accueil",
    errorEyebrow: "Échec de génération",
    errorTitle: "Le rapport n'a pas pu être finalisé.",
    errorRetry: "Modifier le brief",
    errorDismiss: "Retour à l'accueil",
    popupBlockedNote: "Votre navigateur a bloqué le nouvel onglet. Ouvrez le rapport manuellement ci-dessous.",
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
    reportTheme: "Couleur du rapport",
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
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    signInToSave: "Se connecter pour sauvegarder et réaccéder à ce rapport",
    reportSaved: "Rapport sauvegardé",
    accessDenied: "Accès refusé",
    accessDeniedMessage: "Vous n'avez pas la permission de voir ce rapport.",
    reportNotFound: "Rapport introuvable ou accès refusé.",
    copy: "Copier",
    copyLink: "Copier le lien",
    savingLabel: "Enregistrement…",
    saveToAccount: "Sauvegarder sur le compte",
    savedLabel: "Enregistré !",
    saveChanges: "Enregistrer les modifications",
    reportViewerTitle: "Visionneuse de rapport",
    reportFallbackTitle: "Rapport",
    renamePlaceholder: "Nom du rapport…",
    savedReportsTitle: "Vos rapports sauvegardés",
    savedReportsLoading: "Chargement…",
    savedReportsEmpty: "Aucun rapport sauvegardé pour l'instant.",
    savedReportOpen: "Ouvrir",
    cancel: "Annuler",
    deleteReport: "Supprimer",
    deleteReportConfirm: "Êtes-vous sûr de vouloir supprimer définitivement ce rapport ? Cette action est irréversible.",
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
    openReport: "Zum Report ↓",
    printReport: "Drucken / PDF",
    downloadPdf: "PDF herunterladen",
    preparingPdf: "PDF wird vorbereitet...",
    downloadingPdf: "PDF wird heruntergeladen...",
    backToBrief: "Zurück zur Startseite",
    errorEyebrow: "Generierung fehlgeschlagen",
    errorTitle: "Der Report konnte nicht fertiggestellt werden.",
    errorRetry: "Briefing erneut ausfüllen",
    errorDismiss: "Zurück zur Startseite",
    popupBlockedNote: "Dein Browser hat den neuen Tab blockiert. Öffne den Report unten manuell.",
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
    reportTheme: "Berichtsfarbe",
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
    signIn: "Anmelden",
    signOut: "Abmelden",
    signInToSave: "Anmelden, um diesen Report zu speichern und erneut abzurufen",
    reportSaved: "Report gespeichert",
    accessDenied: "Zugriff verweigert",
    accessDeniedMessage: "Sie haben keine Berechtigung, diesen Report anzuzeigen.",
    reportNotFound: "Report nicht gefunden oder Zugriff verweigert.",
    copy: "Kopieren",
    copyLink: "Link kopieren",
    savingLabel: "Speichern…",
    saveToAccount: "Auf Konto speichern",
    savedLabel: "Gespeichert!",
    saveChanges: "Änderungen speichern",
    reportViewerTitle: "Report-Viewer",
    reportFallbackTitle: "Report",
    renamePlaceholder: "Report-Name…",
    savedReportsTitle: "Deine gespeicherten Reports",
    savedReportsLoading: "Laden…",
    savedReportsEmpty: "Noch keine gespeicherten Reports.",
    savedReportOpen: "Öffnen",
    cancel: "Abbrechen",
    deleteReport: "Löschen",
    deleteReportConfirm: "Bist du sicher, dass du diesen Report dauerhaft löschen möchtest? Dies kann nicht rückgängig gemacht werden.",
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
const languagePreferenceStorageKey = "business-kit-language";
const defaultLanguage: ReportLanguage = "nl";

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
  language: defaultLanguage as ReportLanguage,
  reportTheme: "purple" as ReportThemeKey,
});

const siteLanguage = ref<ReportLanguage>(defaultLanguage);

// Notification system
const notification = reactive({
  visible: false,
  title: "",
  message: "",
  type: "error" as "error" | "success" | "info",
});

let notificationTimer: number | null = null;

function showNotification(title: string, message: string, type: "error" | "success" | "info" = "error") {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  notification.title = title;
  notification.message = message;
  notification.type = type;
  notification.visible = true;
  notificationTimer = window.setTimeout(() => {
    notification.visible = false;
  }, 5000);
}

function hideNotification() {
  notification.visible = false;
  if (notificationTimer) {
    clearTimeout(notificationTimer);
    notificationTimer = null;
  }
}

const status = ref<GenerateStatus>("idle");
const errorMessage = ref("");
const fileName = ref("");
const lastGeneratedAt = ref("");
const pdfDownloading = ref(false);
const reportHtml = ref("");
const showResultScreen = ref(false);
const apiCharsReceived = ref(0);

// True from first render if a ?report= param is present — prevents homepage flash
const reportLoading = ref(Boolean(getReportParam()));

// Auth
const { user, authReady } = useAuth();
const showAuthModal = ref(false);
const authModalPurpose = ref<"save" | "generate" | undefined>();
const pendingGenerate = ref(false);
const showConfirmDelete = ref(false);
const pendingDeleteId = ref<string | null>(null);

// Saved report state
const savedReportId = ref<string | null>(null);
const currentPlan = ref<BusinessKitPlan | null>(null);
const currentHtml = ref("");
const saveState = ref<"idle" | "saving" | "saved">("idle");
const pendingSave = ref(false);
const inlineReportHtml = ref("");
const iframeRef = ref<HTMLIFrameElement | null>(null);

// Rename state (inline report bar)
const isRenamingReport = ref(false);
const renameValue = ref("");
const renameInputRef = ref<HTMLInputElement | null>(null);

// Rename state (homepage saved reports list)
const renamingReportId = ref<string | null>(null);
const renameHomepageValue = ref("");

// User's saved reports list
const savedReports = ref<ReportSummary[]>([]);
const savedReportsLoading = ref(false);

function getReportParam(): string | null {
  return new URLSearchParams(window.location.search).get("report");
}
function setReportParam(id: string) {
  history.replaceState({}, "", `?report=${id}`);
}
function clearReportParam() {
  history.replaceState({}, "", window.location.pathname);
}
function permanentLink(id: string): string {
  return `${window.location.origin}${window.location.pathname}?report=${id}`;
}

function injectBase(html: string): string {
  if (/<base\s/i.test(html)) return html;

  const baseHref = new URL(".", window.location.href).href;
  const escapedBaseHref = baseHref.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  return html.replace(/<head(\s[^>]*)?>/i, (headTag) => {
    return `${headTag}\n  <base href="${escapedBaseHref}">`;
  });
}

async function doSaveReport() {
  if (!user.value || !currentPlan.value || !currentHtml.value) return;
  saveState.value = "saving";
  try {
    const id = await saveReport(currentPlan.value, user.value.uid);
    savedReportId.value = id;
    saveState.value = "saved";
    setTimeout(() => { saveState.value = "idle"; }, 2500);
    // Refresh list so the new report appears
    if (user.value) listReports(user.value.uid).then(r => { savedReports.value = r; }).catch(() => {});
  } catch (e) {
    console.error("[App] Failed to save report", e);
    saveState.value = "idle";
  }
  pendingSave.value = false;
}

function saveToAccount() {
  if (user.value) {
    doSaveReport();
  } else {
    pendingSave.value = true;
    authModalPurpose.value = "save";
    showAuthModal.value = true;
  }
}

watch(showAuthModal, (open) => {
  if (!open) {
    nextTick(() => {
      if (!user.value) {
        pendingGenerate.value = false;
        pendingSave.value = false;
      }
      authModalPurpose.value = undefined;
    });
  }
});

// Auto-save when user logs in after clicking "Save to account"
// Continue generation after sign-in from the wizard
// Also refresh the saved reports list whenever auth state changes
watch(user, async (newUser) => {
  if (newUser && pendingSave.value) {
    doSaveReport();
  }
  if (newUser && pendingGenerate.value) {
    pendingGenerate.value = false;
    // If wizard is already open, just continue; otherwise open it
    if (wizardOpen.value) {
      closeWizard();
      generateBusinessKit();
    } else {
      currentStep.value = 0;
      wizardForward.value = true;
      wizardOpen.value = true;
    }
  }
  if (newUser) {
    savedReportsLoading.value = true;
    try {
      savedReports.value = await listReports(newUser.uid);
    } catch {
      savedReports.value = [];
    } finally {
      savedReportsLoading.value = false;
    }
  } else {
    savedReports.value = [];
  }
}, { immediate: true });

async function openSavedReport(id: string) {
  if (!user.value) {
    console.warn("[App] Cannot open report: user not logged in");
    return;
  }
  try {
    const stored = await loadReport(id, user.value.uid);
    if (!stored) return;
    const html = stored.editedHtml ?? buildBusinessKitHtml(stored.plan);
    savedReportId.value = id;
    currentPlan.value = stored.plan;
    currentHtml.value = html;
    inlineReportHtml.value = patchHtmlForEditing(html);
    setReportHtml(html);
    fileName.value = businessKitFileName(stored.plan);
    setReportParam(id);
  } catch (e) {
    console.error("[App] Failed to open saved report", e);
    showNotification(ui.value.accessDenied, ui.value.accessDeniedMessage, "error");
  }
}

function askDeleteReport(id: string) {
  pendingDeleteId.value = id;
  showConfirmDelete.value = true;
}

async function confirmDeleteReport() {
  const id = pendingDeleteId.value;
  if (!id) return;
  pendingDeleteId.value = null;
  try {
    await deleteReport(id);
    savedReports.value = savedReports.value.filter((r) => r.id !== id);
    // If the deleted report is currently open, close it
    if (savedReportId.value === id) {
      savedReportId.value = null;
      inlineReportHtml.value = "";
      reportHtml.value = "";
      currentPlan.value = null;
      status.value = "idle";
      clearReportParam();
    }
  } catch (e) {
    console.error("[App] Failed to delete report", e);
  }
}

function printReport() {
  iframeRef.value?.contentWindow?.postMessage({ type: "PRINT" }, "*");
}

function startRename() {
  if (!currentPlan.value) return;
  renameValue.value = currentPlan.value.title;
  isRenamingReport.value = true;
  nextTick(() => renameInputRef.value?.select());
}

async function confirmRename() {
  if (!isRenamingReport.value) return;
  isRenamingReport.value = false;
  const newTitle = renameValue.value.trim();
  if (!newTitle || !currentPlan.value || newTitle === currentPlan.value.title) return;
  currentPlan.value = { ...currentPlan.value, title: newTitle };
  const newHtml = patchHtmlForEditing(buildBusinessKitHtml(currentPlan.value));
  inlineReportHtml.value = newHtml;
  if (savedReportId.value) {
    await renameReport(savedReportId.value, newTitle, newHtml);
  }
}

function cancelRename() {
  isRenamingReport.value = false;
}

function startRenameHomepage(r: ReportSummary) {
  renamingReportId.value = r.id;
  renameHomepageValue.value = r.title;
}

async function confirmRenameHomepage(r: ReportSummary) {
  if (renamingReportId.value !== r.id) return;
  renamingReportId.value = null;
  const newTitle = renameHomepageValue.value.trim();
  if (!newTitle || newTitle === r.title) return;
  r.title = newTitle;
  await renameReportTitle(r.id, newTitle);
}

function cancelRenameHomepage() {
  renamingReportId.value = null;
}

async function saveEdits() {
  if (!iframeRef.value?.contentWindow || !savedReportId.value) return;
  saveState.value = "saving";
  iframeRef.value.contentWindow.postMessage({ type: "REQUEST_CONTENT" }, "*");
}

function copyPermalink() {
  if (!savedReportId.value) return;
  navigator.clipboard.writeText(permanentLink(savedReportId.value)).catch(() => {});
}

const WIZARD_TOTAL = 8;
const wizardOpen = ref(false);
const currentStep = ref(0);
const wizardForward = ref(true);


const wizardProgress = computed(() => Math.round(((currentStep.value + 1) / WIZARD_TOTAL) * 100));

function openWizard() {
  if (!user.value) {
    pendingGenerate.value = true;
    authModalPurpose.value = "generate";
    showAuthModal.value = true;
    return;
  }
  currentStep.value = 0;
  wizardForward.value = true;
  wizardOpen.value = true;
}

function closeWizard() {
  wizardOpen.value = false;
}

function goNext() {
  if (currentStep.value < WIZARD_TOTAL - 1) {
    wizardForward.value = true;
    currentStep.value++;
  }
}

function goPrev() {
  if (currentStep.value > 0) {
    wizardForward.value = false;
    currentStep.value--;
  }
}

function onInputKey(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (currentStep.value === WIZARD_TOTAL - 1) generateAndClose();
    else goNext();
  }
  if (e.key === "Escape") closeWizard();
}

function onTextareaKey(e: KeyboardEvent) {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (currentStep.value === WIZARD_TOTAL - 1) generateAndClose();
    else goNext();
  }
  if (e.key === "Escape") closeWizard();
}

function generateAndClose() {
  if (!canGenerate.value) return;
  if (!user.value) {
    pendingGenerate.value = true;
    authModalPurpose.value = "generate";
    showAuthModal.value = true;
    return;
  }
  closeWizard();
  generateBusinessKit();
}

watch(currentStep, () => {
  nextTick(() => {
    const el = document.querySelector<HTMLElement>(".wizard-step input, .wizard-step textarea, .wizard-step select");
    el?.focus();
  });
});

const waitingRoom = reactive({
  active: false,
  secondsLeft: 0,
  totalSeconds: 0,
  attempt: 0,
  totalAttempts: 5,
});
let waitingRoomTimer: number | null = null;

const ui = computed(() => homepageCopy[siteLanguage.value]);

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

function changeLanguage(event: Event) {
  const nextLanguage = normalizeLanguage((event.target as HTMLSelectElement).value);
  const currentToneIsPreset = isTonePreset(form.tone);

  form.language = nextLanguage;

  if (currentToneIsPreset) {
    form.tone = homepageCopy[nextLanguage].tonePresets[0];
  }

  saveDraft();
}

async function generateBusinessKit() {
  if (!canGenerate.value) {
    return;
  }

  window.scrollTo({top: 0, left: 0, behavior: "auto"});
  status.value = "loading";
  errorMessage.value = "";

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
    kit.theme = form.reportTheme;
    const htmlText = buildBusinessKitHtml(kit);
    const nextFileName = businessKitFileName(kit);
    setReportHtml(htmlText);

    fileName.value = nextFileName;
    lastGeneratedAt.value = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    apiCharsReceived.value = ESTIMATED_RESPONSE_CHARS;
    status.value = "success";
    // Always store plan + html for deferred or immediate saving
    currentPlan.value = kit;
    currentHtml.value = htmlText;
    // Always show the inline viewer
    inlineReportHtml.value = patchHtmlForEditing(htmlText);
    // Auto-save if already logged in
    if (user.value) {
      doSaveReport();
    }
    showResultScreen.value = true;
  } catch (error) {
    status.value = "error";
    showResultScreen.value = false;
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

function setReportHtml(html: string) {
  reportHtml.value = html;
}

function openReportUser() {
  if (savedReportId.value) setReportParam(savedReportId.value);
  showResultScreen.value = false;
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
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
    Object.assign(form, draft);
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

function readLanguagePreference(): ReportLanguage | null {
  const value = localStorage.getItem(languagePreferenceStorageKey);
  return value === null ? null : normalizeLanguage(value);
}

function persistLanguagePreference(language: ReportLanguage) {
  localStorage.setItem(languagePreferenceStorageKey, language);
}

function setSiteLanguage(language: ReportLanguage) {
  siteLanguage.value = language;
  document.documentElement.lang = language;
  persistLanguagePreference(language);
}

function changeSiteLanguage(event: Event) {
  const nextLanguage = normalizeLanguage((event.target as HTMLSelectElement).value);
  setSiteLanguage(nextLanguage);
}

function isTonePreset(tone: string): boolean {
  return Object.values(homepageCopy).some((copy) => {
    return (copy.tonePresets as readonly string[]).includes(tone);
  });
}

function goHome() {
  showResultScreen.value = false;
  inlineReportHtml.value = "";
  reportHtml.value = "";
  clearReportParam();
}

function dismissError() {
  status.value = "idle";
  errorMessage.value = "";
}

function retryAfterError() {
  dismissError();
  openWizard();
}

function handleBriefEntry() {
  const onBriefPath = window.location.pathname.replace(/\/+$/, "").endsWith("/brief");

  if (window.location.hash === "#brief" || onBriefPath) {
    openWizard();
    history.replaceState(null, "", "/");
  }
}

function revokeReportUrl() {
  reportHtml.value = "";
}

onMounted(async () => {
  restoreDraft();
  
  // Set site language from preference or default
  const savedLanguage = localStorage.getItem(languagePreferenceStorageKey);
  if (savedLanguage && ["nl", "en", "fr", "de"].includes(savedLanguage)) {
    setSiteLanguage(savedLanguage as ReportLanguage);
  } else {
    setSiteLanguage(siteLanguage.value);
  }
  
  handleBriefEntry();

  // Load saved report from URL param
  const reportParam = getReportParam();
  if (reportParam) {
    // Wait for auth to be ready before loading report
    const checkAuth = async () => {
      // Poll for auth ready state (max 5 seconds)
      for (let i = 0; i < 50; i++) {
        if (authReady.value) break;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (!user.value) {
        console.warn("[App] Cannot load report: user not logged in");
        showNotification(ui.value.accessDenied, ui.value.accessDeniedMessage, "error");
        clearReportParam();
        reportLoading.value = false;
        return;
      }
      
      try {
        const stored = await loadReport(reportParam, user.value.uid);
        if (stored) {
          const html = stored.editedHtml ?? buildBusinessKitHtml(stored.plan);
          savedReportId.value = reportParam;
          currentPlan.value = stored.plan;
          currentHtml.value = html;
          inlineReportHtml.value = patchHtmlForEditing(html);
          setReportHtml(html);
          fileName.value = businessKitFileName(stored.plan);
        } else {
          clearReportParam();
        }
      } catch (e) {
        console.error("[App] Failed to load report", e);
        showNotification(ui.value.accessDenied, ui.value.reportNotFound, "error");
        clearReportParam();
      } finally {
        reportLoading.value = false;
      }
    };
    
    checkAuth();
  }

  // Handle iframe postMessage
  window.addEventListener("message", async (e) => {
    if (!e.data || typeof e.data !== "object") return;

    // Iframe requests save to account (button inside report)
    if (e.data.type === "SAVE_REQUEST") {
      saveToAccount();
    }

    // Iframe sends back full HTML after saveEdits() triggers REQUEST_CONTENT
    if (e.data.type === "REPORT_CONTENT" && savedReportId.value) {
      try {
        await patchReport(savedReportId.value, e.data.html as string);
        saveState.value = "saved";
        iframeRef.value?.contentWindow?.postMessage({ type: "SAVE_CONFIRMED" }, "*");
        setTimeout(() => { saveState.value = "idle"; }, 2500);
      } catch (err) {
        console.error("[App] Failed to patch report", err);
        saveState.value = "idle";
      }
    }
  });
});

onBeforeUnmount(() => {
  revokeReportUrl();
  stopWaitingRoom();
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
});
</script>

<template>
  <main class="product-shell" :lang="form.language">
    <!-- Typeform-style wizard overlay -->
    <Teleport to="body">
      <div v-if="wizardOpen" class="wizard-overlay" role="dialog" aria-modal="true">
        <div class="wizard-header">
          <button class="wizard-close" type="button" @click="closeWizard" aria-label="Sluiten">
            <X :size="20" />
          </button>
          <div class="wizard-progress-track" aria-hidden="true">
            <div class="wizard-progress-fill" :style="{width: wizardProgress + '%'}"></div>
          </div>
          <span class="wizard-counter" aria-live="polite">{{ String(currentStep + 1).padStart(2, '0') }} / {{ String(WIZARD_TOTAL).padStart(2, '0') }}</span>
        </div>

        <div class="wizard-body">
          <Transition :name="wizardForward ? 'wz-fwd' : 'wz-bwd'" mode="out-in">
            <div class="wizard-step" :key="currentStep">

              <!-- Step 0: Naam + Markt -->
              <template v-if="currentStep === 0">
                <p class="wz-eyebrow">{{ ui.briefEyebrow }}</p>
                <h2 class="wz-question">{{ ui.businessName }}</h2>
                <div class="wz-fields">
                  <label class="wz-field">
                    <span class="wz-label">{{ ui.businessName }}</span>
                    <input v-model="form.businessName" type="text" :placeholder="ui.businessNamePlaceholder" @keydown="onInputKey" autofocus />
                  </label>
                  <label class="wz-field">
                    <span class="wz-label">{{ ui.market }}</span>
                    <input v-model="form.region" type="text" :placeholder="ui.marketPlaceholder" @keydown="onInputKey" />
                  </label>
                </div>
              </template>

              <!-- Step 1: Type bedrijf -->
              <template v-else-if="currentStep === 1">
                <p class="wz-eyebrow">02 — {{ ui.businessType }}</p>
                <h2 class="wz-question">{{ ui.businessType }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <textarea v-model="form.businessType" rows="4" :placeholder="ui.businessTypePlaceholder" @keydown="onTextareaKey"></textarea>
                    <span class="wz-hint">⌘ + Enter ↵</span>
                  </label>
                </div>
              </template>

              <!-- Step 2: Huidig aanbod -->
              <template v-else-if="currentStep === 2">
                <p class="wz-eyebrow">03 — {{ ui.currentOffer }}</p>
                <h2 class="wz-question">{{ ui.currentOffer }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <textarea v-model="form.offer" rows="4" :placeholder="ui.currentOfferPlaceholder" @keydown="onTextareaKey"></textarea>
                    <span class="wz-hint">⌘ + Enter ↵</span>
                  </label>
                </div>
              </template>

              <!-- Step 3: Doelklant -->
              <template v-else-if="currentStep === 3">
                <p class="wz-eyebrow">04 — {{ ui.targetCustomer }}</p>
                <h2 class="wz-question">{{ ui.targetCustomer }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <textarea v-model="form.audience" rows="4" :placeholder="ui.targetCustomerPlaceholder" @keydown="onTextareaKey"></textarea>
                    <span class="wz-hint">⌘ + Enter ↵</span>
                  </label>
                </div>
              </template>

              <!-- Step 4: Probleem -->
              <template v-else-if="currentStep === 4">
                <p class="wz-eyebrow">05 — {{ ui.mainProblem }}</p>
                <h2 class="wz-question">{{ ui.mainProblem }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <textarea v-model="form.problem" rows="4" :placeholder="ui.mainProblemPlaceholder" @keydown="onTextareaKey"></textarea>
                    <span class="wz-hint">⌘ + Enter ↵</span>
                  </label>
                </div>
              </template>

              <!-- Step 5: Doel -->
              <template v-else-if="currentStep === 5">
                <p class="wz-eyebrow">06 — {{ ui.goal }}</p>
                <h2 class="wz-question">{{ ui.goal }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <textarea v-model="form.goal" rows="4" :placeholder="ui.goalPlaceholder" @keydown="onTextareaKey"></textarea>
                    <span class="wz-hint">⌘ + Enter ↵</span>
                  </label>
                </div>
              </template>

              <!-- Step 6: Kanalen + Prijsniveau -->
              <template v-else-if="currentStep === 6">
                <p class="wz-eyebrow">07 — {{ ui.channels }}</p>
                <h2 class="wz-question">{{ ui.channels }}</h2>
                <div class="wz-fields">
                  <label class="wz-field wz-field--full">
                    <span class="wz-label">{{ ui.channels }}</span>
                    <textarea v-model="form.channels" rows="3" :placeholder="ui.channelsPlaceholder" @keydown="onTextareaKey"></textarea>
                  </label>
                  <label class="wz-field">
                    <span class="wz-label">{{ ui.pricePoint }}</span>
                    <input v-model="form.pricePoint" type="text" :placeholder="ui.pricePointPlaceholder" @keydown="onInputKey" />
                  </label>
                </div>
              </template>

              <!-- Step 7: Taal + Toon + Generate -->
              <template v-else-if="currentStep === 7">
                <p class="wz-eyebrow">08 — {{ ui.reportLanguage }}</p>
                <h2 class="wz-question">{{ ui.reportLanguage }} &amp; {{ ui.reportTone }}</h2>
                <div class="wz-fields">
                  <label class="wz-field">
                    <span class="wz-label">{{ ui.reportLanguage }}</span>
                    <select :value="form.language" @change="changeLanguage">
                      <option v-for="lang in languageOptions" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
                    </select>
                  </label>
                  <label class="wz-field">
                    <span class="wz-label">{{ ui.reportTone }}</span>
                    <input v-model="form.tone" type="text" :placeholder="ui.reportTonePlaceholder" @keydown="onInputKey" />
                  </label>
                  <div class="wz-presets" :aria-label="ui.tonePresetsAria">
                    <button v-for="preset in tonePresets" :key="preset" type="button" class="preset-button" @click="useTone(preset)">
                      {{ preset }}
                    </button>
                  </div>
                  <div class="wz-field">
                    <span class="wz-label">{{ ui.reportTheme }}</span>
                    <div class="wz-theme-swatches">
                      <button
                        v-for="(theme, key) in REPORT_THEMES"
                        :key="key"
                        type="button"
                        class="theme-swatch"
                        :style="{ background: theme.swatch, boxShadow: form.reportTheme === key ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${theme.swatch}` : 'none' }"
                        :title="theme.label"
                        :aria-label="theme.label"
                        @click="form.reportTheme = key as ReportThemeKey"
                      />
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </Transition>
        </div>

        <div class="wizard-footer">
          <button v-if="currentStep > 0" class="wizard-back" type="button" @click="goPrev">← {{ ui.backToBrief.split(' ')[0] }}</button>
          <div class="wizard-footer-right">
            <button v-if="currentStep < WIZARD_TOTAL - 1" class="wizard-next" type="button" @click="goNext">
              OK <ArrowRight :size="16" />
            </button>
            <button v-else class="wizard-generate" type="button" @click="generateAndClose" :disabled="!canGenerate">
              <Sparkles :size="18" />
              {{ ui.actionGenerate }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

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

    <section v-if="status === 'error'" class="error-screen" aria-labelledby="error-title">
      <div class="error-panel">
        <AlertCircle :size="40" aria-hidden="true" />
        <p class="eyebrow">{{ ui.errorEyebrow }}</p>
        <h2 id="error-title">{{ ui.errorTitle }}</h2>
        <p class="error-text">{{ errorMessage }}</p>
        <div class="result-actions">
          <button class="result-primary" type="button" @click="retryAfterError">
            <Sparkles :size="19" />
            {{ ui.errorRetry }}
          </button>
          <button class="result-secondary" type="button" @click="dismissError(); goHome()">
            {{ ui.errorDismiss }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="showResultScreen && status === 'success'" class="result-screen" aria-labelledby="result-title">
      <div class="result-hero">
        <div class="result-copy">
          <p class="eyebrow">{{ ui.resultEyebrow }}</p>
          <h2 id="result-title">{{ ui.resultTitle }}</h2>
          <p>{{ resultDescription }}</p>
          <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

          <div class="result-actions">
            <button class="result-primary" type="button" @click="openReportUser" :disabled="!reportHtml">
              {{ ui.openReport }}
            </button>
            <button class="result-secondary" type="button" @click="downloadPdf" :disabled="!reportHtml || pdfDownloading">
              <FileText :size="19" />
              <span v-if="pdfDownloading">{{ ui.preparingPdf }}</span>
              <span v-else>{{ ui.downloadPdf }}</span>
            </button>
            <button class="result-secondary" type="button" @click="goHome">
              {{ ui.backToBrief }}
            </button>
          </div>

          <!-- Save status (no link shown) -->
          <div v-if="savedReportId" class="report-save-panel">
            <div class="report-save-status">
              <CheckCircle2 :size="15" />
              <span>{{ ui.reportSaved }}</span>
            </div>
          </div>
          <div v-else-if="!user" class="report-save-panel report-save-panel--cta">
            <button class="report-signin-cta" type="button" @click="showAuthModal = true">
              <LogIn :size="15" />
              {{ ui.signInToSave }}
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
          <h3>{{ currentPlan?.title ?? fileName }}</h3>
          <div class="result-list">
            <div>
              <span>{{ ui.language }}</span>
              <strong>{{ selectedLanguageLabel }}</strong>
            </div>
            <div>
              <span>{{ ui.includes }}</span>
              <strong>{{ ui.includesText }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Inline editable report viewer -->
    <section v-if="inlineReportHtml" class="inline-report-section">
      <div class="inline-report-bar">
        <button class="inline-back-btn" type="button" @click="goHome">
          <ArrowLeft :size="15" />
          <span class="btn-label">{{ ui.backToBrief }}</span>
        </button>
        <input
          v-if="isRenamingReport"
          ref="renameInputRef"
          v-model="renameValue"
          class="inline-report-bar-rename-input"
          type="text"
          :placeholder="ui.renamePlaceholder"
          @keydown.enter.prevent="confirmRename"
          @keydown.escape="cancelRename"
          @blur="confirmRename"
        />
        <template v-else>
          <span class="inline-report-bar-label">{{ currentPlan?.title ?? ui.reportFallbackTitle }}</span>
          <button class="inline-rename-btn" type="button" @click="startRename" :title="ui.renamePlaceholder">
            <Pencil :size="13" />
          </button>
        </template>
        <div class="inline-report-bar-actions">
          <!-- Download as PDF -->
          <button class="inline-pdf-btn" type="button" @click="printReport">
            <Printer :size="15" />
            <span class="btn-label">{{ ui.downloadPdf }}</span>
          </button>

          <!-- Not logged in and not saved: prompt sign-in -->
          <button
            v-if="!savedReportId && !user"
            class="inline-save-btn inline-save-btn--account"
            type="button"
            @click="saveToAccount"
          >
            <LogIn :size="15" />
            <span class="btn-label">{{ ui.saveToAccount }}</span>
          </button>

          <!-- Logged in but auto-save still in progress -->
          <span v-else-if="!savedReportId && user" class="inline-saving-indicator">
            {{ ui.savingLabel }}
          </span>

          <!-- Saved: show save-changes -->
          <button
            v-else
            class="inline-save-btn"
            type="button"
            :disabled="saveState === 'saving'"
            @click="saveEdits"
          >
            <Save :size="15" />
            <span class="btn-label">{{ saveState === "saved" ? ui.savedLabel : saveState === "saving" ? ui.savingLabel : ui.saveChanges }}</span>
          </button>
        </div>
      </div>
      <iframe
        ref="iframeRef"
        :srcdoc="inlineReportHtml"
        sandbox="allow-scripts allow-same-origin allow-modals"
        class="inline-report-frame"
        :title="ui.reportViewerTitle"
      />
    </section>

    <header v-if="!inlineReportHtml && !reportLoading" class="site-nav">
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
            <select :value="siteLanguage" :aria-label="ui.languageSwitcherLabel" @change="changeSiteLanguage">
              <option v-for="language in languageOptions" :key="language.value" :value="language.value">
                {{ language.label }}
              </option>
            </select>
          </label>

          <template v-if="user">
            <div class="nav-user-chip">
              <span class="nav-user-avatar">{{ (user.displayName || user.email || '?')[0].toUpperCase() }}</span>
              <span class="nav-user-label">{{ user.displayName || user.email }}</span>
            </div>
            <button class="nav-icon-btn" type="button" :title="ui.signOut" @click="signOut()">
              <LogOut :size="16" />
            </button>
          </template>
          <button v-else class="nav-signin-btn" type="button" @click="showAuthModal = true">
            <LogIn :size="15" />
            {{ ui.signIn }}
          </button>
        </div>

      </div>
    </header>

    <section v-if="!inlineReportHtml && !reportLoading" id="brief" class="hero-section" aria-labelledby="page-title">
      <div class="studio-layout">
        <div class="hero-content">
          <p class="eyebrow">{{ ui.heroEyebrow }}</p>
          <h1 id="page-title">{{ ui.heroTitle }}</h1>
          <p class="hero-copy">{{ ui.heroCopy }}</p>

          <div class="hero-actions">
            <button class="primary-link" type="button" @click="openWizard">
              <Sparkles :size="19" />
              {{ ui.heroPrimary }}
              <ArrowRight :size="18" />
            </button>
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

          </div>
        </div>

      </div>
    </section>

    <section v-if="user && !inlineReportHtml && !reportLoading" class="saved-reports-section">
      <div class="saved-reports-inner">
        <h2 class="saved-reports-title">{{ ui.savedReportsTitle }}</h2>
        <p v-if="savedReportsLoading" class="saved-reports-empty">{{ ui.savedReportsLoading }}</p>
        <p v-else-if="!savedReports.length" class="saved-reports-empty">{{ ui.savedReportsEmpty }}</p>
        <ul v-else class="saved-reports-list">
          <li v-for="r in savedReports" :key="r.id" class="saved-report-item">
            <input
              v-if="renamingReportId === r.id"
              :ref="(el) => { if (el) (el as HTMLInputElement).select(); }"
              v-model="renameHomepageValue"
              class="saved-report-rename-input"
              type="text"
              :placeholder="ui.renamePlaceholder"
              @keydown.enter.prevent="confirmRenameHomepage(r)"
              @keydown.escape="cancelRenameHomepage"
              @blur="confirmRenameHomepage(r)"
            />
            <button v-else class="saved-report-title" type="button" @click="startRenameHomepage(r)">
              <span class="saved-report-title-text">{{ r.title }}</span>
              <Pencil :size="11" class="saved-report-rename-icon" />
            </button>
            <span class="saved-report-date">{{ r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '' }}</span>
            <button class="saved-report-open" type="button" @click="openSavedReport(r.id)">{{ ui.savedReportOpen }}</button>
            <button class="saved-report-delete" type="button" :title="ui.deleteReport" @click="askDeleteReport(r.id)">
              <Trash2 :size="14" />
            </button>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="!inlineReportHtml && !reportLoading" id="output" class="proof-section" :aria-label="ui.proofAria">
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

    <footer v-if="!inlineReportHtml && !reportLoading" class="site-footer">
      <p>
        {{ ui.footerByline }}
        <a href="https://jcode.be" target="_blank" rel="noopener noreferrer">jcode.be</a>
      </p>
    </footer>

    <AuthModal v-model="showAuthModal" :purpose="authModalPurpose" :language="siteLanguage" />
    <ConfirmModal
      v-model="showConfirmDelete"
      :title="ui.deleteReport"
      :message="ui.deleteReportConfirm"
      :confirm-label="ui.deleteReport"
      :cancel-label="ui.cancel"
      @confirm="confirmDeleteReport"
    />

    <!-- Notification toast -->
    <Teleport to="body">
      <Transition name="notification-slide">
        <div v-if="notification.visible" class="notification-toast" :class="`notification-${notification.type}`" role="alert">
          <div class="notification-content">
            <div class="notification-header">
              <AlertCircle v-if="notification.type === 'error'" :size="18" />
              <CheckCircle2 v-if="notification.type === 'success'" :size="18" />
              <strong>{{ notification.title }}</strong>
            </div>
            <p>{{ notification.message }}</p>
          </div>
          <button class="notification-close" type="button" @click="hideNotification" aria-label="Close notification">
            <X :size="16" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
