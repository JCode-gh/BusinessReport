import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeLanguage } from "./composables/useLanguage";
import { initAnalytics } from "./analytics";
import { initAuth } from "./useAuth";
import { initBfcacheLifecycle } from "./bfcacheLifecycle";
import "./fonts/local.css";
import "./styles/core.css";

initializeLanguage();
initAnalytics();
initBfcacheLifecycle();

function scheduleAuthInit(): void {
  const run = () => initAuth();
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.addEventListener("load", () => window.setTimeout(run, 1500), { once: true });
  }
}

scheduleAuthInit();

const app = createApp(App).use(router);

router.isReady().then(() => {
  document.querySelector(".seo-fallback")?.remove();
});

app.mount("#app");
