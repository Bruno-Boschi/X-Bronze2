<template>
  <v-container class="grey lighten-5">
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header> {{ item.name }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ item.info }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Email ",
          info: "BrunoBoschi72@gmail.com",
        },
        {
          name: "Numero ",
          info: 45991079974,
        },
        {
          name: "Endereco",
          info: "Foz do iguaçu",
        },
        {
          name: "CEP",
          info: 85856580,
        },
      ],
    };
  },
};
</script>
