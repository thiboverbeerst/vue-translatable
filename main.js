import { createApp } from "vue";
import App from "@/App.vue";

import router from './router';
import store from './store';
import translator from "./lang";

const CONFIG = {
    "host": "http://birdie.test"
}


const API = `${CONFIG.host ? CONFIG.host + '/': ''}api/`;

// Create and setup app
const app = createApp(App);
app.use(router);
app.use(store);
app.use({
    install: (app) => {
        app.config.globalProperties.$translator = translator;
    }
});
app.mount("#app");

export { API };
