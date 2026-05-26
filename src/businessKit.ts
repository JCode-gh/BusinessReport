import { jsonrepair } from "jsonrepair";
import { POLLINATIONS_API_KEY, POLLINATIONS_MAX_TOKENS, POLLINATIONS_MODEL } from "./pollinationsConfig";

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
  region?: string;
  tone?: string;
  language: BusinessKitLanguage;
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
  mint: string;
};

export const REPORT_THEMES: Record<ReportThemeKey, ReportTheme> = {
  purple: {
    label: "Purple",
    swatch: "#7c6bd6",
    accent: "#7c6bd6",
    accentMid: "#6f6acf",
    accentDark: "#4c3ab5",
    coverDark: "#100d28",
    coverGradient: "linear-gradient(135deg, #100d28 0%, #1a1635 50%, #6f6acf 100%)",
    bodyBg: "#f0eeff",
    surface: "#f7f5ff",
    mint: "#f3eeff",
  },
  blue: {
    label: "Blue",
    swatch: "#3b82f6",
    accent: "#4f7ef7",
    accentMid: "#3b70f0",
    accentDark: "#1e40af",
    coverDark: "#0a1628",
    coverGradient: "linear-gradient(135deg, #0a1628 0%, #0f2148 50%, #3b70f0 100%)",
    bodyBg: "#eff6ff",
    surface: "#eff6ff",
    mint: "#dbeafe",
  },
  teal: {
    label: "Teal",
    swatch: "#0d9488",
    accent: "#0ea5a0",
    accentMid: "#0d9488",
    accentDark: "#0f6b60",
    coverDark: "#081c1a",
    coverGradient: "linear-gradient(135deg, #081c1a 0%, #0d2926 50%, #0d9488 100%)",
    bodyBg: "#f0fdfc",
    surface: "#f0fdf9",
    mint: "#ccfbf1",
  },
  rose: {
    label: "Rose",
    swatch: "#db2777",
    accent: "#e85d8a",
    accentMid: "#db2777",
    accentDark: "#9d174d",
    coverDark: "#1a0b12",
    coverGradient: "linear-gradient(135deg, #1a0b12 0%, #2d1020 50%, #db2777 100%)",
    bodyBg: "#fff1f7",
    surface: "#fff0f6",
    mint: "#fce7f3",
  },
  amber: {
    label: "Amber",
    swatch: "#f59e0b",
    accent: "#f59e0b",
    accentMid: "#d97706",
    accentDark: "#92400e",
    coverDark: "#1c1208",
    coverGradient: "linear-gradient(135deg, #1c1208 0%, #2d1e08 50%, #d97706 100%)",
    bodyBg: "#fffbf0",
    surface: "#fffbeb",
    mint: "#fef3c7",
  },
};

export type BusinessKitPlan = {
  language: BusinessKitLanguage;
  theme?: ReportThemeKey;
  title: string;
  subtitle: string;
  executiveSummary: string;
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
  upsellIdeas: string[];
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
  },
};

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

export type RetryInfo = {
  attempt: number;
  totalAttempts: number;
  retryAfterSeconds: number;
};

export const ESTIMATED_RESPONSE_CHARS = 12_000;

export async function createBusinessKit(
  request: BusinessKitRequest,
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<BusinessKitPlan> {
  return await fetchBusinessKitFromApi(request, onRetry, onProgress);
}

async function fetchBusinessKitFromApi(
  request: BusinessKitRequest,
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<BusinessKitPlan> {
  const userMessage = formatRequestForApi(request);
  const modes = ["json", "compact"] as const;
  let lastError: Error | null = null;

  for (const mode of modes) {
    try {
      const text = await callPollinationsApi(userMessage, request.language, mode, onRetry, onProgress);
      const plan = parseApiPlan(text, request);
      if (plan) return plan;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  const incompleteMessages: Record<BusinessKitLanguage, string> = {
    nl: "De AI gaf een onvolledig rapport terug. Probeer opnieuw te genereren.",
    en: "The AI returned an incomplete report. Please try generating again.",
    fr: "L'IA a renvoyé un rapport incomplet. Réessayez la génération.",
    de: "Die KI lieferte einen unvollständigen Report. Bitte erneut generieren.",
  };

  throw lastError ?? new Error(incompleteMessages[request.language]);
}

function formatRequestForApi(request: BusinessKitRequest): string {
  const languageNames: Record<BusinessKitLanguage, string> = {
    en: "English",
    nl: "Dutch (Nederlands)",
    fr: "French",
    de: "German",
  };
  const languageInstructions: Record<BusinessKitLanguage, string> = {
    en: "Write every user-facing field in fluent English. Keep JSON property names in English.",
    nl: "Schrijf elke zichtbare rapportzin volledig in vloeiend Nederlands. De brief kan Engels bevatten: neem de betekenis over, maar kopieer NOOIT Engelse zinnen letterlijk in je output. Geen mengtaal. Merknamen en eigennamen blijven onvertaald. Vakjargon mag Engels blijven: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
    fr: "Rédigez chaque champ visible entièrement en français. Le brief peut être en anglais: absorbez le sens, ne copiez jamais de phrases anglaises telles quelles. Pas de mélange de langues. Noms propres et marques inchangés. Jargon pro anglais accepté: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
    de: "Schreiben Sie jedes sichtbare Feld vollständig auf Deutsch. Das Briefing kann Englisch sein: Bedeutung übernehmen, aber niemals englische Sätze wörtlich kopieren. Kein Sprachmix. Markennamen unverändert. Fachjargon darf Englisch bleiben: cold email, cold outreach, follow-up, lead, leads, lead generation, pipeline, funnel, pitch, upsell, cross-sell, CRM, B2B, B2C, LinkedIn, sprint, template, niche, onboarding, retainer, SaaS, ROI, KPI, USP, landing page, call-to-action, inbox, DM.",
  };

  const translationExamples: Partial<Record<BusinessKitLanguage, string>> = {
    nl: `
MENGTAAL — VERBODEN:
FOUT: "Een heldere zin die Book more qualified sales calls and sell higher-ticket packages within 30 days koppelt aan Local service businesses with 5 to 30 employees that rely on referrals."
GOED: "Een heldere zin die meer gekwalificeerde salesgesprekken en hogere pakketten binnen 30 dagen koppelt aan lokale dienstverleners met 5 tot 30 medewerkers die vooral op referrals vertrouwen."`,
    fr: `
MÉLANGE — INTERDIT: ne jamais insérer des fragments anglais du brief dans une phrase française.`,
    de: `
SPRACHMIX — VERBOTEN: niemals englische Brief-Fragmente wörtlich in deutsche Sätze einfügen.`,
  };

  return `CRITICAL LANGUAGE REQUIREMENT: Every JSON string value must be 100% in ${languageNames[request.language]} — no mixed-language sentences.

TRANSLATION RULE
================
The brief below is SOURCE DATA. It may be in English.
- Absorb the facts; rewrite everything fully in ${languageNames[request.language]}.
- NEVER paste brief phrases verbatim when they are not already in ${languageNames[request.language]}.
- NEVER write: "[${languageNames[request.language]} words] + [copied English brief phrase] + [${languageNames[request.language]} words]".
${translationExamples[request.language] ?? ""}

BUSINESS BRIEF (translate fully — do not quote verbatim in the output language)
================================================================================
Report language: ${languageNames[request.language]}
Language instruction: ${languageInstructions[request.language]}

Business name: ${request.businessName ?? "Not provided"}
Business type: ${request.businessType ?? "Not provided"}
Current offer: ${request.offer ?? "Not provided"}
Target customer: ${request.audience ?? "Not provided"}
Core problem they face: ${request.problem ?? "Not provided"}
Growth goal (30 days): ${request.goal ?? "Not provided"}
Active channels: ${request.channels ?? "Not provided"}
Current / target price point: ${request.pricePoint ?? "Not provided"}
Region / market: ${request.region ?? "Not provided"}
Report tone: ${request.tone ?? "Clear, direct, premium, practical"}

COMPETITIVE CONTEXT
===================
Based on businessType "${request.businessType ?? "Not provided"}" and region "${request.region ?? "Not provided"}", identify 2–3 specific competitors or alternatives the target customer (${request.audience ?? "Not provided"}) is most likely comparing right now. Name real companies, platforms, or approaches (e.g. "Fiverr freelancers", "Wix website builders", "local marketing agencies") — not vague categories. For each: name the competitor, identify one specific weakness from the buyer's perspective, and state a concrete advantage the business above has over them. Include this as the "competitorAnalysis" field in the JSON.

Build a full entrepreneur growth kit for this business. Every section must be specific to the brief above — never use placeholder text or generic advice that could apply to any business.

FINAL REMINDER: ALL string values must be 100% in ${languageNames[request.language]} with zero copied English brief fragments. Re-read every field before responding.`;
}

function apiSystemPrompt(mode: "json" | "compact", language: BusinessKitLanguage): string {
  const jsonInstruction = mode === "json"
    ? "Return ONLY a raw JSON object. Start with { and end with }. No markdown fences, no commentary, no text outside the JSON."
    : "Return ONLY a raw JSON object starting with {. Keep individual string values concise to stay within the token limit, but keep all required keys.";

  const languageNames: Record<BusinessKitLanguage, string> = {
    en: "English",
    nl: "Dutch (Nederlands)",
    fr: "French",
    de: "German",
  };

  const mixedLanguageRule = language === "en"
    ? ""
    : `
LANGUAGE (highest priority)
- Output language: ${languageNames[language]} only.
- The brief may be English; translate it fully. Never quote untranslated brief text inside a ${languageNames[language]} sentence.
- Mixed-language output is an automatic failure (e.g. Dutch sentence structure with English brief phrases copied in).`;

  return `CRITICAL: You MUST write ALL content in ${languageNames[language]}. Every field must be fully in that language — never mixed with untranslated brief text.

You are a senior growth strategist with 15 years of experience advising small businesses, boutique agencies, solo consultants, SaaS founders, ecommerce operators, and local service companies. You write in the style of a premium paid consultant report — sharp, specific, commercially grounded, and immediately actionable.
${mixedLanguageRule}

NOTE: Examples below are in English for structure only. Your actual output must be in ${languageNames[language]}.

${jsonInstruction}

FORBIDDEN (never do any of these):
- Generic advice that could apply to any business
- Vague actions without a concrete next step
- Scores above 70 without explicit evidence from the brief
- Empty, skeleton, or short templates
- Wrong language or mixed-language sentences (copying English brief phrases into ${languageNames[language]} text)
- Placeholders like "[insert your offer]" or "[your audience]" — only [Name] and [Company] are allowed

QUALITY RULES (never break these):
- Every recommendation must name a specific action, not a category. Bad: "improve your marketing". Good: "Rewrite your LinkedIn headline to lead with the buyer's painful outcome, not your job title."
- Every diagnosis must explain WHY the problem exists, not just that it exists.
- Scores must be brutally honest. A business with no mentioned outbound system MUST score below 45 on Lead Generation. Never give scores above 70 unless the brief explicitly proves it.
- Templates must include a complete subject line AND full body copy of minimum 5 sentences. No placeholders except [Name] and [Company].
- Content ideas must include a specific angle and a punchy first line (hook) someone could post today.
- Metrics must include a realistic numeric target tied to the business's price point and stage.
- Action plan items must start with an action verb (Write, Build, Launch, Send, Create, Record, Set up) and state a concrete deliverable. Bad: "Work on positioning". Good: "Write a one-sentence value proposition using the formula: We help [audience] achieve [outcome] without [obstacle]."
- If a field is missing from the brief, make a clearly-labeled assumption and work with it — never output a generic placeholder.
- Tone must match the brief's requested style throughout.

EXAMPLES OF GOOD VS BAD OUTPUT (follow the GOOD examples exactly):

executiveSummary:
BAD: "This business has potential for growth. The key is to improve marketing and sales. Focus on the right customers and you will see results in 30 days."
GOOD: "Northstar Studio's single biggest lever is repositioning from 'web design agency' to 'revenue-focused digital system for service businesses' — pricing is currently 40% below market for the value delivered. The blocker is weak outbound: referrals are the only active channel, creating feast-or-famine cycles. The shift needed in 30 days: launch systematic LinkedIn outreach targeting Benelux service businesses with 5–30 staff, combined with a proposal that anchors on ROI rather than deliverables."

actionPlan (single item):
BAD: { "day": "Day 1", "task": "Work on positioning", "outcome": "Better positioning" }
GOOD: { "day": "Day 1", "task": "Write one positioning sentence using the formula: We help [specific audience] achieve [specific outcome] without [specific obstacle] — test it with 3 past clients today", "outcome": "A positioning statement ready for LinkedIn headline, email signature, and proposal opener immediately" }

templates (single item):
BAD: { "title": "Cold outreach", "channel": "Email", "body": "Hi [Name], I noticed your business could benefit from our services. Let me know if you want to chat." }
GOOD: { "title": "Cold email — website ROI pitch", "channel": "Email", "body": "Subject: Your website is costing you qualified leads — here is the fix\\n\\nHi [Name],\\n\\nI looked at [Company]'s website and spotted three gaps that are likely costing you 2–3 qualified enquiries per month: no social proof above the fold, a contact form with no qualifying questions, and a homepage headline that describes what you do instead of what the buyer gets.\\n\\nI run Northstar Studio — we build fixed-scope website and automation systems for service businesses. Our clients typically move from referral-dependent pipelines to 5–8 inbound enquiries per month within 60 days.\\n\\nWould it make sense to do a 20-minute call this week? I can show you exactly what I'd change before we talk budget.\\n\\nBest,\\n[Name]" }

SECTION-BY-SECTION INSTRUCTIONS:

executiveSummary (3–4 sentences): Open with the single biggest growth lever this business has RIGHT NOW. Then name the one thing blocking that lever. Close with the key strategic shift needed in the next 30 days. Be direct — no preamble.

positioning (3–4 sentences): Diagnose how this business is currently perceived versus how it SHOULD be positioned. Name the positioning gap. Prescribe the exact repositioning move: what to lead with, what to stop saying, what proof point anchors the claim.

coreOfferRewrite (2–3 sentences): Rewrite the current offer as a buyer would want to hear it — outcome first, scope second, risk-reducer third. Name the deliverable, the timeframe, and the result the buyer walks away with. Kill feature-speak.

idealCustomerProfile (3–4 sentences): Describe the single best-fit buyer profile with enough specificity that you could find 50 of them on LinkedIn this week. Include company size, role, trigger event that makes them ready to buy NOW, and the internal conversation they're having before they search for a solution.

biggestRisks (4–5 items): Name the specific commercial risks — positioning, pricing, channel dependency, operational, competitive. Each risk must explain the consequence if unaddressed, not just name the issue.

quickWins (5–7 items): These are actions completable in 1–5 days that generate a visible result. Sort by impact-to-effort score. Label each with [HIGH/MED/LOW effort] at the start. The first 3 must be completable today. Each must be specific enough to start immediately.

strategySections (5 sections, each with a sharp title): Cover: Offer & Pricing, Acquisition, Conversion, Retention & Expansion, Operations & Leverage. Each diagnosis should be 2–3 sentences explaining the root cause. Each move (3–5 per section) must be a specific executable action, not a theme.

scorecard (6 dimensions): Score: Offer Clarity, Pricing Power, Lead Generation, Conversion System, Customer Retention, Operational Leverage. Each score (0–100) needs a 1-sentence rationale explaining exactly why it earned that score and a concrete next move to improve it. Scores must be brutally honest. A business with no mentioned outbound system MUST score below 45 on Lead Generation. Never give scores above 70 unless the brief explicitly proves it.

competitorAnalysis (2–3 items): Name real competitors or alternatives the target customer is comparing right now. For each: the actual competitor name, their specific weakness from the buyer's perspective, and a concrete advantage the business has over them.

actionPlan (12 items, mandatory): Day 1, Day 2, Day 3, Day 4-5, Day 6-7, Week 2 (part 1), Week 2 (part 2), Week 3 (part 1), Week 3 (part 2), Week 4 (part 1), Week 4 (part 2), Day 30 Review. Each task must start with an action verb. Each task must be a single concrete deliverable. Outcome must be the measurable result of completing that task.

templates (5–6 items): Must include ALL of: cold outreach opener, follow-up after no reply (3 days), discovery call confirmation, proposal follow-up after 3 days silence, LinkedIn connection request (300 chars max), and optionally a WhatsApp/SMS follow-up (short). Each template must be SEND-READY copy someone can paste today — not a description of what to write. Email templates need "Subject:" / "Onderwerp:" plus full body (minimum 5 sentences, multiple paragraphs). Only placeholders: [Naam]/[Name] and [Bedrijf]/[Company]. NEVER insert untranslated brief text. NEVER use label placeholders like "de ideale doelklant" or "het kernaanbod". Rewrite brief facts as natural sentences in the output language.

contentIdeas (6–8 items): Mix of LinkedIn posts, email subjects, and short-form video hooks. Each must target a specific buyer pain or objection. The hook must be a complete opening sentence someone could use today.

metrics (6–8 items): Include leading and lagging indicators. Each metric needs a specific numeric or percentage target grounded in the business's price point and sales cycle. The "why" must explain what goes wrong if this metric is ignored.

upsellIdeas (4–5 items): Logical next offers after the first sale — priced and scoped, not just named. Explain what triggers the upsell conversation.

assumptions (3–5 items): List the assumptions you made where the brief was silent. Format as "We assume [X] because [Y]. If this is wrong, adjust [Z]."

disclaimer: One sentence, professional, non-alarmist.

REQUIRED JSON SHAPE (all keys required):
{
  "title": string,
  "subtitle": string,
  "executiveSummary": string,
  "positioning": string,
  "coreOfferRewrite": string,
  "idealCustomerProfile": string,
  "biggestRisks": string[],
  "quickWins": string[],
  "strategySections": [{ "title": string, "diagnosis": string, "moves": string[] }],
  "scorecard": [{ "label": string, "score": number, "rationale": string, "nextMove": string }],
  "competitorAnalysis": [{ "competitor": string, "weakness": string, "ourAdvantage": string }],
  "actionPlan": [{ "day": string, "task": string, "outcome": string }],
  "templates": [{ "title": string, "channel": string, "body": string }],
  "contentIdeas": [{ "title": string, "angle": string, "hook": string }],
  "metrics": [{ "metric": string, "target": string, "why": string }],
  "upsellIdeas": string[],
  "assumptions": string[],
  "disclaimer": string
}

CRITICAL REMINDER: Every string value must be fully in ${languageNames[language]} with no verbatim English brief fragments. Check every field before responding.`;
}

async function callPollinationsApi(
  userMessage: string,
  language: BusinessKitLanguage,
  mode: "json" | "compact",
  onRetry?: (info: RetryInfo) => void,
  onProgress?: (chars: number) => void,
): Promise<string> {
  const useStream = Boolean(onProgress);
  const endpoint = new URL("https://gen.pollinations.ai/v1/chat/completions");

  const body: Record<string, unknown> = {
    model: POLLINATIONS_MODEL,
    temperature: 0.6,
    max_tokens: POLLINATIONS_MAX_TOKENS,
    stream: useStream,
    messages: [
      { role: "system", content: apiSystemPrompt(mode, language) },
      { role: "user", content: userMessage },
    ],
  };

  if (mode === "json") {
    body.response_format = { type: "json_object" };
  }

  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 90_000);

    let response: Response;
    try {
      response = await fetch(endpoint.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(POLLINATIONS_API_KEY ? { Authorization: `Bearer ${POLLINATIONS_API_KEY}` } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("retry-after") ?? 30);

      if (attempt < MAX_RETRIES - 1) {
        const waitSeconds = Math.min(retryAfter, 60);
        onRetry?.({ attempt: attempt + 1, totalAttempts: MAX_RETRIES, retryAfterSeconds: waitSeconds });
        await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }

      throw new RateLimitError(`Rate limited. Try again in ${Math.ceil(retryAfter)} seconds.`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null) as {
        error?: { message?: string };
      } | null;
      const msg = errorData?.error?.message ?? `Pollinations HTTP ${response.status}`;
      throw new Error(msg);
    }

    if (useStream && response.body) {
      return await readOpenAiSseStream(response.body, onProgress!);
    }

    const data = await response.json().catch(() => ({})) as OpenAiChatResponse;

    if (data.error?.message) {
      const msg = data.error.message;
      console.warn("[BusinessKit] Pollinations error in body:", msg);

      if (attempt < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }

      throw new Error(msg);
    }

    return extractOpenAiText(data);
  }

  throw new Error("Pollinations request failed after retries.");
}

type OpenAiChatResponse = {
  choices?: Array<{
    message?: { content?: string };
    delta?: { content?: string };
  }>;
  error?: { message?: string };
};

function extractOpenAiText(data: OpenAiChatResponse): string {
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function readOpenAiSseStream(
  body: ReadableStream<Uint8Array>,
  onProgress: (chars: number) => void,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") continue;

        try {
          const evt = JSON.parse(payload) as OpenAiChatResponse;

          if (evt.error?.message) {
            throw new Error(evt.error.message);
          }

          const chunk = evt.choices?.[0]?.delta?.content ?? "";
          if (chunk) {
            accumulated += chunk;
            onProgress(accumulated.length);
          }
        } catch (e) {
          if (e instanceof Error && !e.message.startsWith("{")) throw e;
          // malformed SSE chunk — skip
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return accumulated;
}

function parseApiPlan(rawText: string, request: BusinessKitRequest): BusinessKitPlan | null {
  if (!rawText.trim()) {
    console.warn("[BusinessKit] Empty response from API");
    return null;
  }

  const candidates = extractJsonCandidates(rawText);

  for (const candidate of candidates) {
    for (const attempt of [candidate, tryJsonRepair(candidate)]) {
      try {
        const parsed = JSON.parse(attempt);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          return normalizeApiPlan(parsed as Record<string, unknown>, request);
        }
      } catch {
        // try next
      }
    }
  }

  console.warn("[BusinessKit] Could not parse valid JSON from API response:", rawText.slice(0, 500));
  return null;
}

function tryJsonRepair(text: string): string {
  try {
    return jsonrepair(text);
  } catch {
    return text;
  }
}

function extractJsonCandidates(rawText: string): string[] {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  const candidates = new Set([trimmed]);
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
  if (fenced) candidates.add(fenced);

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) candidates.add(trimmed.slice(start, end + 1));

  return Array.from(candidates);
}

function hasMixedLanguage(text: string, reportLang: BusinessKitLanguage): boolean {
  if (!text.trim() || reportLang === "en") return false;

  const lower = text.toLowerCase();
  const dutchHits = (lower.match(/\b(de|het|een|van|voor|met|zijn|naar|die|dat)\b/g) ?? []).length;
  const englishHits = (lower.match(/\b(the|and|with|for|that|this|your|more|within|from|have|will)\b/g) ?? []).length;

  if (reportLang === "nl" && dutchHits >= 2 && englishHits >= 4) return true;
  return false;
}

function defaultPlanTitle(request: BusinessKitRequest): string {
  const name = clean(request.businessName) || "Growth Kit";
  switch (request.language) {
    case "nl":
      return `${name} groeikit`;
    case "fr":
      return `Kit de croissance ${name}`;
    case "de":
      return `${name} Wachstumskit`;
    default:
      return `${name} Growth Kit`;
  }
}

function defaultDisclaimer(language: BusinessKitLanguage): string {
  switch (language) {
    case "nl":
      return "Dit rapport is een strategisch hulpmiddel, geen garantie op omzet, winst of financiering.";
    case "fr":
      return "Ce rapport est un outil stratégique, pas une garantie de chiffre d'affaires, de profit ou de financement.";
    case "de":
      return "Dieser Bericht ist ein strategisches Hilfsmittel, keine Garantie für Umsatz, Gewinn oder Finanzierung.";
    default:
      return "This report is a strategic tool, not a guarantee of revenue, profit, or funding.";
  }
}

function isPlanComplete(plan: BusinessKitPlan): boolean {
  return (
    plan.executiveSummary.length >= 80 &&
    plan.positioning.length >= 40 &&
    plan.coreOfferRewrite.length >= 40 &&
    plan.idealCustomerProfile.length >= 40 &&
    plan.biggestRisks.length >= 3 &&
    plan.quickWins.length >= 3 &&
    plan.strategySections.length >= 3 &&
    plan.scorecard.length >= 3 &&
    plan.actionPlan.length >= 5 &&
    plan.templates.length >= 2 &&
    plan.contentIdeas.length >= 3 &&
    plan.metrics.length >= 3
  );
}

function normalizeApiPlan(
  raw: Record<string, unknown>,
  request: BusinessKitRequest,
): BusinessKitPlan | null {
  const plan: BusinessKitPlan = {
    language: request.language,
    title: strOr(raw.title, defaultPlanTitle(request)),
    subtitle: strOr(raw.subtitle, ""),
    executiveSummary: strOr(raw.executiveSummary, ""),
    positioning: strOr(raw.positioning, ""),
    coreOfferRewrite: strOr(raw.coreOfferRewrite, ""),
    idealCustomerProfile: strOr(raw.idealCustomerProfile, ""),
    biggestRisks: strArray(raw.biggestRisks, 8),
    quickWins: strArray(raw.quickWins, 10),
    strategySections: normalizeStrategySections(raw.strategySections),
    scorecard: normalizeScorecard(raw.scorecard),
    competitorAnalysis: normalizeCompetitorAnalysis(raw.competitorAnalysis),
    actionPlan: normalizeActionPlan(raw.actionPlan),
    templates: normalizeTemplates(raw.templates),
    contentIdeas: normalizeContentIdeas(raw.contentIdeas),
    metrics: normalizeMetrics(raw.metrics),
    upsellIdeas: strArray(raw.upsellIdeas, 8),
    assumptions: strArray(raw.assumptions, 8),
    disclaimer: strOr(raw.disclaimer, defaultDisclaimer(request.language)),
  };

  if (!isPlanComplete(plan)) {
    console.warn("[BusinessKit] AI response incomplete — will retry or fail");
    return null;
  }

  if (request.language !== "en" && hasMixedLanguage(plan.executiveSummary, request.language)) {
    console.warn("[BusinessKit] Possible mixed language in AI output for", request.language);
  }

  return plan;
}

function strOr(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function strArray(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => strOr(entry))
    .filter(Boolean)
    .slice(0, max);
}

function normalizeStrategySections(value: unknown): BusinessKitPlan["strategySections"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      diagnosis: strOr(v.diagnosis),
      moves: strArray(v.moves, 8),
    }))
    .filter((v) => v.title && v.diagnosis && v.moves.length > 0)
    .slice(0, 6);
}

function normalizeScorecard(value: unknown): BusinessKitPlan["scorecard"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      label: strOr(v.label),
      score: clampApiScore(v.score),
      rationale: strOr(v.rationale),
      nextMove: strOr(v.nextMove),
    }))
    .filter((v) => v.label && v.rationale && v.nextMove)
    .slice(0, 8);
}

function normalizeActionPlan(value: unknown): BusinessKitPlan["actionPlan"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      day: strOr(v.day),
      task: strOr(v.task),
      outcome: strOr(v.outcome),
    }))
    .filter((v) => v.day && v.task && v.outcome)
    .slice(0, 14);
}

function isUsableTemplate(body: string): boolean {
  const trimmed = body.trim();
  return trimmed.length >= 80;
}

function normalizeTemplates(value: unknown): BusinessKitPlan["templates"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      channel: strOr(v.channel),
      body: strOr(v.body),
    }))
    .filter((v) => v.title && v.channel && v.body && isUsableTemplate(v.body))
    .slice(0, 8);
}

function normalizeContentIdeas(value: unknown): BusinessKitPlan["contentIdeas"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      title: strOr(v.title),
      angle: strOr(v.angle),
      hook: strOr(v.hook),
    }))
    .filter((v) => v.title && v.angle && v.hook)
    .slice(0, 10);
}

function normalizeMetrics(value: unknown): BusinessKitPlan["metrics"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      metric: strOr(v.metric),
      target: strOr(v.target),
      why: strOr(v.why),
    }))
    .filter((v) => v.metric && v.target && v.why)
    .slice(0, 10);
}

function normalizeCompetitorAnalysis(value: unknown): CompetitorItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v))
    .map((v) => ({
      competitor: strOr(v.competitor),
      weakness: strOr(v.weakness),
      ourAdvantage: strOr(v.ourAdvantage),
    }))
    .filter((v) => v.competitor && v.weakness && v.ourAdvantage)
    .slice(0, 5);
}

function clampApiScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(Math.max(Math.round(n), 0), 100);
}

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
    plan.upsellIdeas.join(" "),
    plan.assumptions.join(" "),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

export function buildBusinessKitHtml(plan: BusinessKitPlan): string {
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
<html lang="${escapeHtml(labels.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(plan.title)}</title>
  <style>
    :root {
      --ink: #111827;
      --muted: #6b7280;
      --subtle: #9ca3af;
      --paper: #ffffff;
      --line: #e5e7eb;
      --surface: ${theme.surface};
      --accent: ${theme.accent};
      --accent-mid: ${theme.accentMid};
      --accent-dark: ${theme.accentDark};
      --gold: #d97706;
      --rose: #be185d;
      --navy: ${theme.coverDark};
      --coral: #c2410c;
      --mint: ${theme.mint};
      --amber: #fffbeb;
      --sky: ${theme.mint};
      --lavender: #d6a4e3;
    }

    *, *::before, *::after { box-sizing: border-box; }

    body {
      margin: 0;
      color: var(--ink);
      background: ${theme.bodyBg};
      font-family: -apple-system, "Inter", "Helvetica Neue", Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, p { margin-top: 0; }

    /* Toolbar */
    /* Page */
    .page {
      width: min(1320px, calc(100% - 32px));
      margin: 0 auto 64px;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 24px 56px rgba(0,0,0,0.11);
    }

    /* Cover */
    .cover {
      padding: 60px 64px 52px;
      color: #fff;
      background: ${theme.coverGradient};
    }

    .cover-eyebrow {
      margin: 0 0 22px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
    }

    .cover h1 {
      max-width: 820px;
      margin: 0 0 14px;
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.02em;
    }

    .cover-subtitle {
      max-width: 680px;
      margin: 0 0 32px;
      font-size: 1.08rem;
      line-height: 1.55;
      color: rgba(255,255,255,0.82);
    }

    .cover-pills { display: flex; flex-wrap: wrap; gap: 8px; }

    .pill {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      border: 1px solid rgba(255,255,255,0.28);
      border-radius: 6px;
      background: rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.88);
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Workspace */
    .workspace {
      display: grid;
      grid-template-columns: 1fr minmax(240px, 300px);
      gap: 20px;
      margin: -32px 56px 0;
      padding: 24px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #fff;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.1);
    }

    .workspace-eyebrow {
      margin: 0 0 6px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-dark);
    }

    .workspace h2 {
      margin: 0 0 6px;
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .workspace-intro { margin: 0; font-size: 0.88rem; color: var(--muted); }

    .progress-track {
      height: 8px;
      margin: 16px 0 12px;
      border-radius: 999px;
      background: var(--line);
      overflow: hidden;
    }

    .progress-track span {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--accent-dark));
      transition: width 0.3s ease;
    }

    .workspace-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

    .workspace-stat { border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; }

    .workspace-stat strong {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1;
      color: var(--navy);
    }

    .workspace-stat span {
      display: block;
      margin-top: 4px;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--subtle);
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
      border-radius: 8px;
      padding: 0 12px;
      color: var(--accent-dark);
      background: #fff;
      font: 600 0.82rem/1 inherit;
      cursor: pointer;
    }

    .focus-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      border-radius: 12px;
      color: #fff;
      background: linear-gradient(140deg, var(--navy) 0%, var(--accent-mid) 100%);
      min-height: 0;
    }

    .focus-eyebrow {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
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
      color: rgba(255,255,255,0.6);
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
      border-radius: 7px;
      background: var(--accent-mid);
      color: #fff;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .section-title {
      margin: 0;
      font-size: 1.55rem;
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .section-badge {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      height: 28px;
      padding: 0 12px;
      border-radius: 999px;
      background: var(--mint);
      color: var(--accent-dark);
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
    }

    /* Executive summary */
    .exec-lead {
      font-size: 1.18rem;
      line-height: 1.75;
      color: #1f2937;
      max-width: 820px;
      margin: 0;
      padding-left: 20px;
      border-left: 4px solid var(--accent);
    }

    /* Insight blocks */
    .insight-stack { display: grid; gap: 12px; }

    .insight-block {
      display: grid;
      grid-template-columns: 5px 1fr;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
    }

    .ia { background: var(--accent); }
    .ig { background: var(--gold); }
    .in { background: var(--navy); }

    .insight-body { padding: 18px 22px; }

    .insight-label {
      margin: 0 0 6px;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .la { color: var(--accent-dark); }
    .lg { color: #92400e; }
    .ln { color: #334155; }

    .insight-text { margin: 0; font-size: 1.05rem; line-height: 1.65; }

    /* Quick wins */
    .win-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }

    .win-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 14px;
      align-items: start;
      padding: 14px 18px 14px 14px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface);
    }

    .win-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--mint);
      color: var(--accent-dark);
      font-size: 0.76rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .win-text { font-size: 1.02rem; line-height: 1.55; padding-top: 4px; }

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
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 10px;
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
      font-size: 1.6rem;
      font-weight: 900;
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
      height: 3px;
      border-radius: 999px;
      background: var(--line);
      overflow: hidden;
      margin-bottom: 8px;
    }

    .scorecard-fill { height: 100%; border-radius: inherit; }
    .sc-high .scorecard-fill, .scorecard-row.sc-high .scorecard-fill { background: var(--accent); }
    .sc-mid  .scorecard-fill, .scorecard-row.sc-mid  .scorecard-fill { background: var(--gold); }
    .sc-low  .scorecard-fill, .scorecard-row.sc-low  .scorecard-fill { background: var(--coral); }

    .sc-high .scorecard-score { color: var(--accent-dark); }
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
      color: var(--ink);
      margin: 0;
      line-height: 1.5;
    }

    .scorecard-next-move strong {
      color: var(--accent-dark);
      font-weight: 600;
    }

    /* Strategy */
    .strategy-list { display: grid; gap: 14px; }

    .strategy-card { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .strategy-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 22px;
      background: var(--navy);
      color: #fff;
    }

    .strategy-index {
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.1em;
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
      border-left: 3px solid var(--line);
    }

    .strategy-moves { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }

    .strategy-move {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 10px;
      font-size: 1rem;
      line-height: 1.5;
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
      border-radius: 12px;
      background: #fff;
      transition: border-color 0.2s, background 0.2s;
      break-inside: avoid;
    }

    .action-card.is-complete { border-color: rgba(111,106,207,0.3); background: #f3eeff; }
    .action-card.is-current  { border-color: rgba(194,65,12,0.45); box-shadow: inset 4px 0 0 var(--coral); }

    .action-toggle {
      position: relative;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      margin-top: 2px;
      border: 2px solid #d1d5db;
      border-radius: 9px;
      background: #fff;
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

    .action-card.is-complete .action-toggle { border-color: var(--accent); background: var(--accent); }

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
      border-radius: 6px;
      background: var(--surface);
      color: var(--navy);
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
      border-radius: 6px;
      background: #fff0f4;
      color: var(--rose);
      font-size: 0.74rem;
      font-weight: 700;
    }

    .action-card.is-complete .action-state { background: var(--mint); color: var(--accent-dark); }

    .action-task { font-size: 1.02rem; font-weight: 600; margin: 0 0 4px; }
    .action-outcome { font-size: 0.95rem; color: var(--muted); margin: 0 0 10px; }

    .notes-field { display: grid; gap: 5px; }

    .notes-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--subtle);
    }

    .notes-field textarea {
      width: 100%;
      min-height: 68px;
      resize: vertical;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 9px 12px;
      color: var(--ink);
      background: var(--surface);
      font: 0.87rem/1.45 inherit;
      outline: none;
    }

    /* Templates */
    .template-list { display: grid; gap: 16px; }

    .template-card { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .template-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 20px;
      background: var(--surface);
      border-bottom: 1px solid var(--line);
    }

    .template-title { font-size: 1.05rem; font-weight: 700; margin: 0; }

    .template-channel {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-dark);
      background: var(--mint);
      padding: 4px 10px;
      border-radius: 6px;
    }

    .template-body { padding: 20px; font-size: 1rem; line-height: 1.75; white-space: pre-wrap; color: #374151; }

    /* Content ideas */
    .content-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }

    .content-card {
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .content-title { font-size: 1.08rem; font-weight: 700; margin: 0; }
    .content-angle { font-size: 0.97rem; color: var(--muted); margin: 0; line-height: 1.55; }

    .content-hook {
      font-size: 1rem;
      font-style: italic;
      margin: 0;
      padding: 10px 14px;
      border-left: 3px solid var(--gold);
      background: var(--amber);
      border-radius: 0 8px 8px 0;
      line-height: 1.5;
    }

    /* Metrics table */
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      font-size: 1rem;
    }

    .metrics-table th {
      padding: 13px 18px;
      background: var(--navy);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
    }

    .metrics-table td { padding: 15px 18px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.65; }
    .metrics-table tr:nth-child(even) td { background: var(--surface); }
    .metric-name { font-weight: 600; }
    .metric-target { font-weight: 700; color: var(--accent-dark); }

    /* Bottom grid */
    .bottom-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }

    .tagged-panel { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }

    .tagged-header {
      padding: 10px 16px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }

    .th-risk        { background: #fff1f2; color: #be123c; border-bottom: 1px solid #fecdd3; }
    .th-upsell      { background: var(--amber); color: #92400e; border-bottom: 1px solid #fde68a; }
    .th-assumptions { background: var(--sky); color: #0369a1; border-bottom: 1px solid #bae6fd; }

    .tagged-list { padding: 14px 16px; list-style: none; margin: 0; display: grid; gap: 10px; }

    .tagged-item { font-size: 0.87rem; line-height: 1.55; padding-left: 14px; position: relative; }

    .tagged-item::before { content: "·"; position: absolute; left: 0; color: var(--subtle); font-size: 1.2rem; line-height: 1.1; }

    /* Footer */
    .report-footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--line);
      font-size: 0.81rem;
      color: var(--subtle);
      line-height: 1.6;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .cover, .content { padding: 36px 28px; }
      .workspace { margin: -24px 20px 0; padding: 18px; grid-template-columns: 1fr; }
      .bottom-grid, .content-grid { grid-template-columns: 1fr; }
      .scorecard-row { grid-template-columns: 48px 1fr; }
    }

    @media (max-width: 600px) {
      body { background: #fff; }

      .page {
        width: 100%;
        margin: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
      }

      .cover { padding: 28px 20px 32px; }
      .cover h1 { font-size: clamp(1.6rem, 7vw, 2.6rem); }
      .cover-subtitle { font-size: 0.95rem; margin-bottom: 20px; }

      .workspace {
        margin: -20px 12px 0;
        padding: 16px;
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .workspace-stats { grid-template-columns: repeat(3, 1fr); }
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

      .report-footer { margin-top: 32px; }
    }

    @media (max-width: 380px) {
      .cover { padding: 20px 14px 24px; }
      .content { padding: 20px 14px 32px; }
      .workspace { margin: -16px 8px 0; padding: 12px; }
      .workspace-stats { grid-template-columns: 1fr 1fr; }
    }

    /* Jump-to-section navigation */
    .section-jump-nav {
      position: sticky;
      top: 0px;
      z-index: 9;
      overflow-x: auto;
      background: rgba(255,255,255,0.97);
      border-bottom: 1px solid var(--line);
      scrollbar-width: none;
    }

    .section-jump-nav::-webkit-scrollbar { display: none; }

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

    .section-jump-nav a:hover { color: var(--accent-dark); border-bottom-color: var(--accent); }

    /* Template copy button */
    .template-copy-btn {
      height: 28px;
      padding: 0 10px;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #fff;
      color: var(--accent-dark);
      font: 600 0.73rem/1 inherit;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }

    .template-copy-btn.is-copied {
      background: var(--mint);
      border-color: var(--accent);
    }

    /* Competitor analysis table */
    .competitor-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      font-size: 1rem;
    }

    .competitor-table th {
      padding: 13px 18px;
      background: var(--navy);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-align: left;
    }

    .competitor-table td { padding: 15px 18px; border-top: 1px solid var(--line); vertical-align: top; line-height: 1.65; }
    .competitor-table tr:nth-child(even) td { background: var(--surface); }
    .competitor-name { font-weight: 700; color: var(--navy); }
    .competitor-weakness { color: var(--coral); }
    .competitor-advantage { color: var(--accent-dark); font-weight: 600; }

    @media print {
      *, *::before, *::after {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }

      .section-jump-nav, .workspace, .template-copy-btn { display: none !important; }

      body { background: #fff; }

      .page {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      /* Cover fills first page, content starts fresh on page 2 */
      .cover {
        break-after: page;
        page-break-after: always;
        background: ${theme.coverGradient} !important;
        border-radius: 0 !important;
      }

      /* Each section starts on a new page — prevents header orphaning */
      .report-section {
        break-before: page;
        page-break-before: always;
      }

      /* Section header must stay glued to the first content element below it */
      .section-header, .action-header-row {
        break-after: avoid;
        page-break-after: avoid;
      }

      /* Individual content units: never split across pages */
      .insight-block,
      .win-item,
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

      /* Prevent lonely single lines at page edges */
      p { orphans: 3; widows: 3; }

      /* Scorecard tier colors preserved via print-color-adjust above */
      .scorecard-row.sc-high::before { background: var(--accent) !important; }
      .scorecard-row.sc-mid::before  { background: var(--gold) !important; }
      .scorecard-row.sc-low::before  { background: var(--coral) !important; }
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
    <div class="jump-nav-inner">
      <span class="jump-nav-label">${escapeHtml(labels.jumpToSection)}</span>
      <a href="#sec-1" onclick="event.preventDefault();scrollToAnchor('sec-1')">1. ${escapeHtml(labels.executiveSummary)}</a>
      <a href="#sec-2" onclick="event.preventDefault();scrollToAnchor('sec-2')">2. ${escapeHtml(labels.positioning)}</a>
      <a href="#sec-3" onclick="event.preventDefault();scrollToAnchor('sec-3')">3. ${escapeHtml(labels.fastestQuickWins)}</a>
      <a href="#sec-4" onclick="event.preventDefault();scrollToAnchor('sec-4')">4. ${escapeHtml(labels.growthScorecard)}</a>
      ${hasCompetitors ? `<a href="#sec-5" onclick="event.preventDefault();scrollToAnchor('sec-5')">5. ${escapeHtml(labels.competitorAnalysis)}</a>` : ""}
      <a href="#sec-${hasCompetitors ? 6 : 5}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 6 : 5}')">${hasCompetitors ? 6 : 5}. ${escapeHtml(labels.strategicMoves)}</a>
      <a href="#sec-${hasCompetitors ? 7 : 6}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 7 : 6}')">${hasCompetitors ? 7 : 6}. ${escapeHtml(labels.actionPlan)}</a>
      <a href="#sec-${hasCompetitors ? 8 : 7}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 8 : 7}')">${hasCompetitors ? 8 : 7}. ${escapeHtml(labels.salesTemplates)}</a>
      <a href="#sec-${hasCompetitors ? 9 : 8}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 9 : 8}')">${hasCompetitors ? 9 : 8}. ${escapeHtml(labels.contentIdeas)}</a>
      <a href="#sec-${hasCompetitors ? 10 : 9}" onclick="event.preventDefault();scrollToAnchor('sec-${hasCompetitors ? 10 : 9}')">${hasCompetitors ? 10 : 9}. ${escapeHtml(labels.metricsToTrack)}</a>
    </div>
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
        <p class="exec-lead">${escapeHtml(plan.executiveSummary)}</p>
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
          ${plan.quickWins.map((win, i) => `<li class="win-item"><span class="win-num">${i + 1}</span><span class="win-text">${escapeHtml(win)}</span></li>`).join("")}
        </ol>
      </div>

      <div class="report-section" id="sec-4">
        <div class="section-header">
          <span class="section-num">4</span>
          <h2 class="section-title">${escapeHtml(labels.growthScorecard)}</h2>
        </div>
        <div class="scorecard-list">
          ${plan.scorecard.map((item) => scorecardRow(item, labels)).join("")}
        </div>
      </div>

      ${hasCompetitors ? competitorSection(plan, labels) : ""}

      <div class="report-section" id="sec-${hasCompetitors ? 6 : 5}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 6 : 5}</span>
          <h2 class="section-title">${escapeHtml(labels.strategicMoves)}</h2>
        </div>
        <div class="strategy-list">
          ${plan.strategySections.map((item, i) => strategyCard(item, i)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 7 : 6}">
        <div class="action-header-row">
          <div class="section-header" style="margin-bottom:0;flex:1">
            <span class="section-num">${hasCompetitors ? 7 : 6}</span>
            <h2 class="section-title">${escapeHtml(labels.actionPlan)}</h2>
          </div>
          <span class="section-badge" data-action-summary>0/${escapeHtml(String(plan.actionPlan.length))} ${escapeHtml(labels.completed)}</span>
        </div>
        <div class="action-list">
          ${plan.actionPlan.map((item, index) => actionPlanCard(item, index, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 8 : 7}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 8 : 7}</span>
          <h2 class="section-title">${escapeHtml(labels.salesTemplates)}</h2>
        </div>
        <div class="template-list">
          ${plan.templates.map((t) => templateCard(t, labels)).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 9 : 8}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 9 : 8}</span>
          <h2 class="section-title">${escapeHtml(labels.contentIdeas)}</h2>
        </div>
        <div class="content-grid">
          ${plan.contentIdeas.map(contentCard).join("")}
        </div>
      </div>

      <div class="report-section" id="sec-${hasCompetitors ? 10 : 9}">
        <div class="section-header">
          <span class="section-num">${hasCompetitors ? 10 : 9}</span>
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
        <div class="bottom-grid">
          ${taggedPanel(labels.biggestRisks, plan.biggestRisks, "risk")}
          ${taggedPanel(labels.upsellIdeas, plan.upsellIdeas, "upsell")}
          ${taggedPanel(labels.assumptions, plan.assumptions, "assumptions")}
        </div>
      </div>

      <footer class="report-footer">${escapeHtml(plan.disclaimer)}</footer>
    </main>
  </article>

  ${interactiveReportScript(reportId, labels)}
</body>
</html>`;
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
        <button type="button" class="template-copy-btn" onclick="(function(btn){var t=btn.closest('.template-card').querySelector('.template-body');navigator.clipboard.writeText(${bodyJson}).then(function(){btn.textContent=${copiedLabel};btn.classList.add('is-copied');setTimeout(function(){btn.textContent=${copyLabel};btn.classList.remove('is-copied')},2000)}).catch(function(){});})(this)">${escapeHtml(labels.copyToClipboard)}</button>
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
  return `<div class="report-section" id="sec-5">
    <div class="section-header">
      <span class="section-num">5</span>
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
      })};
      var storageKey = "growth-kit-progress:" + reportId;
      var root = document.querySelector("[data-report-workspace]");
      var cards = Array.prototype.slice.call(document.querySelectorAll("[data-action-card]"));
      var progressBar = document.querySelector("[data-progress-bar]");
      var progressText = document.querySelector("[data-progress-text]");
      var completedCount = document.querySelector("[data-completed-count]");
      var remainingCount = document.querySelector("[data-remaining-count]");
      var nextFocus = document.querySelector("[data-next-focus]");
      var nextDetail = document.querySelector("[data-next-detail]");
      var saveStatus = document.querySelector("[data-save-status]");
      var summary = document.querySelector("[data-action-summary]");
      var resetButton = document.querySelector("[data-reset-progress]");

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

function splitChannels(value: string): string[] {
  return value
    .split(/[,;\n]+/g)
    .map((item) => clean(item))
    .filter(Boolean);
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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(Math.round(value), min), max);
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
