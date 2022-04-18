import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Editar from "./views/Editar.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Perfil from "./views/Perfil.vue";

const requireAuth = async (to, front, next) => {
  //Se inicializa la store dentro por que si no da problemas
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();

  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/", component: Home, beforeEnter: requireAuth, name: "home" },
  {
    path: "/editar/:id",
    component: Editar,
    beforeEnter: requireAuth,
    name: "editar",
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/perfil", component: Perfil,beforeEnter: requireAuth, name: "perfil" },

];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
