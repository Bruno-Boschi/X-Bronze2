<template>
  <div>
    <router-view v-if="!loading"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("Usuario", {
      role: (state) => state.role,
    }),
  },

  async created() {
    try {
      const token = this.$ls.get("token"); // sempre pega o token registrado no profile, sem  precisar ficar fazendo requisiçao da api/servidor todo momento

      if (token) {
        // verifica se é o usuario tem permisao para ficar nesta rota, caso nao seja, sera redirecionado para login

        await this.$store.dispatch("Usuario/getUsuario");

        if (this.role != "ADMIN") {
          let routes = this.$router.options.routes;
          let route = routes.find((item) => item.meta.role === this.role);
          if (route) {
            this.$router.push({ path: route.path });
            this.loading = true;
          }
        }

        if (this.$route.fullPath === "/login") {
          const last_route = this.$ls.get("last_route");

          if (last_route && last_route != "/" && last_route != "/login") {
            this.$router.push({
              path: last_route,
            });
            this.loading = true;
          } else {
            let routes = this.$router.options.routes;

            let route = routes.find((item) => item.meta.role === this.role);

            if (route) {
              this.$router.push({ path: route.path });
            }
            this.loading = true;
          }
        }
      } else {
        this.$router.isReady().then(() => {
          const current_route = this.$ls.get("current_route");

          if (current_route != "/login") {
            this.$router.push({ path: "/login" });
          }
          this.loading = true;
        });
      }
    } catch (error) {
      this.loading = false;
    }
  },
};
</script>
