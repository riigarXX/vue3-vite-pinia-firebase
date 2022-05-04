import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import { useDatabaseStore } from "./stores/database";

import Home from "./views/Home.vue";
import Editar from "./views/Editar.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Perfil from "./views/Perfil.vue";
import NotFound from "./views/NotFound.vue";

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

const redirect = async (to, front, next) => {
  const databaseStore = useDatabaseStore();
  const userStore = useUserStore();
  userStore.loadingSession = true;
  // console.log(to.params.pathMatch);
  const name = await databaseStore.getUrl(to.params.pathMatch);

  if (!name) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = name;
    userStore.loadingSession = true;
    next();
  }
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
  {
    path: "/perfil",
    component: Perfil,
    beforeEnter: requireAuth,
    name: "perfil",
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFound,
    beforeEnter: redirect,
    name: "404",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
