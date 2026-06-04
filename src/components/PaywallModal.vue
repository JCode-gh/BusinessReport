<script setup lang="ts">
import { ref } from 'vue';
import { X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { useAuth } from '../useAuth';

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

const copy: Record<Language, {
  eyebrow: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  ctaLoading: string;
  errorFallback: string;
  close: string;
}> = {
  nl: {
    eyebrow: 'Eenmalige betaling',
    title: 'Groeikit ontgrendelen',
    subtitle: 'Betaal €5 en genereer één volledig rapport voor jouw bedrijf.',
    price: '€5',
    priceNote: 'per rapport',
    features: [
      '1 volledig rapport',
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
  },
  en: {
    eyebrow: 'One-time payment',
    title: 'Unlock Growth Kit',
    subtitle: 'Pay €5 and generate one complete report for your business.',
    price: '€5',
    priceNote: 'per report',
    features: [
      '1 full report',
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
  },
  fr: {
    eyebrow: 'Paiement unique',
    title: 'Déverrouiller le Growth Kit',
    subtitle: 'Payez €5 et générez un rapport complet pour votre entreprise.',
    price: '€5',
    priceNote: 'par rapport',
    features: [
      '1 rapport complet',
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
  },
  de: {
    eyebrow: 'Einmalige Zahlung',
    title: 'Growth Kit freischalten',
    subtitle: 'Zahlen Sie €5 und generieren Sie einen vollständigen Bericht für Ihr Unternehmen.',
    price: '€5',
    priceNote: 'pro Bericht',
    features: [
      '1 vollständiger Bericht',
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
  },
};

function close() {
  emit('update:modelValue', false);
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
      }),
    });

    const data = await res.json() as { url?: string; error?: string };

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

import { computed } from 'vue';
const lang = computed<Language>(() => props.language ?? 'nl');
const c = computed(() => copy[lang.value]);
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

        <div class="paywall-price-row">
          <span class="paywall-price">{{ c.price }}</span>
          <span class="paywall-price-note">{{ c.priceNote }}</span>
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
          <span v-else>{{ c.cta }}</span>
        </button>

        <p class="paywall-stripe-note">Veilig betalen via Stripe · Visa, Mastercard, iDEAL, Bancontact</p>
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
  max-width: 420px;
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

.paywall-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 18px;
}

.paywall-price {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--ink);
  line-height: 1;
}

.paywall-price-note {
  font-size: 0.82rem;
  color: var(--muted);
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
</style>
