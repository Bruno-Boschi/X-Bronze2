<template>
  <div>
    <v-card
      color="brown lighten-1"
      height="300"
      width="60"
      min-height="100vh"
      tile
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://i.pinimg.com/originals/bf/4d/40/bf4d401aa059647cc24cc8408f203e44.png"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <div v-for="(menu, i) in menus" :key="i">
          <v-list-item :to="{ path: menu.to }">
            <v-list-item-action>
              <v-icon>{{ menu.icon }} </v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      loading: false,
    };
  },

  computed: {
    menus() {
      return [
        {
          name: "Home",
          icon: "mdi-home-variant",
          to: "/",
          disabled: false,
          type: "single",
          role: ["NIVEL1", "NIVEL2", "NIVEL3"],
        },
        {
          name: "Sobre",
          icon: "mdi-post",
          to: "/sobre",
          disabled: false,
          type: "single",
          role: ["NIVEL1", "NIVEL2", "NIVEL3"],
        },
        {
          name: "Users",
          icon: "mdi-account",
          to: "/usuarios",
          disabled: false,
          type: "single",
          role: ["NIVEL2", "NIVEL3"],
        },
        {
          name: "Eventos",
          icon: "mdi-calendar-outline",
          to: "/eventos",
          disabled: false,
          type: "single",
          role: ["NIVEL1", "NIVEL2", "NIVEL3"],
        },
        {
          name: "Contact",
          icon: "mdi-card-account-phone-outline",
          to: "/contact",
          disabled: false,
          type: "single",
          role: ["NIVEL1", "NIVEL2", "NIVEL3"],
        },
      ];
    },
  },
};
</script>

<style></style>
