<template>
  <div>
    <div class="d-flex justify-center align-center">
      <div>
        <div class="mt-10 mb-6">
          <span class="text-h4 font-weight-bold"
            >Bem-vindo {{ user_logado.nome_social }}</span
          >
        </div>
        <div class="d-flex justify-center align-center">
          <v-avatar
            @click="dialogProfile = true"
            style="cursor: pointer"
            size="185"
            class="ml-6"
          >
            <v-img :src="user_logado.avatar"></v-img>
          </v-avatar>
          <!-- <v-btn class="ml-6" fab text :to="{ path: '/encontros' }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  mdi-calendar-range
                </v-icon>
              </template>
              <span>Encontros</span>
            </v-tooltip>
          </v-btn> -->
        </div>
      </div>
    </div>
    <Profile :dialogProfile.sync="dialogProfile" @fetch-users="getUsuarios" />

    <v-row class="d-flex mt-8 ml-8 mb-xs-20 mb-4">
      <v-col
        class="d-flex align-center justify-space-between"
        cols="6"
        md="1"
        v-for="(usuario, i) in usuarios"
        :key="i"
        @click="openDialog(usuario)"
        style="cursor: pointer"
      >
        <div>
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on" size="84">
                  <v-img
                    :src="
                      usuario.avatar
                        ? usuario.avatar
                        : require('@/assets/avatar_placeholder.png')
                    "
                  ></v-img>
                </v-avatar>
              </template>
              <span>
                <v-icon class="pa-2" color="white"
                  >mdi-cake-variant-outline </v-icon
                >:
                {{ usuario.data_nascimento | dateFormat("dd-MM") }}
              </span>
            </v-tooltip>
          </div>
          <div class="text-center font-weight-bold mt-4">
            {{ usuario.nome_social }}
          </div>
        </div>
      </v-col>
    </v-row>
    <DialogUsuario
      v-if="dialogUser"
      :dialogUser.sync="dialogUser"
      :item="usuario"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { fetchUsuariosHome } from "@/api/usuarios.js";

export default {
  name: "Home",

  data() {
    return {
      loading: false,
      usuarios: [],
      users: [],
      user_logado: {},
      dialogUser: false,
      usuario: {},
      dialogProfile: false,
    };
  },

  components: {
    DialogUsuario: () => import("./components/DialogUsuario.vue"),
    // Profile: () => import("@/views/geral/usuarios/Profile.vue"),
  },

  computed: {
    ...mapState("Usuario", {
      user_id: (state) => state.usuario.id,
    }),
  },

  methods: {
    openDialog(item) {
      this.dialogUser = true;
      this.usuario = item;
    },

    async getUsuarios() {
      this.loading = true;
      await fetchUsuariosHome()
        .then((response) => {
          this.users = response;
          this.users.filter((user) => {
            if (user.id === this.user_id) {
              this.user_logado = user;
            }
          });
          this.usuarios = this.users.filter((user) => user.id !== this.user_id);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  async mounted() {
    await this.getUsuarios();
  },
};
</script>

<style></style>
