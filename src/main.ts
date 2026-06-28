import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeLanguage } from "./composables/useLanguage";
import { initAnalytics } from "./analytics";
import { loadWebFonts } from "./fonts";
import "./styles.css";

loadWebFonts();

initializeLanguage();
initAnalytics();

const app = createApp(App).use(router);

router.isReady().then(() => {
  document.querySelector(".seo-fallback")?.remove();
});

app.mount("#app");
