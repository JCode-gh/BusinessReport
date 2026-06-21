import type { BusinessKitPlan } from '../../businessKit';

/** Public sample report — anonymised freelance web studio (BE market). */
const plan: BusinessKitPlan = {
  language: 'en',
  theme: 'purple',
  title: 'Digit Studio — Growth Strategy 2026',
  subtitle: 'From referral-dependent to €3,000+ projects within 30 days',
  executiveSummary:
    'Digit Studio delivers strong custom work but loses deals on price because buyers cannot see the difference from Wix. The lever is premium positioning around conversion results, not pixels.',
  executiveSummaryChips: {
    lever: 'Reposition as a conversion partner for SME service providers — not as a "website builder".',
    blocker: 'Portfolio and sales conversations lead with features and hourly rates; buyers compare you to €500 templates.',
    action: 'Launch one signature offer (€2,950, 21 days, measurable lead goal) and replace cold outreach with proof-driven LinkedIn + case-study emails.',
  },
  positioning:
    'Digit Studio is currently seen as "just another freelancer who builds websites". Buyers value the work as hours × rate instead of revenue impact. Positioning must shift to: strategic conversion partner for Belgian SME service providers who have maxed out referrals but lack a predictable pipeline.',
  coreOfferRewrite:
    'Signature Growth Site — within 21 days, a conversion-driven website + lead tracking that generates at least 5 qualified enquiries per month, including 90 days of optimisation. Fixed price €2,950, no hourly billing.',
  idealCustomerProfile:
    'Owner or marketing lead at a Belgian service-based SME (accountant, coach, therapist, contractor) with 3–15 employees, €500k–€3M revenue, who knows their site feels "too generic" but keeps postponing the investment because previous website projects did not generate leads.',
  biggestRisks: [
    'Price pressure continues if you cannot show a hard conversion promise before the sale.',
    'Referral pipeline dries up without inbound — one bad month = cash flow gap.',
    'Competition from cheap platforms + local generalists lowers perceived value.',
    'Projects under €1,500 eat margin and time without an upsell path.',
  ],
  quickWins: [
    '[HIGH effort] Write one case study (before/after metrics) and put it at the top of your homepage.',
    '[HIGH effort] Add a "Website ROI Audit" lead magnet (free 15-min video review).',
    '[MED effort] Rewrite LinkedIn headline around results: "I build sites that generate leads for SME service providers".',
    '[MED effort] Send 10 personalised cold emails to local accountants with one specific site flaw.',
    '[LOW effort] Raise minimum project price on your contact page to €2,500.',
    '[LOW effort] Add 3 client quotes to your proposal template.',
  ],
  strategySections: [
    {
      title: 'Offer & pricing',
      diagnosis: 'Your offer is too broad (sites, shops, care plans) so buyers see you as a commodity. Bundle everything under one signature outcome.',
      moves: [
        'Stop custom quotes under €2,500 — refer to care plan or template partner.',
        'Introduce €2,950 Signature Growth Site as default on homepage and in conversations.',
        'Add €99/month care plan as mandatory upsell after delivery (hosting + optimisation).',
      ],
    },
    {
      title: 'Acquisition',
      diagnosis: 'Referrals are unpredictable; LinkedIn is sporadic. You have no repeatable outbound system.',
      moves: [
        '20 targeted cold emails/week to SME service providers in Flanders.',
        '2 LinkedIn posts/week: one case metric, one "website mistake" hook.',
        'Sponsor or speak at 1 local networking event per month with one concrete takeaway.',
      ],
    },
    {
      title: 'Conversion',
      diagnosis: 'Sales conversations start with "what do you want on the site" instead of business goals. Proposals show hours, not results.',
      moves: [
        'Open discovery with: "How many leads per month are you missing right now?"',
        'Replace hours breakdown in proposals with 3-phase roadmap + KPI goal.',
        'Add 48-hour follow-up sequence after every proposal.',
      ],
    },
    {
      title: 'Retention & expansion',
      diagnosis: 'Care plans exist but are not proactively sold as a growth partnership.',
      moves: [
        'Pitch care plan on delivery call as "phase 2 of lead generation".',
        'Quarterly review call with traffic + form conversion metrics.',
        'Upsell landing pages or funnel builds after 90 days.',
      ],
    },
    {
      title: 'Operations & leverage',
      diagnosis: 'Everything custom = low margin. You have no reusable components or intake system.',
      moves: [
        'Standardise intake form + 5-section homepage template.',
        'Batch content collection in one client call (not async email ping-pong).',
        'Document delivery checklist so you can delegate to VA/freelancer.',
      ],
    },
  ],
  scorecard: [
    { label: 'Offer Clarity', score: 42, rationale: 'Too many services, no signature outcome on homepage.', nextMove: 'One hero offer + price on homepage.' },
    { label: 'Pricing Power', score: 38, rationale: 'Average deal €1,800 while target is €3,000 — no premium framing.', nextMove: 'Minimum €2,500 + ROI guarantee framing.' },
    { label: 'Lead Generation', score: 35, rationale: 'Referrals + sporadic LinkedIn = no system.', nextMove: '20 cold emails/week + lead magnet.' },
    { label: 'Conversion System', score: 48, rationale: 'Proposals are feature-driven; follow-up inconsistent.', nextMove: 'Outcome proposals + 48h sequence.' },
    { label: 'Customer Retention', score: 55, rationale: 'Care plans exist but low attach rate.', nextMove: 'Mandatory upsell on delivery call.' },
    { label: 'Operational Leverage', score: 40, rationale: 'Every project custom; no templates.', nextMove: '5-section template + intake SOP.' },
  ],
  competitorAnalysis: [
    { competitor: 'Wix / Squarespace DIY', weakness: 'No strategy, no conversion optimisation, generic templates.', ourAdvantage: 'Custom work + lead tracking + 90 days optimisation with fixed scope.' },
    { competitor: 'Local generalist agencies', weakness: 'Slow, expensive, often no measurable lead results.', ourAdvantage: '21-day delivery, fixed price, KPI-focused.' },
    { competitor: 'Cheap Fiverr freelancers', weakness: 'No local understanding, poor support, no growth partnership.', ourAdvantage: 'Belgian SME focus + care plan retainer.' },
  ],
  actionPlan: [
    { day: 'Day 1', task: 'Rewrite homepage hero to Signature Growth Site (€2,950, 21 days, 5+ leads/month).', outcome: 'Visitors see one clear offer within 5 seconds.' },
    { day: 'Day 2', task: 'Write and publish one case study with hard numbers (traffic, form submits).', outcome: 'Sales conversations have proof material.' },
    { day: 'Day 3', task: 'Create "Website ROI Audit" lead magnet landing page + LinkedIn post.', outcome: 'First inbound leads outside referrals.' },
    { day: 'Day 4-5', task: 'Send 20 personalised cold emails to Flemish accountants.', outcome: 'At least 3 replies or 1 discovery call.' },
    { day: 'Day 6-7', task: 'Rewrite proposal template: outcome-first, 3 phases, no hours breakdown.', outcome: 'Proposals position you as partner, not vendor.' },
    { day: 'Week 2 (part 1)', task: 'Publish 2 LinkedIn posts (case metric + common mistake).', outcome: 'Visibility + DM conversations.' },
    { day: 'Week 2 (part 2)', task: 'Run 3 discovery calls with new intake questions (lead gap first).', outcome: 'Pipeline with €2,950+ opportunities.' },
    { day: 'Week 3 (part 1)', task: 'Send proposals + start 48h follow-up sequence.', outcome: 'At least 1 signed project.' },
    { day: 'Week 3 (part 2)', task: 'Pitch care plan on delivery or to existing client.', outcome: '€99/month recurring revenue.' },
    { day: 'Week 4 (part 1)', task: 'Standardise 5-section homepage template + intake form.', outcome: 'Next project 20% faster delivery.' },
    { day: 'Week 4 (part 2)', task: 'Review metrics: cold reply rate, calls booked, deals closed.', outcome: 'Data for next 30-day cycle.' },
    { day: 'Day 30 Review', task: 'Evaluate: 3+ new projects €2,500+? If not, double outbound volume.', outcome: 'Decision on scaling or tweaking offer.' },
  ],
  templates: [
    {
      title: 'Cold email — website ROI pitch',
      channel: 'Email',
      body: 'Subject: Your website is probably costing you 2–3 leads per month\n\nDear [Name],\n\nI took a quick look at the [Company] website and spotted three gaps that often cost qualified enquiries: no social proof above the fold, a contact form without qualification, and a headline that describes what you do instead of what the client gets.\n\nI run Digit Studio — we build conversion-driven sites for Belgian SME service providers. Clients typically go from referral-only to 5–8 inbound enquiries per month within 60 days.\n\nInterested in a short 20-minute call this week? I can show you exactly what I would change before we talk budget.\n\nBest regards,\n[Name]',
    },
    {
      title: 'Follow-up after no reply (3 days)',
      channel: 'Email',
      body: 'Subject: Re: website ROI — quick follow-up\n\nDear [Name],\n\nI wanted to follow up on my email from Tuesday. No pressure — if the timing is not right, just let me know.\n\nIf helpful: I can send you a 5-minute screen recording with the 3 biggest conversion opportunities on your current site. Free, no obligation.\n\nRegards,\n[Name]',
    },
    {
      title: 'Discovery call confirmation',
      channel: 'Email',
      body: 'Subject: Call confirmation [date] — Digit Studio\n\nDear [Name],\n\nThank you for scheduling. We will speak on [date] at [time].\n\nTo prepare: how many qualified enquiries do you currently receive per month via your website? And what would be a realistic goal within 90 days?\n\nTalk soon,\n[Name]',
    },
    {
      title: 'Proposal follow-up (3 days silence)',
      channel: 'Email',
      body: 'Subject: Questions about the proposal?\n\nDear [Name],\n\nI sent the Signature Growth Site proposal on [date]. Do you have any questions about scope, timing, or the lead goal?\n\nI am happy to adjust the proposal if priorities have shifted in the meantime.\n\nRegards,\n[Name]',
    },
    {
      title: 'LinkedIn connection request',
      channel: 'LinkedIn',
      body: 'Hi [Name], I help SME service providers in BE go from referral-only to predictable website leads. I saw your profile via [context] — open to connecting?',
    },
  ],
  contentIdeas: [
    { title: '3 website mistakes that cost SMEs leads', angle: 'Educational + authority', hook: 'Your homepage describes what you do. Your client wants to know what they get — that gap costs you leads.' },
    { title: 'Case: from 0 to 7 form submits/month', angle: 'Social proof', hook: 'This accountant thought "more traffic" was the problem. It was the headline.' },
    { title: 'Why €500 websites cost more than €3,000', angle: 'Pricing reframing', hook: 'A cheap site without conversion strategy is not a saving — it is a monthly expense.' },
  ],
  metrics: [
    { metric: 'Cold email reply rate', target: '≥ 8%', why: 'Lower = wrong list or too generic pitch.' },
    { metric: 'Discovery calls / week', target: '≥ 2', why: 'Pipeline stays empty without a fixed cadence.' },
    { metric: 'Average deal value', target: '≥ €2,950', why: 'Under €2,500 = margin erosion and wrong positioning signal.' },
    { metric: 'Care plan attach rate', target: '≥ 60%', why: 'Recurring revenue stabilises cash flow between projects.' },
    { metric: 'Homepage conversion (audit signup)', target: '≥ 2%', why: 'Lead magnet validates inbound before you consider ads.' },
    { metric: 'Proposal close rate', target: '≥ 30%', why: 'Lower = discovery or proposal needs sharpening.' },
  ],
  upsellIdeas: [
    { title: 'Care Plan (hosting + optimisation)', price: '€99/month', scope: 'Hosting, updates, monthly conversion check.', trigger: 'Directly after signature site delivery.' },
    { title: 'Landing page sprint', price: '€750–€1,200', scope: 'One campaign LP within 5 business days.', trigger: 'Client starts Google/Meta ads.' },
    { title: 'Funnel build (LP + email sequence)', price: '€2,000–€3,500', scope: 'Lead magnet + 5 emails + LP.', trigger: 'Care plan client asks for more leads.' },
  ],
  assumptions: [
    'We assume Digit Studio can show at least 2 reference projects with measurable results — if not, build one pro-bono case first.',
    'We assume the target market remains Flanders/Dutch-speaking BE; the NL market requires separate case studies.',
    'We assume you can invest 10+ hours/week in outbound and content.',
  ],
  disclaimer: 'This report was generated as strategic inspiration based on supplied input. Always validate recommendations against your own market data and legal context.',
};

export default plan;
