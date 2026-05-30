<script setup lang="ts">
import { BriefcaseBusiness, Languages, LogIn, LogOut } from 'lucide-vue-next';
import { useLanguage, languageOptions } from '../composables/useLanguage';
import { useAuth } from '../useAuth';
import { signOut } from '../firebase';

defineProps<{
  showAuthModal: () => void;
}>();

const { siteLanguage, ui, setSiteLanguage } = useLanguage();
const { user } = useAuth();

function changeSiteLanguage(event: Event) {
  const nextLanguage = (event.target as HTMLSelectElement).value as any;
  setSiteLanguage(nextLanguage, true);
  // Update URL lang param
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextLanguage);
  history.replaceState({}, '', url.pathname + url.search + url.hash);
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
