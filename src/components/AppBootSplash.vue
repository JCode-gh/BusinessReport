<script setup lang="ts">
import { BriefcaseBusiness } from 'lucide-vue-next';
</script>

<template>
  <div class="app-boot-splash" role="status" aria-live="polite" aria-busy="true" aria-label="Loading">
    <div class="app-boot-splash-inner">
      <span class="app-boot-splash-mark" aria-hidden="true">
        <BriefcaseBusiness :size="32" />
      </span>
      <strong class="app-boot-splash-title">GrowthKit Studio</strong>
      <span class="app-boot-splash-spinner" aria-hidden="true"></span>
    </div>
  </div>
</template>
