import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#wrapper");

router.beforeEach((to, from, next) => {
  const inputEl = document.querySelector("input#menu") as HTMLInputElement;
  if (inputEl) {
    inputEl.checked = false;
    next();
  }
});
