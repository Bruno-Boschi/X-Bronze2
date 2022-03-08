<template>
  <v-container>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="usuarios"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>USUARIOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title>
          <v-text-field
            style="max-width: 400px"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            clearable
            dense
            hide-details
          ></v-text-field>
          <v-select
            v-model="selectedRamoAtividade"
            :items="ramos_atividades"
            label="Ramo Atividade"
            dense
            class="ml-md-2 mt-md-0 mt-6"
            hide-details
            clearable
          ></v-select>

          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="openDialogUsersNew()"
          >
            Novo Usuario
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.actions="{ index, item }">
        <v-icon small class="mr-2" @click.stop="openDialogUsersEdit(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click.stop="openDailogDelete(index)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click.stop="getAll()"> Refresh </v-btn>
      </template>
    </v-data-table>
    <DialogUsers
      v-if="dialogUsers"
      :dialogUsers.sync="dialogUsers"
      :item="usuario"
      :edit="edit"
      @fetch-all="getAll"
    />

    <DialogDeleteUser
      v-if="dialogDeleteUser"
      :dialogDeleteUser.sync="dialogDeleteUser"
      :usuario_index="usuario_index"
      @delete-user="deleteItem"
    />
  </v-container>
</template>

<script>
import { all, fetchRamosTrabalho } from "@/api/usuarios";

export default {
  data() {
    return {
      dialogDeleteUser: false,
      usuario_index: null,
      dialogUsers: false,
      search: "",
      ramos_atividades: [],
      selectedRamoAtividade: null,
      usuario: {},
      usuarios: [],
      edit: false,
    };
  },
  components: {
    DialogDeleteUser: () => import("./components/DialogDeleteUser.vue"),
    DialogUsers: () => import("./components/DialogUsers.vue"),
  },

  computed: {
    headers() {
      return [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "E-mail", value: "email" },
        { text: "Celular", value: "celular" },
        { text: "Cidade", value: "cidade" },
        { text: "Endereco", value: "endereco" },
        { text: "Ramo Atividade", value: "ramo_atividade" },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },

    url() {
      let queryString = "";
      for (let key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }

      if (this.selectedRamoAtividade) {
        queryString += `ramo_atividade=${this.selectedRamoAtividade}`;
      }
      console.log(queryString);
      return `?${queryString}`;
    },
  },

  watch: {
    url: {
      handler() {
        this.getAll();
      },
      immediate: true,
    },
  },

  methods: {
    getAll() {
      this.loading = true;
      all(this.url)
        .then((response) => {
          this.usuarios = response;
          this.loading = false;
        })
        .catch((error) => console.log(error));
    },

    getRamosAtividades() {
      this.loading = true;
      fetchRamosTrabalho()
        .then((response) => {
          this.ramos_atividades = response;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    deleteItem(index) {
      this.usuarios.splice(index, 1);
    },

    openDailogDelete(index) {
      this.dialogDeleteUser = true;
      this.usuario_index = index;
    },

    openDialogUsersNew() {
      this.dialogUsers = true;
      this.edit = false;
    },

    openDialogUsersEdit(item) {
      this.usuario = { ...item };
      this.dialogUsers = true;
      this.edit = true;
    },
  },

  async mounted() {
    await this.getAll();
    await this.getRamosAtividades();
  },
};
</script>

<style></style>
