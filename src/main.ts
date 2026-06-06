import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeLanguage } from "./composables/useLanguage";
import "./styles.css";

initializeLanguage();
createApp(App).use(router).mount("#app");
