<script setup lang="ts">
import { useAppBoot } from './composables/useAppBoot';
import AppBootSplash from './components/AppBootSplash.vue';

const { bootComplete } = useAppBoot();
</script>

<template>
  <AppBootSplash v-if="!bootComplete" />
  <router-view v-else />
</template>
