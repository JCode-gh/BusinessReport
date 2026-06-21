import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeLanguage } from "./composables/useLanguage";
import { initAnalytics } from "./analytics";
import "./styles.css";

initializeLanguage();
initAnalytics();
createApp(App).use(router).mount("#app");
