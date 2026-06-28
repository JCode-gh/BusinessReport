import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeLanguage } from "./composables/useLanguage";
import { initAnalytics } from "./analytics";
import { initBfcacheLifecycle } from "./bfcacheLifecycle";
import { scheduleAuthInit } from "./useAuth";
import "./fonts/local.css";
import "./styles/core.css";

initializeLanguage();
initAnalytics();
initBfcacheLifecycle();
scheduleAuthInit();

const app = createApp(App).use(router);

router.isReady().then(() => {
  document.querySelector(".seo-fallback")?.remove();
});

app.mount("#app");
