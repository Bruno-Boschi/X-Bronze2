<template>
  <v-app style="background-color: #f5f5f5" v-if="!loading">
    <v-navigation-drawer width="60px" v-model="drawer" app>
      <DashBoard />
    </v-navigation-drawer>
    <v-app-bar app dense dark ml="100vh">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        @click:outside="drawer = !drawer"
        color="brown lighten-1"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>{{ $route.name }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="deslogarUsuario">Logout</v-btn>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <transition mode="out-in"> <router-view /> </transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      loading: false,
    };
  },

  components: {
    DashBoard: () => import("@/layout/menu/DashBoard.vue"),
  },

  computed: {
    ...mapState("Usuario", {
      role: (state) => state.role,
    }),
  },

  watch: {
    $route() {
      if (this.$route.meta.item) {
        this.item = this.$route.meta.item;
      }
    },
  },

  methods: {
    deslogarUsuario() {
      this.loading = true;
      this.$store.dispatch("Usuario/deslogarUsuario").then(() => {
        this.$router.push("/login");
        this.loading = false;
      });
    },

    mudaMenu(menu) {
      this.$store.commit("UPDATE_MENUDINAMICO", menu);
    },
    validaRole(items) {
      return items.find((item) => item === this.role);
    },
  },

  mounted() {
    if (this.$route.meta.menu) {
      this.menu = this.$route.meta.menu;
    } else {
      this.menu = "dashboard";
    }
    if (process.env.VUE_APP_API_URL) {
      this.apiUrl = process.env.VUE_APP_API_URL;
    }
  },
};
</script>
