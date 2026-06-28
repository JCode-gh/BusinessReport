<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import SiteHeader from '../components/SiteHeader.vue';
import AuthModal from '../AuthModal.vue';
import PaywallModal from '../components/PaywallModal.vue';
import NotificationToast from '../components/NotificationToast.vue';
import ExampleReportShowcase from '../components/ExampleReportShowcase.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { useLanguage } from '../composables/useLanguage';
import type { ReportLanguage } from '../composables/useLanguage';
import { navigateToGenerate } from '../composables/useGenerateNavigation';
import { track } from '../analytics';

const props = defineProps<{
  lang?: ReportLanguage;
}>();

const router = useRouter();
const route = useRoute();
const { ui, siteLanguage, setSiteLanguage } = useLanguage();
const showAuthModal = ref(false);
const showPaywallModal = ref(false);

const exampleLanguage = computed<ReportLanguage>(() => {
  if (props.lang) return props.lang;
  if (route.name === 'example-lang' && typeof route.params.lang === 'string') {
    return route.params.lang as ReportLanguage;
  }
  return siteLanguage.value;
});

function goGenerate() {
  navigateToGenerate(router);
}

onMounted(() => {
  if (props.lang && props.lang !== siteLanguage.value) {
    setSiteLanguage(props.lang, true);
  }
  track('example_viewed');
});
</script>

<template>
  <div class="product-shell">
    <SiteHeader
      :show-auth-modal="() => (showAuthModal = true)"
      :show-paywall="() => (showPaywallModal = true)"
    />

    <main class="example-page">
      <div class="example-page-inner">
        <router-link to="/" class="example-back">
          <ArrowLeft :size="16" />
          {{ ui.reportsBackHome }}
        </router-link>
      </div>

      <ExampleReportShowcase variant="page" :language="exampleLanguage" @generate="goGenerate" />
    </main>

    <SiteFooter />

    <AuthModal v-model="showAuthModal" :language="siteLanguage" />
    <PaywallModal v-model="showPaywallModal" :language="siteLanguage" />
    <NotificationToast />
  </div>
</template>

<style scoped>
.example-page {
  padding: 28px 0 48px;
}

.example-page-inner {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto 20px;
}

.example-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
}

.example-back:hover {
  color: var(--ink);
}
</style>
