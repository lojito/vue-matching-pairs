import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Game from "../views/Game.vue";
import HistoricalFull from "../views/HistoricalFull.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Game",
    component: Game,
  },
  {
    path: "/historical",
    name: "Historical",
    component: () => import("../views/Historical.vue"),
  },
  {
    path: "/repository",
    name: "Repository",
    component: () => import("../views/Repository.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/game/:id",
    name: "HistoricalFull",
    component: HistoricalFull,
    beforeEnter: (to, from, next) => {
      if (typeof to.params.id !== undefined) {
        next();
      } else {
        next({ name: "Game" });
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
