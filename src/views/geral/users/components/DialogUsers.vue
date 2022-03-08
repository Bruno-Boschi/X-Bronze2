<template>
  <v-dialog persistent v-model="dialogUsers" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          {{ edit ? "Editar Usuario" : "Adicionar Usuario" }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="usuario.name" label="Nome"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.email"
                label="E-mail"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.password"
                label="Nova Senha"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.password_confirmation"
                label="Confirmação de Senha"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.celular"
                label="Celular"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.cidade"
                label="Cidade"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.endereco"
                label="Endereço"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="usuario.ramo_atividade"
                label="Ramo Atividade"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('update:dialogUsers', false)"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="edit ? updateUsuario() : createUsuario()"
        >
          {{ edit ? "Atualizar" : "Criar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { putUsuario, postUsuario } from "@/api/usuarios";

export default {
  name: "DialogUsers",
  props: {
    dialogUsers: {
      type: Boolean,
      default: false,
    },

    item: {
      type: Object,
    },

    edit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      usuario: {},
    };
  },

  methods: {
    updateUsuario() {
      let usuario_2 = {};
      usuario_2.name = this.usuario.name;
      usuario_2.email = this.usuario.email;
      usuario_2.celular = this.usuario.celular;
      usuario_2.cidade = this.usuario.cidade;
      usuario_2.endereco = this.usuario.endereco;
      usuario_2.ramo_atividade = this.ramo_atividade;
      putUsuario(this.usuario.id, usuario_2)
        .then(() => {
          this.$emit("update:dialogUsers", false);
          this.$emit("fetch-all");
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
    createUsuario() {
      let usuario_2 = {};
      usuario_2.name = this.usuario.name;
      usuario_2.email = this.usuario.email;
      usuario_2.password = this.usuario.password;
      usuario_2.password_confirmation = this.usuario.password_confirmation;
      usuario_2.celular = this.usuario.celular;
      usuario_2.cidade = this.usuario.cidade;
      usuario_2.endereco = this.usuario.endereco;
      usuario_2.ramo_atividade = this.usuario.ramo_atividade;
      postUsuario(usuario_2)
        .then(() => {
          this.$emit("update:dialogUsers", false);
          this.$emit("fetch-all");
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    if (this.edit) {
      this.usuario = { ...this.item };
    }
  },
};
</script>

<style></style>
