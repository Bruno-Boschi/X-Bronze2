<template>
  <v-dialog
    v-model="dialogUser"
    @click:outside="$emit('update:dialogUser', false)"
    @keydown.esc="$emit('update:dialogUser', false)"
    :width="$vuetify.breakpoint.mdAndDown ? '90vw' : '900px'"
  >
    <v-card-title class="primary white--text">
      <v-icon color="white" class="mr-2">mdi-information-outline</v-icon>
      Informações
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('update:dialogUser', false)">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card class="d-flex justify-center align-center flex-wrap">
      <v-row no-gutters dense>
        <v-col cols="12" md="4" class="d-flex justify-center align-center mt-6">
          <div>
            <div>
              <v-avatar size="128">
                <v-img
                  :src="
                    usuario.avatar
                      ? usuario.avatar
                      : require('@/assets/avatar_placeholder.png')
                  "
                ></v-img>
              </v-avatar>
            </div>
            <div class="text-center font-weight-bold mt-4">
              {{ usuario.nome_social }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="ma-6">
            <span class="font-weight-bold">Objetivo:</span>
            <v-card class="pa-4" color="white" elevation="1">{{
              usuario.objetivo
            }}</v-card>
          </div>
          <div class="ma-6">
            <span class="font-weight-bold">Maior Dificuldade:</span>
            <v-card class="pa-4" color="white" elevation="1">{{
              usuario.maior_dificuldade
            }}</v-card>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogUsuario",

  props: {
    dialogUser: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
      usuario: {},
      tab: 0,
    };
  },

  mounted() {
    this.usuario = { ...this.item };
  },
};
</script>

<style></style>
