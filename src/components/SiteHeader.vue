<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { BriefcaseBusiness, ChevronDown, Coins, FileText, Languages, LogIn, LogOut, Menu, X } from 'lucide-vue-next';
import { useLanguage, languageOptions } from '../composables/useLanguage';
import { useAuth } from '../useAuth';
import { signOut } from '../firebase';

const props = defineProps<{
  showAuthModal: () => void;
  showPaywall?: () => void;
}>();

const { siteLanguage, ui, setSiteLanguage } = useLanguage();
const { user, credits } = useAuth();

const accountMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const siteNavRef = ref<HTMLElement | null>(null);
const accountMenuRoot = ref<HTMLElement | null>(null);

const creditsText = computed(() => {
  const n = credits.value;
  if (n === 1) return ui.value.creditsCountOne;
  return ui.value.creditsCountMany.replace('{n}', String(n));
});

const creditsEmpty = computed(() => credits.value === 0);
const canBuyCredits = computed(() => !!props.showPaywall);

const userLabel = computed(() => user.value?.displayName || user.value?.email || '');
const userInitial = computed(() => (userLabel.value[0] ?? '?').toUpperCase());
const currentLanguageLabel = computed(
  () => languageOptions.find((language) => language.value === siteLanguage.value)?.label ?? siteLanguage.value,
);

function changeSiteLanguage(event: Event) {
  const nextLanguage = (event.target as HTMLSelectElement).value as 'en' | 'nl' | 'fr' | 'de';
  setSiteLanguage(nextLanguage, true);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextLanguage);
  history.replaceState({}, '', url.pathname + url.search + url.hash);
}

function onBuyCreditsClick() {
  if (!canBuyCredits.value) return;
  closeMenus();
  props.showPaywall?.();
}

function toggleAccountMenu() {
  mobileMenuOpen.value = false;
  accountMenuOpen.value = !accountMenuOpen.value;
}

function toggleMobileMenu() {
  accountMenuOpen.value = false;
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMenus() {
  accountMenuOpen.value = false;
  mobileMenuOpen.value = false;
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as Node;
  if (accountMenuRoot.value?.contains(target)) return;
  if (siteNavRef.value?.contains(target)) return;
  closeMenus();
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenus();
}

function handleMobileSignIn() {
  closeMenus();
  props.showAuthModal();
}

async function handleSignOut() {
  closeMenus();
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
  <header ref="siteNavRef" class="site-nav" :class="{ 'site-nav--menu-open': mobileMenuOpen }">
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

      <div class="nav-controls nav-controls--desktop">
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
          <div ref="accountMenuRoot" class="nav-user-menu">
            <button
              class="nav-user-chip"
              type="button"
              :aria-expanded="accountMenuOpen"
              :aria-haspopup="true"
              :aria-label="ui.navAccountMenu"
              @click.stop="toggleAccountMenu"
            >
              <span class="nav-user-avatar">{{ userInitial }}</span>
              <span class="nav-user-label">{{ userLabel }}</span>
              <ChevronDown :size="14" class="nav-user-chevron" :class="{ open: accountMenuOpen }" />
            </button>

            <div v-if="accountMenuOpen" class="nav-user-dropdown" role="menu">
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
                v-if="canBuyCredits"
                class="nav-user-dropdown-item"
                type="button"
                role="menuitem"
                @click="onBuyCreditsClick"
              >
                <Coins :size="16" />
                {{ ui.navBuyCredits }}
              </button>

              <router-link to="/reports" class="nav-user-dropdown-item" role="menuitem" @click="closeMenus">
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

      <div class="nav-mobile">
        <button
          class="nav-mobile-toggle"
          type="button"
          :aria-expanded="mobileMenuOpen"
          :aria-label="mobileMenuOpen ? ui.navCloseMenu : ui.navOpenMenu"
          @click.stop="toggleMobileMenu"
        >
          <Menu v-if="!mobileMenuOpen" :size="20" aria-hidden="true" />
          <X v-else :size="20" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="nav-mobile-panel">
      <label class="language-switcher nav-mobile-language">
        <Languages :size="17" aria-hidden="true" />
        <span class="nav-mobile-language-label">{{ ui.languageSwitcherLabel }}</span>
        <span class="nav-mobile-language-value">{{ currentLanguageLabel }}</span>
        <ChevronDown :size="16" class="nav-mobile-language-chevron" aria-hidden="true" />
        <select
          class="nav-mobile-language-select"
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
        <div class="nav-mobile-user">
          <span class="nav-user-avatar">{{ userInitial }}</span>
          <div class="nav-mobile-user-meta">
            <span class="nav-mobile-user-name">{{ userLabel }}</span>
            <span class="nav-mobile-user-credits">{{ creditsText }}</span>
          </div>
        </div>

        <button
          v-if="canBuyCredits"
          class="nav-mobile-action"
          type="button"
          @click="onBuyCreditsClick"
        >
          <Coins :size="16" />
          {{ ui.navBuyCredits }}
        </button>

        <router-link to="/reports" class="nav-mobile-action" @click="closeMenus">
          <FileText :size="16" />
          {{ ui.navMyReports }}
        </router-link>

        <button class="nav-mobile-action nav-mobile-action--danger" type="button" @click="handleSignOut">
          <LogOut :size="16" />
          {{ ui.signOut }}
        </button>
      </template>

      <button v-else class="nav-mobile-signin" type="button" @click="handleMobileSignIn">
        <LogIn :size="16" />
        {{ ui.signIn }}
      </button>
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

.nav-mobile {
  display: none;
  position: relative;
  flex-shrink: 0;
}

.nav-mobile-toggle {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  color: var(--ink);
  cursor: pointer;
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
}

.nav-mobile-toggle:hover,
.nav-mobile-toggle[aria-expanded='true'] {
  border-color: rgba(111, 106, 207, 0.65);
  background: rgba(255, 255, 255, 0.08);
  color: var(--accent);
}

.nav-mobile-panel {
  width: min(1360px, calc(100% - 32px));
  margin: 0 auto;
  padding: 0 0 14px;
}

.nav-mobile-language {
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

.nav-mobile-language-label {
  flex: 1;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--ink);
}

.nav-mobile-language-value {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
}

.nav-mobile-language-chevron {
  flex-shrink: 0;
  color: var(--muted);
}

.nav-mobile-language .nav-mobile-language-select {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  opacity: 0;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

.nav-mobile-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-mobile-user-meta {
  min-width: 0;
}

.nav-mobile-user-name {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-mobile-user-credits {
  display: block;
  margin-top: 2px;
  font-size: 0.74rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
}

.nav-mobile-action,
.nav-mobile-signin {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 12px;
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

.nav-mobile-action:hover,
.nav-mobile-signin:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-mobile-action--danger {
  color: rgba(255, 138, 138, 0.9);
}

.nav-mobile-action--danger:hover {
  background: rgba(255, 138, 138, 0.1);
  color: #ff8a8a;
}

.nav-mobile-signin {
  margin-top: 4px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.06);
  justify-content: center;
}

.nav-mobile-signin:hover {
  border-color: rgba(214, 164, 227, 0.45);
  background: rgba(214, 164, 227, 0.08);
  color: #d6a4e3;
}

@media (max-width: 760px) {
  .nav-mobile {
    display: block;
  }

  .site-nav--menu-open {
    border-bottom: 1px solid var(--line);
  }

  .nav-mobile-panel {
    animation: nav-mobile-panel-in 160ms ease;
  }
}

@keyframes nav-mobile-panel-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 520px) {
  .brand-lockup small {
    display: none;
  }
}
</style>
