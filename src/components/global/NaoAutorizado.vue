<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-col>
      <v-card
        class="mx-auto px-6 py-12"
        max-width="600px"
        width="100%"
        color="error"
      >
        <div class="mx-auto white--text text-uppercase text-center text-h4">
          Acesso não autorizado.
        </div>

        <div class="mt-10 text-center">
          <v-btn
            :to="{ path: '/home' }"
            x-large
            depressed
            width="150px"
            dark
            class="white--text"
          >
            Voltar
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NaoAutorizado",
};
</script>

<style lang="scss" scoped></style>
