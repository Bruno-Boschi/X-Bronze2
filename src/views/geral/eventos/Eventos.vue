<template>
  <v-container>
    <v-card class="">
      <v-card-title class="text-h5 font-weight-bold pa-3 mb-3">
        <v-icon color="dark" left>mdi-calendar-outline</v-icon>
        Eventos
        <v-spacer></v-spacer>

        <v-btn
          v-if="role !== 'NIVEL1'"
          :to="{ path: 'evento/adicionar' }"
          color="success"
          class="white--text"
        >
          <v-icon left> mdi-plus</v-icon>
          Adicionar
        </v-btn>
      </v-card-title>
      <v-row class="pa-2">
        <v-col
          class="py-0 pl-4 my-5 d-flex justify-center align-center"
          v-for="(evento, i) in eventos"
          :key="i"
          cols="12"
          md="12"
        >
          <v-card
            width="100%"
            max-width="1200px"
            :to="{ path: 'evento/' + evento.id }"
          >
            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-card
                  tile
                  flat
                  height="220px"
                  max-height="220px"
                  max-width="280px"
                  class="fill-height justify-center align-center d-flex"
                >
                  <v-img
                    contain
                    height="220px"
                    max-height="220px"
                    max-width="280px"
                    v-if="evento.img_encontro"
                    :src="evento.img_encontro"
                  >
                  </v-img>
                  <v-icon v-else size="60" color="info">
                    mdi-image-multiple-outline
                  </v-icon>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                md="8"
                class="px-3 py-1 d-flex justify-space-between"
                style="flex-direction: column"
              >
                <div class="d-flex align-center justify-center">
                  <span
                    class="text-subtitle-1 font-weight-bold text-h5 to-uppercase py-2"
                  >
                    {{ evento.titulo | excerpt(35) }}
                  </span>
                  <v-spacer></v-spacer>
                  <div class="d-block">
                    <div class="d-flex align-center justify-center mt-4">
                      <span class="text-subtitle-1 font-weight-bold mr-4">
                        Data Inicio:
                      </span>
                      <span class="text-h5 text-center pr-2">
                        {{ evento.data_inicio | dateFormat("dd") }}
                      </span>
                      <span class="text-subtitle-1 text-center justify-center">
                        {{ formatData(evento.data_inicio, "MMM") }}
                      </span>
                    </div>
                    <div
                      v-if="evento.data_fim"
                      class="d-flex align-center justify-center"
                    >
                      <span class="text-subtitle-1 font-weight-bold mr-8">
                        Data fim:
                      </span>
                      <span class="text-h5 text-center pr-2">
                        {{ evento.data_fim | dateFormat("dd") }}
                      </span>
                      <span class="text-subtitle-1 text-center justify-center">
                        {{ formatData(evento.data_fim, "MMM") }}
                      </span>
                    </div>
                  </div>
                </div>
                <br />
                <div class="d-flex align-center my-4">
                  <v-spacer></v-spacer>
                  <v-btn text small>
                    <v-icon left>mdi-plus</v-icon>
                    leia mais
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { format, parseISO } from "date-fns";
import dateLocalePortugues from "date-fns/locale/pt-BR";
import { all as fetchEventos } from "@/api/geral/eventos.js";
import { mapState } from "vuex";

export default {
  name: "eventos",

  data() {
    return {
      loading: true,
      eventos: [],
      palestra: {},
      dialogDeleteEncontro: false,
      palestra_id: null,
      ordenar: false,
      search: "",
    };
  },

  components: {},

  computed: {
    ...mapState("Usuario", {
      role: (state) => state.role,
    }),
  },

  methods: {
    goToPalestra(item) {
      this.$router.push({ path: `/eventos/${item.id}` });
    },

    getEventos() {
      this.loading = true;
      fetchEventos()
        .then((response) => {
          this.eventos = response;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    formatData(date, formato) {
      let options = {
        locale: dateLocalePortugues,
      };
      return format(parseISO(date), formato, options);
    },
  },

  mounted() {
    this.getEventos();
  },
};
</script>

<style></style>
