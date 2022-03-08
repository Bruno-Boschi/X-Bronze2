<template>
  <v-container>
    <v-form @submit.prevent ref="form" v-model="validForm" lazy-validation>
      <v-card>
        <v-card-title class="pa-4">
          <v-btn :to="{ path: '/eventos' }" small exact fab text class="mr-2">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-icon color="primary" left>mdi-calendar-outline</v-icon>
          Adicionar Evento
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-tabs class="" v-model="tab">
            <v-tab class="caption font-weight-bold"> Dados Evento </v-tab>
            <!-- <v-tab class="caption font-weight-bold ">
              Midias
            </v-tab> -->
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <h3 class="secondary--text text-h5 font-weight-medium my-6">
                Dados do Evento
              </h3>
              <v-row>
                <v-col cols="12" md="3">
                  <v-card
                    flat
                    class="fill-height d-flex align-center justify-center"
                  >
                    <v-card flat v-if="destaque">
                      <v-img :src="destaque" contain></v-img>
                    </v-card>
                    <div v-else class="fill-height" style="width: 100%">
                      <!-- <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :class="{ hoverFile: hoverFile }"
                        :use-custom-dropzone-options="true"
                        :options="dropzoneOptions"
                        @vdropzone-file-added="fileAdded"
                        @vdropzone-drag-enter="hoverFile = true"
                        @vdropzone-drag-over="hoverFile = true"
                        @vdropzone-drag-leave="hoverFile = false"
                        :useCustomSlot="true"
                        :include-styling="false"
                      > -->
                      <div class="text-center">
                        <v-icon size="80" color="info"> mdi-image-plus </v-icon>
                        <!-- <h3 class="text-subtitle-1">Arrastar e soltar</h3>
                        <div class="text-caption">Clique para selecionar</div> -->
                      </div>
                      <!-- </vue-dropzone> -->
                    </div>
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
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- Descrição -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="evento.local"
                        label="Local"
                        required
                        :rules="formRules"
                        dense
                      ></v-text-field>
                    </v-col>

                    <!-- Data Inicio -->
                    <v-col cols="12" md="6">
                      <DataField
                        :data_sync.sync="evento.data_inicio"
                        label="Data Inicio"
                      />
                    </v-col>
                    <!-- Data Fim -->
                    <v-col cols="12" md="6">
                      <DataField
                        :data_sync.sync="evento.data_fim"
                        :disabled="evento.data_inicio ? false : true"
                        :data_min="evento.data_inicio"
                        label="Data Fim"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- <v-tab-item>
              <InternFileManager
                origem="encontros"
                :origem_id="encontro_id"
              ></InternFileManager>
            </v-tab-item> -->
          </v-tabs-items>
        </v-card-text>
        <v-card-actions class="py-3">
          <v-btn text :to="{ path: '/eventos' }" exact color="primary">
            <v-icon class="mr-2" left>mdi-arrow-left</v-icon>
            Voltar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="createEvento"
            :disabled="!validForm"
            color="success"
            class="white--text"
          >
            <v-icon left>mdi-plus</v-icon>
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// import { format } from "date-fns";

import { postEncontro } from "@/api/admin/eventos.js";
// import { inputRequired } from "@/plugins/utils.js";
export default {
  name: "NovoEvento",

  data() {
    return {
      tab: 0,
      loading: false,
      evento: {},
      destaque: null,
      destaqueUpload: null,
      hoverFile: false,
    };
  },

  components: {
    DataField: () => import("@/components/fields/DataField.vue"),
  },

  computed: {
    // dropzoneOptions() {
    //   return {
    //     url: "/no-url",
    //     createfileThumbnails: false,
    //     acceptedFiles: ".png,.jpg,.jpeg",
    //     maxFilesize: 2,
    //     autoProcessQueue: false,
    //   };
    // },
  },

  methods: {
    // fileAdded(file) {
    //   this.destaqueUpload = file;
    //   const vue = this;
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (event) => {
    //     vue.destaque = event.target.result;
    //   };
    // },

    createEvento() {
      if (this.$refs.form.validate()) {
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

        postEncontro(evento)
          .then((response) => {
            if (response.status === 201) {
              this.$toast.success("Evento cadastrado com sucesso");
              this.loading = false;
              this.$router.push({ path: "/eventos" });
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hoverFile {
  border-color: #2196f3 !important;
  color: #2196f3 !important;
}
#dropzone {
  border: 2px dashed #dddddd;
  padding: 16px;
  width: 100%;
  height: 250px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  &:hover {
    border-color: #2196f3;
    color: #2196f3;
  }

  ::v-deep .dz-preview {
    display: none !important;
  }
}
</style>
