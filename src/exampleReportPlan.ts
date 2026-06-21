import type { BusinessKitPlan } from "./businessKit";
import { buildBusinessKitHtml } from "./businessKit";

/** Public sample report — anonymised freelance web studio (BE/NL market). */
export const EXAMPLE_REPORT_PLAN: BusinessKitPlan = {
  language: "nl",
  theme: "purple",
  showBranding: true,
  title: "Digit Studio — Groeistrategie 2026",
  subtitle: "Van referral-afhankelijk naar €3.000+ projecten binnen 30 dagen",
  executiveSummary:
    "Digit Studio heeft sterk maatwerk, maar verliest deals op prijs omdat kopers het verschil met Wix niet zien. De hefboom is premium positionering rond conversieresultaat, niet pixels.",
  executiveSummaryChips: {
    lever: "Herpositioneer als conversie-partner voor KMO-dienstverleners — niet als 'websitebouwer'.",
    blocker: "Portfolio en salesgesprekken leiden met features en uurtarief; kopers vergelijken je met €500-templates.",
    action: "Lanceer één signature offer (€2.950, 21 dagen, meetbaar lead-doel) en vervang cold outreach door bewijs-gedreven LinkedIn + case-study e-mails.",
  },
  positioning:
    "Digit Studio wordt nu gezien als 'nog een freelancer die websites maakt'. Kopers schatten de waarde in op uren × tarief in plaats of op omzetimpact. De positionering moet verschuiven naar: strategisch conversie-partner voor Belgische KMO-dienstverleners die referrals maxed out hebben maar geen voorspelbare pipeline hebben.",
  coreOfferRewrite:
    "Signature Growth Site — binnen 21 dagen een conversie-gedreven website + lead-tracking die minstens 5 gekwalificeerde aanvragen per maand genereert, inclusief 90 dagen optimalisatie. Vaste prijs €2.950, geen uurtje-factuurtje.",
  idealCustomerProfile:
    "Eigenaar of marketingverantwoordelijke bij een Belgische dienstverlenende KMO (accountant, coach, therapeut, aannemer) met 3–15 medewerkers, €500k–€3M omzet, die weet dat hun site 'te generiek' aanvoelt maar de investering uitstelt omdat vorige website-projecten geen leads opleverden.",
  biggestRisks: [
    "Prijsdruk blijft als je geen harde conversie-belofte kunt tonen vóór de sale.",
    "Referral-pipeline droogt op zonder inbound — één slechte maand = cashflow-gat.",
    "Concurrentie van goedkope platforms + lokale generalisten verlaagt perceived value.",
    "Projecten onder €1.500 vreten marge en tijd zonder upsell-pad.",
  ],
  quickWins: [
    "[HIGH effort] Schrijf één case study (vóór/na metrics) en zet die bovenaan je homepage.",
    "[HIGH effort] Voeg een 'Website ROI Audit' lead magnet toe (gratis 15-min video review).",
    "[MED effort] Herwerk LinkedIn-headline naar resultaat: 'Ik bouw sites die leads opleveren voor KMO-dienstverleners'.",
    "[MED effort] Stuur 10 gepersonaliseerde cold e-mails naar lokale accountants met één specifieke site-fout.",
    "[LOW effort] Verhoog minimum projectprijs op je contactpagina naar €2.500.",
    "[LOW effort] Voeg 3 klantquotes toe aan je proposal-template.",
  ],
  strategySections: [
    {
      title: "Aanbod & pricing",
      diagnosis: "Je aanbod is te breed (sites, shops, care plans) waardoor kopers je als commodity zien. Bundel alles onder één signature outcome.",
      moves: [
        "Stop met offerte op maat onder €2.500 — doorverwijs naar care plan of template-partner.",
        "Introduceer €2.950 Signature Growth Site als default op homepage en in gesprekken.",
        "Voeg €99/maand care plan toe als verplichte upsell na oplevering (hosting + optimalisatie).",
      ],
    },
    {
      title: "Acquisitie",
      diagnosis: "Referrals zijn onvoorspelbaar; LinkedIn is sporadisch. Je hebt geen herhaalbaar outbound-systeem.",
      moves: [
        "20 targeted cold e-mails/week naar KMO-dienstverleners in Vlaanderen.",
        "2 LinkedIn posts/week: één case metric, één 'website mistake' hook.",
        "Sponsor of spreek op 1 lokaal netwerkevent per maand met één concrete take-away.",
      ],
    },
    {
      title: "Conversie",
      diagnosis: "Salesgesprekken starten met 'wat wil je op de site' i.p.v. businessdoel. Proposals tonen uren, niet resultaat.",
      moves: [
        "Open discovery met: 'Hoeveel leads per maand mist je nu?'",
        "Vervang uren-breakdown in proposals door 3-fasen roadmap + KPI-doel.",
        "Voeg 48-uur follow-up sequence toe na elk proposal.",
      ],
    },
    {
      title: "Retentie & expansie",
      diagnosis: "Care plans bestaan maar worden niet proactief verkocht als groei-partnership.",
      moves: [
        "Pitch care plan op opleveringscall als 'fase 2 van lead-generatie'.",
        "Quarterly review call met traffic + form conversion metrics.",
        "Upsell landing pages of funnel builds na 90 dagen.",
      ],
    },
    {
      title: "Operations & leverage",
      diagnosis: "Custom alles = lage marge. Je hebt geen herbruikbare componenten of intake-systeem.",
      moves: [
        "Standaardiseer intake-formulier + 5-sectie homepage template.",
        "Batch content-verzameling in één klant-call (niet async e-mail ping-pong).",
        "Documenteer delivery checklist zodat je kan delegeren aan VA/freelancer.",
      ],
    },
  ],
  scorecard: [
    { label: "Offer Clarity", score: 42, rationale: "Te veel diensten, geen signature outcome op homepage.", nextMove: "Eén hero-offer + prijs op homepage." },
    { label: "Pricing Power", score: 38, rationale: "Gemiddelde deal €1.800 terwijl doel €3.000 is — geen premium framing.", nextMove: "Minimum €2.500 + ROI-garantie framing." },
    { label: "Lead Generation", score: 35, rationale: "Referrals + sporadisch LinkedIn = geen systeem.", nextMove: "20 cold e-mails/week + lead magnet." },
    { label: "Conversion System", score: 48, rationale: "Proposals zijn feature-gedreven; follow-up inconsistent.", nextMove: "Outcome-proposals + 48u sequence." },
    { label: "Customer Retention", score: 55, rationale: "Care plans bestaan maar lage attach rate.", nextMove: "Verplicht upsell op opleveringscall." },
    { label: "Operational Leverage", score: 40, rationale: "Elk project custom; geen templates.", nextMove: "5-sectie template + intake SOP." },
  ],
  competitorAnalysis: [
    { competitor: "Wix / Squarespace DIY", weakness: "Geen strategie, geen conversie-optimalisatie, generieke templates.", ourAdvantage: "Maatwerk + lead-tracking + 90 dagen optimalisatie met vaste scope." },
    { competitor: "Lokale generalist-bureau's", weakness: "Traag, duur, vaak geen meetbare lead-resultaten.", ourAdvantage: "21-dagen delivery, vaste prijs, KPI-gericht." },
    { competitor: "Goedkope Fiverr-freelancers", weakness: "Geen lokaal begrip, slechte support, geen groei-partnership.", ourAdvantage: "Belgische KMO-focus + care plan retainer." },
  ],
  actionPlan: [
    { day: "Dag 1", task: "Herwerk homepage hero naar Signature Growth Site (€2.950, 21 dagen, 5+ leads/maand).", outcome: "Bezoekers zien één duidelijk aanbod binnen 5 seconden." },
    { day: "Dag 2", task: "Schrijf en publiceer één case study met harde cijfers (traffic, form submits).", outcome: "Sales-gesprekken hebben bewijs-materiaal." },
    { day: "Dag 3", task: "Maak 'Website ROI Audit' lead magnet landing page + LinkedIn post.", outcome: "Eerste inbound leads buiten referrals." },
    { day: "Dag 4-5", task: "Stuur 20 gepersonaliseerde cold e-mails naar Vlaamse accountants.", outcome: "Minstens 3 reply's of 1 discovery call." },
    { day: "Dag 6-7", task: "Herschrijf proposal-template: outcome-first, 3 fases, geen uren-breakdown.", outcome: "Proposals positioneren je als partner, niet leverancier." },
    { day: "Week 2 (deel 1)", task: "Publiceer 2 LinkedIn posts (case metric + common mistake).", outcome: "Zichtbaarheid + DM-gesprekken." },
    { day: "Week 2 (deel 2)", task: "Voer 3 discovery calls met nieuwe intake-vragen (lead gap first).", outcome: "Pipeline met €2.950+ opportunities." },
    { day: "Week 3 (deel 1)", task: "Stuur proposals + start 48u follow-up sequence.", outcome: "Minstens 1 getekend project." },
    { day: "Week 3 (deel 2)", task: "Pitch care plan op oplevering of aan lopende klant.", outcome: "€99/maand recurring revenue." },
    { day: "Week 4 (deel 1)", task: "Standaardiseer 5-sectie homepage template + intake form.", outcome: "Volgende project 20% sneller delivery." },
    { day: "Week 4 (deel 2)", task: "Review metrics: cold reply rate, calls booked, deals closed.", outcome: "Data voor volgende 30-dagen cyclus." },
    { day: "Dag 30 Review", task: "Evalueer: 3+ nieuwe projecten €2.500+? Zo nee, verdubbel outbound volume.", outcome: "Beslissing over schalen of aanbod tweaken." },
  ],
  templates: [
    {
      title: "Cold e-mail — website ROI pitch",
      channel: "E-mail",
      body: "Onderwerp: Uw website kost u waarschijnlijk 2–3 leads per maand\n\nBeste [Naam],\n\nIk keek even naar de website van [Bedrijf] en zag drie gaps die vaak gekwalificeerde aanvragen kosten: geen social proof boven de fold, een contactformulier zonder kwalificatie, en een headline die beschrijft wát u doet in plaats van wat de klant krijgt.\n\nIk run Digit Studio — we bouwen conversie-gedreven sites voor Belgische KMO-dienstverleners. Klanten gaan typisch van referral-only naar 5–8 inbound aanvragen per maand binnen 60 dagen.\n\nZin in een kort gesprek van 20 minuten deze week? Ik kan u exact tonen wat ik zou veranderen vóór we het over budget hebben.\n\nMet vriendelijke groet,\n[Naam]",
    },
    {
      title: "Follow-up na geen reactie (3 dagen)",
      channel: "E-mail",
      body: "Onderwerp: Re: website ROI — kort follow-up\n\nBeste [Naam],\n\nIk wilde even opvolgen op mijn mail van dinsdag. Geen druk — als timing niet past, laat het gerust weten.\n\nIndien nuttig: ik kan u in 5 minuten een screen recording sturen met de 3 grootste conversie-kansen op uw huidige site. Gratis, geen verplichting.\n\nGroeten,\n[Naam]",
    },
    {
      title: "Discovery call bevestiging",
      channel: "E-mail",
      body: "Onderwerp: Bevestiging gesprek [datum] — Digit Studio\n\nBeste [Naam],\n\nBedankt voor het inplannen. We spreken op [datum] om [tijd].\n\nTer voorbereiding: hoeveel gekwalificeerde aanvragen krijgt u nu gemiddeld per maand via uw website? En wat zou een realistisch doel zijn binnen 90 dagen?\n\nTot dan,\n[Naam]",
    },
    {
      title: "Proposal follow-up (3 dagen stilte)",
      channel: "E-mail",
      body: "Onderwerp: Vragen over het voorstel?\n\nBeste [Naam],\n\nIk stuurde het voorstel voor de Signature Growth Site op [datum]. Heeft u nog vragen over scope, timing of het lead-doel?\n\nIk sta open om het voorstel aan te passen als de prioriteiten intussen verschoven zijn.\n\nGroeten,\n[Naam]",
    },
    {
      title: "LinkedIn connectieverzoek",
      channel: "LinkedIn",
      body: "Hoi [Naam], ik help KMO-dienstverleners in BE om van referral-only naar voorspelbare website-leads te gaan. Ik zag uw profiel via [context] — zin om te connecten?",
    },
  ],
  contentIdeas: [
    { title: "3 website-fouten die KMO's leads kosten", angle: "Educatief + authority", hook: "Uw homepage beschrijft wat u doet. Uw klant wil weten wat hij krijgt — dat verschil kost u leads." },
    { title: "Case: van 0 naar 7 form submits/maand", angle: "Social proof", hook: "Deze accountant dacht dat 'meer traffic' het probleem was. Het was de headline." },
    { title: "Waarom €500 websites duurder zijn dan €3.000", angle: "Pricing reframing", hook: "Een goedkope site zonder conversie-strategie is geen besparing — het is een maandelijkse kostenpost." },
  ],
  metrics: [
    { metric: "Cold e-mail reply rate", target: "≥ 8%", why: "Lager = verkeerde lijst of te generieke pitch." },
    { metric: "Discovery calls / week", target: "≥ 2", why: "Pipeline blijft leeg zonder vaste cadans." },
    { metric: "Gemiddelde dealwaarde", target: "≥ €2.950", why: "Onder €2.500 = marge-erode en verkeerd positioneringssignaal." },
    { metric: "Care plan attach rate", target: "≥ 60%", why: "Recurring revenue stabiliseert cashflow tussen projecten." },
    { metric: "Homepage conversie (audit signup)", target: "≥ 2%", why: "Lead magnet valideert inbound vóór je ads overweegt." },
    { metric: "Proposal close rate", target: "≥ 30%", why: "Lager = discovery of proposal moet scherper." },
  ],
  upsellIdeas: [
    { title: "Care Plan (hosting + optimalisatie)", price: "€99/maand", scope: "Hosting, updates, maandelijkse conversie-check.", trigger: "Direct na oplevering signature site." },
    { title: "Landing page sprint", price: "€750–€1.200", scope: "Eén campagne-LP binnen 5 werkdagen.", trigger: "Klant start Google/Meta ads." },
    { title: "Funnel build (LP + e-mail sequence)", price: "€2.000–€3.500", scope: "Lead magnet + 5 e-mails + LP.", trigger: "Care plan klant vraagt om meer leads." },
  ],
  assumptions: [
    "We gaan ervan uit dat Digit Studio minstens 2 referentieprojecten kan tonen met meetbare resultaten — zo niet, bouw eerst één pro-bono case.",
    "We gaan ervan uit dat de doelmarkt Vlaanderen/Nederlandstalig BE blijft; NL-markt vraagt aparte case studies.",
    "We gaan ervan uit dat je 10+ uur/week kan investeren in outbound en content.",
  ],
  disclaimer: "Dit rapport is gegenereerd als strategische inspiratie op basis van aangeleverde input. Valideer aanbevelingen altijd tegen uw eigen marktdata en juridische context.",
};

export const EXAMPLE_REPORT_SEO = {
  title: "Voorbeeld groeirapport — GrowthKit",
  description:
    "Bekijk een volledig AI-groeirapport voor een Belgische webstudio: positionering, scorecard, 30-dagen actieplan en sales-templates. Genereer je eigen rapport gratis.",
  canonical: "https://growthkit.jcode.be/example/",
};

const EXAMPLE_CTA_HTML = `<header class="gk-example-cta" style="position:sticky;top:0;z-index:99;padding:16px 20px;background:#100d28;border-bottom:1px solid rgba(255,255,255,0.08);font-family:Montserrat,system-ui,sans-serif;color:#fff">
  <div style="max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <div>
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#d6a4e3">Voorbeeldrapport</p>
      <p style="margin:0;font-size:15px;font-weight:700">Zo ziet een GrowthKit-rapport eruit — <a href="https://growthkit.jcode.be/?ref=example" style="color:#d6a4e3">genereer je eigen gratis</a></p>
    </div>
    <a href="https://growthkit.jcode.be/?ref=example" style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:linear-gradient(135deg,#d6a4e3,#6f6acf);color:#fff;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap">Gratis rapport starten →</a>
  </div>
</header>`;

/** Static, crawler-friendly example page written to dist/example/index.html at build time. */
export function buildStaticExamplePageHtml(): string {
  const reportHtml = buildBusinessKitHtml(EXAMPLE_REPORT_PLAN);
  const desc = EXAMPLE_REPORT_SEO.description.replace(/"/g, "&quot;");
  const seoHead = `<link rel="canonical" href="${EXAMPLE_REPORT_SEO.canonical}">
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${EXAMPLE_REPORT_SEO.title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${EXAMPLE_REPORT_SEO.canonical}">
  <meta property="og:type" content="article">`;

  return reportHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${EXAMPLE_REPORT_SEO.title}</title>`)
    .replace("</head>", `${seoHead}\n</head>`)
    .replace("<body", `${EXAMPLE_CTA_HTML}<body`);
}
