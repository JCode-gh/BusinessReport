<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage';

const { ui } = useLanguage();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <p>
      © {{ currentYear }} · {{ ui.footerByline }}
      <a href="https://jcode.be" target="_blank" rel="noopener noreferrer">jcode.be</a>
      · <router-link to="/terms">{{ ui.termsLink }}</router-link>
      · {{ ui.footerVat }}
    </p>
  </footer>
</template>
