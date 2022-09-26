import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

let app = createApp(App);

app.use(store).use(router).mount('#app')
