<template>
  <v-container>
    <v-form @submit.prevent ref="form" v-model="validForm" lazy-validation>
      <v-card>
        <v-card-title class="pa-4">
          <v-btn :to="{ path: '/eventos' }" small exact fab text class="mr-2">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-icon color="primary" left>mdi-calendar-range</v-icon>
          {{ evento.titulo }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h3 class="secondary--text text-h5 font-weight-medium my-6">
            Dados do evento
          </h3>
          <v-row>
            <v-col cols="12" md="3">
              <v-card class="mb-6" flat>
                <v-img v-if="destaque" :src="destaque" contain></v-img>

                <v-img
                  v-else
                  :src="require('@/assets/pagina-default.png')"
                  contain
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="9">
              <v-row dense class="pl-4">
                <!-- Descrição -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="evento.titulo"
                    label="Titulo"
                    required
                    :rules="formRules"
                    :disabled="role !== 'NIVEL1' ? false : true"
                    dense
                  ></v-text-field>
                </v-col>

                <!-- Local -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="evento.local"
                    label="Local"
                    required
                    :rules="formRules"
                    :disabled="role !== 'NIVEL1' ? false : true"
                    dense
                  ></v-text-field>
                </v-col>

                <!-- Data Inicio -->
                <v-col cols="12" md="6">
                  <DataField
                    :data_sync.sync="evento.data_inicio"
                    :disabled="role !== 'NIVEL1' ? false : true"
                    label="Data Inicio"
                  />
                </v-col>
                <!-- Data Fim -->
                <v-col cols="12" md="6">
                  <DataField
                    :data_sync.sync="evento.data_fim"
                    :disabled="
                      evento.data_inicio && role !== 'NIVEL1' ? false : true
                    "
                    :data_min="evento.data_inicio"
                    label="Data Fim"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="py-3">
          <v-btn text :to="{ path: '/eventos' }" exact color="primary">
            <v-icon class="mr-2" left>mdi-arrow-left</v-icon>
            Voltar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="role !== 'NIVEL1'"
            @click="updateEvento"
            :disabled="!validForm"
            color="success"
            class="white--text"
          >
            <v-icon left>mdi-check</v-icon>
            atualizar
          </v-btn>
        </v-card-actions>
        <div></div>
        <v-card-actions class="py-3"> </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// import { format } from "date-fns";
import { putEncontro } from "@/api/admin/eventos.js";
import { one as fetchEventos } from "@/api/geral/eventos.js";
import { mapState } from "vuex";
export default {
  name: "Encontro",

  data() {
    return {
      loading: false,
      evento: {},
      destaque: null,
      destaqueUpload: null,
      hoverFile: false,
      validForm: true,
    };
  },

  components: {
    DataField: () => import("@/components/fields/DataField.vue"),
  },

  computed: {
    ...mapState("Usuario", {
      role: (state) => state.role,
    }),
    evento_id() {
      return this.$route.params.eventoId;
    },
  },

  methods: {
    onButtonClick() {
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const file = e.target.files[0];
      this.destaqueUpload = file;
      this.evento.img_encontro = !this.evento.img_encontro ? "" : null;
      const vue = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        vue.destaque = event.target.result;
      };
    },

    updateEvento() {
      if (
        JSON.stringify(this.evento) === JSON.stringify(this.evento_original)
      ) {
        this.$toast.error("Por favor, faça uma mudança antes de salvar!");
        return;
      }
      if (this.$refs.form.validate()) {
        this.loading = true;

        this.loading = true;
        const evento = new FormData();

        if (this.destaqueUpload) {
          evento.append(
            "img_destaque",
            this.destaqueUpload,
            this.destaqueUpload.name
          );
        }

        let evento_2 = {};

        evento_2.titulo = this.evento.titulo;
        evento_2.local = this.evento.local;
        evento_2.data_fim = this.evento.data_fim;
        evento_2.data_inicio = this.evento.data_inicio;
        for (let key in evento_2) {
          if (
            evento_2[key] !== null &&
            evento_2[key] !== undefined &&
            evento_2[key] !== ""
          ) {
            evento.append(key, evento_2[key]);
          }
        }

        putEncontro(this.evento_id, evento)
          .then((response) => {
            if (response.status === 200) {
              this.$toast.success("Atualizado com sucesso");
              this.$router.push({ path: "/eventos" });
              this.getEncontros();
              this.loading = false;
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    async getEvento() {
      this.loading = true;
      await fetchEventos(this.evento_id)
        .then((response) => {
          this.evento = response;
          this.evento_original = { ...response };
          this.destaque = this.evento.img_encontro;

          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },

  async mounted() {
    await this.getEvento();
  },
};
</script>

<style lang="scss" scoped></style>
