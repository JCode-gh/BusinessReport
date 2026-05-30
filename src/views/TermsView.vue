<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';
import SiteHeader from '../components/SiteHeader.vue';
import AuthModal from '../AuthModal.vue';
import NotificationToast from '../components/NotificationToast.vue';
import { useLanguage } from '../composables/useLanguage';

const { ui, siteLanguage, initializeLanguage } = useLanguage();
const showAuthModal = ref(false);
const currentYear = new Date().getFullYear();

onMounted(() => {
  initializeLanguage();
  document.title = `${ui.value.termsPageTitle} · GrowthKit Studio`;
});
</script>

<template>
  <div class="product-shell">
    <SiteHeader :show-auth-modal="() => (showAuthModal = true)" />

    <main class="legal-page">
      <router-link to="/" class="legal-back">
        <ArrowLeft :size="16" />
        {{ ui.termsBackHome }}
      </router-link>

      <h1>{{ ui.termsPageTitle }}</h1>
      <p class="legal-updated">{{ ui.termsLastUpdated }}</p>
      <p class="legal-intro">{{ ui.termsIntro }}</p>

      <section v-for="(section, index) in ui.termsSections" :key="index" class="legal-section">
        <h2>{{ section.title }}</h2>
        <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
      </section>
    </main>

    <footer class="site-footer">
      <p>
        © {{ currentYear }} · {{ ui.footerByline }}
        <a href="https://jcode.be" target="_blank" rel="noopener noreferrer">jcode.be</a>
        · <router-link to="/terms">{{ ui.termsLink }}</router-link>
      </p>
    </footer>

    <AuthModal v-model="showAuthModal" :language="siteLanguage" />
    <NotificationToast />
  </div>
</template>
