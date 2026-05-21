import type {BusinessKitLanguage, BusinessKitPlan} from "./BusinessKitHelper.js";

type ReportTranslations = {
    htmlLang: string;
    label: string;
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
};

const reportTranslations: Record<BusinessKitLanguage, ReportTranslations> = {
    en: {
        htmlLang: "en",
        label: "AI Entrepreneur Growth Kit",
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
        workspaceIntro: "Check off the 30-day actions as you finish them, keep working notes beside each task, and come back to the report with your progress still intact.",
        progressComplete: "complete",
        completed: "completed",
        remaining: "remaining",
        nextFocus: "Next focus",
        allActionsDone: "Every action is complete. Time to review the metrics and choose the next growth cycle.",
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
    },
    nl: {
        htmlLang: "nl",
        label: "AI Ondernemers Groeikit",
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
        workspaceIntro: "Vink de 30-dagenacties af wanneer je ze afrondt, bewaar werknotities per taak en keer later terug naar dit rapport met je voortgang intact.",
        progressComplete: "voltooid",
        completed: "voltooid",
        remaining: "resterend",
        nextFocus: "Volgende focus",
        allActionsDone: "Alle acties zijn afgerond. Tijd om de metrics te bekijken en de volgende groeicyclus te kiezen.",
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
    },
    fr: {
        htmlLang: "fr",
        label: "Kit de croissance entrepreneur IA",
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
        workspaceIntro: "Cochez les actions du plan de 30 jours au fur et à mesure, gardez vos notes de travail près de chaque tâche et retrouvez votre progression quand vous revenez au rapport.",
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
    },
    de: {
        htmlLang: "de",
        label: "KI-Wachstumskit für Unternehmer",
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
        workspaceIntro: "Hake die 30-Tage-Aktionen ab, sobald du sie erledigst, speichere Arbeitsnotizen pro Aufgabe und komme später mit erhaltenem Fortschritt zurück.",
        progressComplete: "abgeschlossen",
        completed: "abgeschlossen",
        remaining: "offen",
        nextFocus: "Nächster Fokus",
        allActionsDone: "Alle Aktionen sind abgeschlossen. Prüfe jetzt die Kennzahlen und wähle den nächsten Wachstumszyklus.",
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
    },
};

const localeByLanguage: Record<BusinessKitLanguage, string> = {
    en: "en-US",
    nl: "nl-NL",
    fr: "fr-FR",
    de: "de-DE",
};

function buildBusinessKitHtml(plan: BusinessKitPlan): string {
    const t = reportTranslations[plan.language] ?? reportTranslations.en;
    const reportId = reportIdentity(plan);
    const generatedAt = new Intl.DateTimeFormat(localeByLanguage[plan.language] ?? "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date());

    return `<!doctype html>
<html lang="${escapeHtml(t.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(plan.title)}</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #18212a;
      --muted: #63727d;
      --paper: #ffffff;
      --line: #d8e0e4;
      --surface: #f3f7f8;
      --accent: #0f766e;
      --accent-dark: #115e59;
      --gold: #b7791f;
      --rose: #a23b62;
      --navy: #18243a;
      --coral: #c75c3f;
      --mint: #e4f5ef;
      --progress: 0%;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(circle at 12% 0%, rgba(199, 92, 63, 0.12), transparent 28rem),
        radial-gradient(circle at 88% 10%, rgba(15, 118, 110, 0.16), transparent 30rem),
        #eaf0f1;
      font-family: Inter, Avenir Next, Helvetica Neue, Arial, sans-serif;
      line-height: 1.55;
    }

    .report-toolbar {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 12px;
      border-bottom: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(10px);
      box-shadow: 0 12px 32px rgba(24, 33, 42, 0.08);
    }

    .report-toolbar button {
      min-height: 40px;
      border: 1px solid var(--accent-dark);
      border-radius: 8px;
      padding: 0 14px;
      color: #ffffff;
      background: var(--accent-dark);
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }

    .report-toolbar button.secondary {
      color: var(--accent-dark);
      background: #ffffff;
    }

    .report-toolbar span {
      display: inline-flex;
      align-items: center;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .page {
      width: min(1080px, calc(100% - 32px));
      margin: 24px auto;
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 22px 55px rgba(24, 33, 42, 0.13);
    }

    .cover {
      position: relative;
      min-height: 390px;
      padding: 56px 58px 46px;
      color: #ffffff;
      background:
        linear-gradient(135deg, rgba(18, 52, 59, 0.98), rgba(15, 118, 110, 0.92) 54%, rgba(111, 63, 104, 0.9)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        linear-gradient(0deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: auto, 68px 68px, 68px 68px;
    }

    .cover::after {
      content: "";
      position: absolute;
      right: 46px;
      bottom: 42px;
      width: min(340px, 36vw);
      height: 210px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 12px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08)),
        repeating-linear-gradient(90deg, transparent 0 34px, rgba(255, 255, 255, 0.18) 34px 35px);
      opacity: 0.72;
      pointer-events: none;
    }

    .cover > * {
      position: relative;
      z-index: 1;
    }

    .label {
      margin: 0 0 16px;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1 {
      max-width: 820px;
      margin-bottom: 14px;
      font-size: clamp(2.2rem, 6vw, 4.6rem);
      line-height: 0.96;
      letter-spacing: 0;
    }

    .subtitle {
      max-width: 780px;
      margin-bottom: 28px;
      font-size: 1.18rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      border: 1px solid rgba(255, 255, 255, 0.42);
      border-radius: 8px;
      padding: 0 12px;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.12);
      font-size: 0.9rem;
      font-weight: 800;
    }

    .content {
      padding: 42px 58px 56px;
    }

    .workspace {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
      gap: 24px;
      margin: -46px 58px 42px;
      border: 1px solid rgba(216, 224, 228, 0.95);
      border-radius: 12px;
      padding: 24px;
      background: linear-gradient(135deg, #ffffff, #f6fbfa);
      box-shadow: 0 24px 48px rgba(24, 33, 42, 0.14);
    }

    .label.dark {
      color: var(--accent-dark);
    }

    .workspace h2 {
      max-width: 620px;
      margin-bottom: 10px;
      font-size: clamp(1.8rem, 3.5vw, 3rem);
    }

    .workspace-intro {
      max-width: 680px;
      color: #445561;
      font-size: 1.02rem;
    }

    .progress-track {
      height: 14px;
      margin: 24px 0 16px;
      overflow: hidden;
      border-radius: 999px;
      background: #e2eaed;
    }

    .progress-track span {
      display: block;
      width: var(--progress);
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent), var(--coral));
      transition: width 0.28s ease;
    }

    .workspace-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .workspace-stat {
      min-height: 86px;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 12px;
      background: #ffffff;
    }

    .workspace-stat strong {
      display: block;
      color: var(--navy);
      font-size: 1.65rem;
      line-height: 1;
    }

    .workspace-stat span {
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 800;
    }

    .focus-card {
      display: grid;
      align-content: space-between;
      min-height: 100%;
      border-radius: 12px;
      padding: 22px;
      color: #ffffff;
      background:
        linear-gradient(135deg, rgba(24, 36, 58, 0.98), rgba(162, 59, 98, 0.88)),
        var(--navy);
    }

    .focus-card span {
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.8rem;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .focus-card strong {
      display: block;
      margin-top: 12px;
      font-size: 1.45rem;
      line-height: 1.15;
    }

    .focus-card p {
      margin: 14px 0 0;
      color: rgba(255, 255, 255, 0.78);
    }

    .workspace-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 24px;
      color: var(--muted);
      font-size: 0.88rem;
      font-weight: 800;
    }

    .text-button {
      min-height: 38px;
      border: 1px solid #c9d6da;
      border-radius: 8px;
      padding: 0 12px;
      color: var(--accent-dark);
      background: #ffffff;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
    }

    .section-heading-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 16px;
    }

    .section-heading-row h2 {
      margin-bottom: 6px;
    }

    .section-heading-row p {
      max-width: 660px;
      margin-bottom: 0;
      color: var(--muted);
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      border-radius: 999px;
      padding: 0 12px;
      white-space: nowrap;
      color: var(--accent-dark);
      background: var(--mint);
      font-size: 0.86rem;
      font-weight: 900;
    }

    .action-list {
      display: grid;
      gap: 12px;
    }

    .action-workspace {
      break-inside: auto;
    }

    .action-card {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 16px;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 16px;
      background: #ffffff;
      transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
      break-inside: avoid;
    }

    .action-card.is-complete {
      border-color: rgba(15, 118, 110, 0.42);
      background: #f3fbf7;
    }

    .action-card.is-current {
      border-color: rgba(199, 92, 63, 0.56);
      box-shadow: inset 4px 0 0 var(--coral);
    }

    .action-toggle {
      position: relative;
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      margin-top: 2px;
      border: 2px solid #b9c8cd;
      border-radius: 9px;
      background: #ffffff;
      cursor: pointer;
    }

    .action-toggle input {
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    .action-toggle span {
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background: transparent;
      transform: scale(0.5);
      transition: transform 0.16s ease, background-color 0.16s ease;
    }

    .action-card.is-complete .action-toggle {
      border-color: var(--accent);
      background: var(--accent);
    }

    .action-card.is-complete .action-toggle span {
      background: #ffffff;
      transform: scale(1);
      clip-path: polygon(14% 48%, 34% 68%, 84% 18%, 96% 30%, 34% 92%, 2% 60%);
    }

    .action-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }

    .day-pill,
    .action-state {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border-radius: 999px;
      padding: 0 10px;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .day-pill {
      color: var(--navy);
      background: #edf2f5;
    }

    .action-state {
      color: var(--rose);
      background: #fff0f4;
    }

    .action-card.is-complete .action-state {
      color: var(--accent-dark);
      background: var(--mint);
    }

    .action-card h3 {
      margin-bottom: 8px;
      font-size: 1.08rem;
    }

    .action-card p {
      margin-bottom: 14px;
      color: #465763;
    }

    .notes-field {
      display: grid;
      gap: 7px;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 900;
    }

    .notes-field textarea {
      width: 100%;
      min-height: 78px;
      resize: vertical;
      border: 1px solid #c9d6da;
      border-radius: 10px;
      padding: 11px 12px;
      color: var(--ink);
      background: #f8fbfb;
      font: inherit;
      line-height: 1.45;
      outline: none;
    }

    .notes-field textarea:focus {
      border-color: var(--accent);
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.16);
    }

    section {
      margin-bottom: 38px;
      break-inside: avoid;
    }

    h2 {
      margin-bottom: 16px;
      font-size: 1.55rem;
      line-height: 1.15;
      letter-spacing: 0;
    }

    h3 {
      margin-bottom: 8px;
      font-size: 1.05rem;
      letter-spacing: 0;
    }

    .lead {
      max-width: 840px;
      color: #31414c;
      font-size: 1.05rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .three-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .panel {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
      background: #ffffff;
    }

    .panel.tint {
      background: var(--surface);
    }

    .panel p:last-child,
    .panel ul:last-child {
      margin-bottom: 0;
    }

    ul {
      padding-left: 20px;
      margin: 0;
    }

    li + li {
      margin-top: 8px;
    }

    .score-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 10px;
    }

    .score-card {
      min-height: 160px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      background: #fbfcfd;
    }

    .score {
      margin: 4px 0 8px;
      color: var(--accent-dark);
      font-size: 2rem;
      font-weight: 900;
      line-height: 1;
    }

    .small {
      color: var(--muted);
      font-size: 0.9rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--line);
      font-size: 0.95rem;
    }

    th,
    td {
      border-bottom: 1px solid var(--line);
      padding: 12px;
      text-align: left;
      vertical-align: top;
    }

    th {
      color: #ffffff;
      background: var(--accent-dark);
      font-size: 0.82rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    tr:nth-child(even) td {
      background: #f8fbfb;
    }

    .template {
      white-space: pre-wrap;
    }

    .footer {
      border-top: 1px solid var(--line);
      padding-top: 22px;
      color: var(--muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .page {
        width: min(100%, calc(100% - 18px));
        margin: 10px auto;
        border-radius: 10px;
      }

      .cover,
      .content {
        padding: 34px 24px;
      }

      .cover {
        min-height: auto;
      }

      .cover::after {
        display: none;
      }

      .workspace {
        grid-template-columns: 1fr;
        margin: -28px 18px 34px;
        padding: 18px;
      }

      .grid,
      .three-grid,
      .score-grid {
        grid-template-columns: 1fr;
      }

      .section-heading-row {
        display: grid;
      }
    }

    @media (max-width: 620px) {
      .workspace-stats {
        grid-template-columns: 1fr;
      }

      .workspace-actions,
      .action-topline {
        align-items: flex-start;
        flex-direction: column;
      }

      .action-card {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        background: #ffffff;
      }

      .report-toolbar {
        display: none;
      }

      .page {
        width: 100%;
        margin: 0;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .cover {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .workspace {
        margin: 0 0 24px;
        border-radius: 0;
        box-shadow: none;
        break-inside: avoid;
      }

      .action-workspace {
        break-inside: auto;
        page-break-inside: auto;
      }

      .workspace-actions {
        display: none;
      }

      .action-card {
        box-shadow: none;
      }
    }
  </style>
</head>
<body data-report-id="${escapeHtml(reportId)}">
  <div class="report-toolbar">
    <button type="button" onclick="window.print()">${escapeHtml(t.printPdf)}</button>
    <button type="button" class="secondary" onclick="downloadHtmlReport()">${escapeHtml(t.downloadHtml)}</button>
  </div>
  <article class="page">
    <header class="cover">
      <p class="label">${escapeHtml(t.label)}</p>
      <h1>${escapeHtml(plan.title)}</h1>
      <p class="subtitle">${escapeHtml(plan.subtitle)}</p>
      <div class="meta-row">
        <span class="pill">${escapeHtml(t.generated)} ${escapeHtml(generatedAt)}</span>
        <span class="pill">${escapeHtml(t.strategyReport)}</span>
        <span class="pill">${escapeHtml(t.actionPlanPill)}</span>
      </div>
    </header>

    ${workspacePanel(plan, t)}

    <main class="content">
      <section class="action-workspace">
        <h2>${escapeHtml(t.executiveSummary)}</h2>
        <p class="lead">${escapeHtml(plan.executiveSummary)}</p>
      </section>

      <section class="grid">
        ${panel(t.positioning, plan.positioning, "tint")}
        ${panel(t.coreOfferRewrite, plan.coreOfferRewrite, "tint")}
        ${panel(t.idealCustomerProfile, plan.idealCustomerProfile, "tint")}
        ${listPanel(t.fastestQuickWins, plan.quickWins, "tint")}
      </section>

      <section>
        <h2>${escapeHtml(t.growthScorecard)}</h2>
        <div class="score-grid">
          ${plan.scorecard.map((item) => scoreCard(item, t)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(t.strategicMoves)}</h2>
        <div class="grid">
          ${plan.strategySections.map(strategyCard).join("")}
        </div>
      </section>

      <section>
        <div class="section-heading-row">
          <div>
            <h2>${escapeHtml(t.actionPlan)}</h2>
            <p>${escapeHtml(t.trackerHint)}</p>
          </div>
          <span class="section-badge" data-action-summary>0/${escapeHtml(String(plan.actionPlan.length))} ${escapeHtml(t.completed)}</span>
        </div>
        <div class="action-list">
          ${plan.actionPlan.map((item, index) => actionPlanCard(item, index, t)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(t.salesTemplates)}</h2>
        <div class="grid">
          ${plan.templates.map(templateCard).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(t.contentIdeas)}</h2>
        <div class="grid">
          ${plan.contentIdeas.map((item) => contentCard(item, t)).join("")}
        </div>
      </section>

      <section>
        <h2>${escapeHtml(t.metricsToTrack)}</h2>
        <table>
          <thead>
            <tr>
              <th>${escapeHtml(t.metric)}</th>
              <th>${escapeHtml(t.target)}</th>
              <th>${escapeHtml(t.whyItMatters)}</th>
            </tr>
          </thead>
          <tbody>
            ${plan.metrics.map((item) => `<tr><td>${escapeHtml(item.metric)}</td><td>${escapeHtml(item.target)}</td><td>${escapeHtml(item.why)}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>

      <section class="three-grid">
        ${listPanel(t.biggestRisks, plan.biggestRisks)}
        ${listPanel(t.upsellIdeas, plan.upsellIdeas)}
        ${listPanel(t.assumptions, plan.assumptions)}
      </section>

      <footer class="footer">
        ${escapeHtml(plan.disclaimer)}
      </footer>
    </main>
  </article>
  <script>
    function downloadHtmlReport() {
      if (typeof window.syncReportProgressAttributes === "function") {
        window.syncReportProgressAttributes();
      }
      var html = "<!doctype html>\\n" + document.documentElement.outerHTML;
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = ${JSON.stringify(`${slugify(plan.title)}.html`)};
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  </script>
  ${interactiveReportScript(reportId, t)}
</body>
</html>`;
}

function workspacePanel(plan: BusinessKitPlan, t: ReportTranslations): string {
    return `<section class="workspace" data-report-workspace aria-labelledby="workspace-title">
      <div>
        <p class="label dark">${escapeHtml(t.implementationWorkspace)}</p>
        <h2 id="workspace-title">${escapeHtml(t.workspaceTitle)}</h2>
        <p class="workspace-intro">${escapeHtml(t.workspaceIntro)}</p>
        <div class="progress-track" aria-hidden="true"><span data-progress-bar></span></div>
        <div class="workspace-stats">
          <div class="workspace-stat"><strong data-progress-text>0%</strong><span>${escapeHtml(t.progressComplete)}</span></div>
          <div class="workspace-stat"><strong data-completed-count>0</strong><span>${escapeHtml(t.completed)}</span></div>
          <div class="workspace-stat"><strong data-remaining-count>${escapeHtml(String(plan.actionPlan.length))}</strong><span>${escapeHtml(t.remaining)}</span></div>
        </div>
        <div class="workspace-actions">
          <button class="text-button" type="button" data-reset-progress>${escapeHtml(t.resetProgress)}</button>
          <span data-save-status>${escapeHtml(t.savedLocally)}</span>
        </div>
      </div>
      <aside class="focus-card">
        <div>
          <span>${escapeHtml(t.nextFocus)}</span>
          <strong data-next-focus>${escapeHtml(plan.actionPlan[0]?.task ?? t.allActionsDone)}</strong>
          <p data-next-detail>${escapeHtml(plan.actionPlan[0]?.outcome ?? t.allActionsDone)}</p>
        </div>
      </aside>
    </section>`;
}

function panel(title: string, body: string, variant = ""): string {
    return `<div class="panel ${variant}"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`;
}

function listPanel(title: string, items: string[], variant = ""): string {
    return `<div class="panel ${variant}"><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
}

function actionPlanCard(item: BusinessKitPlan["actionPlan"][number], index: number, t: ReportTranslations): string {
    const taskId = `action-${index + 1}`;

    return `<article class="action-card" data-action-card data-action-id="${escapeHtml(taskId)}">
      <label class="action-toggle" aria-label="${escapeHtml(`${t.markComplete}: ${item.day}`)}">
        <input type="checkbox" data-action-toggle>
        <span aria-hidden="true"></span>
      </label>
      <div class="action-body">
        <div class="action-topline">
          <span class="day-pill">${escapeHtml(item.day)}</span>
          <span class="action-state" data-action-state>${escapeHtml(t.notStarted)}</span>
        </div>
        <h3 data-action-title>${escapeHtml(item.task)}</h3>
        <p data-action-outcome>${escapeHtml(item.outcome)}</p>
        <label class="notes-field">
          <span>${escapeHtml(t.notes)}</span>
          <textarea data-action-note placeholder="${escapeHtml(t.notesPlaceholder)}"></textarea>
        </label>
      </div>
    </article>`;
}

function scoreCard(item: BusinessKitPlan["scorecard"][number], t: ReportTranslations): string {
    return `<div class="score-card"><h3>${escapeHtml(item.label)}</h3><p class="score">${escapeHtml(String(item.score))}</p><p class="small">${escapeHtml(item.rationale)}</p><p class="small"><strong>${escapeHtml(t.next)}:</strong> ${escapeHtml(item.nextMove)}</p></div>`;
}

function strategyCard(item: BusinessKitPlan["strategySections"][number]): string {
    return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.diagnosis)}</p><ul>${item.moves.map((move) => `<li>${escapeHtml(move)}</li>`).join("")}</ul></div>`;
}

function templateCard(item: BusinessKitPlan["templates"][number]): string {
    return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p class="small">${escapeHtml(item.channel)}</p><p class="template">${escapeHtml(item.body)}</p></div>`;
}

function contentCard(item: BusinessKitPlan["contentIdeas"][number], t: ReportTranslations): string {
    return `<div class="panel"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.angle)}</p><p class="small"><strong>${escapeHtml(t.hook)}:</strong> ${escapeHtml(item.hook)}</p></div>`;
}

function interactiveReportScript(reportId: string, t: ReportTranslations): string {
    const messages = scriptJson({
        allActionsDone: t.allActionsDone,
        completed: t.completed,
        done: t.done,
        inProgress: t.inProgress,
        notStarted: t.notStarted,
        progressComplete: t.progressComplete,
        remaining: t.remaining,
        savedLocally: t.savedLocally,
        saveUnavailable: t.saveUnavailable,
    });

    return `<script>
    (function () {
      var reportId = ${scriptJson(reportId)};
      var messages = ${messages};
      var storageKey = "ai-growth-kit-progress:" + reportId;
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

      function readStateFromDom() {
        var domState = blankState();
        cards.forEach(function (card) {
          var id = card.getAttribute("data-action-id");
          var checkbox = card.querySelector("[data-action-toggle]");
          var note = card.querySelector("[data-action-note]");

          if (!id) {
            return;
          }

          if (checkbox && checkbox.checked) {
            domState.done[id] = true;
          }

          if (note && note.value.trim()) {
            domState.notes[id] = note.value;
          }
        });
        return domState;
      }

      var state = readStoredState() || readStateFromDom();

      function setSaveStatus(text) {
        if (saveStatus) {
          saveStatus.textContent = text;
        }
      }

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
          note.value = state.notes[id] || note.value || "";
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

function reportIdentity(plan: BusinessKitPlan): string {
    return `${slugify(plan.title)}-${hashString([
        plan.title,
        plan.subtitle,
        ...plan.actionPlan.map((item) => `${item.day}:${item.task}`),
    ].join("|"))}`;
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

export {
    buildBusinessKitHtml,
};
