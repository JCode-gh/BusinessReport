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
import {buildBusinessKitHtml, businessKitFileName, createBusinessKit, type RetryInfo} from "./businessKit";

type GenerateStatus = "idle" | "loading" | "success" | "error";
type ReportLanguage = "en" | "nl" | "fr" | "de";
type GenerationStep = {
  title: string;
  detail: string;
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
const showIndeterminate = ref(false);
const pdfDownloading = ref(false);
const reportHtml = ref("");
const reportOpened = ref(false);
const showResultScreen = ref(false);
const loadingStepIndex = ref(0);
const loadingStepTimer = ref<number | null>(null);

const waitingRoom = reactive({
  active: false,
  secondsLeft: 0,
  totalSeconds: 0,
  attempt: 0,
  totalAttempts: 5,
});
let waitingRoomTimer: number | null = null;

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
    return "Generating";
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

const waitingCountdownPercent = computed(() => {
  if (waitingRoom.totalSeconds === 0) return 0;
  return Math.round(((waitingRoom.totalSeconds - waitingRoom.secondsLeft) / waitingRoom.totalSeconds) * 100);
});

async function generateBusinessKit() {
  if (!canGenerate.value) {
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
    await wait(650);
    const kit = await createBusinessKit({...form}, startWaitingRoom);
    const htmlText = buildBusinessKitHtml(kit);
    const nextFileName = businessKitFileName(kit);
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
    stopWaitingRoom();
    showIndeterminate.value = false;
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

  stopLoadingSequence(); // freeze the fake progress bar while waiting

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
  if (status.value === 'loading') startLoadingSequence(); // resume from where it stopped
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
      errorMessage.value = "Could not open the print dialog. Allow popups for this site and try again.";
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
});

onBeforeUnmount(() => {
  revokeReportUrl();
  stopLoadingSequence();
  stopWaitingRoom();
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

        <div class="generation-steps-col">
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

          <div v-if="waitingRoom.active" class="waiting-room" role="status" aria-live="polite">
            <div class="waiting-room-header">
              <Clock :size="15" aria-hidden="true" />
              <span>Rate limit — retrying automatically</span>
              <span class="waiting-room-attempt">{{ waitingRoom.attempt }}/{{ waitingRoom.totalAttempts }}</span>
            </div>
            <div class="waiting-room-countdown">
              <span class="countdown-number">{{ waitingRoom.secondsLeft }}</span>
              <span class="countdown-unit">sec</span>
            </div>
            <div class="waiting-room-track" aria-hidden="true">
              <div class="waiting-room-fill" :style="{width: waitingCountdownPercent + '%'}"></div>
            </div>
            <p class="waiting-room-note">
              The free API tier is temporarily busy. No action needed — the report will continue as soon as a model slot opens.
            </p>
          </div>
        </div>
      </div>
    </div>

    <section v-if="showResultScreen && status === 'success'" class="result-screen" aria-labelledby="result-title">
      <div class="result-hero">
        <div class="result-copy">
          <p class="eyebrow">Report complete</p>
          <h2 id="result-title">Your Growth Kit is ready.</h2>
          <p>
            The report has been generated in your browser, localised for {{ selectedLanguageLabel }}, and prepared as a
            styled HTML report with PDF export.
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
      <a class="brand-lockup" href="#" aria-label="GrowthKit Studio home">
        <span class="brand-mark" aria-hidden="true">
          <BriefcaseBusiness :size="24" />
        </span>
        <span>
          <strong>GrowthKit Studio</strong>
          <small>Frontend report builder</small>
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
        <p class="eyebrow">Browser strategy report builder</p>
        <h1 id="page-title">Entrepreneur Growth Kit</h1>
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
        <h2>Static Netlify flow</h2>
        <p>Browser-only generation with styled HTML output and one-click PDF export.</p>
      </article>
    </section>

    <section id="brief" class="brief-section" aria-labelledby="brief-title">
      <div class="section-heading">
        <p class="eyebrow">Strategy brief</p>
        <h2 id="brief-title">Give the strategy engine the business context that matters.</h2>
        <p>
          The report is generated locally from the brief below, then opened in a new tab only after the result is ready.
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
              <p class="eyebrow">Report status</p>
              <h2>{{ statusLabel }}</h2>
            </div>
          </div>

          <div class="report-content">
            <div class="runtime-box">
              <strong>Static frontend mode</strong>
              <p>No backend, payment gateway, or API key is required. The report is generated in this browser.</p>
            </div>

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
              Generation is running locally. The report tab opens after the browser finishes the HTML.
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
