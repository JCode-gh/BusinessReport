<script setup lang="ts">
import { ref, computed } from 'vue';
import { X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { useAuth } from '../useAuth';
import {
  CREDIT_PLANS,
  DEFAULT_CREDIT_PLAN_ID,
  formatEur,
  perReportCents,
  type CreditPlanId,
} from '../creditPlans';

type Language = 'nl' | 'en' | 'fr' | 'de';

const props = defineProps<{
  modelValue: boolean;
  language?: Language;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();

const { user } = useAuth();

const loading = ref(false);
const errorMsg = ref('');
const selectedPlanId = ref<CreditPlanId>(DEFAULT_CREDIT_PLAN_ID);

const copy: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: string[];
    cta: string;
    ctaLoading: string;
    errorFallback: string;
    close: string;
    popular: string;
    perReport: string;
    reports: (n: number) => string;
    save: (amount: string) => string;
    stripeNote: string;
  }
> = {
  nl: {
    eyebrow: 'Eenmalige betaling',
    title: 'Groeikit ontgrendelen',
    subtitle: 'Kies een pakket en genereer volledige groeirapporten voor jouw bedrijf.',
    features: [
      'Positionering, aanbod & ICP',
      '30-daags actieplan met checkboxes',
      'Kant-en-klare sales-templates',
      'Concurrentieanalyse',
      'PDF-export',
      'NL · EN · FR · DE',
    ],
    cta: 'Betalen met kaart →',
    ctaLoading: 'Doorsturen naar Stripe…',
    errorFallback: 'Kon de betaalpagina niet openen. Probeer opnieuw.',
    close: 'Sluiten',
    popular: 'Populair',
    perReport: 'per rapport',
    reports: (n) => (n === 1 ? '1 rapport' : `${n} rapporten`),
    save: (amount) => `Bespaar ${amount}`,
    stripeNote: 'Veilig betalen via Stripe · Visa, Mastercard, iDEAL, Bancontact',
  },
  en: {
    eyebrow: 'One-time payment',
    title: 'Unlock Growth Kit',
    subtitle: 'Pick a bundle and generate complete growth reports for your business.',
    features: [
      'Positioning, offer & ICP',
      '30-day action plan with checkboxes',
      'Ready-to-send sales templates',
      'Competitor analysis',
      'PDF export',
      'NL · EN · FR · DE',
    ],
    cta: 'Pay by card →',
    ctaLoading: 'Redirecting to Stripe…',
    errorFallback: 'Could not open payment page. Please try again.',
    close: 'Close',
    popular: 'Popular',
    perReport: 'per report',
    reports: (n) => (n === 1 ? '1 report' : `${n} reports`),
    save: (amount) => `Save ${amount}`,
    stripeNote: 'Secure payment via Stripe · Visa, Mastercard, iDEAL, Bancontact',
  },
  fr: {
    eyebrow: 'Paiement unique',
    title: 'Déverrouiller le Growth Kit',
    subtitle: 'Choisissez un pack et générez des rapports de croissance complets.',
    features: [
      'Positionnement, offre & ICP',
      "Plan d'action 30 jours avec cases à cocher",
      'Templates de vente prêts à envoyer',
      'Analyse concurrentielle',
      'Export PDF',
      'NL · EN · FR · DE',
    ],
    cta: 'Payer par carte →',
    ctaLoading: 'Redirection vers Stripe…',
    errorFallback: "Impossible d'ouvrir la page de paiement. Réessayez.",
    close: 'Fermer',
    popular: 'Populaire',
    perReport: 'par rapport',
    reports: (n) => (n === 1 ? '1 rapport' : `${n} rapports`),
    save: (amount) => `Économisez ${amount}`,
    stripeNote: 'Paiement sécurisé via Stripe · Visa, Mastercard, iDEAL, Bancontact',
  },
  de: {
    eyebrow: 'Einmalige Zahlung',
    title: 'Growth Kit freischalten',
    subtitle: 'Wählen Sie ein Paket und generieren Sie vollständige Wachstumsberichte.',
    features: [
      'Positionierung, Angebot & ICP',
      '30-Tage-Aktionsplan mit Checkboxen',
      'Versandfertige Verkaufs-Templates',
      'Wettbewerbsanalyse',
      'PDF-Export',
      'NL · EN · FR · DE',
    ],
    cta: 'Mit Karte bezahlen →',
    ctaLoading: 'Weiterleitung zu Stripe…',
    errorFallback: 'Zahlungsseite konnte nicht geöffnet werden. Bitte erneut versuchen.',
    close: 'Schließen',
    popular: 'Beliebt',
    perReport: 'pro Bericht',
    reports: (n) => (n === 1 ? '1 Bericht' : `${n} Berichte`),
    save: (amount) => `${amount} sparen`,
    stripeNote: 'Sichere Zahlung via Stripe · Visa, Mastercard, iDEAL, Bancontact',
  },
};

const lang = computed<Language>(() => props.language ?? 'nl');
const c = computed(() => copy[lang.value]);

const singlePlan = CREDIT_PLANS[0];

const plans = computed(() =>
  CREDIT_PLANS.map((plan) => {
    const fullPrice = plan.credits * singlePlan.priceCents;
    const savingsCents = fullPrice - plan.priceCents;
    return {
      ...plan,
      priceLabel: formatEur(plan.priceCents),
      perReportLabel: formatEur(perReportCents(plan)),
      savingsLabel: savingsCents > 0 ? formatEur(savingsCents) : null,
    };
  }),
);

const selectedPlan = computed(() => plans.value.find((p) => p.id === selectedPlanId.value) ?? plans.value[0]);

function close() {
  emit('update:modelValue', false);
}

function selectPlan(planId: CreditPlanId) {
  if (!loading.value) selectedPlanId.value = planId;
}

async function startCheckout() {
  if (!user.value || loading.value) return;
  loading.value = true;
  errorMsg.value = '';

  try {
    const res = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.value.uid,
        email: user.value.email ?? undefined,
        planId: selectedPlanId.value,
      }),
    });

    const data = (await res.json()) as { url?: string; error?: string };

    if (!res.ok || !data.url) {
      throw new Error(data.error ?? 'No checkout URL returned');
    }

    window.location.href = data.url;
  } catch (err) {
    console.error('[PaywallModal]', err);
    errorMsg.value = c.value.errorFallback;
    loading.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="paywall-overlay" @click.self="close">
      <div class="paywall-panel" role="dialog" aria-modal="true" :aria-label="c.title">
        <button class="paywall-close" type="button" :aria-label="c.close" @click="close">
          <X :size="18" />
        </button>

        <p class="paywall-eyebrow">
          <Sparkles :size="14" />
          {{ c.eyebrow }}
        </p>

        <h2 class="paywall-title">{{ c.title }}</h2>
        <p class="paywall-subtitle">{{ c.subtitle }}</p>

        <div class="paywall-plans" role="radiogroup" :aria-label="c.title">
          <button
            v-for="plan in plans"
            :key="plan.id"
            type="button"
            class="paywall-plan"
            :class="{ selected: selectedPlanId === plan.id, popular: plan.popular }"
            :aria-pressed="selectedPlanId === plan.id"
            :disabled="loading"
            @click="selectPlan(plan.id)"
          >
            <span v-if="plan.popular" class="paywall-plan-badge">{{ c.popular }}</span>
            <span class="paywall-plan-credits">{{ c.reports(plan.credits) }}</span>
            <span class="paywall-plan-price">{{ plan.priceLabel }}</span>
            <span class="paywall-plan-per">{{ plan.perReportLabel }} {{ c.perReport }}</span>
            <span v-if="plan.savingsLabel" class="paywall-plan-save">{{ c.save(plan.savingsLabel) }}</span>
          </button>
        </div>

        <ul class="paywall-features">
          <li v-for="f in c.features" :key="f">
            <CheckCircle2 :size="15" />
            {{ f }}
          </li>
        </ul>

        <div v-if="errorMsg" class="paywall-error">
          <AlertCircle :size="15" />
          {{ errorMsg }}
        </div>

        <button class="paywall-cta" type="button" :disabled="loading" @click="startCheckout">
          <span v-if="loading">{{ c.ctaLoading }}</span>
          <span v-else>{{ c.cta }} ({{ selectedPlan.priceLabel }})</span>
        </button>

        <p class="paywall-stripe-note">{{ c.stripeNote }}</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.paywall-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.paywall-panel {
  position: relative;
  width: 100%;
  max-width: 560px;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  padding: 36px 32px 28px;
  box-shadow: var(--shadow);
}

.paywall-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.paywall-close:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.paywall-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.paywall-title {
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 8px;
  color: var(--ink);
}

.paywall-subtitle {
  font-size: 0.92rem;
  color: var(--muted);
  margin: 0 0 20px;
  line-height: 1.55;
}

.paywall-plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.paywall-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 10px 14px;
  border: 2px solid var(--line-strong);
  border-radius: 12px;
  background: var(--surface-2);
  cursor: pointer;
  text-align: center;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.paywall-plan:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 50%, var(--line-strong));
}

.paywall-plan.selected {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--surface-2));
  box-shadow: 0 0 0 1px var(--accent);
}

.paywall-plan:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.paywall-plan-badge {
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--gradient);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.paywall-plan-credits {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--ink);
  margin-top: 4px;
}

.paywall-plan-price {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--ink);
  line-height: 1.1;
}

.paywall-plan-per {
  font-size: 0.72rem;
  color: var(--muted);
}

.paywall-plan-save {
  margin-top: 2px;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--success);
}

.paywall-features {
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: grid;
  gap: 8px;
}

.paywall-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.paywall-features li svg {
  color: var(--success);
  flex-shrink: 0;
}

.paywall-error {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  margin-bottom: 14px;
  border-radius: 8px;
  background: rgba(255, 138, 138, 0.12);
  border: 1px solid rgba(255, 138, 138, 0.25);
  color: var(--danger);
  font-size: 0.87rem;
}

.paywall-cta {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: var(--gradient);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s;
}

.paywall-cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.paywall-cta:not(:disabled):hover {
  opacity: 0.9;
}

.paywall-stripe-note {
  margin: 10px 0 0;
  text-align: center;
  font-size: 0.75rem;
  color: var(--muted-dim);
}

@media (max-width: 520px) {
  .paywall-plans {
    grid-template-columns: 1fr;
  }

  .paywall-plan {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 14px 16px;
  }

  .paywall-plan-badge {
    position: static;
    transform: none;
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: 4px;
  }

  .paywall-plan-credits {
    margin-top: 0;
    flex: 1 1 100%;
  }

  .paywall-plan-per,
  .paywall-plan-save {
    margin-left: auto;
  }
}
</style>
