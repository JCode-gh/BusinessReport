<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { BriefcaseBusiness, ChevronDown, Coins, FileText, Languages, LogIn, LogOut } from 'lucide-vue-next';
import { useLanguage, languageOptions } from '../composables/useLanguage';
import { useAuth } from '../useAuth';
import { signOut } from '../firebase';

const props = defineProps<{
  showAuthModal: () => void;
  showPaywall?: () => void;
}>();

const { siteLanguage, ui, setSiteLanguage } = useLanguage();
const { user, credits } = useAuth();

const menuOpen = ref(false);
const menuRoot = ref<HTMLElement | null>(null);

const creditsText = computed(() => {
  const n = credits.value;
  if (n === 1) return ui.value.creditsCountOne;
  return ui.value.creditsCountMany.replace('{n}', String(n));
});

const creditsEmpty = computed(() => credits.value === 0);
const creditsClickable = computed(() => creditsEmpty.value && !!props.showPaywall);

const userLabel = computed(() => user.value?.displayName || user.value?.email || '');
const userInitial = computed(() => (userLabel.value[0] ?? '?').toUpperCase());

function changeSiteLanguage(event: Event) {
  const nextLanguage = (event.target as HTMLSelectElement).value as 'en' | 'nl' | 'fr' | 'de';
  setSiteLanguage(nextLanguage, true);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextLanguage);
  history.replaceState({}, '', url.pathname + url.search + url.hash);
}

function onCreditsClick() {
  if (creditsClickable.value) {
    closeMenu();
    props.showPaywall?.();
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function onDocumentClick(event: MouseEvent) {
  if (!menuRoot.value?.contains(event.target as Node)) {
    closeMenu();
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu();
}

async function handleSignOut() {
  closeMenu();
  await signOut();
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
});
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
          <div ref="menuRoot" class="nav-user-menu">
            <button
              class="nav-user-chip"
              type="button"
              :aria-expanded="menuOpen"
              :aria-haspopup="true"
              :aria-label="ui.navAccountMenu"
              @click.stop="toggleMenu"
            >
              <span class="nav-user-avatar">{{ userInitial }}</span>
              <span class="nav-user-label">{{ userLabel }}</span>
              <ChevronDown :size="14" class="nav-user-chevron" :class="{ open: menuOpen }" />
            </button>

            <div v-if="menuOpen" class="nav-user-dropdown" role="menu">
              <div
                class="nav-user-dropdown-credits"
                :class="{ 'nav-user-dropdown-credits--empty': creditsEmpty }"
              >
                <Coins :size="16" aria-hidden="true" />
                <div>
                  <span class="nav-user-dropdown-credits-value">{{ creditsText }}</span>
                  <span class="nav-user-dropdown-credits-label">{{ ui.creditsLabel }}</span>
                </div>
              </div>

              <button
                v-if="creditsClickable"
                class="nav-user-dropdown-item"
                type="button"
                role="menuitem"
                @click="onCreditsClick"
              >
                <Coins :size="16" />
                {{ ui.navBuyCredits }}
              </button>

              <router-link to="/reports" class="nav-user-dropdown-item" role="menuitem" @click="closeMenu">
                <FileText :size="16" />
                {{ ui.navMyReports }}
              </router-link>
              <button class="nav-user-dropdown-item nav-user-dropdown-item--danger" type="button" role="menuitem" @click="handleSignOut">
                <LogOut :size="16" />
                {{ ui.signOut }}
              </button>
            </div>
          </div>
        </template>
        <button v-else class="nav-signin-btn" type="button" @click="showAuthModal">
          <LogIn :size="15" />
          {{ ui.signIn }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-user-menu {
  position: relative;
}

.nav-user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.nav-user-chip:hover,
.nav-user-chip[aria-expanded='true'] {
  border-color: rgba(214, 164, 227, 0.45);
  background: rgba(255, 255, 255, 0.08);
}

.nav-user-chevron {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.45);
  transition: transform 0.15s;
}

.nav-user-chevron.open {
  transform: rotate(180deg);
}

.nav-user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 50;
  min-width: 220px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: #1a1630;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.nav-user-dropdown-credits {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px 12px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-user-dropdown-credits svg {
  flex-shrink: 0;
  color: var(--accent);
}

.nav-user-dropdown-credits--empty svg {
  color: rgba(255, 255, 255, 0.45);
}

.nav-user-dropdown-credits-value {
  display: block;
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.nav-user-dropdown-credits--empty .nav-user-dropdown-credits-value {
  color: rgba(255, 255, 255, 0.65);
}

.nav-user-dropdown-credits-label {
  display: block;
  margin-top: 2px;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
}

.nav-user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}

.nav-user-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-user-dropdown-item--danger {
  color: rgba(255, 138, 138, 0.9);
}

.nav-user-dropdown-item--danger:hover {
  background: rgba(255, 138, 138, 0.1);
  color: #ff8a8a;
}
</style>
