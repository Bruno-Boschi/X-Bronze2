import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: () => import("@/views/PaginaNaoEncontrada.vue"),
    meta: {
      title: "Pagina não Encontrada",
    },
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      title: "Login",
    },
  },

  {
    path: "/",
    component: () => import("@/layout/Layout.vue"),
    meta: {
      login: true,
      title: "Home",
    },
    children: [
      {
        path: "/home",
        alias: "/",
        component: () => import("@/views/geral/home/Home.vue"),
        meta: {
          title: "Home",
        },
      },

      {
        path: "contact",
        component: () => import("@/views/geral/contact/Contact.vue"),
        meta: {
          title: "Contato",
        },
      },
      {
        path: "sobre",
        component: () => import("@/views/geral/sobre/Sobre.vue"),
        meta: {
          title: "Sobre",
        },
      },
      {
        path: "usuarios",
        component: () => import("@/views/geral/users/Users.vue"),
        meta: {
          title: "Usuarios",
        },
      },
      {
        path: "/eventos",

        component: () => import("@/views/geral/eventos/Eventos.vue"),
        meta: {
          title: "Eventos",
        },
      },
      {
        path: "/evento/adicionar",
        component: () =>
          import("@/views/geral/eventos/components/NovoEvento.vue"),
        meta: {
          title: "Adicionar Eventos",
          role: ["NIVEL2", "NIVEL3"],
        },
      },
      {
        path: "/evento/:eventoId",
        component: () => import("@/views/geral/eventos/components/Evento.vue"),
        meta: {
          title: "Evento",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - XBRONZE2` || "XBRONZE2";

  if (to.matched.some((record) => record.meta.login)) {
    const cargo = Vue.ls.get("role");
    const token = Vue.ls.get("token");

    if (!token) {
      next("/login");
    } else {
      if (to.meta.role) {
        if (!cargo || !to.meta.role.some((item) => item === cargo)) {
          Vue.prototype.$toast.error("Acesso não autorizado!");
          next("/");
        }
        next();
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.name != "login" && to.name != "cadastro") {
    Vue.ls.set("current_route", to.path);
  }
  Vue.ls.set("last_route", from.path);
});

export default router;
