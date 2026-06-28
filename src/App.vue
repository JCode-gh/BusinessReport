<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguage } from './composables/useLanguage';
import { applyRouteSeo, isExplicitLangParam } from './seo/routeSeo';
import type { ReportLanguage } from './composables/useLanguage';

const route = useRoute();
const { siteLanguage } = useLanguage();

function syncRouteSeo() {
  const routeName = route.name as string | undefined;
  const exampleLang =
    routeName === 'example-lang' ? (route.params.lang as ReportLanguage) : siteLanguage.value;

  applyRouteSeo(routeName, siteLanguage.value, isExplicitLangParam(), {
    exampleLanguage: exampleLang,
    noindex: Boolean(route.meta.noindex),
  });
}

watch([() => route.fullPath, siteLanguage], syncRouteSeo, { immediate: true });
</script>

<template>
  <router-view />
</template>
