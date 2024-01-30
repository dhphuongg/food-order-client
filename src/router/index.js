import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "~pages";

import { auth } from "@/middlewares/auth.js";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach(auth);
router.afterEach((to) => {
  if (to.path === "/") document.title = "HITFOOD";
  else document.title = "HITFOOD - " + to.name;
});

export default router;
