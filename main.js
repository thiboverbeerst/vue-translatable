import { createApp } from "vue";
import App from "@/App.vue";

import translator from "./lang";

// Create and setup app
const app = createApp(App);
app.use({
    install: (app) => {
        app.config.globalProperties.$translator = translator;
    }
});
app.mount("#app");
