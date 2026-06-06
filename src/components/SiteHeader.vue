<script setup lang="ts">
import { computed } from 'vue';
import { BriefcaseBusiness, Coins, Languages, LogIn, LogOut } from 'lucide-vue-next';
import { useLanguage, languageOptions } from '../composables/useLanguage';
import { useAuth } from '../useAuth';
import { signOut } from '../firebase';

const props = defineProps<{
  showAuthModal: () => void;
  showPaywall?: () => void;
}>();

const { siteLanguage, ui, setSiteLanguage } = useLanguage();
const { user, credits, authReady } = useAuth();

const creditsText = computed(() => {
  if (!authReady.value) return '…';
  const n = credits.value;
  if (n === 1) return ui.value.creditsCountOne;
  return ui.value.creditsCountMany.replace('{n}', String(n));
});

const creditsEmpty = computed(() => authReady.value && credits.value === 0);
const creditsClickable = computed(() => creditsEmpty.value && !!props.showPaywall);

function changeSiteLanguage(event: Event) {
  const nextLanguage = (event.target as HTMLSelectElement).value as any;
  setSiteLanguage(nextLanguage, true);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextLanguage);
  history.replaceState({}, '', url.pathname + url.search + url.hash);
}

function onCreditsClick() {
  if (creditsClickable.value) props.showPaywall?.();
}
</script>

<template>
  <header class="site-nav">
    <div class="nav-inner">
      <router-link to="/" class="brand-lockup" :aria-label="ui.brandHomeAria">
        <span class="brand-mark" aria-hidden="true">
          <BriefcaseBusiness :size="24" />
        </span>
        <span>
          <strong>GrowthKit Studio</strong>
          <small>{{ ui.brandSubtitle }}</small>
        </span>
      </router-link>

      <div class="nav-controls">
        <label class="language-switcher">
          <Languages :size="17" aria-hidden="true" />
          <span class="sr-only">{{ ui.languageSwitcherLabel }}</span>
          <select
            :value="siteLanguage"
            :aria-label="ui.languageSwitcherLabel"
            @change="changeSiteLanguage"
          >
            <option v-for="language in languageOptions" :key="language.value" :value="language.value">
              {{ language.label }}
            </option>
          </select>
        </label>

        <template v-if="user">
          <component
            :is="creditsClickable ? 'button' : 'span'"
            class="nav-credits-badge"
            :class="{
              'nav-credits-badge--empty': creditsEmpty,
              'nav-credits-badge--clickable': creditsClickable,
            }"
            :type="creditsClickable ? 'button' : undefined"
            :aria-label="ui.creditsLabel"
            :title="creditsClickable ? ui.creditsBuyMore : undefined"
            @click="onCreditsClick"
          >
            <Coins :size="14" aria-hidden="true" />
            <span>{{ creditsText }}</span>
          </component>

          <div class="nav-user-chip">
            <span class="nav-user-avatar">{{ (user.displayName || user.email || '?')[0].toUpperCase() }}</span>
            <span class="nav-user-label">{{ user.displayName || user.email }}</span>
          </div>
          <button class="nav-icon-btn" type="button" :title="ui.signOut" @click="signOut()">
            <LogOut :size="16" />
          </button>
        </template>
        <button v-else class="nav-signin-btn" type="button" @click="showAuthModal">
          <LogIn :size="15" />
          {{ ui.signIn }}
        </button>
      </div>
    </div>
  </header>
</template>
