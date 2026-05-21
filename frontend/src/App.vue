<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import html2pdf from "html2pdf.js";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  FileText,
  Languages,
  Loader2,
  LockKeyhole,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-vue-next";

type GenerateStatus = "idle" | "loading" | "success" | "error";
type ReportLanguage = "en" | "nl" | "fr" | "de";
type GenerationStep = {
  title: string;
  detail: string;
};

type PaymentConfig = {
  paymentRequired: boolean;
  developmentFree: boolean;
  stripeConfigured: boolean;
  amountLabel: string;
};

const tonePresets = [
  "Premium consultant, direct and practical",
  "Bold startup advisor, sharp and punchy",
  "Calm operator, clear and realistic",
  "Luxury brand strategist, polished and concise",
];

const languageOptions: Array<{ value: ReportLanguage; label: string }> = [
  {value: "en", label: "English"},
  {value: "nl", label: "Dutch"},
  {value: "fr", label: "French"},
  {value: "de", label: "German"},
];

const generationSteps: GenerationStep[] = [
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
];

const draftStorageKey = "business-kit-draft";
const paymentStorageKey = "business-kit-payment-session";

const form = reactive({
  businessName: "Northstar Studio",
  businessType: "B2B web design and automation agency for small service businesses",
  offer: "A fixed-scope website and automation sprint that helps owners get more qualified leads",
  audience: "Local service businesses with 5 to 30 employees that rely on referrals",
  problem: "They have an outdated website, weak follow-up, and inconsistent sales pipeline",
  goal: "Book more qualified sales calls and sell higher-ticket packages within 30 days",
  channels: "LinkedIn, email outreach, referrals, website",
  pricePoint: "Current projects are 1500 to 3500 EUR, target is 5000 to 9000 EUR",
  region: "Belgium and Netherlands",
  tone: "Premium consultant, direct and practical",
  language: "en" as ReportLanguage,
});

const status = ref<GenerateStatus>("idle");
const errorMessage = ref("");
const reportUrl = ref("");
const fileName = ref("");
const lastGeneratedAt = ref("");
const paymentSessionId = ref("");
const paymentMessage = ref("");
const paymentConfig = ref<PaymentConfig>({
  paymentRequired: false,
  developmentFree: true,
  stripeConfigured: false,
  amountLabel: "Development mode",
});

const showIndeterminate = ref(false);
const pdfDownloading = ref(false);
const reportHtml = ref("");
const reportOpened = ref(false);
const showResultScreen = ref(false);
const loadingStepIndex = ref(0);
const loadingStepTimer = ref<number | null>(null);

const hasBusinessContext = computed(() => {
  return Boolean(
    form.businessType.trim() ||
    form.offer.trim() ||
    form.audience.trim() ||
    form.problem.trim() ||
    form.goal.trim(),
  );
});

const hasPaidAccess = computed(() => !paymentConfig.value.paymentRequired || Boolean(paymentSessionId.value));
const paywallBlocked = computed(() => paymentConfig.value.paymentRequired && !paymentConfig.value.stripeConfigured);
const canGenerate = computed(() => hasBusinessContext.value && status.value !== "loading" && !paywallBlocked.value);

const actionLabel = computed(() => {
  if (status.value === "loading") {
    return "Generating";
  }

  if (paymentConfig.value.paymentRequired && !paymentSessionId.value) {
    return "Unlock with Stripe";
  }

  return "Generate growth kit";
});

const statusLabel = computed(() => {
  if (status.value === "loading") {
    return "Building your kit";
  }

  if (status.value === "success") {
    return reportOpened.value ? "Report opened" : "Report ready";
  }

  if (status.value === "error") {
    return "Generation failed";
  }

  if (paymentConfig.value.paymentRequired && !paymentSessionId.value) {
    return "Payment required";
  }

  return "Ready to generate";
});

const selectedLanguageLabel = computed(() => {
  return languageOptions.find((language) => language.value === form.language)?.label ?? "English";
});

const currentLoadingStep = computed(() => {
  return generationSteps[Math.min(loadingStepIndex.value, generationSteps.length - 1)];
});

const loadingProgress = computed(() => {
  return Math.round(((loadingStepIndex.value + 1) / generationSteps.length) * 100);
});

async function generateBusinessKit() {
  if (!canGenerate.value) {
    return;
  }

  if (paymentConfig.value.paymentRequired && !paymentSessionId.value) {
    await startCheckout();
    return;
  }

  window.scrollTo({top: 0, left: 0, behavior: "auto"});
  status.value = "loading";
  errorMessage.value = "";
  reportOpened.value = false;
  showResultScreen.value = false;
  showIndeterminate.value = true;
  startLoadingSequence();
  revokeReportUrl();
  saveDraft();

  try {
    const response = await fetch("/api/createBusinessKit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        paymentSessionId: paymentSessionId.value || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(await readError(response));
    }

    const htmlText = await response.text();
    const nextFileName = fileNameFromResponse(response) ?? "business-growth-kit.html";
    const nextReportUrl = setReportHtml(htmlText);

    fileName.value = nextFileName;
    lastGeneratedAt.value = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    status.value = "success";
    reportOpened.value = openReportUrl(nextReportUrl);
    loadingStepIndex.value = generationSteps.length - 1;
    showResultScreen.value = true;
  } catch (error) {
    status.value = "error";
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    stopLoadingSequence();
    showIndeterminate.value = false;
  }
}

function startLoadingSequence() {
  stopLoadingSequence();
  loadingStepIndex.value = 0;

  loadingStepTimer.value = window.setInterval(() => {
    if (loadingStepIndex.value < generationSteps.length - 1) {
      loadingStepIndex.value += 1;
    }
  }, 2800);
}

function stopLoadingSequence() {
  if (loadingStepTimer.value !== null) {
    window.clearInterval(loadingStepTimer.value);
    loadingStepTimer.value = null;
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
    errorMessage.value = "Could not open the report in a new tab. Your browser may be blocking popups.";
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

async function downloadPdf() {
  if (!reportHtml.value && !reportUrl.value) {
    return;
  }

  pdfDownloading.value = true;
  errorMessage.value = "";
  let iframe: HTMLIFrameElement | null = null;

  try {
    let htmlText = reportHtml.value;

    if (!htmlText && reportUrl.value) {
      const response = await fetch(reportUrl.value);

      if (!response.ok) {
        throw new Error("Could not fetch the generated report for PDF conversion.");
      }

      htmlText = await response.text();
    }

    iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "0";
    iframe.style.top = "0";
    iframe.style.width = "1120px";
    iframe.style.height = "1400px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.zIndex = "-1";
    document.body.appendChild(iframe);
    iframe.srcdoc = prepareReportHtmlForPdf(htmlText ?? "");

    await new Promise((resolve, reject) => {
      iframe!.onload = () => resolve(null);
      iframe!.onerror = () => reject(new Error("Could not load report HTML into iframe."));
    });

    try {
      await iframe.contentDocument?.fonts?.ready;
    } catch { }

    const documentForExport = iframe.contentDocument;
    const element = documentForExport?.querySelector<HTMLElement>(".page") ?? documentForExport?.body;

    if (!element) {
      throw new Error("Report content is not available for PDF export.");
    }

    const pdfOptions = {
      margin: [0.25, 0.25, 0.25, 0.25],
      filename: (fileName.value || "business-growth-kit.html").replace(/\.html$/i, ".pdf"),
      image: {type: "jpeg", quality: 0.98},
      html2canvas: {
        scale: Math.min(2, window.devicePixelRatio || 2),
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 1120,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {unit: "in", format: "a4", orientation: "portrait"},
      pagebreak: {
        mode: ["css", "legacy"],
        avoid: [".cover", ".workspace", ".panel", ".score-card", ".action-card", "tr"],
      },
    } as Record<string, unknown>;

    await html2pdf()
      .set(pdfOptions)
      .from(element)
      .save();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    if (iframe?.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }

    pdfDownloading.value = false;
  }
}

function prepareReportHtmlForPdf(html: string): string {
  const parser = new DOMParser();
  const documentForExport = parser.parseFromString(injectBase(html), "text/html");

  documentForExport.querySelector(".report-toolbar")?.remove();
  documentForExport.querySelectorAll("script").forEach((script) => script.remove());

  const exportStyle = documentForExport.createElement("style");
  exportStyle.textContent = `
    html,
    body {
      width: 1120px;
      min-width: 1120px;
      margin: 0;
      background: #ffffff !important;
    }

    * {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .report-toolbar {
      display: none !important;
    }

    .page {
      width: 1080px !important;
      max-width: none !important;
      margin: 0 auto !important;
      border: 1px solid var(--line) !important;
      box-shadow: none !important;
      overflow: visible !important;
    }

    .cover {
      background: linear-gradient(135deg, #12343b, #0f766e 58%, #b7791f) !important;
    }

    section,
    .panel,
    .score-card,
    .workspace,
    .action-card,
    tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    section.action-workspace {
      break-inside: auto;
      page-break-inside: auto;
    }

    table {
      break-inside: auto;
      page-break-inside: auto;
    }

    thead {
      display: table-header-group;
    }

    tr {
      break-after: auto;
      page-break-after: auto;
    }
  `;
  documentForExport.head.appendChild(exportStyle);

  return `<!doctype html>\n${documentForExport.documentElement.outerHTML}`;
}

async function startCheckout() {
  status.value = "loading";
  errorMessage.value = "";
  showResultScreen.value = false;
  startLoadingSequence();
  saveDraft();

  try {
    const response = await fetch("/api/createCheckoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({product: "business_growth_kit"}),
    });

    if (!response.ok) {
      throw new Error(await readError(response));
    }

    const body = await response.json() as { paymentRequired?: boolean; url?: string };

    if (!body.paymentRequired) {
      paymentConfig.value.paymentRequired = false;
      status.value = "idle";
      await generateBusinessKit();
      return;
    }

    if (!body.url) {
      throw new Error("Stripe checkout did not return a redirect URL.");
    }

    window.location.href = body.url;
  } catch (error) {
    status.value = "error";
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    stopLoadingSequence();
    showIndeterminate.value = false;
  }
}

async function loadPaymentConfig() {
  try {
    const response = await fetch("/api/paymentConfig");

    if (!response.ok) {
      return;
    }

    paymentConfig.value = await response.json() as PaymentConfig;
  } catch {
    paymentConfig.value = {
      paymentRequired: false,
      developmentFree: true,
      stripeConfigured: false,
      amountLabel: "Development mode",
    };
  }
}

function useTone(tone: string) {
  form.tone = tone;
}

async function readError(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await response.json();
    return body.details ?? body.error ?? "Could not create the business kit.";
  }

  return await response.text();
}

function fileNameFromResponse(response: Response): string | null {
  const disposition = response.headers.get("content-disposition") ?? "";
  const match = disposition.match(/filename="([^"]+)"/i);
  return match?.[1] ?? null;
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

function restorePaymentSession() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id") ?? localStorage.getItem(paymentStorageKey) ?? "";
  const paymentStatus = params.get("payment");

  if (sessionId) {
    paymentSessionId.value = sessionId;
    localStorage.setItem(paymentStorageKey, sessionId);
  }

  if (paymentStatus === "success") {
    paymentMessage.value = "Payment received. You can generate the full report now.";
    window.history.replaceState({}, "", window.location.pathname);
  }

  if (paymentStatus === "cancelled") {
    paymentMessage.value = "Payment was cancelled. Your draft is still here.";
    window.history.replaceState({}, "", window.location.pathname);
  }
}

function normalizeLanguage(value: unknown): ReportLanguage {
  if (value === "nl" || value === "fr" || value === "de") {
    return value;
  }

  return "en";
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
  restorePaymentSession();
  void loadPaymentConfig();
});

onBeforeUnmount(() => {
  revokeReportUrl();
  stopLoadingSequence();
  showIndeterminate.value = false;
});
</script>

<template>
  <main class="product-shell">
    <div v-if="status === 'loading'" class="loading-overlay" role="status" aria-live="polite">
      <div class="generation-screen">
        <div class="generation-status">
          <div class="generation-mark" aria-hidden="true">
            <Loader2 class="spin" :size="36" />
          </div>
          <p class="eyebrow">Generating {{ selectedLanguageLabel }} report</p>
          <h3>{{ currentLoadingStep.title }}</h3>
          <p>{{ currentLoadingStep.detail }}</p>

          <div class="progress-wrap" aria-hidden="true">
            <div
              class="progress-bar"
              :class="{indeterminate: showIndeterminate}"
              :style="{width: `${loadingProgress}%`}"
            ></div>
          </div>

          <div class="loading-meta">
            <span>{{ loadingProgress }}%</span>
            <span>{{ form.businessName || "Growth Kit" }}</span>
          </div>
        </div>

        <ol class="generation-steps" aria-label="Generation progress">
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
      </div>
    </div>

    <section v-if="showResultScreen && status === 'success'" class="result-screen" aria-labelledby="result-title">
      <div class="result-hero">
        <div class="result-copy">
          <p class="eyebrow">Report complete</p>
          <h2 id="result-title">Your Growth Kit is ready.</h2>
          <p>
            The report has been generated, localised for {{ selectedLanguageLabel }}, and prepared as a styled HTML
            report with PDF export.
          </p>

          <div class="result-actions">
            <button class="result-primary" type="button" @click="openReportUser" :disabled="!reportHtml">
              <ExternalLink :size="19" />
              Open report
            </button>
            <button class="result-secondary" type="button" @click="downloadPdf" :disabled="!reportHtml || pdfDownloading">
              <FileText :size="19" />
              <span v-if="pdfDownloading">Preparing PDF...</span>
              <span v-else>Download PDF</span>
            </button>
            <button class="result-secondary" type="button" @click="showResultScreen = false">
              Back to brief
            </button>
          </div>
        </div>

        <div class="result-card" aria-label="Generated report details">
          <div class="result-card-top">
            <span class="success-badge">
              <CheckCircle2 :size="17" />
              Ready
            </span>
            <span>{{ lastGeneratedAt }}</span>
          </div>
          <h3>{{ fileName }}</h3>
          <div class="result-list">
            <div>
              <span>Language</span>
              <strong>{{ selectedLanguageLabel }}</strong>
            </div>
            <div>
              <span>Output</span>
              <strong>HTML + PDF</strong>
            </div>
            <div>
              <span>Includes</span>
              <strong>Scorecard, templates, action plan</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <header class="site-nav">
      <a class="brand-lockup" href="#" aria-label="GrowthKit AI home">
        <span class="brand-mark" aria-hidden="true">
          <BriefcaseBusiness :size="24" />
        </span>
        <span>
          <strong>GrowthKit AI</strong>
          <small>Entrepreneur report builder</small>
        </span>
      </a>

      <nav class="nav-links" aria-label="Product sections">
        <a href="#output">Output</a>
        <a href="#brief">Brief</a>
      </nav>
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
            <strong>Growth score</strong>
          </div>
        </div>

        <div class="insight-board">
          <div class="insight-label">30-day plan</div>
          <div class="insight-bars">
            <span style="--value: 74%"></span>
            <span style="--value: 58%"></span>
            <span style="--value: 86%"></span>
          </div>
          <div class="insight-chip">Offer rewrite ready</div>
        </div>
      </div>

      <div class="hero-content">
        <p class="eyebrow">AI strategy report builder</p>
        <h1 id="page-title">AI Entrepreneur Growth Kit</h1>
        <p class="hero-copy">
          Turn a rough business brief into a polished consultant-style growth report with positioning, offers,
          scorecards, outreach templates, and a practical action plan.
        </p>

        <div class="hero-actions">
          <a class="primary-link" href="#brief">
            <Sparkles :size="19" />
            Generate your report
            <ArrowRight :size="18" />
          </a>
          <a class="secondary-link" href="#output">
            <FileText :size="18" />
            View output
          </a>
        </div>

        <dl class="hero-stats" aria-label="Product highlights">
          <div>
            <dt>4</dt>
            <dd>Languages</dd>
          </div>
          <div>
            <dt>30</dt>
            <dd>Day plan</dd>
          </div>
          <div>
            <dt>PDF</dt>
            <dd>Ready export</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="output" class="proof-section" aria-label="Report output">
      <article class="proof-card">
        <TrendingUp :size="24" />
        <h2>Positioning audit</h2>
        <p>Sharper market diagnosis, customer profile, offer rewrite, and growth risks.</p>
      </article>
      <article class="proof-card">
        <MessageSquareText :size="24" />
        <h2>Ready-to-send copy</h2>
        <p>Email, sales, and content prompts shaped around the business context.</p>
      </article>
      <article class="proof-card">
        <ShieldCheck :size="24" />
        <h2>Paid report flow</h2>
        <p>Stripe-gated generation with browser-ready HTML and one-click PDF export.</p>
      </article>
    </section>

    <section id="brief" class="brief-section" aria-labelledby="brief-title">
      <div class="section-heading">
        <p class="eyebrow">Strategy brief</p>
        <h2 id="brief-title">Give the AI the business context that matters.</h2>
        <p>
          The report is generated from the brief below, then opened in a new tab only after the result is ready.
        </p>
      </div>

      <div class="builder-grid">
        <form class="brief-form" @submit.prevent="generateBusinessKit">
          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <BriefcaseBusiness :size="18" />
                Business name
              </span>
              <input v-model="form.businessName" type="text" placeholder="Northstar Studio" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <Target :size="18" />
                Market
              </span>
              <input v-model="form.region" type="text" placeholder="Belgium, EU, online, local..." />
            </label>
          </div>

          <div class="field-grid compact">
            <label class="field-block">
              <span class="field-label">
                <Languages :size="18" />
                Report language
              </span>
              <select v-model="form.language">
                <option v-for="language in languageOptions" :key="language.value" :value="language.value">
                  {{ language.label }}
                </option>
              </select>
            </label>

            <label class="field-block">
              <span class="field-label">
                <Sparkles :size="18" />
                Report tone
              </span>
              <input v-model="form.tone" type="text" placeholder="Premium, practical, bold, calm..." />
            </label>
          </div>

          <div class="preset-row" aria-label="Tone presets">
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
              Business type
            </span>
            <textarea
              v-model="form.businessType"
              rows="3"
              placeholder="Example: B2B service agency for local businesses"
            />
          </label>

          <label class="field-block">
            <span class="field-label">
              <FileText :size="18" />
              Current offer
            </span>
            <textarea v-model="form.offer" rows="3" placeholder="What do you sell right now?" />
          </label>

          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <Target :size="18" />
                Target customer
              </span>
              <textarea v-model="form.audience" rows="4" placeholder="Who should buy this?" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <AlertCircle :size="18" />
                Main problem
              </span>
              <textarea v-model="form.problem" rows="4" placeholder="What is blocking growth?" />
            </label>
          </div>

          <div class="field-grid">
            <label class="field-block">
              <span class="field-label">
                <BarChart3 :size="18" />
                Goal
              </span>
              <textarea v-model="form.goal" rows="4" placeholder="What should improve in 30 days?" />
            </label>

            <label class="field-block">
              <span class="field-label">
                <Sparkles :size="18" />
                Channels
              </span>
              <textarea v-model="form.channels" rows="4" placeholder="LinkedIn, email, referrals, ads, website..." />
            </label>
          </div>

          <label class="field-block">
            <span class="field-label">
              <BarChart3 :size="18" />
              Price point
            </span>
            <input v-model="form.pricePoint" type="text" placeholder="Current and target pricing" />
          </label>

          <button class="generate-button" type="submit" :disabled="!canGenerate">
            <Loader2 v-if="status === 'loading'" class="spin" :size="20" />
            <CreditCard v-else-if="paymentConfig.paymentRequired && !paymentSessionId" :size="20" />
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
              <LockKeyhole v-else-if="paymentConfig.paymentRequired && !paymentSessionId" :size="26" />
              <FileText v-else :size="26" />
            </div>
            <div>
              <p class="eyebrow">Report status</p>
              <h2>{{ statusLabel }}</h2>
            </div>
          </div>

          <div class="report-content">
            <div class="paywall-box" :data-paid="hasPaidAccess">
              <strong>{{ paymentConfig.paymentRequired ? "Full report paywall" : "Free access" }}</strong>
              <p v-if="paymentConfig.developmentFree">Free in development. Stripe is skipped locally.</p>
              <p v-else-if="paymentConfig.paymentRequired && paymentSessionId">Payment confirmed for this browser.</p>
              <p v-else-if="paymentConfig.paymentRequired">Stripe Checkout is required before the report is generated.</p>
              <p v-else>The report generator is currently free to use.</p>
            </div>

            <p v-if="paymentMessage" class="success-text">{{ paymentMessage }}</p>

            <p v-if="paywallBlocked" class="error-text">
              Stripe paywall is active, but the backend is missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID.
            </p>

            <div v-if="status === 'idle'" class="output-stack">
              <div class="mini-metric">
                <span>01</span>
                <strong>Business diagnosis</strong>
              </div>
              <div class="mini-metric">
                <span>02</span>
                <strong>Offer and positioning</strong>
              </div>
              <div class="mini-metric">
                <span>03</span>
                <strong>Sales templates</strong>
              </div>
              <div class="mini-metric">
                <span>04</span>
                <strong>Printable PDF report</strong>
              </div>
            </div>

            <p v-if="status === 'loading'" class="muted-line">
              Generation is running. The report tab opens after the API returns the finished HTML.
            </p>

            <div v-if="status === 'success'" class="download-block">
              <span class="file-chip">
                <FileText :size="18" />
                {{ fileName }}
              </span>
              <p class="muted-line">
                Ready at {{ lastGeneratedAt }}. If the tab did not appear, open the report again here.
              </p>

              <div class="action-row">
                <button class="secondary-action" type="button" @click="openReportUser" :disabled="!reportHtml">
                  <ExternalLink :size="18" />
                  Open report
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  @click="downloadPdf"
                  :disabled="!reportHtml || pdfDownloading"
                >
                  <FileText :size="18" />
                  <span v-if="pdfDownloading">Downloading PDF...</span>
                  <span v-else>Download PDF</span>
                </button>
              </div>
            </div>

            <p v-if="status === 'error'" class="error-text">{{ errorMessage }}</p>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>
