import type { BusinessKitPlan } from '../../businessKit';

/** Public sample report — anonymised freelance web studio (BE/DACH market). */
const plan: BusinessKitPlan = {
  language: 'de',
  theme: 'purple',
  title: 'Digit Studio — Wachstumsstrategie 2026',
  subtitle: 'Vom Referral-Modell zu Projekten ab €3.000 innerhalb von 30 Tagen',
  executiveSummary:
    'Digit Studio liefert starkes Maßwerk, verliert aber Deals am Preis, weil Käufer den Unterschied zu Wix nicht erkennen. Der Hebel ist Premium-Positionierung rund um Conversion-Ergebnisse — nicht um Pixel.',
  executiveSummaryChips: {
    lever: 'Neu positionieren als Conversion-Partner für KMU-Dienstleister — nicht als „Website-Bauer".',
    blocker: 'Portfolio und Sales-Gespräche führen mit Features und Stundensatz; Käufer vergleichen Sie mit €500-Templates.',
    action: 'Ein Signature Offer launchen (€2.950, 21 Tage, messbares Lead-Ziel) und Cold Outreach durch beweisgestütztes LinkedIn + Case-Study-E-Mails ersetzen.',
  },
  positioning:
    'Digit Studio wird derzeit als „noch ein Freelancer, der Websites baut" wahrgenommen. Käufer bewerten den Wert nach Stunden × Stundensatz statt nach Umsatzwirkung. Die Positionierung muss sich verschieben zu: strategischer Conversion-Partner für belgische und deutschsprachige KMU-Dienstleister, deren Referrals ausgeschöpft sind, die aber keine planbare Pipeline haben.',
  coreOfferRewrite:
    'Signature Growth Site — innerhalb von 21 Tagen eine conversion-getriebene Website + Lead-Tracking, die mindestens 5 qualifizierte Anfragen pro Monat generiert, inklusive 90 Tage Optimierung. Festpreis €2.950, kein Stundenabrechnungsmodell.',
  idealCustomerProfile:
    'Inhaber oder Marketing-Verantwortlicher bei einem belgischen oder DACH-Dienstleistungs-KMU (Steuerberater, Coach, Therapeut, Handwerksbetrieb) mit 3–15 Mitarbeitern, €500k–€3M Umsatz, der weiß, dass die Website „zu generisch" wirkt, die Investition aber aufschiebt, weil frühere Website-Projekte keine Leads gebracht haben.',
  biggestRisks: [
    'Preisdruck bleibt, wenn Sie vor dem Verkauf keine harte Conversion-Zusage nachweisen können.',
    'Referral-Pipeline trocknet ohne Inbound aus — ein schlechter Monat = Cashflow-Lücke.',
    'Konkurrenz durch günstige Plattformen + lokale Generalisten senkt den wahrgenommenen Wert.',
    'Projekte unter €1.500 fressen Marge und Zeit ohne Upsell-Pfad.',
  ],
  quickWins: [
    '[HIGH effort] Eine Case Study schreiben (Vorher/Nachher-Metriken) und oben auf der Homepage platzieren.',
    '[HIGH effort] Lead Magnet „Website-ROI-Audit" hinzufügen (kostenlose 15-Min.-Video-Analyse).',
    '[MED effort] LinkedIn-Headline auf Ergebnis umstellen: „Ich baue Websites, die Leads liefern — für KMU-Dienstleister".',
    '[MED effort] 10 personalisierte Cold E-Mails an lokale Steuerberater mit einem konkreten Website-Fehler senden.',
    '[LOW effort] Mindestprojektpreis auf der Kontaktseite auf €2.500 anheben.',
    '[LOW effort] 3 Kundenzitate ins Proposal-Template einfügen.',
  ],
  strategySections: [
    {
      title: 'Angebot & Pricing',
      diagnosis: 'Ihr Angebot ist zu breit (Websites, Shops, Care Plans), wodurch Käufer Sie als Commodity sehen. Bündeln Sie alles unter einem Signature Outcome.',
      moves: [
        'Keine individuellen Angebote unter €2.500 mehr — weiterleiten zu Care Plan oder Template-Partner.',
        'Signature Growth Site für €2.950 als Default auf Homepage und in Gesprächen einführen.',
        'Care Plan für €99/Monat als verpflichtenden Upsell nach Übergabe hinzufügen (Hosting + Optimierung).',
      ],
    },
    {
      title: 'Akquise',
      diagnosis: 'Referrals sind unplanbar; LinkedIn ist sporadisch. Sie haben kein wiederholbares Outbound-System.',
      moves: [
        '20 gezielte Cold E-Mails/Woche an KMU-Dienstleister in der DACH-Region.',
        '2 LinkedIn-Posts/Woche: eine Case-Metrik, ein „Website-Fehler"-Hook.',
        'Ein lokales Netzwerk-Event pro Monat sponsern oder dort sprechen — mit einem konkreten Take-away.',
      ],
    },
    {
      title: 'Conversion',
      diagnosis: 'Sales-Gespräche starten mit „was soll auf die Website" statt mit dem Geschäftsziel. Proposals zeigen Stunden, nicht Ergebnis.',
      moves: [
        'Discovery eröffnen mit: „Wie viele Leads pro Monat verpassen Sie derzeit?"',
        'Stunden-Aufschlüsselung in Proposals durch 3-Phasen-Roadmap + KPI-Ziel ersetzen.',
        '48-Stunden-Follow-up-Sequenz nach jedem Proposal hinzufügen.',
      ],
    },
    {
      title: 'Retention & Expansion',
      diagnosis: 'Care Plans existieren, werden aber nicht proaktiv als Wachstumspartnerschaft verkauft.',
      moves: [
        'Care Plan im Übergabe-Call als „Phase 2 der Lead-Generierung" pitchen.',
        'Quartalsweise Review-Call mit Traffic- + Formular-Conversion-Metriken.',
        'Landing Pages oder Funnel-Builds nach 90 Tagen upsellen.',
      ],
    },
    {
      title: 'Operations & Leverage',
      diagnosis: 'Alles individuell = niedrige Marge. Sie haben keine wiederverwendbaren Komponenten oder Intake-System.',
      moves: [
        'Intake-Formular + 5-Abschnitt-Homepage-Template standardisieren.',
        'Content-Sammlung in einem Kunden-Call bündeln (kein asynchrones E-Mail-Ping-Pong).',
        'Delivery-Checkliste dokumentieren, damit Sie an VA/Freelancer delegieren können.',
      ],
    },
  ],
  scorecard: [
    { label: 'Offer Clarity', score: 42, rationale: 'Zu viele Leistungen, kein Signature Outcome auf der Homepage.', nextMove: 'Ein Hero-Offer + Preis auf der Homepage.' },
    { label: 'Pricing Power', score: 38, rationale: 'Durchschnittlicher Deal €1.800, Ziel €3.000 — kein Premium-Framing.', nextMove: 'Minimum €2.500 + ROI-Garantie-Framing.' },
    { label: 'Lead Generation', score: 35, rationale: 'Referrals + sporadisches LinkedIn = kein System.', nextMove: '20 Cold E-Mails/Woche + Lead Magnet.' },
    { label: 'Conversion System', score: 48, rationale: 'Proposals sind feature-getrieben; Follow-up inkonsistent.', nextMove: 'Outcome-Proposals + 48h-Sequenz.' },
    { label: 'Customer Retention', score: 55, rationale: 'Care Plans existieren, aber niedrige Attach Rate.', nextMove: 'Verpflichtender Upsell im Übergabe-Call.' },
    { label: 'Operational Leverage', score: 40, rationale: 'Jedes Projekt individuell; keine Templates.', nextMove: '5-Abschnitt-Template + Intake-SOP.' },
  ],
  competitorAnalysis: [
    { competitor: 'Wix / Squarespace DIY', weakness: 'Keine Strategie, keine Conversion-Optimierung, generische Templates.', ourAdvantage: 'Maßarbeit + Lead-Tracking + 90 Tage Optimierung mit festem Scope.' },
    { competitor: 'Lokale Generalist-Agenturen', weakness: 'Langsam, teuer, oft ohne messbare Lead-Ergebnisse.', ourAdvantage: '21-Tage-Lieferung, Festpreis, KPI-orientiert.' },
    { competitor: 'Günstige Fiverr-Freelancer', weakness: 'Kein lokales Verständnis, schlechter Support, kein Wachstumspartnerschaft.', ourAdvantage: 'DACH-/KMU-Fokus + Care-Plan-Retainer.' },
  ],
  actionPlan: [
    { day: 'Tag 1', task: 'Homepage-Hero auf Signature Growth Site umstellen (€2.950, 21 Tage, 5+ Leads/Monat).', outcome: 'Besucher sehen innerhalb von 5 Sekunden ein klares Angebot.' },
    { day: 'Tag 2', task: 'Eine Case Study mit harten Zahlen schreiben und veröffentlichen (Traffic, Formular-Absendungen).', outcome: 'Sales-Gespräche haben Beweismaterial.' },
    { day: 'Tag 3', task: 'Landing Page für Lead Magnet „Website-ROI-Audit" erstellen + LinkedIn-Post.', outcome: 'Erste Inbound-Leads außerhalb von Referrals.' },
    { day: 'Tag 4–5', task: '20 personalisierte Cold E-Mails an Steuerberater in der DACH-Region senden.', outcome: 'Mindestens 3 Antworten oder 1 Discovery Call.' },
    { day: 'Tag 6–7', task: 'Proposal-Template umschreiben: Outcome-first, 3 Phasen, keine Stunden-Aufschlüsselung.', outcome: 'Proposals positionieren Sie als Partner, nicht als Lieferant.' },
    { day: 'Woche 2 (Teil 1)', task: '2 LinkedIn-Posts veröffentlichen (Case-Metrik + häufiger Fehler).', outcome: 'Sichtbarkeit + DM-Gespräche.' },
    { day: 'Woche 2 (Teil 2)', task: '3 Discovery Calls mit neuen Intake-Fragen führen (Lead-Lücke zuerst).', outcome: 'Pipeline mit €2.950+-Opportunities.' },
    { day: 'Woche 3 (Teil 1)', task: 'Proposals senden + 48h-Follow-up-Sequenz starten.', outcome: 'Mindestens 1 unterschriebenes Projekt.' },
    { day: 'Woche 3 (Teil 2)', task: 'Care Plan bei Übergabe oder bei laufendem Kunden pitchen.', outcome: '€99/Monat wiederkehrende Einnahmen.' },
    { day: 'Woche 4 (Teil 1)', task: '5-Abschnitt-Homepage-Template + Intake-Formular standardisieren.', outcome: 'Nächstes Projekt 20 % schneller geliefert.' },
    { day: 'Woche 4 (Teil 2)', task: 'Metriken reviewen: Cold-Reply-Rate, gebuchte Calls, abgeschlossene Deals.', outcome: 'Daten für den nächsten 30-Tage-Zyklus.' },
    { day: 'Tag-30-Review', task: 'Auswerten: 3+ neue Projekte ab €2.500? Wenn nein, Outbound-Volumen verdoppeln.', outcome: 'Entscheidung über Skalierung oder Angebots-Anpassung.' },
  ],
  templates: [
    {
      title: 'Cold E-Mail — Website-ROI-Pitch',
      channel: 'E-Mail',
      body: 'Betreff: Ihre Website kostet Sie wahrscheinlich 2–3 Leads pro Monat\n\nSehr geehrte/r [Name],\n\nIch habe mir die Website von [Unternehmen] angesehen und drei Lücken entdeckt, die oft qualifizierte Anfragen kosten: kein Social Proof above the fold, ein Kontaktformular ohne Qualifizierung und eine Headline, die beschreibt, was Sie tun, statt was der Kunde bekommt.\n\nIch führe Digit Studio — wir bauen conversion-getriebene Websites für KMU-Dienstleister in der DACH-Region. Kunden gehen typischerweise von Referral-only zu 5–8 Inbound-Anfragen pro Monat innerhalb von 60 Tagen.\n\nHätten Sie diese Woche Lust auf ein kurzes 20-Minuten-Gespräch? Ich kann Ihnen genau zeigen, was ich ändern würde — bevor wir über Budget sprechen.\n\nMit freundlichen Grüßen,\n[Name]',
    },
    {
      title: 'Follow-up bei keiner Antwort (3 Tage)',
      channel: 'E-Mail',
      body: 'Betreff: Re: Website-ROI — kurzes Follow-up\n\nSehr geehrte/r [Name],\n\nIch wollte kurz an meine E-Mail von Dienstag anknüpfen. Kein Druck — wenn der Zeitpunkt nicht passt, sagen Sie es gerne Bescheid.\n\nFalls hilfreich: Ich kann Ihnen in 5 Minuten eine Screen-Recording senden mit den 3 größten Conversion-Chancen auf Ihrer aktuellen Website. Kostenlos, unverbindlich.\n\nGrüße,\n[Name]',
    },
    {
      title: 'Discovery-Call-Bestätigung',
      channel: 'E-Mail',
      body: 'Betreff: Gesprächsbestätigung [Datum] — Digit Studio\n\nSehr geehrte/r [Name],\n\nVielen Dank für die Terminbuchung. Wir sprechen am [Datum] um [Uhrzeit].\n\nZur Vorbereitung: Wie viele qualifizierte Anfragen erhalten Sie derzeit im Durchschnitt pro Monat über Ihre Website? Und was wäre ein realistisches Ziel innerhalb von 90 Tagen?\n\nBis dahin,\n[Name]',
    },
    {
      title: 'Proposal-Follow-up (3 Tage Stille)',
      channel: 'E-Mail',
      body: 'Betreff: Fragen zum Angebot?\n\nSehr geehrte/r [Name],\n\nIch habe das Angebot für die Signature Growth Site am [Datum] gesendet. Haben Sie noch Fragen zu Scope, Timing oder dem Lead-Ziel?\n\nIch passe das Angebot gerne an, falls sich die Prioritäten inzwischen verschoben haben.\n\nGrüße,\n[Name]',
    },
    {
      title: 'LinkedIn-Verbindungsanfrage',
      channel: 'LinkedIn',
      body: 'Hallo [Name], ich helfe KMU-Dienstleistern in der DACH-Region, von Referral-only zu planbaren Website-Leads zu kommen. Ich habe Ihr Profil über [Kontext] gesehen — dürfen wir connecten?',
    },
  ],
  contentIdeas: [
    { title: '3 Website-Fehler, die KMU Leads kosten', angle: 'Edukativ + Autorität', hook: 'Ihre Homepage beschreibt, was Sie tun. Ihr Kunde will wissen, was er bekommt — dieser Unterschied kostet Sie Leads.' },
    { title: 'Case: von 0 auf 7 Formular-Absendungen/Monat', angle: 'Social Proof', hook: 'Dieser Steuerberater dachte, „mehr Traffic" sei das Problem. Es war die Headline.' },
    { title: 'Warum €500-Websites teurer sind als €3.000', angle: 'Pricing-Reframing', hook: 'Eine günstige Website ohne Conversion-Strategie ist keine Ersparnis — sie ist eine monatliche Kostenposition.' },
  ],
  metrics: [
    { metric: 'Cold-E-Mail-Reply-Rate', target: '≥ 8 %', why: 'Niedriger = falsche Liste oder zu generischer Pitch.' },
    { metric: 'Discovery Calls / Woche', target: '≥ 2', why: 'Pipeline bleibt leer ohne festen Rhythmus.' },
    { metric: 'Durchschnittlicher Deal-Wert', target: '≥ €2.950', why: 'Unter €2.500 = Margen-Erosion und falsches Positionierungssignal.' },
    { metric: 'Care-Plan-Attach-Rate', target: '≥ 60 %', why: 'Wiederkehrende Einnahmen stabilisieren den Cashflow zwischen Projekten.' },
    { metric: 'Homepage-Conversion (Audit-Anmeldung)', target: '≥ 2 %', why: 'Lead Magnet validiert Inbound, bevor Sie Ads in Betracht ziehen.' },
    { metric: 'Proposal-Close-Rate', target: '≥ 30 %', why: 'Niedriger = Discovery oder Proposal muss schärfer werden.' },
  ],
  upsellIdeas: [
    { title: 'Care Plan (Hosting + Optimierung)', price: '€99/Monat', scope: 'Hosting, Updates, monatlicher Conversion-Check.', trigger: 'Direkt nach Übergabe der Signature Site.' },
    { title: 'Landing-Page-Sprint', price: '€750–€1.200', scope: 'Eine Kampagnen-LP innerhalb von 5 Werktagen.', trigger: 'Kunde startet Google/Meta Ads.' },
    { title: 'Funnel-Build (LP + E-Mail-Sequenz)', price: '€2.000–€3.500', scope: 'Lead Magnet + 5 E-Mails + LP.', trigger: 'Care-Plan-Kunde fragt nach mehr Leads.' },
  ],
  assumptions: [
    'Wir gehen davon aus, dass Digit Studio mindestens 2 Referenzprojekte mit messbaren Ergebnissen zeigen kann — falls nicht, zuerst eine Pro-Bono-Case aufbauen.',
    'Wir gehen davon aus, dass die Zielgruppe belgisch/deutschsprachig bzw. DACH bleibt; reine NL-Märkte erfordern separate Case Studies.',
    'Wir gehen davon aus, dass Sie 10+ Stunden/Woche in Outbound und Content investieren können.',
  ],
  disclaimer: 'Dieser Bericht wurde als strategische Inspiration auf Basis der bereitgestellten Eingaben erstellt. Validieren Sie Empfehlungen stets anhand Ihrer eigenen Marktdaten und rechtlichen Rahmenbedingungen.',
};

export default plan;
