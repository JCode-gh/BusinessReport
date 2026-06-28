<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import SiteHeader from '../components/SiteHeader.vue';
import AuthModal from '../AuthModal.vue';
import PaywallModal from '../components/PaywallModal.vue';
import NotificationToast from '../components/NotificationToast.vue';
import ExampleReportShowcase from '../components/ExampleReportShowcase.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { useLanguage } from '../composables/useLanguage';
import { getExampleReportSeo } from '../exampleReports';
import { navigateToGenerate } from '../composables/useGenerateNavigation';
import { track } from '../analytics';

const router = useRouter();
const { ui, siteLanguage } = useLanguage();
const showAuthModal = ref(false);
const showPaywallModal = ref(false);

function goGenerate() {
  navigateToGenerate(router);
}

function updateExampleSeo() {
  const seo = getExampleReportSeo(siteLanguage.value);
  document.title = seo.title;

  const upsert = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector(selector) as HTMLElement | null;
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  upsert(
    'meta[name="description"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    },
    'content',
    seo.description,
  );

  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    },
    'href',
    seo.canonical,
  );
}

watch(siteLanguage, updateExampleSeo, { immediate: true });

onMounted(() => {
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

      <ExampleReportShowcase variant="page" @generate="goGenerate" />
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
