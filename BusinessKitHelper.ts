import 'dotenv/config';
import {OpenRouter} from '@openrouter/sdk';
import {jsonrepair} from 'jsonrepair';

type BusinessKitRequest = {
    businessName?: string | undefined;
    businessType?: string | undefined;
    offer?: string | undefined;
    audience?: string | undefined;
    problem?: string | undefined;
    goal?: string | undefined;
    channels?: string | undefined;
    pricePoint?: string | undefined;
    region?: string | undefined;
    tone?: string | undefined;
    language: BusinessKitLanguage;
};

type BusinessKitLanguage = "en" | "nl" | "fr" | "de";

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

type BusinessKitPlan = {
    language: BusinessKitLanguage;
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
    actionPlan: ActionItem[];
    templates: BusinessTemplate[];
    contentIdeas: ContentIdea[];
    metrics: BusinessMetric[];
    upsellIdeas: string[];
    assumptions: string[];
    disclaimer: string;
};

type BusinessKitMode = "schema" | "json" | "compact";

const openRouter = new OpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    httpReferer: process.env.OPEN_ROUTER_HTTP_REFERER ?? '<YOUR_SITE_URL>',
    xTitle: process.env.OPEN_ROUTER_X_TITLE ?? '<YOUR_SITE_NAME>',
});

const fallbackModel = process.env.OPEN_ROUTER_MODEL ?? "openrouter/free";
const businessKitModel = process.env.BUSINESS_KIT_MODEL ?? fallbackModel;
const maxCompletionTokens =
    Number(process.env.BUSINESS_KIT_MAX_COMPLETION_TOKENS ?? process.env.OPEN_ROUTER_MAX_COMPLETION_TOKENS) || 9000;

const businessKitResponseFormat = {
    type: "json_schema" as const,
    jsonSchema: {
        name: "BusinessKitPlan",
        description: "A practical entrepreneur growth kit that can be rendered into a paid report.",
        schema: {
            type: "object",
            additionalProperties: false,
            properties: {
                title: {type: "string"},
                subtitle: {type: "string"},
                executiveSummary: {type: "string"},
                positioning: {type: "string"},
                coreOfferRewrite: {type: "string"},
                idealCustomerProfile: {type: "string"},
                biggestRisks: {type: "array", minItems: 3, maxItems: 5, items: {type: "string"}},
                quickWins: {type: "array", minItems: 4, maxItems: 7, items: {type: "string"}},
                strategySections: {
                    type: "array",
                    minItems: 4,
                    maxItems: 6,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            title: {type: "string"},
                            diagnosis: {type: "string"},
                            moves: {type: "array", minItems: 3, maxItems: 5, items: {type: "string"}},
                        },
                        required: ["title", "diagnosis", "moves"],
                    },
                },
                scorecard: {
                    type: "array",
                    minItems: 5,
                    maxItems: 6,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            label: {type: "string"},
                            score: {type: "number"},
                            rationale: {type: "string"},
                            nextMove: {type: "string"},
                        },
                        required: ["label", "score", "rationale", "nextMove"],
                    },
                },
                actionPlan: {
                    type: "array",
                    minItems: 8,
                    maxItems: 12,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            day: {type: "string"},
                            task: {type: "string"},
                            outcome: {type: "string"},
                        },
                        required: ["day", "task", "outcome"],
                    },
                },
                templates: {
                    type: "array",
                    minItems: 3,
                    maxItems: 5,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            title: {type: "string"},
                            channel: {type: "string"},
                            body: {type: "string"},
                        },
                        required: ["title", "channel", "body"],
                    },
                },
                contentIdeas: {
                    type: "array",
                    minItems: 5,
                    maxItems: 8,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            title: {type: "string"},
                            angle: {type: "string"},
                            hook: {type: "string"},
                        },
                        required: ["title", "angle", "hook"],
                    },
                },
                metrics: {
                    type: "array",
                    minItems: 5,
                    maxItems: 8,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            metric: {type: "string"},
                            target: {type: "string"},
                            why: {type: "string"},
                        },
                        required: ["metric", "target", "why"],
                    },
                },
                upsellIdeas: {type: "array", minItems: 3, maxItems: 5, items: {type: "string"}},
                assumptions: {type: "array", minItems: 3, maxItems: 5, items: {type: "string"}},
                disclaimer: {type: "string"},
            },
            required: [
                "title",
                "subtitle",
                "executiveSummary",
                "positioning",
                "coreOfferRewrite",
                "idealCustomerProfile",
                "biggestRisks",
                "quickWins",
                "strategySections",
                "scorecard",
                "actionPlan",
                "templates",
                "contentIdeas",
                "metrics",
                "upsellIdeas",
                "assumptions",
                "disclaimer",
            ],
        },
    },
};

async function createBusinessKit(userRequest: unknown): Promise<BusinessKitPlan> {
    const request = normalizeBusinessKitRequest(userRequest);
    const plannerRequest = formatBusinessKitRequest(request);
    const modes = businessKitModes();
    let lastAttempt: { text: string; debug: string } | null = null;
    let lastError: Error | null = null;

    for (const [index, mode] of modes.entries()) {
        const attempt = await requestBusinessKitJsonSafely(plannerRequest, mode);
        const plan = parseBusinessKitPlan(attempt.text, request);

        if (plan.ok) {
            return plan.plan;
        }

        lastAttempt = attempt;
        lastError = plan.error;

        const nextMode = modes[index + 1];

        if (nextMode) {
            console.warn(`AI business kit ${mode} attempt failed. Trying ${nextMode}.`, {
                model: businessKitModel,
                response: previewText(attempt.debug),
                parseError: plan.error.message,
            });
        }
    }

    console.warn("AI business kit failed after all attempts. Using local fallback kit.", {
        model: businessKitModel,
        response: previewText(lastAttempt?.debug ?? ""),
        parseError: lastError?.message ?? "Unknown parse error",
    });

    return createFallbackBusinessKit(request);
}

function normalizeBusinessKitRequest(value: unknown): BusinessKitRequest {
    if (!isRecord(value)) {
        return {
            language: "en",
        };
    }

    return {
        businessName: cleanOptionalText(value.businessName),
        businessType: cleanOptionalText(value.businessType),
        offer: cleanOptionalText(value.offer),
        audience: cleanOptionalText(value.audience),
        problem: cleanOptionalText(value.problem),
        goal: cleanOptionalText(value.goal),
        channels: cleanOptionalText(value.channels),
        pricePoint: cleanOptionalText(value.pricePoint),
        region: cleanOptionalText(value.region),
        tone: cleanOptionalText(value.tone),
        language: normalizeLanguage(value.language),
    };
}

function formatBusinessKitRequest(request: BusinessKitRequest): string {
    return [
        `Report language: ${languageName(request.language)}.`,
        languageInstruction(request.language),
        `Business name: ${request.businessName ?? "Not provided"}`,
        `Business type: ${request.businessType ?? "Not provided"}`,
        `Current offer: ${request.offer ?? "Not provided"}`,
        `Target customer: ${request.audience ?? "Not provided"}`,
        `Main problem: ${request.problem ?? "Not provided"}`,
        `Goal: ${request.goal ?? "Not provided"}`,
        `Current channels: ${request.channels ?? "Not provided"}`,
        `Price point: ${request.pricePoint ?? "Not provided"}`,
        `Region or market: ${request.region ?? "Not provided"}`,
        `Preferred tone: ${request.tone ?? "Clear, direct, premium, practical"}`,
    ].join("\n");
}

async function requestBusinessKitJson(
    plannerRequest: string,
    mode: BusinessKitMode
): Promise<{ text: string; debug: string }> {
    const completion = await openRouter.chat.send({
        chatGenerationParams: {
            model: businessKitModel,
            provider: mode === "schema" ? {requireParameters: true} : undefined,
            plugins: mode === "schema" || mode === "json" ? [{id: "response-healing"}] : undefined,
            messages: [
                {
                    role: "system",
                    content: businessKitPrompt(mode),
                },
                {
                    role: "user",
                    content: plannerRequest,
                },
            ],
            responseFormat: businessKitResponseFormatFor(mode),
            temperature: 0.35,
            maxCompletionTokens,
            stream: false,
        },
    });

    const message = completion.choices?.[0]?.message;
    const text = contentToString(message?.content).trim();

    return {
        text,
        debug: text || safeStringify(message ?? completion),
    };
}

async function requestBusinessKitJsonSafely(
    plannerRequest: string,
    mode: BusinessKitMode
): Promise<{ text: string; debug: string }> {
    try {
        return await requestBusinessKitJson(plannerRequest, mode);
    } catch (error) {
        return {
            text: "",
            debug: `${mode} request failed: ${error instanceof Error ? error.message : String(error)}`,
        };
    }
}

function businessKitPrompt(mode: BusinessKitMode): string {
    const jsonInstruction = mode === "schema"
        ? "Return JSON that matches the provided schema."
        : "Return only raw JSON. Start with { and end with }. Do not use markdown or commentary.";

    return [
        "You are a practical growth strategist for small businesses, solo founders, agencies, consultants, ecommerce operators, and local service companies.",
        jsonInstruction,
        "Create a paid-quality business growth kit that is specific, useful, and commercially realistic.",
        "Do not make vague motivational advice. Every recommendation should be concrete enough to execute this week.",
        "Prioritize offer clarity, pricing power, lead generation, conversion, retention, operations, and measurable next actions.",
        "Use the user's market, offer, goal, channel, and tone when available. If details are missing, state assumptions instead of inventing fake facts.",
        "Write every user-facing report field in the requested report language, including titles, table rows, score labels, action-plan days, templates, metrics, assumptions, and disclaimers.",
        "Translate user-provided wording into the requested report language when it appears in the report. Keep only brand names, product names, acronyms, URLs, and unavoidable proper nouns unchanged.",
        "Keep the JSON keys in English.",
        "Write in confident consultant language, but keep it understandable for a busy entrepreneur.",
        "Include scores from 0 to 100. Low scores are allowed when the business has real gaps.",
        "Do not guarantee revenue, profit, funding, legal compliance, or medical/financial outcomes.",
        "Keep the response bounded so the JSON is valid: short paragraphs, compact lists, no markdown tables.",
        "Shape keys exactly: title, subtitle, executiveSummary, positioning, coreOfferRewrite, idealCustomerProfile, biggestRisks, quickWins, strategySections, scorecard, actionPlan, templates, contentIdeas, metrics, upsellIdeas, assumptions, disclaimer.",
    ].join(" ");
}

function businessKitResponseFormatFor(mode: BusinessKitMode) {
    if (mode === "schema") {
        return businessKitResponseFormat;
    }

    if (mode === "json") {
        return {type: "json_object" as const};
    }

    return undefined;
}

function businessKitModes(): BusinessKitMode[] {
    if (businessKitModel === "openrouter/free") {
        return ["compact"];
    }

    return process.env.BUSINESS_KIT_USE_JSON_SCHEMA === "true" || process.env.OPEN_ROUTER_USE_JSON_SCHEMA === "true"
        ? ["schema", "json", "compact"]
        : ["json", "compact"];
}

function parseBusinessKitPlan(
    rawOutput: string,
    request: BusinessKitRequest
): { ok: true; plan: BusinessKitPlan } | { ok: false; error: Error } {
    try {
        return {
            ok: true,
            plan: normalizeBusinessKitPlan(parseJsonObject(rawOutput), request),
        };
    } catch (error) {
        return {
            ok: false,
            error: error instanceof Error ? error : new Error(String(error)),
        };
    }
}

function parseJsonObject(rawOutput: string): unknown {
    const candidates = jsonCandidates(rawOutput);

    if (candidates.length === 0) {
        throw new Error("The AI returned an empty response.");
    }

    let lastError: Error | null = null;

    for (const candidate of candidates) {
        try {
            return JSON.parse(candidate);
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
        }

        try {
            return JSON.parse(jsonrepair(candidate));
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
        }
    }

    throw new Error(lastError?.message ?? "The AI did not return valid JSON.");
}

function jsonCandidates(rawOutput: string): string[] {
    const trimmedOutput = rawOutput.trim();

    if (!trimmedOutput) {
        return [];
    }

    const candidates = new Set<string>([trimmedOutput]);
    const fencedJson = trimmedOutput.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();

    if (fencedJson) {
        candidates.add(fencedJson);
    }

    const start = trimmedOutput.indexOf("{");
    const end = trimmedOutput.lastIndexOf("}");

    if (start >= 0 && end > start) {
        candidates.add(trimmedOutput.slice(start, end + 1));
    }

    return Array.from(candidates).filter((candidate) => candidate.length > 0);
}

function normalizeBusinessKitPlan(value: unknown, request: BusinessKitRequest): BusinessKitPlan {
    if (!isRecord(value)) {
        throw new Error("Business kit must be a JSON object.");
    }

    const fallback = createFallbackBusinessKit(request);

    return {
        language: request.language,
        title: stringOr(value.title, fallback.title),
        subtitle: stringOr(value.subtitle, fallback.subtitle),
        executiveSummary: stringOr(value.executiveSummary, fallback.executiveSummary),
        positioning: stringOr(value.positioning, fallback.positioning),
        coreOfferRewrite: stringOr(value.coreOfferRewrite, fallback.coreOfferRewrite),
        idealCustomerProfile: stringOr(value.idealCustomerProfile, fallback.idealCustomerProfile),
        biggestRisks: stringArray(value.biggestRisks, fallback.biggestRisks, 5),
        quickWins: stringArray(value.quickWins, fallback.quickWins, 7),
        strategySections: strategySections(value.strategySections, fallback.strategySections),
        scorecard: scorecard(value.scorecard, fallback.scorecard),
        actionPlan: actionPlan(value.actionPlan, fallback.actionPlan),
        templates: templates(value.templates, fallback.templates),
        contentIdeas: contentIdeas(value.contentIdeas, fallback.contentIdeas),
        metrics: metrics(value.metrics, fallback.metrics),
        upsellIdeas: stringArray(value.upsellIdeas, fallback.upsellIdeas, 5),
        assumptions: stringArray(value.assumptions, fallback.assumptions, 5),
        disclaimer: stringOr(value.disclaimer, fallback.disclaimer),
    };
}

function createFallbackBusinessKit(request: BusinessKitRequest): BusinessKitPlan {
    if (request.language === "nl") {
        return createDutchFallbackBusinessKit(request);
    }

    const business = request.businessName ?? request.businessType ?? "Your Business";
    const audience = request.audience ?? "a clearly defined buyer segment";
    const offer = request.offer ?? "a focused paid offer";
    const problem = request.problem ?? "inconsistent sales momentum";
    const goal = request.goal ?? "create a more reliable path to revenue";

    return {
        language: request.language,
        title: `${business} Growth Kit`,
        subtitle: "A practical 30-day plan for sharper positioning, stronger offers, and more predictable sales activity.",
        executiveSummary: `${business} should focus on one clear buyer, one measurable problem, and one paid offer that is easy to understand. The immediate opportunity is to reduce vague positioning, make the buying decision simpler, and turn weekly sales activity into a repeatable system.`,
        positioning: `Position the business as the practical choice for ${audience} who want ${goal}. Lead with the painful problem, the promised business outcome, and the reason your approach is easier or safer than doing nothing.`,
        coreOfferRewrite: `Offer: ${offer}. Package it as a specific outcome with a fixed scope, a clear timeline, proof points, and a next step that feels low-risk for the buyer.`,
        idealCustomerProfile: `Best-fit customers are buyers who already feel the cost of ${problem}, have budget or urgency, and can make a decision within 30 days. Avoid prospects who only want ideas, custom work without budget, or unclear ownership.`,
        biggestRisks: [
            "The offer may sound useful but not urgent enough to trigger action.",
            "The sales message may focus on features before the buyer feels the business problem.",
            "Lead generation may depend too much on random posting or referrals.",
            "Pricing may be anchored to time spent instead of value delivered.",
        ],
        quickWins: [
            "Rewrite the homepage or profile headline around the buyer's painful problem and desired result.",
            "Create one fixed-scope package with a visible starting price or qualification rule.",
            "Send 20 direct outreach messages to a narrow list of likely buyers.",
            "Ask 5 past customers what made them buy and turn their language into sales copy.",
            "Add a simple follow-up sequence for every warm lead.",
        ],
        strategySections: [
            {
                title: "Offer Clarity",
                diagnosis: "The offer needs to be easy to repeat in one sentence and specific enough that a buyer can self-identify.",
                moves: [
                    "Name the package after the outcome, not the service category.",
                    "Define what is included, what is excluded, and what result the buyer can expect.",
                    "Add a clear next step such as a paid audit, strategy call, or fixed diagnostic.",
                ],
            },
            {
                title: "Acquisition",
                diagnosis: "Growth needs a weekly pipeline habit instead of waiting for inbound demand.",
                moves: [
                    "Pick one primary channel for 30 days and measure conversations started.",
                    "Build a list of 100 qualified prospects using the ideal customer profile.",
                    "Use a short message that points to a business problem, not a pitch deck.",
                ],
            },
            {
                title: "Conversion",
                diagnosis: "Prospects need proof, urgency, and a simple path from interest to decision.",
                moves: [
                    "Create a one-page case story or proof section.",
                    "Use a discovery script that qualifies pain, budget, decision owner, and timing.",
                    "Send a proposal with three options so the buyer can choose scope instead of yes or no.",
                ],
            },
            {
                title: "Retention And Upsell",
                diagnosis: "The easiest revenue often comes from making current customers more successful.",
                moves: [
                    "Add a 30-day check-in with every customer.",
                    "Create one obvious next offer after the first purchase.",
                    "Track renewal risk and ask for referrals after a clear win.",
                ],
            },
        ],
        scorecard: [
            {
                label: "Offer clarity",
                score: 68,
                rationale: "The business can improve conversion by making the offer more concrete.",
                nextMove: "Write a one-sentence offer promise and test it with five buyers.",
            },
            {
                label: "Pricing power",
                score: 57,
                rationale: "Pricing should be tied to business impact instead of effort alone.",
                nextMove: "Create three packages with clear outcome differences.",
            },
            {
                label: "Lead generation",
                score: 49,
                rationale: "The current system needs more predictable weekly activity.",
                nextMove: "Set a target of 20 qualified outbound touches per week.",
            },
            {
                label: "Conversion",
                score: 61,
                rationale: "The sales path can be shortened with proof and a sharper next step.",
                nextMove: "Add a diagnostic call script and proposal template.",
            },
            {
                label: "Execution focus",
                score: 72,
                rationale: "A narrow 30-day plan will create more momentum than many scattered ideas.",
                nextMove: "Choose one channel, one offer, and one metric for the next 30 days.",
            },
        ],
        actionPlan: [
            {day: "Day 1", task: "Rewrite the target buyer and painful problem in one sentence.", outcome: "Clear positioning"},
            {day: "Day 2", task: "Define the main offer scope, timeline, price logic, and promise.", outcome: "Sellable package"},
            {day: "Day 3", task: "Collect proof, examples, testimonials, or before-and-after evidence.", outcome: "Trust assets"},
            {day: "Day 4", task: "Build a list of 25 likely buyers.", outcome: "Qualified pipeline"},
            {day: "Day 5", task: "Send the first 10 outreach messages.", outcome: "Started conversations"},
            {day: "Week 2", task: "Run discovery calls and record objections.", outcome: "Sales insight"},
            {day: "Week 3", task: "Publish three posts or emails based on buyer objections.", outcome: "Demand creation"},
            {day: "Week 4", task: "Review metrics, improve the offer, and follow up with every warm lead.", outcome: "Next sales cycle"},
        ],
        templates: [
            {
                title: "Cold outreach opener",
                channel: "LinkedIn or email",
                body: `Hi [Name], I noticed [specific signal]. I help ${audience} solve ${problem} without adding unnecessary complexity. Worth a quick exchange to see if this is relevant for you?`,
            },
            {
                title: "Follow-up message",
                channel: "Email",
                body: "Quick follow-up. If this is not a priority right now, no worries. If it is, I can send over the three questions I use to diagnose whether the opportunity is worth pursuing.",
            },
            {
                title: "Offer close",
                channel: "Proposal",
                body: "Based on the problem, I recommend starting with the focused package first. It gives us a clear result to measure, keeps the scope controlled, and creates the option to expand only after the first win.",
            },
        ],
        contentIdeas: [
            {
                title: "The cost of waiting",
                angle: "Show what the problem costs over 30, 60, and 90 days.",
                hook: "The expensive part is usually not the tool or service. It is the delay.",
            },
            {
                title: "Before and after",
                angle: "Compare the current messy process with the improved version.",
                hook: "Most businesses do not need more complexity. They need a cleaner path to the sale.",
            },
            {
                title: "Buyer mistakes",
                angle: "Name three mistakes buyers make when trying to solve this problem alone.",
                hook: "If you are solving this in-house, avoid these three traps.",
            },
            {
                title: "Simple framework",
                angle: "Teach a three-step diagnostic that previews your expertise.",
                hook: "Here is the quick check I use before recommending any fix.",
            },
            {
                title: "Proof post",
                angle: "Share a specific client or project result without exaggerating.",
                hook: "The win came from narrowing the offer, not doing more work.",
            },
        ],
        metrics: [
            {metric: "Qualified conversations", target: "20 per month", why: "Shows whether acquisition is active enough."},
            {metric: "Discovery calls booked", target: "6 per month", why: "Measures message-to-meeting conversion."},
            {metric: "Proposal close rate", target: "30 percent or higher", why: "Reveals whether the offer and sales process are convincing."},
            {metric: "Average deal value", target: "Increase by 15 percent", why: "Protects margin and pricing power."},
            {metric: "Follow-up completion", target: "100 percent", why: "Prevents warm opportunities from leaking."},
        ],
        upsellIdeas: [
            "A paid diagnostic that leads into the main package.",
            "A monthly implementation retainer after the first project.",
            "A premium done-with-you version for customers who want speed and guidance.",
        ],
        assumptions: [
            "The business has at least one offer that can be sold within 30 days.",
            "The target customer has a measurable problem and a reason to act soon.",
            "The founder or team can commit to weekly outreach and follow-up.",
        ],
        disclaimer: "This report is strategic guidance, not a guarantee of financial results, legal compliance, or tax advice. Test the recommendations against your market and numbers.",
    };
}

function createDutchFallbackBusinessKit(request: BusinessKitRequest): BusinessKitPlan {
    const business = request.businessName ?? "Je bedrijf";
    const audience = "de beschreven doelgroep";
    const offer = "het gekozen aanbod";
    const problem = "het beschreven groeiprobleem";
    const goal = "de gewenste groei realiseren";

    return {
        language: "nl",
        title: `${business} Groeikit`,
        subtitle: "Een praktisch 30-dagenplan voor scherpere positionering, sterkere aanbiedingen en voorspelbaardere verkoopactiviteit.",
        executiveSummary: `${business} moet focussen op één duidelijke koper, één meetbaar probleem en één betaald aanbod dat makkelijk te begrijpen is. De directe kans ligt in minder vage positionering, een eenvoudiger koopbesluit en een wekelijkse verkoopaanpak die herhaalbaar wordt.`,
        positioning: `Positioneer het bedrijf als de praktische keuze voor ${audience} die ${goal}. Start met het pijnlijke probleem, het gewenste bedrijfsresultaat en waarom jouw aanpak eenvoudiger of veiliger is dan niets doen.`,
        coreOfferRewrite: `Aanbod: ${offer}. Verpak dit als een specifiek resultaat met vaste scope, duidelijke timing, bewijs en een volgende stap die laagdrempelig voelt voor de koper.`,
        idealCustomerProfile: `De beste klanten voelen nu al de kosten van ${problem}, hebben budget of urgentie en kunnen binnen 30 dagen beslissen. Vermijd prospects die alleen ideeën willen, maatwerk zonder budget vragen of geen duidelijke beslisser hebben.`,
        biggestRisks: [
            "Het aanbod kan nuttig klinken, maar nog niet urgent genoeg zijn om actie uit te lokken.",
            "De verkoopboodschap kan te snel over functies praten voordat de koper het bedrijfsprobleem voelt.",
            "Leadgeneratie kan te afhankelijk zijn van losse posts of toevallige referrals.",
            "Prijszetting kan te veel leunen op tijdsbesteding in plaats van geleverde waarde.",
        ],
        quickWins: [
            "Herschrijf de homepage- of profielkop rond het pijnlijke probleem van de koper en het gewenste resultaat.",
            "Maak één pakket met vaste scope en een zichtbaar startpunt voor prijs of kwalificatie.",
            "Stuur 20 gerichte outreachberichten naar een smalle lijst waarschijnlijke kopers.",
            "Vraag 5 vorige klanten waarom ze kochten en verwerk hun woorden in je verkooptekst.",
            "Voeg een eenvoudige opvolgreeks toe voor elke warme lead.",
        ],
        strategySections: [
            {
                title: "Aanbod scherpstellen",
                diagnosis: "Het aanbod moet in één zin te herhalen zijn en specifiek genoeg zijn zodat een koper zichzelf herkent.",
                moves: [
                    "Geef het pakket een naam op basis van de uitkomst, niet op basis van de dienstcategorie.",
                    "Definieer wat inbegrepen is, wat uitgesloten is en welk resultaat de koper mag verwachten.",
                    "Voeg een duidelijke volgende stap toe, zoals een betaalde audit, strategiesessie of vaste diagnose.",
                ],
            },
            {
                title: "Acquisitie",
                diagnosis: "Groei vraagt een wekelijkse pipeline-gewoonte in plaats van wachten op spontane vraag.",
                moves: [
                    "Kies één primair kanaal voor 30 dagen en meet hoeveel gesprekken je start.",
                    "Bouw een lijst van 100 gekwalificeerde prospects op basis van het ideale klantprofiel.",
                    "Gebruik een kort bericht dat verwijst naar een bedrijfsprobleem, niet naar een pitchdeck.",
                ],
            },
            {
                title: "Conversie",
                diagnosis: "Prospects hebben bewijs, urgentie en een eenvoudig pad nodig van interesse naar beslissing.",
                moves: [
                    "Maak een korte case story of bewijssectie.",
                    "Gebruik een discovery-script dat pijn, budget, beslisser en timing kwalificeert.",
                    "Stuur een voorstel met drie opties zodat de koper scope kiest in plaats van ja of nee.",
                ],
            },
            {
                title: "Retentie en upsell",
                diagnosis: "De makkelijkste extra omzet komt vaak uit bestaande klanten succesvoller maken.",
                moves: [
                    "Plan een check-in na 30 dagen met elke klant.",
                    "Maak één logische vervolgaanbieding na de eerste aankoop.",
                    "Volg verlengingsrisico en vraag om referrals na een duidelijke winst.",
                ],
            },
        ],
        scorecard: [
            {
                label: "Aanbodhelderheid",
                score: 68,
                rationale: "Het bedrijf kan conversie verbeteren door het aanbod concreter te maken.",
                nextMove: "Schrijf één beloftezin voor het aanbod en test die bij vijf kopers.",
            },
            {
                label: "Prijszettingskracht",
                score: 57,
                rationale: "De prijs moet sterker gekoppeld worden aan bedrijfsimpact in plaats van alleen inspanning.",
                nextMove: "Maak drie pakketten met duidelijke verschillen in uitkomst.",
            },
            {
                label: "Leadgeneratie",
                score: 49,
                rationale: "Het huidige systeem heeft voorspelbaardere wekelijkse activiteit nodig.",
                nextMove: "Zet een doel van 20 gekwalificeerde outbound-contacten per week.",
            },
            {
                label: "Conversie",
                score: 61,
                rationale: "Het verkooptraject kan korter met beter bewijs en een scherpere volgende stap.",
                nextMove: "Voeg een diagnosescript en voorsteltemplate toe.",
            },
            {
                label: "Uitvoeringsfocus",
                score: 72,
                rationale: "Een smal 30-dagenplan creëert meer momentum dan veel losse ideeën.",
                nextMove: "Kies één kanaal, één aanbod en één metric voor de komende 30 dagen.",
            },
        ],
        actionPlan: [
            {day: "Dag 1", task: "Herschrijf de doelgroep en het pijnlijke probleem in één zin.", outcome: "Heldere positionering"},
            {day: "Dag 2", task: "Definieer de scope, timing, prijslogica en belofte van het hoofdaanbod.", outcome: "Verkoopbaar pakket"},
            {day: "Dag 3", task: "Verzamel bewijs, voorbeelden, testimonials of voor-en-na-resultaten.", outcome: "Vertrouwensmateriaal"},
            {day: "Dag 4", task: "Bouw een lijst van 25 waarschijnlijke kopers.", outcome: "Gekwalificeerde pipeline"},
            {day: "Dag 5", task: "Stuur de eerste 10 outreachberichten.", outcome: "Gestarte gesprekken"},
            {day: "Week 2", task: "Voer discoverygesprekken en noteer bezwaren.", outcome: "Verkoopinzicht"},
            {day: "Week 3", task: "Publiceer drie posts of mails gebaseerd op kopersbezwaren.", outcome: "Vraagcreatie"},
            {day: "Week 4", task: "Evalueer metrics, verbeter het aanbod en volg elke warme lead op.", outcome: "Volgende verkoopcyclus"},
        ],
        templates: [
            {
                title: "Koude outreach opener",
                channel: "LinkedIn of e-mail",
                body: `Hoi [Naam], ik zag [specifiek signaal]. Ik help ${audience} om ${problem} op te lossen zonder onnodige complexiteit toe te voegen. Zinvol om kort te toetsen of dit relevant is voor jullie?`,
            },
            {
                title: "Opvolgbericht",
                channel: "E-mail",
                body: "Korte opvolging. Als dit nu geen prioriteit is, helemaal prima. Als het wel speelt, stuur ik graag de drie vragen die ik gebruik om te bepalen of de kans de moeite waard is.",
            },
            {
                title: "Aanbod afsluiten",
                channel: "Voorstel",
                body: "Op basis van het probleem raad ik aan om eerst met het gefocuste pakket te starten. Dat geeft ons een duidelijk resultaat om te meten, houdt de scope beheersbaar en creëert ruimte om pas na de eerste winst uit te breiden.",
            },
        ],
        contentIdeas: [
            {
                title: "De kost van wachten",
                angle: "Laat zien wat het probleem kost over 30, 60 en 90 dagen.",
                hook: "Het dure deel is meestal niet de tool of dienst. Het is de vertraging.",
            },
            {
                title: "Voor en na",
                angle: "Vergelijk het huidige rommelige proces met de verbeterde versie.",
                hook: "De meeste bedrijven hebben niet meer complexiteit nodig, maar een schoner pad naar verkoop.",
            },
            {
                title: "Fouten van kopers",
                angle: "Noem drie fouten die kopers maken wanneer ze dit probleem zelf proberen op te lossen.",
                hook: "Los je dit intern op? Vermijd dan deze drie valkuilen.",
            },
            {
                title: "Simpel raamwerk",
                angle: "Leer een diagnose in drie stappen die je expertise zichtbaar maakt.",
                hook: "Dit is de snelle check die ik gebruik voordat ik een oplossing aanbeveel.",
            },
            {
                title: "Bewijspost",
                angle: "Deel een specifiek klant- of projectresultaat zonder te overdrijven.",
                hook: "De winst kwam door het aanbod smaller te maken, niet door meer werk te doen.",
            },
        ],
        metrics: [
            {metric: "Gekwalificeerde gesprekken", target: "20 per maand", why: "Laat zien of acquisitie actief genoeg is."},
            {metric: "Discoverygesprekken geboekt", target: "6 per maand", why: "Meet de conversie van boodschap naar afspraak."},
            {metric: "Sluitingsratio voorstellen", target: "30 procent of hoger", why: "Toont of aanbod en verkoopproces overtuigend zijn."},
            {metric: "Gemiddelde dealwaarde", target: "15 procent stijging", why: "Beschermt marge en prijszettingskracht."},
            {metric: "Opvolging afgerond", target: "100 procent", why: "Voorkomt dat warme kansen weglekken."},
        ],
        upsellIdeas: [
            "Een betaalde diagnose die logisch leidt naar het hoofdpakket.",
            "Een maandelijkse implementatieretainer na het eerste project.",
            "Een premium samenwerkingsversie voor klanten die snelheid en begeleiding willen.",
        ],
        assumptions: [
            "Het bedrijf heeft minstens één aanbod dat binnen 30 dagen verkocht kan worden.",
            "De doelgroep heeft een meetbaar probleem en een reden om binnenkort te handelen.",
            "De oprichter of het team kan zich committeren aan wekelijkse outreach en opvolging.",
        ],
        disclaimer: "Dit rapport is strategische begeleiding, geen garantie op financiële resultaten, juridische naleving of fiscaal advies. Test de aanbevelingen tegen je markt en cijfers.",
    };
}

function strategySections(value: unknown, fallback: StrategySection[]): StrategySection[] {
    const sections = recordArray(value)
        .map((item) => ({
            title: stringOr(item.title, ""),
            diagnosis: stringOr(item.diagnosis, ""),
            moves: stringArray(item.moves, [], 5),
        }))
        .filter((item) => item.title && item.diagnosis && item.moves.length > 0)
        .slice(0, 6);

    return sections.length >= 3 ? sections : fallback;
}

function scorecard(value: unknown, fallback: BusinessScore[]): BusinessScore[] {
    const scores = recordArray(value)
        .map((item) => ({
            label: stringOr(item.label, ""),
            score: clampScore(item.score),
            rationale: stringOr(item.rationale, ""),
            nextMove: stringOr(item.nextMove, ""),
        }))
        .filter((item) => item.label && item.rationale && item.nextMove)
        .slice(0, 6);

    return scores.length >= 3 ? scores : fallback;
}

function actionPlan(value: unknown, fallback: ActionItem[]): ActionItem[] {
    const items = recordArray(value)
        .map((item) => ({
            day: stringOr(item.day, ""),
            task: stringOr(item.task, ""),
            outcome: stringOr(item.outcome, ""),
        }))
        .filter((item) => item.day && item.task && item.outcome)
        .slice(0, 12);

    return items.length >= 5 ? items : fallback;
}

function templates(value: unknown, fallback: BusinessTemplate[]): BusinessTemplate[] {
    const items = recordArray(value)
        .map((item) => ({
            title: stringOr(item.title, ""),
            channel: stringOr(item.channel, ""),
            body: stringOr(item.body, ""),
        }))
        .filter((item) => item.title && item.channel && item.body)
        .slice(0, 5);

    return items.length >= 2 ? items : fallback;
}

function contentIdeas(value: unknown, fallback: ContentIdea[]): ContentIdea[] {
    const items = recordArray(value)
        .map((item) => ({
            title: stringOr(item.title, ""),
            angle: stringOr(item.angle, ""),
            hook: stringOr(item.hook, ""),
        }))
        .filter((item) => item.title && item.angle && item.hook)
        .slice(0, 8);

    return items.length >= 3 ? items : fallback;
}

function metrics(value: unknown, fallback: BusinessMetric[]): BusinessMetric[] {
    const items = recordArray(value)
        .map((item) => ({
            metric: stringOr(item.metric, ""),
            target: stringOr(item.target, ""),
            why: stringOr(item.why, ""),
        }))
        .filter((item) => item.metric && item.target && item.why)
        .slice(0, 8);

    return items.length >= 3 ? items : fallback;
}

function stringArray(value: unknown, fallback: string[], maxItems: number): string[] {
    if (!Array.isArray(value)) {
        return fallback;
    }

    const items = value
        .map((item) => stringOr(item, ""))
        .filter((item) => item.length > 0)
        .slice(0, maxItems);

    return items.length > 0 ? items : fallback;
}

function recordArray(value: unknown): Record<string, unknown>[] {
    return Array.isArray(value) ? value.filter(isRecord) : [];
}

function clampScore(value: unknown): number {
    const score = typeof value === "number" ? value : Number(value);

    if (!Number.isFinite(score)) {
        return 50;
    }

    return Math.min(Math.max(Math.round(score), 0), 100);
}

function cleanOptionalText(value: unknown): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const clean = value.trim();
    return clean.length > 0 ? clean : undefined;
}

function normalizeLanguage(value: unknown): BusinessKitLanguage {
    if (value === "nl" || value === "fr" || value === "de") {
        return value;
    }

    return "en";
}

function languageName(language: BusinessKitLanguage): string {
    const names: Record<BusinessKitLanguage, string> = {
        en: "English",
        nl: "Dutch (Nederlands)",
        fr: "French",
        de: "German",
    };

    return names[language];
}

function languageInstruction(language: BusinessKitLanguage): string {
    const instructions: Record<BusinessKitLanguage, string> = {
        en: "Write every user-facing report sentence in English. Keep JSON property names in English.",
        nl: "Schrijf elke zichtbare rapportzin in natuurlijk Nederlands. Vertaal ook ingevoerde Engelse formuleringen naar Nederlands wanneer ze in titels, paragrafen, tabellen, templates, metrics of actiepunten terechtkomen. Laat alleen merknamen, productnamen, acroniemen en echte eigennamen onvertaald. Houd JSON-propertynamen Engels.",
        fr: "Write every user-facing report sentence in French. Translate user-provided wording into French when it appears in titles, paragraphs, tables, templates, metrics, or action items. Keep only brand names, product names, acronyms, and proper nouns unchanged. Keep JSON property names in English.",
        de: "Write every user-facing report sentence in German. Translate user-provided wording into German when it appears in titles, paragraphs, tables, templates, metrics, or action items. Keep only brand names, product names, acronyms, and proper nouns unchanged. Keep JSON property names in English.",
    };

    return instructions[language];
}

function stringOr(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function contentToString(content: unknown): string {
    if (typeof content === "string") {
        return content;
    }

    if (isRecord(content) && typeof content.text === "string") {
        return content.text;
    }

    if (!Array.isArray(content)) {
        return "";
    }

    return content
        .map((part) => {
            if (isRecord(part) && typeof part.text === "string") {
                return part.text;
            }

            return "";
        })
        .join("");
}

function previewText(value: string, maxLength = 500): string {
    const compact = value.replace(/\s+/g, " ").trim();
    return compact.length > maxLength ? `${compact.slice(0, maxLength)}...` : compact;
}

function safeStringify(value: unknown): string {
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export {
    createBusinessKit,
};

export type {
    ActionItem,
    BusinessKitPlan,
    BusinessKitLanguage,
    BusinessKitRequest,
    BusinessMetric,
    BusinessScore,
    BusinessTemplate,
    ContentIdea,
    StrategySection,
};
