import { buildInlineFontFaceHtml, buildSystemFontOverrideHtml } from "./fonts";
import { POLLINATIONS_API_KEY, POLLINATIONS_MODEL } from "./pollinationsConfig";

export type BusinessKitLanguage = "en" | "nl" | "fr" | "de";

export type BusinessKitRequest = {
  businessName?: string;
  businessType?: string;
  offer?: string;
  audience?: string;
  problem?: string;
  goal?: string;
  channels?: string;
  pricePoint?: string;
  alreadyWorking?: string;
  inProgress?: string;
  region?: string;
  tone?: string;
  language: BusinessKitLanguage;
};

type ExecChips = {
  lever: string;
  blocker: string;
  action: string;
};

type UpsellIdea = {
  title: string;
  price: string;
  scope: string;
  trigger: string;
};

type BusinessScore = {
  label: string;
  score: number;
  rationale: string;
  nextMove: string;
};

type StrategySection = {
  title: string;
  diagnosis: string;
  moves: string[];
};

type ActionItem = {
  day: string;
  task: string;
  outcome: string;
};

type BusinessTemplate = {
  title: string;
  channel: string;
  body: string;
};

type ContentIdea = {
  title: string;
  angle: string;
  hook: string;
};

type BusinessMetric = {
  metric: string;
  target: string;
  why: string;
};

type CompetitorItem = {
  competitor: string;
  weakness: string;
  ourAdvantage: string;
};

export type ReportThemeKey = "purple" | "blue" | "teal" | "rose" | "amber";

export type ReportTheme = {
  label: string;
  swatch: string;
  accent: string;
  accentMid: string;
  accentDark: string;
  coverDark: string;
  coverGradient: string;
  bodyBg: string;
  surface: string;
  surface2: string;
  mint: string;
};

export const REPORT_THEMES: Record<ReportThemeKey, ReportTheme> = {
  purple: {
    label: "Purple",
    swatch: "#d6a4e3",
    accent: "#d6a4e3",
    accentMid: "#6f6acf",
    accentDark: "#5a4ec8",
    coverDark: "#100d28",
    coverGradient: "linear-gradient(135deg, #100d28 0%, #1a1635 45%, #6f6acf 100%)",
    bodyBg: "#100d28",
    surface: "#1a1635",
    surface2: "#211c43",
    mint: "rgba(214, 164, 227, 0.12)",
  },
  blue: {
    label: "Blue",
    swatch: "#60a5fa",
    accent: "#60a5fa",
    accentMid: "#3b82f6",
    accentDark: "#2563eb",
    coverDark: "#0a1628",
    coverGradient: "linear-gradient(135deg, #0a1628 0%, #0f2148 50%, #3b82f6 100%)",
    bodyBg: "#0a1628",
    surface: "#0f2148",
    surface2: "#152a55",
    mint: "rgba(96, 165, 250, 0.12)",
  },
  teal: {
    label: "Teal",
    swatch: "#2dd4bf",
    accent: "#2dd4bf",
    accentMid: "#14b8a6",
    accentDark: "#0d9488",
    coverDark: "#081c1a",
    coverGradient: "linear-gradient(135deg, #081c1a 0%, #0d2926 50%, #14b8a6 100%)",
    bodyBg: "#081c1a",
    surface: "#0d2926",
    surface2: "#123530",
    mint: "rgba(45, 212, 191, 0.12)",
  },
  rose: {
    label: "Rose",
    swatch: "#f472b6",
    accent: "#f472b6",
    accentMid: "#ec4899",
    accentDark: "#db2777",
    coverDark: "#1a0b12",
    coverGradient: "linear-gradient(135deg, #1a0b12 0%, #2d1020 50%, #ec4899 100%)",
    bodyBg: "#1a0b12",
    surface: "#2d1020",
    surface2: "#3a1529",
    mint: "rgba(244, 114, 182, 0.12)",
  },
  amber: {
    label: "Amber",
    swatch: "#fbbf24",
    accent: "#fbbf24",
    accentMid: "#f59e0b",
    accentDark: "#d97706",
    coverDark: "#1c1208",
    coverGradient: "linear-gradient(135deg, #1c1208 0%, #2d1e08 50%, #f59e0b 100%)",
    bodyBg: "#1c1208",
    surface: "#2d1e08",
    surface2: "#3d2a0c",
    mint: "rgba(251, 191, 36, 0.12)",
  },
};

export type BusinessKitPlan = {
  language: BusinessKitLanguage;
  theme?: ReportThemeKey;
  /** When true (default), exported reports include a GrowthKit referral footer. */
  showBranding?: boolean;
  title: string;
  subtitle: string;
  executiveSummary: string;
  executiveSummaryChips?: ExecChips;
  positioning: string;
  coreOfferRewrite: string;
  idealCustomerProfile: string;
  biggestRisks: string[];
  quickWins: string[];
  strategySections: StrategySection[];
  scorecard: BusinessScore[];
  competitorAnalysis: CompetitorItem[];
  actionPlan: ActionItem[];
  templates: BusinessTemplate[];
  contentIdeas: ContentIdea[];
  metrics: BusinessMetric[];
  upsellIdeas: UpsellIdea[];
  assumptions: string[];
  disclaimer: string;
};

type ReportLabels = {
  htmlLang: string;
  productName: string;
  generated: string;
  strategyReport: string;
  actionPlanPill: string;
  printPdf: string;
  downloadHtml: string;
  executiveSummary: string;
  positioning: string;
  coreOfferRewrite: string;
  idealCustomerProfile: string;
  fastestQuickWins: string;
  growthScorecard: string;
  competitorAnalysis: string;
  competitor: string;
  competitorWeakness: string;
  competitorAdvantage: string;
  strategicMoves: string;
  actionPlan: string;
  salesTemplates: string;
  contentIdeas: string;
  metricsToTrack: string;
  metric: string;
  target: string;
  whyItMatters: string;
  biggestRisks: string;
  upsellIdeas: string;
  assumptions: string;
  next: string;
  hook: string;
  implementationWorkspace: string;
  workspaceTitle: string;
  workspaceIntro: string;
  progressComplete: string;
  completed: string;
  remaining: string;
  nextFocus: string;
  allActionsDone: string;
  resetProgress: string;
  savedLocally: string;
  saveUnavailable: string;
  trackerHint: string;
  markComplete: string;
  done: string;
  inProgress: string;
  notStarted: string;
  notes: string;
  notesPlaceholder: string;
  copyToClipboard: string;
  copied: string;
  readingTime: string;
  jumpToSection: string;
  execLever: string;
  execBlocker: string;
  execAction: string;
  upsellPrice: string;
  upsellScope: string;
  upsellTrigger: string;
  madeWith: string;
  lightMode: string;
  darkMode: string;
  switchToLightMode: string;
  switchToDarkMode: string;
};

const reportLabels: Record<BusinessKitLanguage, ReportLabels> = {
  en: {
    htmlLang: "en",
    productName: "Entrepreneur Growth Kit",
    generated: "Generated",
    strategyReport: "Strategy Report",
    actionPlanPill: "30-Day Action Plan",
    printPdf: "Print / Save PDF",
    downloadHtml: "Download HTML",
    executiveSummary: "Executive Summary",
    positioning: "Positioning",
    coreOfferRewrite: "Core Offer Rewrite",
    idealCustomerProfile: "Ideal Customer Profile",
    fastestQuickWins: "Fastest Quick Wins",
    growthScorecard: "Growth Scorecard",
    strategicMoves: "Strategic Moves",
    actionPlan: "30-Day Action Plan",
    salesTemplates: "Sales And Follow-Up Templates",
    contentIdeas: "Content Ideas",
    metricsToTrack: "Metrics To Track",
    metric: "Metric",
    target: "Target",
    whyItMatters: "Why It Matters",
    biggestRisks: "Biggest Risks",
    upsellIdeas: "Upsell Ideas",
    assumptions: "Assumptions",
    next: "Next",
    hook: "Hook",
    implementationWorkspace: "Implementation Workspace",
    workspaceTitle: "Work the plan, not just read it.",
    workspaceIntro: "Check off actions as you finish them, keep working notes beside each task, and come back with your progress still intact.",
    progressComplete: "complete",
    completed: "completed",
    remaining: "remaining",
    nextFocus: "Next focus",
    allActionsDone: "Every action is complete. Review the metrics and choose the next growth cycle.",
    resetProgress: "Reset progress",
    savedLocally: "Progress saved on this device",
    saveUnavailable: "Progress tracking is available while this report is open",
    trackerHint: "Your progress is stored in this browser only.",
    markComplete: "Mark complete",
    done: "Done",
    inProgress: "In progress",
    notStarted: "Not started",
    notes: "Notes",
    notesPlaceholder: "Add decisions, blockers, links, or proof from this step.",
    copyToClipboard: "Copy",
    copied: "Copied!",
    readingTime: "min read",
    jumpToSection: "Jump to",
    competitorAnalysis: "Competitor Analysis",
    competitor: "Competitor",
    competitorWeakness: "Weakness",
    competitorAdvantage: "Our Advantage",
    execLever: "Growth Lever",
    execBlocker: "Blocker",
    execAction: "30-Day Shift",
    upsellPrice: "Price range",
    upsellScope: "What they get",
    upsellTrigger: "When to pitch",
    madeWith: "Made with GrowthKit — get your growth report",
    lightMode: "Light",
    darkMode: "Dark",
    switchToLightMode: "Switch to light mode",
    switchToDarkMode: "Switch to dark mode",
  },
  nl: {
    htmlLang: "nl",
    productName: "Ondernemers Groeikit",
    generated: "Gegenereerd",
    strategyReport: "Strategisch rapport",
    actionPlanPill: "Actieplan voor 30 dagen",
    printPdf: "Afdrukken / opslaan als PDF",
    downloadHtml: "HTML downloaden",
    executiveSummary: "Managementsamenvatting",
    positioning: "Positionering",
    coreOfferRewrite: "Herwerkte kernpropositie",
    idealCustomerProfile: "Ideaal klantprofiel",
    fastestQuickWins: "Snelste quick wins",
    growthScorecard: "Groei-scorecard",
    strategicMoves: "Strategische acties",
    actionPlan: "Actieplan voor 30 dagen",
    salesTemplates: "Sales- en opvolgtemplates",
    contentIdeas: "Contentideeën",
    metricsToTrack: "Metrics om te volgen",
    metric: "Metriek",
    target: "Doel",
    whyItMatters: "Waarom dit telt",
    biggestRisks: "Grootste risico's",
    upsellIdeas: "Upsell-ideeën",
    assumptions: "Aannames",
    next: "Volgende stap",
    hook: "Haakje",
    implementationWorkspace: "Implementatiewerkruimte",
    workspaceTitle: "Werk met het plan, lees het niet alleen.",
    workspaceIntro: "Vink acties af wanneer je ze afrondt, bewaar werknotities per taak en kom later terug met je voortgang intact.",
    progressComplete: "voltooid",
    completed: "voltooid",
    remaining: "resterend",
    nextFocus: "Volgende focus",
    allActionsDone: "Alle acties zijn afgerond. Bekijk de metrics en kies de volgende groeicyclus.",
    resetProgress: "Voortgang resetten",
    savedLocally: "Voortgang opgeslagen op dit apparaat",
    saveUnavailable: "Voortgang bijhouden is beschikbaar zolang dit rapport open is",
    trackerHint: "Je voortgang wordt alleen in deze browser opgeslagen.",
    markComplete: "Markeer als voltooid",
    done: "Voltooid",
    inProgress: "Bezig",
    notStarted: "Niet gestart",
    notes: "Notities",
    notesPlaceholder: "Voeg beslissingen, blokkades, links of bewijs van deze stap toe.",
    copyToClipboard: "Kopiëren",
    copied: "Gekopieerd!",
    readingTime: "min lezen",
    jumpToSection: "Ga naar",
    competitorAnalysis: "Concurrentieanalyse",
    competitor: "Concurrent",
    competitorWeakness: "Zwakke punt",
    competitorAdvantage: "Ons voordeel",
    execLever: "Groeihefboom",
    execBlocker: "Blokkade",
    execAction: "Aanpak in 30 dagen",
    upsellPrice: "Prijsrange",
    upsellScope: "Wat ze krijgen",
    upsellTrigger: "Wanneer pitchen",
    madeWith: "Gemaakt met GrowthKit — genereer je groeirapport",
    lightMode: "Licht",
    darkMode: "Donker",
    switchToLightMode: "Schakel naar lichte modus",
    switchToDarkMode: "Schakel naar donkere modus",
  },
  fr: {
    htmlLang: "fr",
    productName: "Kit de croissance entrepreneur",
    generated: "Généré",
    strategyReport: "Rapport stratégique",
    actionPlanPill: "Plan d'action de 30 jours",
    printPdf: "Imprimer / enregistrer en PDF",
    downloadHtml: "Télécharger le HTML",
    executiveSummary: "Résumé exécutif",
    positioning: "Positionnement",
    coreOfferRewrite: "Reformulation de l'offre principale",
    idealCustomerProfile: "Profil client idéal",
    fastestQuickWins: "Actions rapides prioritaires",
    growthScorecard: "Tableau de bord de croissance",
    strategicMoves: "Actions stratégiques",
    actionPlan: "Plan d'action de 30 jours",
    salesTemplates: "Modèles de vente et de relance",
    contentIdeas: "Idées de contenu",
    metricsToTrack: "Indicateurs à suivre",
    metric: "Indicateur",
    target: "Objectif",
    whyItMatters: "Pourquoi c'est important",
    biggestRisks: "Principaux risques",
    upsellIdeas: "Idées d'upsell",
    assumptions: "Hypothèses",
    next: "Prochaine étape",
    hook: "Accroche",
    implementationWorkspace: "Espace de mise en oeuvre",
    workspaceTitle: "Travaillez le plan, ne vous contentez pas de le lire.",
    workspaceIntro: "Cochez les actions au fur et à mesure, gardez vos notes de travail et retrouvez votre progression quand vous revenez au rapport.",
    progressComplete: "terminé",
    completed: "terminées",
    remaining: "restantes",
    nextFocus: "Prochain focus",
    allActionsDone: "Toutes les actions sont terminées. Passez aux indicateurs et choisissez le prochain cycle de croissance.",
    resetProgress: "Réinitialiser la progression",
    savedLocally: "Progression enregistrée sur cet appareil",
    saveUnavailable: "Le suivi de progression est disponible tant que ce rapport est ouvert",
    trackerHint: "Votre progression est enregistrée uniquement dans ce navigateur.",
    markComplete: "Marquer comme terminé",
    done: "Terminé",
    inProgress: "En cours",
    notStarted: "Non commencé",
    notes: "Notes",
    notesPlaceholder: "Ajoutez décisions, blocages, liens ou preuves liés à cette étape.",
    copyToClipboard: "Copier",
    copied: "Copié !",
    readingTime: "min de lecture",
    jumpToSection: "Aller à",
    competitorAnalysis: "Analyse concurrentielle",
    competitor: "Concurrent",
    competitorWeakness: "Point faible",
    competitorAdvantage: "Notre avantage",
    execLever: "Levier de croissance",
    execBlocker: "Obstacle",
    execAction: "Virage en 30 jours",
    upsellPrice: "Fourchette de prix",
    upsellScope: "Ce qu'ils reçoivent",
    upsellTrigger: "Quand proposer",
    madeWith: "Créé avec GrowthKit — obtenez votre rapport de croissance",
    lightMode: "Clair",
    darkMode: "Sombre",
    switchToLightMode: "Passer en mode clair",
    switchToDarkMode: "Passer en mode sombre",
  },
  de: {
    htmlLang: "de",
    productName: "Wachstumskit für Unternehmer",
    generated: "Erstellt",
    strategyReport: "Strategiebericht",
    actionPlanPill: "30-Tage-Aktionsplan",
    printPdf: "Drucken / als PDF speichern",
    downloadHtml: "HTML herunterladen",
    executiveSummary: "Zusammenfassung",
    positioning: "Positionierung",
    coreOfferRewrite: "Überarbeitete Kernofferte",
    idealCustomerProfile: "Ideales Kundenprofil",
    fastestQuickWins: "Schnellste Quick Wins",
    growthScorecard: "Wachstums-Scorecard",
    strategicMoves: "Strategische Schritte",
    actionPlan: "30-Tage-Aktionsplan",
    salesTemplates: "Vertriebs- und Follow-up-Vorlagen",
    contentIdeas: "Content-Ideen",
    metricsToTrack: "Kennzahlen zum Verfolgen",
    metric: "Kennzahl",
    target: "Ziel",
    whyItMatters: "Warum es wichtig ist",
    biggestRisks: "Größte Risiken",
    upsellIdeas: "Upsell-Ideen",
    assumptions: "Annahmen",
    next: "Nächster Schritt",
    hook: "Aufhänger",
    implementationWorkspace: "Umsetzungsbereich",
    workspaceTitle: "Arbeite mit dem Plan, statt ihn nur zu lesen.",
    workspaceIntro: "Hake Aktionen ab, sobald du sie erledigst, speichere Arbeitsnotizen und komme später mit erhaltenem Fortschritt zurück.",
    progressComplete: "abgeschlossen",
    completed: "abgeschlossen",
    remaining: "offen",
    nextFocus: "Nächster Fokus",
    allActionsDone: "Alle Aktionen sind abgeschlossen. Prüfe die Kennzahlen und wähle den nächsten Wachstumszyklus.",
    resetProgress: "Fortschritt zurücksetzen",
    savedLocally: "Fortschritt auf diesem Gerät gespeichert",
    saveUnavailable: "Fortschrittstracking ist verfügbar, solange dieser Bericht geöffnet ist",
    trackerHint: "Dein Fortschritt wird nur in diesem Browser gespeichert.",
    markComplete: "Als erledigt markieren",
    done: "Erledigt",
    inProgress: "In Arbeit",
    notStarted: "Nicht gestartet",
    notes: "Notizen",
    notesPlaceholder: "Ergänze Entscheidungen, Blocker, Links oder Nachweise zu diesem Schritt.",
    copyToClipboard: "Kopieren",
    copied: "Kopiert!",
    readingTime: "Min. Lesezeit",
    jumpToSection: "Gehe zu",
    competitorAnalysis: "Wettbewerbsanalyse",
    competitor: "Wettbewerber",
    competitorWeakness: "Schwachpunkt",
    competitorAdvantage: "Unser Vorteil",
    execLever: "Wachstumshebel",
    execBlocker: "Hindernis",
    execAction: "Kurs in 30 Tagen",
    upsellPrice: "Preisbereich",
    upsellScope: "Was sie erhalten",
    upsellTrigger: "Wann pitchen",
    madeWith: "Erstellt mit GrowthKit — holen Sie sich Ihren Wachstumsbericht",
    lightMode: "Hell",
    darkMode: "Dunkel",
    switchToLightMode: "Zum hellen Modus wechseln",
    switchToDarkMode: "Zum dunklen Modus wechseln",
  },
};

const GROWTHKIT_SITE = "https://growthkit.jcode.be/?ref=report";

function estimateReadingMinutes(plan: BusinessKitPlan): number {
  const text = [
    plan.executiveSummary,
    plan.positioning,
    plan.coreOfferRewrite,
    plan.idealCustomerProfile,
    plan.biggestRisks.join(" "),
    plan.quickWins.join(" "),
    plan.strategySections.map((s) => s.diagnosis + " " + s.moves.join(" ")).join(" "),
    plan.scorecard.map((s) => s.rationale + " " + s.nextMove).join(" "),
    plan.competitorAnalysis.map((c) => c.weakness + " " + c.ourAdvantage).join(" "),
    plan.actionPlan.map((a) => a.task + " " + a.outcome).join(" "),
    plan.templates.map((t) => t.body).join(" "),
    plan.contentIdeas.map((c) => c.angle + " " + c.hook).join(" "),
    plan.metrics.map((m) => m.why).join(" "),
    plan.upsellIdeas.map((u) => `${u.title} ${u.scope} ${u.trigger}`).join(" "),
    plan.assumptions.join(" "),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

export function buildBusinessKitHtml(
  plan: BusinessKitPlan,
  options?: { systemFonts?: boolean },
): string {
  const theme = REPORT_THEMES[plan.theme ?? "purple"] ?? REPORT_THEMES.purple;
  const labels = reportLabels[plan.language];
  const readingMinutes = estimateReadingMinutes(plan);
  const hasCompetitors = plan.competitorAnalysis.length > 0;
  const generatedAt = new Intl.DateTimeFormat(localeFor(plan.language), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  const reportId = `${slugify(plan.title)}-${hashString([
    plan.title,
    plan.subtitle,
    ...plan.actionPlan.map((item) => `${item.day}:${item.task}`),
  ].join("|"))}`;

  return `<!doctype html>
<html lang="${escapeHtml(labels.htmlLang)}" data-report-id="${escapeHtml(reportId)}" data-color-mode="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>(function(){try{var id=${scriptJson(reportId)};var m=localStorage.getItem("growth-kit-color-mode:"+id);if(m==="dark")document.documentElement.setAttribute("data-color-mode","dark");}catch(e){}})();<\/script>
  <title>${escapeHtml(plan.title)}</title>
  ${options?.systemFonts ? buildSystemFontOverrideHtml() : buildInlineFontFaceHtml()}
  <style>:root{color-scheme:dark}body{margin:0;font-family:ui-sans-serif,system-ui,sans-serif}</style>
  <style>
    :root {
      color-scheme: dark;
      /* Ink — mirrors app shell */
      --ink: #ffffff;
      --ink-soft: rgba(255, 255, 255, 0.65);
      --muted: rgba(255, 255, 255, 0.55);
      --subtle: rgba(255, 255, 255, 0.3);

      /* Surfaces & fills */
      --surface: ${theme.surface};
      --surface-2: ${theme.surface2};
      --glass: linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.03));
      --fill-1: rgba(255, 255, 255, 0.04);
      --fill-2: rgba(255, 255, 255, 0.06);
      --fill-3: rgba(255, 255, 255, 0.09);

      /* Hairlines — mirrors app shell */
      --line: rgba(255, 255, 255, 0.09);
      --line-strong: rgba(255, 255, 255, 0.15);

      /* Accent (theme-driven) */
      --accent: ${theme.accent};
      --accent-mid: ${theme.accentMid};
      --accent-dark: ${theme.accentDark};
      --accent-soft: color-mix(in srgb, var(--accent) 11%, transparent);
      --accent-line: color-mix(in srgb, var(--accent) 22%, transparent);
      --accent-line-strong: color-mix(in srgb, var(--accent-mid) 55%, transparent);
      --accent-glow: color-mix(in srgb, var(--accent-dark) 35%, transparent);
      --badge-bg: linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), color-mix(in srgb, var(--accent-mid) 8%, transparent)), rgba(255, 255, 255, 0.03);
      --btn-bg: ${theme.accentDark};
      --btn-hover: ${theme.accentMid};
      --mint: var(--accent-soft);
      --navy: ${theme.coverDark};

      /* Semantic */
      --gold: #fbbf24;
      --rose: #ff8a8a;
      --coral: #fb923c;
      --positive: #85e89d;

      /* Radius scale — mirrors app shell (8px card / 6px input) */
      --r-sm: 6px;
      --r-md: 8px;
      --r-lg: 10px;
      --r-pill: 999px;

      /* Elevation — mirrors app shell */
      --shadow-soft: 0 16px 40px rgba(0, 0, 0, 0.22);
      --shadow-strong: 0 26px 70px rgba(0, 0, 0, 0.34);
    }

    *, *::before, *::after { box-sizing: border-box; }

    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(ellipse at 24% 10%, color-mix(in srgb, var(--accent-mid) 18%, transparent) 0%, transparent 46%),
        radial-gradient(ellipse at 86% 20%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 38%),
        ${theme.bodyBg};
      font-family: Montserrat, ui-sans-serif, system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.78), transparent 82%);
      -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.78), transparent 82%);
      z-index: 0;
    }

    h1, h2, h3, h4 {
      margin-top: 0;
      font-family: "Clash Display", Montserrat, sans-serif;
    }

    p { margin-top: 0; }

    .page {
      position: relative;
      z-index: 1;
      width: min(1320px, calc(100% - 32px));
      margin: 0 auto 64px;
      background: transparent;
      border: none;
      border-radius: 0;
      overflow: visible;
      box-shadow: none;
    }

    /* Cover */
    .cover {
      padding: 60px 64px 52px;
      color: #fff;
      background: ${theme.coverGradient};
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-strong);
    }

    .cover-eyebrow {
      margin: 0 0 22px;
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: uppercase;
      color: var(--accent);
    }

    .cover h1 {
      max-width: 820px;
      margin: 0 0 14px;
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 700;
      line-height: 0.98;
      letter-spacing: -0.02em;
    }

    .cover-subtitle {
      max-width: 680px;
      margin: 0 0 32px;
      font-size: 1.08rem;
      line-height: 1.55;
      color: rgba(255, 255, 255, 0.82);
    }

    .cover-pills { display: flex; flex-wrap: wrap; gap: 8px; }

    .pill {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 14px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--r-pill);
      background: rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.78rem;
      font-weight: 700;
    }

    /* Workspace */
    .workspace {
      display: grid;
      grid-template-columns: 1fr minmax(240px, 300px);
      gap: 20px;
      margin: -32px 56px 0;
      padding: 24px;
      border: 1px solid var(--line);
      border-radius: var(--r-lg);
      background: var(--glass), var(--surface);
      box-shadow: var(--shadow-strong);
    }

    .workspace-eyebrow {
      margin: 0 0 6px;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: uppercase;
      color: var(--accent);
    }

    .workspace h2 {
      margin: 0 0 6px;
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .workspace-intro { margin: 0; font-size: 0.88rem; color: var(--muted); }

    .progress-track {
      height: 8px;
      margin: 16px 0 12px;
      border-radius: var(--r-pill);
      background: var(--fill-3);
      overflow: hidden;
    }

    .progress-track span {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--accent-mid));
      transition: width 0.3s ease;
    }

    .workspace-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }

    .workspace-stat {
      border: 1px solid var(--line);
      border-radius: var(--r-sm);
      padding: 12px 14px;
      background: var(--glass), var(--surface-2);
    }

    .workspace-stat strong {
      display: block;
      font-family: "Clash Display", Montserrat, sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1;
      color: var(--ink);
    }

    .workspace-stat span {
      display: block;
      margin-top: 4px;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }

    .workspace-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 14px;
      font-size: 0.82rem;
      color: var(--muted);
    }

    .text-button {
      height: 32px;
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      padding: 0 14px;
      color: var(--ink-soft);
      background: var(--fill-1);
      font-family: inherit;
      font-weight: 700;
      font-size: 0.8rem;
      line-height: 1;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }

    .text-button:hover {
      border-color: var(--accent-line-strong);
      color: var(--ink);
    }

    .focus-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      border-radius: var(--r-md);
      color: #fff;
      background: linear-gradient(135deg, var(--navy) 0%, var(--accent-mid) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      min-height: 0;
    }

    .focus-eyebrow {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      margin: 0 0 10px;
    }

    .focus-task {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.35;
      margin: 0 0 8px;
    }

    .focus-outcome {
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.4;
      margin: 0;
    }

    /* Content */
    .content { padding: 56px 64px 64px; }

    /* Report section */
    .report-section {
      padding-bottom: 52px;
      margin-bottom: 52px;
      border-bottom: 1px solid var(--line);
    }

    .report-section:last-of-type {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: none;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }

    .section-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: var(--r-sm);
      background: linear-gradient(135deg, var(--accent), var(--accent-mid));
      color: #fff;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .section-title {
      margin: 0;
      font-size: 1.55rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .section-badge {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      height: 28px;
      padding: 0 13px;
      border-radius: var(--r-pill);
      background: var(--badge-bg);
      border: 1px solid var(--accent-line);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      color: var(--accent);
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
    }

    /* Report toolbar */
    .report-toolbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: color-mix(in srgb, var(--surface) 88%, transparent);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(12px);
    }

    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      height: 36px;
      padding: 0 16px;
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      background: var(--fill-1);
      color: var(--ink-soft);
      font-family: inherit;
      font-weight: 700;
      font-size: 0.82rem;
      line-height: 1;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
    }

    .toolbar-btn:hover {
      color: var(--ink);
      border-color: var(--accent-line-strong);
    }

    .toolbar-btn.is-primary {
      border-color: rgba(255, 255, 255, 0.18);
      background: var(--btn-bg);
      color: #fff;
      box-shadow: 0 8px 28px var(--accent-glow);
    }

    .toolbar-btn.is-primary:hover {
      background: var(--btn-hover);
      transform: translateY(-1px);
      box-shadow: 0 12px 34px var(--accent-glow);
    }

    /* Executive summary chips */
    .exec-chips { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

    .exec-chip {
      border-radius: var(--r-md);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--glass), var(--surface);
      border: 1px solid var(--line);
    }

    .ec-lever   { border-color: var(--accent-line); background: var(--accent-soft), var(--surface); }
    .ec-blocker { border-color: rgba(255, 138, 138, 0.28); background: rgba(255, 138, 138, 0.08); }
    .ec-action  { border-color: rgba(251, 191, 36, 0.28); background: rgba(251, 191, 36, 0.08); }

    .exec-chip-label {
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0;
    }

    .ec-lever   .exec-chip-label { color: var(--accent); }
    .ec-blocker .exec-chip-label { color: var(--rose); }
    .ec-action  .exec-chip-label { color: var(--gold); }

    .exec-chip-text { font-size: 1rem; line-height: 1.65; margin: 0; color: var(--ink-soft); }

    /* Executive summary fallback paragraph */
    .exec-lead {
      font-size: 1.18rem;
      line-height: 1.75;
      color: var(--ink-soft);
      max-width: 820px;
      margin: 0;
      padding-left: 20px;
      border-left: 4px solid var(--accent);
    }

    /* Quick win effort badges */
    .effort-badge {
      display: inline-flex;
      align-items: center;
      height: 20px;
      padding: 0 8px;
      border-radius: var(--r-pill);
      font-size: 0.67rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-right: 6px;
      vertical-align: text-bottom;
      flex-shrink: 0;
    }

    .effort-low  { background: rgba(133, 232, 157, 0.15); color: var(--positive); border: 1px solid rgba(133, 232, 157, 0.24); }
    .effort-med  { background: rgba(251, 191, 36, 0.12); color: var(--gold); border: 1px solid rgba(251, 191, 36, 0.24); }
    .effort-high { background: rgba(255, 138, 138, 0.12); color: var(--rose); border: 1px solid rgba(255, 138, 138, 0.24); }

    /* Insight blocks */
    .insight-stack { display: grid; gap: 12px; }

    .insight-block {
      display: grid;
      grid-template-columns: 5px 1fr;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      background: var(--glass), var(--surface);
    }

    .ia { background: var(--accent); }
    .ig { background: var(--gold); }
    .in { background: var(--accent-mid); }

    .insight-body { padding: 18px 22px; }

    .insight-label {
      margin: 0 0 6px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .la { color: var(--accent); }
    .lg { color: var(--gold); }
    .ln { color: var(--ink-soft); }

    .insight-text { margin: 0; font-size: 1.05rem; line-height: 1.65; color: var(--ink-soft); }

    /* Quick wins */
    .win-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }

    .win-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 14px;
      align-items: start;
      padding: 14px 18px 14px 14px;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      background: var(--glass), var(--surface);
    }

    .win-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 0.76rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .win-text { font-size: 1.02rem; line-height: 1.55; padding-top: 4px; color: var(--ink-soft); }

    /* Biggest Risks */
    .risk-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }

    .risk-item {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: 14px;
      align-items: start;
      padding: 14px 18px 14px 14px;
      border: 1px solid rgba(255, 138, 138, 0.28);
      border-radius: var(--r-md);
      background: rgba(255, 138, 138, 0.08);
    }

    .risk-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      background: rgba(255, 138, 138, 0.18);
      color: var(--rose);
      font-size: 0.76rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .risk-text { font-size: 1.02rem; line-height: 1.55; padding-top: 4px; color: var(--ink-soft); }

    /* Scorecard */
    .scorecard-list {
      display: grid;
      gap: 8px;
    }

    .scorecard-row {
      display: grid;
      grid-template-columns: 56px 1fr;
      gap: 0 14px;
      align-items: start;
      padding: 14px 16px 14px 0;
      background: var(--glass), var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      position: relative;
    }

    .scorecard-row::before {
      content: "";
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px;
    }
    .sc-high .scorecard-row::before, .scorecard-row.sc-high::before { background: var(--accent); }
    .sc-mid  .scorecard-row::before, .scorecard-row.sc-mid::before  { background: var(--gold); }
    .sc-low  .scorecard-row::before, .scorecard-row.sc-low::before  { background: var(--coral); }

    .scorecard-score-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-left: 16px;
      padding-top: 2px;
    }

    .scorecard-score {
      font-family: "Clash Display", Montserrat, sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .scorecard-score-max {
      font-size: 0.65rem;
      color: var(--muted);
      font-weight: 500;
      margin-top: 1px;
    }

    .scorecard-body { padding-right: 4px; }

    .scorecard-label {
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 5px;
      color: var(--ink);
    }

    .scorecard-track {
      height: 5px;
      border-radius: var(--r-pill);
      background: var(--fill-3);
      overflow: hidden;
      margin-bottom: 8px;
    }

    .scorecard-fill { height: 100%; border-radius: inherit; }
    .sc-high .scorecard-fill, .scorecard-row.sc-high .scorecard-fill { background: var(--accent); }
    .sc-mid  .scorecard-fill, .scorecard-row.sc-mid  .scorecard-fill { background: var(--gold); }
    .sc-low  .scorecard-fill, .scorecard-row.sc-low  .scorecard-fill { background: var(--coral); }

    .sc-high .scorecard-score { color: var(--accent); }
    .sc-mid  .scorecard-score { color: var(--gold); }
    .sc-low  .scorecard-score { color: var(--coral); }

    .scorecard-rationale {
      font-size: 0.93rem;
      color: var(--muted);
      margin: 0 0 6px;
      line-height: 1.55;
    }

    .scorecard-next-move {
      font-size: 0.91rem;
      color: var(--ink-soft);
      margin: 0;
      line-height: 1.5;
    }

    .scorecard-next-move strong {
      color: var(--accent);
      font-weight: 600;
    }

    /* Strategy */
    .strategy-list { display: grid; gap: 14px; }

    .strategy-card {
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      background: var(--glass), var(--surface);
    }

    .strategy-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 22px;
      background: linear-gradient(135deg, var(--navy) 0%, var(--accent-mid) 100%);
      color: #fff;
    }

    .strategy-index {
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      flex-shrink: 0;
    }

    .strategy-title { font-size: 1.05rem; font-weight: 700; margin: 0; }

    .strategy-body { padding: 18px 22px; }

    .strategy-diagnosis {
      font-size: 1rem;
      color: var(--muted);
      margin: 0 0 14px;
      line-height: 1.6;
      padding-left: 14px;
      border-left: 3px solid var(--line-strong);
    }

    .strategy-moves { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }

    .strategy-move {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 10px;
      font-size: 1rem;
      line-height: 1.5;
      color: var(--ink-soft);
    }

    .move-arr { color: var(--accent); font-weight: 700; }

    /* Action plan */
    .action-header-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 28px;
    }

    .action-list { display: grid; gap: 10px; }

    .action-card {
      display: grid;
      grid-template-columns: 36px 1fr;
      gap: 14px;
      padding: 16px 18px;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      background: var(--glass), var(--surface);
      transition: border-color 0.2s, background 0.2s;
      break-inside: avoid;
    }

    .action-card.is-complete { border-color: var(--accent-line-strong); background: var(--accent-soft), var(--surface); }
    .action-card.is-current  { border-color: rgba(251, 146, 60, 0.45); box-shadow: inset 4px 0 0 var(--coral); }

    .action-toggle {
      position: relative;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      margin-top: 2px;
      border: 2px solid var(--line-strong);
      border-radius: var(--r-sm);
      background: var(--fill-1);
      cursor: pointer;
      flex-shrink: 0;
    }

    .action-toggle input { position: absolute; inset: 0; opacity: 0; cursor: pointer; margin: 0; }

    .action-toggle span {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      background: transparent;
      transform: scale(0.4);
      transition: transform 0.15s, background 0.15s;
    }

    .action-card.is-complete .action-toggle { border-color: var(--accent-mid); background: var(--accent-mid); }

    .action-card.is-complete .action-toggle span {
      background: #fff;
      transform: scale(1);
      clip-path: polygon(14% 48%, 34% 68%, 84% 18%, 96% 30%, 34% 92%, 2% 60%);
    }

    .action-topline { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }

    .day-pill {
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 9px;
      border-radius: var(--r-pill);
      background: var(--fill-2);
      color: var(--ink-soft);
      font-size: 0.74rem;
      font-weight: 700;
      border: 1px solid var(--line);
    }

    .action-state {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 9px;
      border-radius: var(--r-pill);
      background: rgba(255, 138, 138, 0.12);
      color: var(--rose);
      font-size: 0.74rem;
      font-weight: 700;
    }

    .action-card.is-complete .action-state { background: var(--accent-soft); color: var(--accent); }

    .action-task { font-size: 1.02rem; font-weight: 600; margin: 0 0 4px; }
    .action-outcome { font-size: 0.95rem; color: var(--muted); margin: 0 0 10px; }

    .notes-field { display: grid; gap: 5px; }

    .notes-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--subtle);
    }

    .notes-field textarea {
      width: 100%;
      min-height: 68px;
      resize: vertical;
      border: 1px solid var(--line);
      border-radius: var(--r-sm);
      padding: 9px 12px;
      color: var(--ink);
      background: var(--fill-1);
      font-family: inherit;
      font-size: 0.87rem;
      line-height: 1.45;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .notes-field textarea:focus {
      border-color: var(--accent-line-strong);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-mid) 30%, transparent);
    }

    /* Templates */
    .template-list { display: grid; gap: 16px; }

    .template-card {
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      background: var(--glass), var(--surface);
    }

    .template-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 20px;
      background: var(--fill-1);
      border-bottom: 1px solid var(--line);
    }

    .template-title { font-size: 1.05rem; font-weight: 700; margin: 0; }

    .template-channel {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
      background: var(--badge-bg);
      padding: 4px 11px;
      border-radius: var(--r-pill);
      border: 1px solid var(--accent-line);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .template-body { padding: 20px; font-size: 1rem; line-height: 1.75; white-space: pre-wrap; color: var(--ink-soft); }

    /* Content ideas */
    .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

    .content-card {
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--glass), var(--surface);
    }

    .content-title { font-size: 1.08rem; font-weight: 700; margin: 0; }
    .content-angle { font-size: 0.97rem; color: var(--muted); margin: 0; line-height: 1.55; }

    .content-hook {
      font-size: 1rem;
      font-style: italic;
      margin: 0;
      padding: 10px 14px;
      border-left: 3px solid var(--gold);
      background: rgba(251, 191, 36, 0.08);
      border-radius: 0 var(--r-sm) var(--r-sm) 0;
      line-height: 1.5;
      color: var(--ink-soft);
    }

    /* Metrics table */
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      font-size: 1rem;
    }

    .metrics-table th {
      padding: 13px 18px;
      background: linear-gradient(135deg, var(--navy) 0%, var(--accent-mid) 100%);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: left;
    }

    .metrics-table td { padding: 15px 18px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.65; color: var(--ink-soft); }
    .metrics-table tr:nth-child(even) td { background: rgba(255, 255, 255, 0.03); }
    .metric-name { font-weight: 600; color: var(--ink); }
    .metric-target { font-weight: 700; color: var(--accent); }

    /* Bottom grid */
    .bottom-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }

    .tagged-panel {
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      background: var(--glass), var(--surface);
    }

    .tagged-header {
      padding: 10px 16px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .th-risk        { background: rgba(255, 138, 138, 0.12); color: var(--rose); border-bottom: 1px solid rgba(255, 138, 138, 0.24); }
    .th-upsell      { background: rgba(251, 191, 36, 0.12); color: var(--gold); border-bottom: 1px solid rgba(251, 191, 36, 0.24); }
    .th-assumptions { background: rgba(96, 165, 250, 0.12); color: #60a5fa; border-bottom: 1px solid rgba(96, 165, 250, 0.24); }

    .tagged-list { padding: 14px 16px; list-style: none; margin: 0; display: grid; gap: 10px; }

    .tagged-item { font-size: 0.87rem; line-height: 1.55; padding-left: 14px; position: relative; color: var(--ink-soft); }

    .tagged-item::before { content: "·"; position: absolute; left: 0; color: var(--subtle); font-size: 1.2rem; line-height: 1.1; }

    /* Upsell cards */
    .upsell-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

    .upsell-card {
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      padding: 18px 20px;
      display: grid;
      gap: 4px;
      background: var(--glass), var(--surface);
    }

    .upsell-card-title { font-size: 1.02rem; font-weight: 700; margin: 0; color: var(--ink); }
    .upsell-card-price { font-size: 1rem; font-weight: 800; color: var(--accent); margin: 0 0 6px; }

    .upsell-card-row { font-size: 0.9rem; line-height: 1.55; color: var(--muted); margin: 0; }
    .upsell-card-row strong { color: var(--ink-soft); font-weight: 600; }

    /* Footer */
    .report-footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--line);
      font-size: 0.81rem;
      color: var(--subtle);
      line-height: 1.6;
    }

    .growthkit-branding {
      margin-top: 20px;
      padding: 14px 18px;
      border: 1px dashed var(--accent-line-strong);
      border-radius: var(--r-md);
      background: var(--accent-soft);
      text-align: center;
    }

    .growthkit-branding a {
      color: var(--accent);
      font-size: 0.84rem;
      font-weight: 700;
      text-decoration: none;
    }

    .growthkit-branding a:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .cover, .content { padding: 36px 28px; }
      .workspace { margin: -24px 20px 0; padding: 18px; grid-template-columns: 1fr; }
      .bottom-grid, .content-grid, .upsell-grid, .exec-chips { grid-template-columns: 1fr; }
      .scorecard-row { grid-template-columns: 48px 1fr; }
    }

    @media (max-width: 600px) {
      body { background: ${theme.bodyBg}; }

      .page {
        width: 100%;
        margin: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
      }

      .cover { padding: 28px 20px 32px; border-radius: 0; }
      .cover h1 { font-size: clamp(1.6rem, 7vw, 2.6rem); }
      .cover-subtitle { font-size: 0.95rem; margin-bottom: 20px; }

      .workspace {
        margin: -20px 12px 0;
        padding: 16px;
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .workspace-actions { flex-direction: column; align-items: flex-start; gap: 8px; }
      .text-button { white-space: nowrap; }
      .focus-card { min-height: 0; }

      .content { padding: 28px 16px 40px; }

      .report-section { padding-bottom: 36px; margin-bottom: 36px; }

      .section-header { flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
      .section-badge { margin-left: 0; }
      .section-title { font-size: 1.25rem; }

      .action-header-row { flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }

      .action-card { grid-template-columns: 1fr; gap: 10px; }
      .action-toggle { width: 28px; height: 28px; }

      .metrics-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .metrics-table { min-width: 480px; }
      .metrics-table th, .metrics-table td { padding: 11px 12px; }

      .template-header { flex-wrap: wrap; gap: 8px; }

      .strategy-header { flex-wrap: wrap; gap: 8px; }

      .scorecard-row { grid-template-columns: 44px 1fr; }

      .section-jump-nav { top: 0; }

      .jump-nav-label { display: none; }

      .color-mode-toggle {
        height: 28px;
        margin-right: 6px;
        padding: 0 9px;
        z-index: 2;
        background: color-mix(in srgb, var(--navy) 94%, transparent);
        box-shadow: -10px 0 14px color-mix(in srgb, var(--navy) 88%, transparent);
      }

      .color-mode-toggle .color-mode-label { display: none; }

      .report-footer { margin-top: 32px; }
    }

    @media (max-width: 380px) {
      .cover { padding: 20px 14px 24px; }
      .content { padding: 20px 14px 32px; }
      .workspace { margin: -16px 8px 0; padding: 12px; }
    }

    /* Jump-to-section navigation */
    .section-jump-nav {
      position: sticky;
      top: 0px;
      z-index: 9;
      display: flex;
      align-items: stretch;
      background: color-mix(in srgb, var(--navy) 92%, transparent);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(12px);
    }

    .jump-nav-scroll {
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .jump-nav-scroll::-webkit-scrollbar { display: none; }

    .jump-nav-inner {
      display: flex;
      align-items: center;
      padding: 0 12px;
      white-space: nowrap;
      min-height: 38px;
    }

    .jump-nav-label {
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--subtle);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding-right: 10px;
      flex-shrink: 0;
    }

    .section-jump-nav a {
      display: inline-flex;
      align-items: center;
      height: 38px;
      padding: 0 9px;
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--muted);
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: color 0.15s, border-color 0.15s;
    }

    .section-jump-nav a:hover { color: var(--accent); border-bottom-color: var(--accent); }

    .color-mode-toggle {
      display: inline-flex;
      align-items: center;
      align-self: center;
      gap: 6px;
      height: 30px;
      margin: 0 10px 0 0;
      padding: 0 12px 0 14px;
      border: 1px solid var(--line);
      border-left: 1px solid var(--line-strong);
      border-radius: var(--r-pill);
      background: var(--fill-1);
      color: var(--ink-soft);
      font-family: inherit;
      font-weight: 700;
      font-size: 0.74rem;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }

    .color-mode-toggle:hover {
      color: var(--ink);
      border-color: var(--accent-line-strong);
    }

    .color-mode-toggle[aria-pressed="true"] {
      background: var(--badge-bg);
      border-color: var(--accent-line);
      color: var(--accent);
    }

    .color-mode-icon {
      font-size: 0.88rem;
      line-height: 1;
    }

    /* Light mode — screen document theme */
    [data-color-mode="light"] {
      color-scheme: light;
      --ink: #111827;
      --ink-soft: #374151;
      --muted: #6b7280;
      --subtle: #9ca3af;
      --surface: #ffffff;
      --surface-2: #f9fafb;
      --glass: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.82));
      --fill-1: #f9fafb;
      --fill-2: #f3f4f6;
      --fill-3: #e5e7eb;
      --line: #e5e7eb;
      --line-strong: #d1d5db;
      --accent-soft: color-mix(in srgb, var(--accent) 12%, #ffffff);
      --accent-line: color-mix(in srgb, var(--accent) 24%, #ffffff);
      --accent-line-strong: color-mix(in srgb, var(--accent-mid) 42%, #ffffff);
      --accent-glow: color-mix(in srgb, var(--accent-dark) 22%, transparent);
      --badge-bg: linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, #ffffff), color-mix(in srgb, var(--accent-mid) 6%, #ffffff)), #ffffff;
      --mint: var(--accent-soft);
      --rose: #be123c;
      --gold: #d97706;
      --coral: #c2410c;
      --positive: #059669;
      --shadow-soft: 0 8px 24px rgba(15, 23, 42, 0.06);
      --shadow-strong: 0 16px 40px rgba(15, 23, 42, 0.08);
    }

    [data-color-mode="light"] body {
      background:
        radial-gradient(ellipse at 24% 10%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 46%),
        radial-gradient(ellipse at 86% 20%, color-mix(in srgb, var(--accent-mid) 8%, transparent) 0%, transparent 38%),
        #f8f7fc;
    }

    [data-color-mode="light"] body::before { display: none; }

    [data-color-mode="light"] .section-jump-nav,
    [data-color-mode="light"] .report-toolbar {
      background: rgba(255, 255, 255, 0.94);
    }

    [data-color-mode="light"] .workspace,
    [data-color-mode="light"] .exec-chip,
    [data-color-mode="light"] .insight-block,
    [data-color-mode="light"] .win-item,
    [data-color-mode="light"] .scorecard-row,
    [data-color-mode="light"] .strategy-card,
    [data-color-mode="light"] .action-card,
    [data-color-mode="light"] .template-card,
    [data-color-mode="light"] .content-card,
    [data-color-mode="light"] .tagged-panel,
    [data-color-mode="light"] .upsell-card {
      box-shadow: var(--shadow-soft);
    }

    [data-color-mode="light"] .ec-lever {
      background: color-mix(in srgb, var(--accent) 8%, #ffffff), var(--surface) !important;
      border-color: var(--accent-line) !important;
    }

    [data-color-mode="light"] .ec-blocker {
      background: #fff1f2 !important;
      border-color: #fecdd3 !important;
    }

    [data-color-mode="light"] .ec-blocker .exec-chip-label { color: #be123c; }

    [data-color-mode="light"] .ec-action {
      background: #fffbeb !important;
      border-color: #fde68a !important;
    }

    [data-color-mode="light"] .ec-action .exec-chip-label { color: #d97706; }

    [data-color-mode="light"] .effort-low {
      background: #ecfdf5;
      color: #059669;
      border-color: #a7f3d0;
    }

    [data-color-mode="light"] .effort-med {
      background: #fffbeb;
      color: #d97706;
      border-color: #fde68a;
    }

    [data-color-mode="light"] .effort-high {
      background: #fff1f2;
      color: #be123c;
      border-color: #fecdd3;
    }

    [data-color-mode="light"] .risk-item {
      background: #fff1f2;
      border-color: #fecdd3;
    }

    [data-color-mode="light"] .risk-num {
      background: #fecdd3;
      color: #be123c;
    }

    [data-color-mode="light"] .action-state {
      background: #fff1f2;
      color: #be123c;
    }

    [data-color-mode="light"] .action-card.is-complete {
      background: color-mix(in srgb, var(--accent) 8%, #ffffff), var(--surface);
      border-color: var(--accent-line-strong);
    }

    [data-color-mode="light"] .action-card.is-complete .action-state {
      background: var(--accent-soft);
      color: var(--accent-dark);
    }

    [data-color-mode="light"] .content-hook {
      background: #fffbeb;
      color: var(--ink-soft);
    }

    [data-color-mode="light"] .th-risk {
      background: #fff1f2;
      color: #be123c;
      border-bottom-color: #fecdd3;
    }

    [data-color-mode="light"] .th-upsell {
      background: #fffbeb;
      color: #92400e;
      border-bottom-color: #fde68a;
    }

    [data-color-mode="light"] .th-assumptions {
      background: #eff6ff;
      color: #0369a1;
      border-bottom-color: #bfdbfe;
    }

    [data-color-mode="light"] .metrics-table tr:nth-child(even) td,
    [data-color-mode="light"] .competitor-table tr:nth-child(even) td {
      background: #f9fafb;
    }

    [data-color-mode="light"] .competitor-weakness { color: #c2410c; }

    [data-color-mode="light"] .scorecard-radar .radar-grid { stroke: rgba(15, 23, 42, 0.1); }

    [data-color-mode="light"] .scorecard-radar .radar-label { fill: #6b7280; }

    [data-color-mode="light"] .scorecard-radar .radar-dot { stroke: #ffffff; }

    [data-color-mode="light"] .growthkit-branding {
      background: #f9fafb;
      border-color: var(--line);
    }

    [data-color-mode="light"] .growthkit-branding a { color: var(--accent-dark); }

    @media (max-width: 600px) {
      .color-mode-toggle .color-mode-label { display: none; }
    }

    /* Template copy button */
    .template-copy-btn {
      height: 30px;
      padding: 0 13px;
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      background: var(--fill-1);
      color: var(--ink-soft);
      font-family: inherit;
      font-weight: 700;
      font-size: 0.74rem;
      line-height: 1;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }

    .template-copy-btn:hover {
      color: var(--ink);
      border-color: var(--accent-line-strong);
    }

    .template-copy-btn.is-copied {
      background: var(--badge-bg);
      border-color: var(--accent-line);
      color: var(--accent);
    }

    /* Competitor analysis table */
    .competitor-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      overflow: hidden;
      font-size: 1rem;
    }

    .competitor-table th {
      padding: 13px 18px;
      background: linear-gradient(135deg, var(--navy) 0%, var(--accent-mid) 100%);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: left;
    }

    .competitor-table td { padding: 15px 18px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.65; color: var(--ink-soft); }
    .competitor-table tr:nth-child(even) td { background: rgba(255, 255, 255, 0.03); }
    .competitor-name { font-weight: 700; color: var(--ink); }
    .competitor-weakness { color: var(--rose); }
    .competitor-advantage { color: var(--accent); font-weight: 600; }

    @media print {
      *, *::before, *::after {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }

      :root {
        --ink: #111827;
        --ink-soft: #374151;
        --muted: #6b7280;
        --subtle: #9ca3af;
        --paper: #ffffff;
        --line: #e5e7eb;
        --line-strong: #d1d5db;
        --surface: #f9fafb;
        --surface-2: #f3f4f6;
        --mint: #f3eeff;
        --amber: #fffbeb;
        --sky: #eff6ff;
      }

      body::before { display: none !important; }

      .report-toolbar, .section-jump-nav, .workspace, .template-copy-btn, .color-mode-toggle { display: none !important; }
      .growthkit-branding { break-inside: avoid; page-break-inside: avoid; }

      body {
        background: #fff !important;
        color: #111827 !important;
        font-family: -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif !important;
      }

      h1, h2, h3, h4 {
        font-family: -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif !important;
        color: #111827 !important;
      }

      .page {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        background: #fff !important;
      }

      .cover {
        break-after: page;
        page-break-after: always;
        background: ${theme.coverGradient} !important;
        border-radius: 0 !important;
        border: none !important;
        color: #fff !important;
      }

      .cover-eyebrow { color: rgba(255,255,255,0.75) !important; }

      .content { background: #fff !important; }

      .report-section {
        break-before: page;
        page-break-before: always;
        border-bottom-color: #e5e7eb !important;
      }

      .section-header, .action-header-row {
        break-after: avoid;
        page-break-after: avoid;
      }

      .section-num { background: ${theme.accentMid} !important; color: #fff !important; }

      .section-badge {
        background: #f3eeff !important;
        color: ${theme.accentDark} !important;
        border-color: #e5e7eb !important;
      }

      .exec-chip,
      .insight-block,
      .win-item,
      .risk-item,
      .scorecard-row,
      .strategy-card,
      .action-card,
      .template-card,
      .content-card,
      .tagged-panel,
      .upsell-card {
        background: #fff !important;
        border-color: #e5e7eb !important;
        color: #111827 !important;
      }

      .ec-blocker { background: #fff1f2 !important; border-color: #fecdd3 !important; }
      .ec-action { background: #fffbeb !important; border-color: #fde68a !important; }
      .ec-lever { background: #f3eeff !important; border-color: #ddd6fe !important; }

      .risk-item { background: #fff1f2 !important; border-color: #fecdd3 !important; }
      .risk-num { background: #fecdd3 !important; color: #be123c !important; }

      .exec-chip-text,
      .exec-lead,
      .insight-text,
      .win-text,
      .risk-text,
      .strategy-diagnosis,
      .strategy-move,
      .action-outcome,
      .template-body,
      .content-angle,
      .content-hook,
      .tagged-item,
      .upsell-card-row,
      .metrics-table td,
      .competitor-table td {
        color: #374151 !important;
      }

      .scorecard-rationale,
      .scorecard-next-move strong,
      .metric-target,
      .competitor-advantage {
        color: ${theme.accentDark} !important;
      }

      .competitor-weakness { color: #c2410c !important; }

      .strategy-header,
      .metrics-table th,
      .competitor-table th {
        background: ${theme.coverDark} !important;
        color: #fff !important;
      }

      .strategy-body,
      .template-header {
        background: #fff !important;
      }

      .template-header { border-bottom-color: #e5e7eb !important; }

      .action-card.is-complete {
        background: #f3eeff !important;
        border-color: rgba(111,106,207,0.3) !important;
      }

      .action-card.is-complete .action-state {
        background: #f3eeff !important;
        color: ${theme.accentDark} !important;
      }

      .notes-field textarea {
        background: #f9fafb !important;
        border-color: #e5e7eb !important;
        color: #111827 !important;
      }

      .content-hook { background: #fffbeb !important; }

      .th-risk { background: #fff1f2 !important; color: #be123c !important; }
      .th-upsell { background: #fffbeb !important; color: #92400e !important; }
      .th-assumptions { background: #eff6ff !important; color: #0369a1 !important; }

      .metrics-table tr:nth-child(even) td,
      .competitor-table tr:nth-child(even) td {
        background: #f9fafb !important;
      }

      .growthkit-branding {
        background: #f9fafb !important;
        border-color: #e5e7eb !important;
      }

      .growthkit-branding a { color: ${theme.accentDark} !important; }

      .insight-block,
      .win-item,
      .risk-item,
      .scorecard-row,
      .strategy-card,
      .action-card,
      .template-card,
      .content-card,
      .tagged-panel,
      .metrics-table tr {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      p { orphans: 3; widows: 3; }

      .scorecard-row.sc-high::before { background: ${theme.accent} !important; }
      .scorecard-row.sc-mid::before  { background: #d97706 !important; }
      .scorecard-row.sc-low::before  { background: #c2410c !important; }
    }

    @page {
      size: A4 portrait;
      margin: 1.2cm 1.4cm 1.8cm;
    }

    @page :left  { @bottom-left  { content: counter(page); font-size: 9pt; color: #9ca3af; } }
    @page :right { @bottom-right { content: counter(page); font-size: 9pt; color: #9ca3af; } }
  </style>
</head>
<body data-report-id="${escapeHtml(reportId)}">
  <script>function scrollToAnchor(id){var el=document.getElementById(id);if(!el)return;var nav=document.querySelector('.section-jump-nav');var offset=(nav?nav.getBoundingClientRect().height:0)+20;window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-offset,behavior:'smooth'});}<\/script>
  <nav class="section-jump-nav" aria-label="${escapeHtml(labels.jumpToSection)}">
    <div class="jump-nav-scroll">
      <div class="jump-nav-inner">
        <span class="jump-nav-label">${escapeHtml(labels.jumpToSection)}</span>
        <a href="#sec-1" onclick="event.preventDefault();scrollToAnchor('sec-1')">1. ${escapeHtml(labels.executiveSummary)}</a>
        <a href="#sec-2" onclick="event.preventDefault();scrollToAnchor('sec-2')">2. ${escapeHtml(labels.positioning)}</a>
        <a href="#sec-3" onclick="event.preventDefault();scrollToAnchor('sec-3')">3. ${escapeHtml(labels.fastestQuickWins)}</a>
        <a href="#sec-4" onclick="event.preventDefault();scrollToAnchor('sec-4')">4. ${escapeHtml(labels.biggestRisks)}</a>
        <a href="#sec-5" onclick="event.preventDefault();scrollToAnchor('sec-5')">5. ${escapeHtml(labels.growthScorecard)}</a>
        ${hasCompetitors ? `<a href="#sec-6" onclick="event.preventDefault();scrollToAnchor('sec-6')">6. ${escapeHtml(labels.competitorAnalysis)}</a>` : ""}
        <a href="#sec-${hasCompetitors ? 7 : 6}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 7 : 6}')">${hasCompetitors ? 7 : 6}. ${escapeHtml(labels.strategicMoves)}</a>
        <a href="#sec-${hasCompetitors ? 8 : 7}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 8 : 7}')">${hasCompetitors ? 8 : 7}. ${escapeHtml(labels.actionPlan)}</a>
        <a href="#sec-${hasCompetitors ? 9 : 8}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 9 : 8}')">${hasCompetitors ? 9 : 8}. ${escapeHtml(labels.salesTemplates)}</a>
        <a href="#sec-${hasCompetitors ? 10 : 9}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 10 : 9}')">${hasCompetitors ? 10 : 9}. ${escapeHtml(labels.contentIdeas)}</a>
        <a href="#sec-${hasCompetitors ? 11 : 10}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 11 : 10}')">${hasCompetitors ? 11 : 10}. ${escapeHtml(labels.metricsToTrack)}</a>
      </div>
    </div>
    <button type="button" class="color-mode-toggle" data-color-mode-toggle aria-pressed="true" aria-label="${escapeHtml(labels.switchToDarkMode)}">
      <span class="color-mode-icon" aria-hidden="true">☾</span>
      <span class="color-mode-label">${escapeHtml(labels.darkMode)}</span>
    </button>
  </nav>

  <article class="page">
    <header class="cover">
      <p class="cover-eyebrow">${escapeHtml(labels.productName)}</p>
      <h1>${escapeHtml(plan.title)}</h1>
      <p class="cover-subtitle">${escapeHtml(plan.subtitle)}</p>
      <div class="cover-pills">
        <span class="pill">${escapeHtml(labels.generated)} ${escapeHtml(generatedAt)}</span>
        <span class="pill">${escapeHtml(labels.strategyReport)}</span>
        <span class="pill">${escapeHtml(labels.actionPlanPill)}</span>
        <span class="pill">${escapeHtml(String(readingMinutes))} ${escapeHtml(labels.readingTime)}</span>
      </div>
    </header>

    ${workspacePanel(plan, labels)}

    <main class="content">

      <div class="report-section" id="sec-1">
        <div class="section-header">
          <span class="section-num">1</span>
          <h2 class="section-title">${escapeHtml(labels.executiveSummary)}</h2>
        </div>
        ${plan.executiveSummaryChips
          ? execChipsHtml(plan.executiveSummaryChips, labels)
          : `<p class="exec-lead">${escapeHtml(plan.executiveSummary)}</p>`}
      </div>

      <div class="report-section" id="sec-2">
        <div class="section-header">
          <span class="section-num">2</span>
          <h2 class="section-title">${escapeHtml(labels.positioning)} &amp; ${escapeHtml(labels.coreOfferRewrite)}</h2>
        </div>
        <div class="insight-stack">
          ${insightBlock(labels.positioning, plan.positioning, "a")}
          ${insightBlock(labels.coreOfferRewrite, plan.coreOfferRewrite, "g")}
          ${insightBlock(labels.idealCustomerProfile, plan.idealCustomerProfile, "n")}
        </div>
      </div>

      <div class="report-section" id="sec-3">
        <div class="section-header">
          <span class="section-num">3</span>
          <h2 class="section-title">${escapeHtml(labels.fastestQuickWins)}</h2>
        </div>
        <ol class="win-list">
          ${plan.quickWins.map((win, i) => quickWinItem(win, i)).join("")}
        </ol>
      </div>

      <div class="report-section" id="sec-4">
        <div class="section-header">
          <span class="section-num">4</span>
          <h2 class="section-title">${escapeHtml(labels.biggestRisks)}</h2>
        </div>
        <ol class="risk-list">
          ${plan.biggestRisks.map((risk, i) => `<li class="risk-item"><span class="risk-num">${i + 1}</span><span class="risk-text">${escapeHtml(risk)}</span></li>`).join("")}
        </ol>
      </div>

      <div class="report-section" id="sec-5">
        <div class="section-header">
          <span class="section-num">5</span>
          <h2 class="section-title">${escapeHtml(labels.growthScorecard)}</h2>
        </div>
        ${scorecardRadar(plan.scorecard)}
        <div class="scorecard-list">
          ${plan.scorecard.map((item) => scorecardRow(item, labels)).join("")}
        </div>
      </div>

      ${hasCompetitors ? competitorSection(plan, labels) : ""}

      <div class="report-section" id="sec-${hasCompetitors ? 7 : 6}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 7 : 6}</span>
          <h2 class="section-title">${escapeHtml(labels.strategicMoves)}</h2>
        </div>
        <div class="strategy-list">
          ${plan.strategySections.map((item, i) => strategyCard(item, i)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 8 : 7}">
        <div class="action-header-row">
          <div class="section-header" style="margin-bottom:0;flex:1">
            <span class="section-num">${hasCompetitors ? 8 : 7}</span>
            <h2 class="section-title">${escapeHtml(labels.actionPlan)}</h2>
          </div>
          <span class="section-badge" data-action-summary>0/${escapeHtml(String(plan.actionPlan.length))} ${escapeHtml(labels.completed)}</span>
        </div>
        <div class="action-list">
          ${plan.actionPlan.map((item, index) => actionPlanCard(item, index, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 9 : 8}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 9 : 8}</span>
          <h2 class="section-title">${escapeHtml(labels.salesTemplates)}</h2>
        </div>
        <div class="template-list">
          ${plan.templates.map((t) => templateCard(t, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 10 : 9}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 10 : 9}</span>
          <h2 class="section-title">${escapeHtml(labels.contentIdeas)}</h2>
        </div>
        <div class="content-grid">
          ${plan.contentIdeas.map(contentCard).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 11 : 10}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 11 : 10}</span>
          <h2 class="section-title">${escapeHtml(labels.metricsToTrack)}</h2>
        </div>
        <div class="metrics-table-wrap">
          <table class="metrics-table">
            <thead>
              <tr>
                <th>${escapeHtml(labels.metric)}</th>
                <th>${escapeHtml(labels.target)}</th>
                <th>${escapeHtml(labels.whyItMatters)}</th>
              </tr>
            </thead>
            <tbody>
              ${plan.metrics.map((item) => `<tr><td class="metric-name">${escapeHtml(item.metric)}</td><td class="metric-target">${escapeHtml(item.target)}</td><td>${escapeHtml(item.why)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="report-section">
        <div class="section-header" style="margin-bottom:20px">
          <h2 class="section-title" style="font-size:1.3rem">${escapeHtml(labels.upsellIdeas)}</h2>
        </div>
        <div class="upsell-grid">
          ${plan.upsellIdeas.map((idea) => upsellCardHtml(idea, labels)).join("")}
        </div>
      </div>

      <div class="report-section">
        <div class="bottom-grid">
          ${taggedPanel(labels.assumptions, plan.assumptions, "assumptions")}
        </div>
      </div>

      <footer class="report-footer">
        ${escapeHtml(plan.disclaimer)}
        ${plan.showBranding !== false ? brandingFooter(labels) : ""}
      </footer>
    </main>
  </article>

  ${interactiveReportScript(reportId, labels)}
</body>
</html>`;
}

function brandingFooter(labels: ReportLabels): string {
  return `<aside class="growthkit-branding">
    <a href="${escapeHtml(GROWTHKIT_SITE)}" target="_top" rel="noopener noreferrer">${escapeHtml(labels.madeWith)} →</a>
  </aside>`;
}

function workspacePanel(plan: BusinessKitPlan, labels: ReportLabels): string {
  return `<section class="workspace" data-report-workspace aria-labelledby="workspace-title">
    <div>
      <p class="workspace-eyebrow">${escapeHtml(labels.implementationWorkspace)}</p>
      <h2 id="workspace-title">${escapeHtml(labels.workspaceTitle)}</h2>
      <p class="workspace-intro">${escapeHtml(labels.workspaceIntro)}</p>
      <div class="progress-track" aria-hidden="true"><span data-progress-bar></span></div>
      <div class="workspace-stats">
        <div class="workspace-stat"><strong data-progress-text>0%</strong><span>${escapeHtml(labels.progressComplete)}</span></div>
        <div class="workspace-stat"><strong data-completed-count>0</strong><span>${escapeHtml(labels.completed)}</span></div>
        <div class="workspace-stat"><strong data-inprogress-count>0</strong><span>${escapeHtml(labels.inProgress)}</span></div>
        <div class="workspace-stat"><strong data-remaining-count>${escapeHtml(String(plan.actionPlan.length))}</strong><span>${escapeHtml(labels.remaining)}</span></div>
      </div>
      <div class="workspace-actions">
        <button class="text-button" type="button" data-reset-progress>${escapeHtml(labels.resetProgress)}</button>
        <span data-save-status>${escapeHtml(labels.savedLocally)}</span>
      </div>
    </div>
    <aside class="focus-card">
      <p class="focus-eyebrow">${escapeHtml(labels.nextFocus)}</p>
      <p class="focus-task" data-next-focus>${escapeHtml(plan.actionPlan[0]?.task ?? labels.allActionsDone)}</p>
      <p class="focus-outcome" data-next-detail>${escapeHtml(plan.actionPlan[0]?.outcome ?? "")}</p>
    </aside>
  </section>`;
}

function execChipsHtml(chips: ExecChips, labels: ReportLabels): string {
  return `<div class="exec-chips">
    <div class="exec-chip ec-lever">
      <p class="exec-chip-label">${escapeHtml(labels.execLever)}</p>
      <p class="exec-chip-text">${escapeHtml(chips.lever)}</p>
    </div>
    <div class="exec-chip ec-blocker">
      <p class="exec-chip-label">${escapeHtml(labels.execBlocker)}</p>
      <p class="exec-chip-text">${escapeHtml(chips.blocker)}</p>
    </div>
    <div class="exec-chip ec-action">
      <p class="exec-chip-label">${escapeHtml(labels.execAction)}</p>
      <p class="exec-chip-text">${escapeHtml(chips.action)}</p>
    </div>
  </div>`;
}

function quickWinItem(win: string, i: number): string {
  const match = win.match(/^\[(HIGH|MED|LOW)\s+effort\]\s*/i);
  const effort = match ? match[1].toUpperCase() as "HIGH" | "MED" | "LOW" : null;
  const rest = match ? win.slice(match[0].length) : win;
  const badge = effort
    ? `<span class="effort-badge effort-${effort.toLowerCase()}">${effort === "HIGH" ? "High" : effort === "MED" ? "Med" : "Low"} effort</span>`
    : "";
  return `<li class="win-item"><span class="win-num">${i + 1}</span><span class="win-text">${badge}${escapeHtml(rest)}</span></li>`;
}

function scorecardRadar(scorecard: BusinessScore[]): string {
  const n = scorecard.length;
  if (n < 3) return "";

  const cx = 150, cy = 155, r = 100;

  function ptXY(i: number, ratio: number): [number, number] {
    const angle = -Math.PI / 2 + (2 * Math.PI / n) * i;
    return [cx + r * ratio * Math.cos(angle), cy + r * ratio * Math.sin(angle)];
  }

  function pts(ratio: number): string {
    return Array.from({ length: n }, (_, i) => {
      const [x, y] = ptXY(i, ratio);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  const rings = [0.25, 0.5, 0.75, 1].map((ratio) =>
    `<polygon class="radar-grid" points="${pts(ratio)}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="${ratio === 1 ? 1.5 : 1}"/>`
  ).join("");

  const spokes = Array.from({ length: n }, (_, i) => {
    const [x, y] = ptXY(i, 1);
    return `<line class="radar-grid" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>`;
  }).join("");

  const scorePts = scorecard.map((item, i) => {
    const [x, y] = ptXY(i, item.score / 100);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const labels = scorecard.map((item, i) => {
    const [x, y] = ptXY(i, 1.32);
    const words = item.label.split(" ");
    const lines = words.length > 2
      ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")]
      : [item.label];
    const tspans = lines.map((line, li) =>
      `<tspan x="${x.toFixed(1)}" dy="${li === 0 ? 0 : 13}">${escapeHtml(line)}</tspan>`
    ).join("");
    const baseY = y - (lines.length - 1) * 6.5;
    return `<text class="radar-label" x="${x.toFixed(1)}" y="${baseY.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="rgba(255,255,255,0.55)" font-family="Montserrat,ui-sans-serif,sans-serif">${tspans}</text>`;
  }).join("");

  const dots = scorecard.map((item, i) => {
    const [x, y] = ptXY(i, item.score / 100);
    const color = item.score >= 70 ? "var(--accent)" : item.score >= 45 ? "var(--gold)" : "var(--coral)";
    return `<circle class="radar-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${color}" stroke="rgba(26,22,53,0.95)" stroke-width="2"/>`;
  }).join("");

  return `<div style="display:flex;justify-content:center;margin-bottom:28px">
    <svg class="scorecard-radar" viewBox="-10 -10 320 330" width="260" height="260" style="overflow:visible;display:block">
      ${rings}${spokes}
      <polygon points="${scorePts}" fill="var(--accent)" fill-opacity="0.12" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
      ${labels}${dots}
    </svg>
  </div>`;
}

function upsellCardHtml(idea: UpsellIdea, labels: ReportLabels): string {
  return `<div class="upsell-card">
    <p class="upsell-card-title">${escapeHtml(idea.title)}</p>
    <p class="upsell-card-price">${escapeHtml(idea.price)}</p>
    <p class="upsell-card-row"><strong>${escapeHtml(labels.upsellScope)}:</strong> ${escapeHtml(idea.scope)}</p>
    <p class="upsell-card-row"><strong>${escapeHtml(labels.upsellTrigger)}:</strong> ${escapeHtml(idea.trigger)}</p>
  </div>`;
}

function insightBlock(label: string, text: string, variant: "a" | "g" | "n"): string {
  const accentClass = `i${variant}`;
  const labelClass  = `l${variant}`;
  return `<div class="insight-block">
    <div class="${accentClass}"></div>
    <div class="insight-body">
      <p class="insight-label ${labelClass}">${escapeHtml(label)}</p>
      <p class="insight-text">${escapeHtml(text)}</p>
    </div>
  </div>`;
}

function scorecardRow(item: BusinessScore, labels: ReportLabels): string {
  const tier = item.score >= 70 ? "sc-high" : item.score >= 45 ? "sc-mid" : "sc-low";
  return `<div class="scorecard-row ${tier}">
    <div class="scorecard-score-col">
      <span class="scorecard-score">${escapeHtml(String(item.score))}</span>
      <span class="scorecard-score-max">/100</span>
    </div>
    <div class="scorecard-body">
      <p class="scorecard-label">${escapeHtml(item.label)}</p>
      <div class="scorecard-track"><div class="scorecard-fill" style="width:${escapeHtml(String(item.score))}%"></div></div>
      <p class="scorecard-rationale">${escapeHtml(item.rationale)}</p>
      <p class="scorecard-next-move"><strong>${escapeHtml(labels.next)}:</strong> ${escapeHtml(item.nextMove)}</p>
    </div>
  </div>`;
}

function strategyCard(item: StrategySection, index: number): string {
  return `<div class="strategy-card">
    <div class="strategy-header">
      <span class="strategy-index">${escapeHtml(String(index + 1).padStart(2, "0"))}</span>
      <h3 class="strategy-title">${escapeHtml(item.title)}</h3>
    </div>
    <div class="strategy-body">
      <p class="strategy-diagnosis">${escapeHtml(item.diagnosis)}</p>
      <ul class="strategy-moves">
        ${item.moves.map((move) => `<li class="strategy-move"><span class="move-arr">→</span><span>${escapeHtml(move)}</span></li>`).join("")}
      </ul>
    </div>
  </div>`;
}

function actionPlanCard(item: ActionItem, index: number, labels: ReportLabels): string {
  const taskId = `action-${index + 1}`;
  return `<article class="action-card" data-action-card data-action-id="${escapeHtml(taskId)}">
    <label class="action-toggle" aria-label="${escapeHtml(`${labels.markComplete}: ${item.day}`)}">
      <input type="checkbox" data-action-toggle>
      <span aria-hidden="true"></span>
    </label>
    <div class="action-body">
      <div class="action-topline">
        <span class="day-pill">${escapeHtml(item.day)}</span>
        <span class="action-state" data-action-state>${escapeHtml(labels.notStarted)}</span>
      </div>
      <p class="action-task" data-action-title>${escapeHtml(item.task)}</p>
      <p class="action-outcome" data-action-outcome>${escapeHtml(item.outcome)}</p>
      <label class="notes-field">
        <span class="notes-label">${escapeHtml(labels.notes)}</span>
        <textarea data-action-note placeholder="${escapeHtml(labels.notesPlaceholder)}"></textarea>
      </label>
    </div>
  </article>`;
}

function templateCard(item: BusinessTemplate, labels: ReportLabels): string {
  const bodyJson = scriptJson(item.body);
  const copyLabel = scriptJson(labels.copyToClipboard);
  const copiedLabel = scriptJson(labels.copied);
  return `<div class="template-card">
    <div class="template-header">
      <h3 class="template-title">${escapeHtml(item.title)}</h3>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="template-channel">${escapeHtml(item.channel)}</span>
        <button type="button" class="template-copy-btn" onclick="(function(btn){navigator.clipboard.writeText(${bodyJson}).then(function(){btn.textContent=${copiedLabel};btn.classList.add('is-copied');setTimeout(function(){btn.textContent=${copyLabel};btn.classList.remove('is-copied')},2000)}).catch(function(){});})(this)">${escapeHtml(labels.copyToClipboard)}</button>
      </div>
    </div>
    <div class="template-body">${escapeHtml(item.body)}</div>
  </div>`;
}

function contentCard(item: ContentIdea): string {
  return `<div class="content-card">
    <h3 class="content-title">${escapeHtml(item.title)}</h3>
    <p class="content-angle">${escapeHtml(item.angle)}</p>
    <p class="content-hook">${escapeHtml(item.hook)}</p>
  </div>`;
}

function competitorSection(plan: BusinessKitPlan, labels: ReportLabels): string {
  return `<div class="report-section" id="sec-6">
    <div class="section-header">
      <span class="section-num">6</span>
      <h2 class="section-title">${escapeHtml(labels.competitorAnalysis)}</h2>
    </div>
    <table class="competitor-table">
      <thead>
        <tr>
          <th>${escapeHtml(labels.competitor)}</th>
          <th>${escapeHtml(labels.competitorWeakness)}</th>
          <th>${escapeHtml(labels.competitorAdvantage)}</th>
        </tr>
      </thead>
      <tbody>
        ${plan.competitorAnalysis.map((item) => `<tr>
          <td class="competitor-name">${escapeHtml(item.competitor)}</td>
          <td class="competitor-weakness">${escapeHtml(item.weakness)}</td>
          <td class="competitor-advantage">${escapeHtml(item.ourAdvantage)}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

function taggedPanel(title: string, items: string[], variant: "risk" | "upsell" | "assumptions"): string {
  return `<div class="tagged-panel">
    <div class="tagged-header th-${escapeHtml(variant)}">${escapeHtml(title)}</div>
    <ul class="tagged-list">
      ${items.map((item) => `<li class="tagged-item">${escapeHtml(item)}</li>`).join("")}
    </ul>
  </div>`;
}

function interactiveReportScript(reportId: string, labels: ReportLabels): string {
  return `<script>
    (function () {
      var reportId = ${scriptJson(reportId)};
      var messages = ${scriptJson({
        allActionsDone: labels.allActionsDone,
        completed: labels.completed,
        done: labels.done,
        inProgress: labels.inProgress,
        notStarted: labels.notStarted,
        savedLocally: labels.savedLocally,
        saveUnavailable: labels.saveUnavailable,
        lightMode: labels.lightMode,
        darkMode: labels.darkMode,
        switchToLightMode: labels.switchToLightMode,
        switchToDarkMode: labels.switchToDarkMode,
      })};
      var storageKey = "growth-kit-progress:" + reportId;
      var colorModeKey = "growth-kit-color-mode:" + reportId;
      var colorModeToggle = document.querySelector("[data-color-mode-toggle]");
      var docRoot = document.documentElement;
      var root = document.querySelector("[data-report-workspace]");
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-action-card]"));
      var progressBar = document.querySelector("[data-progress-bar]");
      var progressText = document.querySelector("[data-progress-text]");
      var completedCount = document.querySelector("[data-completed-count]");
      var inProgressCount = document.querySelector("[data-inprogress-count]");
      var remainingCount = document.querySelector("[data-remaining-count]");
      var nextFocus = document.querySelector("[data-next-focus]");
      var nextDetail = document.querySelector("[data-next-detail]");
      var saveStatus = document.querySelector("[data-save-status]");
      var summary = document.querySelector("[data-action-summary]");
      var resetButton = document.querySelector("[data-reset-progress]");

      function applyColorMode(mode) {
        var isLight = mode === "light";
        docRoot.setAttribute("data-color-mode", isLight ? "light" : "dark");

        if (colorModeToggle) {
          colorModeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
          colorModeToggle.setAttribute("aria-label", isLight ? messages.switchToDarkMode : messages.switchToLightMode);
          var icon = colorModeToggle.querySelector(".color-mode-icon");
          var label = colorModeToggle.querySelector(".color-mode-label");
          if (icon) icon.textContent = isLight ? "☾" : "☀";
          if (label) label.textContent = isLight ? messages.darkMode : messages.lightMode;
        }
      }

      function readColorMode() {
        try {
          return localStorage.getItem(colorModeKey) === "dark" ? "dark" : "light";
        } catch (error) {
          return "light";
        }
      }

      applyColorMode(readColorMode());

      if (colorModeToggle) {
        colorModeToggle.addEventListener("click", function () {
          var next = docRoot.getAttribute("data-color-mode") === "light" ? "dark" : "light";
          try {
            localStorage.setItem(colorModeKey, next);
          } catch (error) {
            /* ignore */
          }
          applyColorMode(next);
        });
      }

      function blankState() {
        return { done: {}, notes: {} };
      }

      function readStoredState() {
        try {
          var raw = window.localStorage.getItem(storageKey);
          return raw ? JSON.parse(raw) : null;
        } catch (error) {
          return null;
        }
      }

      function setSaveStatus(text) {
        if (saveStatus) {
          saveStatus.textContent = text;
        }
      }

      var state = readStoredState() || blankState();

      function save() {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
          setSaveStatus(messages.savedLocally);
        } catch (error) {
          setSaveStatus(messages.saveUnavailable);
        }
      }

      function updateCard(card, isCurrent) {
        var id = card.getAttribute("data-action-id");
        var checkbox = card.querySelector("[data-action-toggle]");
        var note = card.querySelector("[data-action-note]");
        var stateLabel = card.querySelector("[data-action-state]");
        var isDone = Boolean(id && state.done[id]);
        var hasNote = Boolean(note && note.value.trim());

        card.classList.toggle("is-complete", isDone);
        card.classList.toggle("is-current", Boolean(isCurrent && !isDone));

        if (checkbox) {
          checkbox.checked = isDone;
        }

        if (stateLabel) {
          stateLabel.textContent = isDone ? messages.done : hasNote ? messages.inProgress : messages.notStarted;
        }
      }

      function update() {
        var total = cards.length;
        var doneCount = cards.filter(function (card) {
          var id = card.getAttribute("data-action-id");
          return Boolean(id && state.done[id]);
        }).length;
        var inProgressVal = cards.filter(function (card) {
          var id = card.getAttribute("data-action-id");
          var isDone = Boolean(id && state.done[id]);
          var note = card.querySelector("[data-action-note]");
          return !isDone && Boolean(note && note.value.trim());
        }).length;
        var remaining = Math.max(total - doneCount, 0);
        var percent = total ? Math.round(doneCount / total * 100) : 100;
        var currentCard = cards.find(function (card) {
          var id = card.getAttribute("data-action-id");
          return !(id && state.done[id]);
        });

        if (root) {
          root.style.setProperty("--progress", percent + "%");
        }

        if (progressBar) {
          progressBar.style.width = percent + "%";
        }

        if (progressText) {
          progressText.textContent = percent + "%";
        }

        if (completedCount) {
          completedCount.textContent = String(doneCount);
        }

        if (inProgressCount) {
          inProgressCount.textContent = String(inProgressVal);
        }

        if (remainingCount) {
          remainingCount.textContent = String(remaining);
        }

        if (summary) {
          summary.textContent = doneCount + "/" + total + " " + messages.completed;
        }

        cards.forEach(function (card) {
          updateCard(card, card === currentCard);
        });

        if (nextFocus && nextDetail) {
          if (currentCard) {
            var title = currentCard.querySelector("[data-action-title]");
            var outcome = currentCard.querySelector("[data-action-outcome]");
            nextFocus.textContent = title ? title.textContent || "" : "";
            nextDetail.textContent = outcome ? outcome.textContent || "" : "";
          } else {
            nextFocus.textContent = messages.allActionsDone;
            nextDetail.textContent = "";
          }
        }
      }

      cards.forEach(function (card) {
        var id = card.getAttribute("data-action-id");
        var checkbox = card.querySelector("[data-action-toggle]");
        var note = card.querySelector("[data-action-note]");

        if (!id) {
          return;
        }

        if (checkbox) {
          checkbox.checked = Boolean(state.done[id]);
          checkbox.addEventListener("change", function () {
            state.done[id] = checkbox.checked;
            save();
            update();
          });
        }

        if (note) {
          note.value = state.notes[id] || "";
          note.addEventListener("input", function () {
            state.notes[id] = note.value;
            save();
            update();
          });
        }
      });

      if (resetButton) {
        resetButton.addEventListener("click", function () {
          state = blankState();
          cards.forEach(function (card) {
            var checkbox = card.querySelector("[data-action-toggle]");
            var note = card.querySelector("[data-action-note]");

            if (checkbox) {
              checkbox.checked = false;
            }

            if (note) {
              note.value = "";
            }
          });
          save();
          update();
        });
      }

      window.syncReportProgressAttributes = function () {
        cards.forEach(function (card) {
          var checkbox = card.querySelector("[data-action-toggle]");
          var note = card.querySelector("[data-action-note]");

          if (checkbox && checkbox.checked) {
            checkbox.setAttribute("checked", "checked");
          } else if (checkbox) {
            checkbox.removeAttribute("checked");
          }

          if (note) {
            note.textContent = note.value;
          }
        });
      };

      update();
      save();
    })();
  </script>`;
}

export function businessKitFileName(plan: BusinessKitPlan): string {
  return `${slugify(plan.title)}.html`;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function localeFor(language: BusinessKitLanguage): string {
  return {
    en: "en-US",
    nl: "nl-NL",
    fr: "fr-FR",
    de: "de-DE",
  }[language];
}

function hashString(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "business-growth-kit";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
