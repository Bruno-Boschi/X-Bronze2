<template>
  <v-dialog
    v-model="dialogDeleteUser"
    max-width="500px"
    @click:outside="$emit('update:dialogDeleteUser', false)"
    @keydown.esc="$emit('update:dialogDeleteUser', false)"
  >
    <v-card>
      <v-card-title class="text-h5">
        Certeza que deseja deletar esse item?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('update:dialogDeleteUser', false)"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" text @click="deleteItem()">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogDeleteUser",

  props: {
    dialogDeleteUser: {
      type: Boolean,
      default: false,
    },
    usuario_index: {
      type: Number,
    },
  },

  data() {
    return {};
  },
  methods: {
    deleteItem() {
      this.$emit("delete-user", this.usuario_index);
      this.$emit("update:dialogDeleteUser", false);
    },
  },
};
</script>

<style></style>
