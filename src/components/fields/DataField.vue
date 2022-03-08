<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dataTextField"
        :label="label"
        :solo="solo"
        :flat="flat"
        dense
        autocomplete="off"
        v-mask="`##/##/####`"
        @blur="parseDateEmissaoTextField(dataTextField)"
        :error="dataError"
        clearable
        @click:clear="clearDataEntrada"
        :class="classes"
        :rules="obrigatorio ? formRules : []"
        :required="obrigatorio"
        :disabled="disabled"
      >
        <template v-slot:append>
          <v-icon v-bind="attrs" v-on="on">mdi-calendar-range</v-icon>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="dataPicker"
      no-title
      color="blue"
      @input="menu = false"
      :min="data_min"
      :max="data_max"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import {
  format,
  parseISO,
  isValid,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import { inputRequired } from "@/helpers/utils.js";

export default {
  name: "DataField",

  props: {
    disabled: {
      type: [Boolean],
      default: false,
    },
    data_sync: {
      type: [String, Date],
    },
    label: {
      type: String,
      default: "Data",
    },
    solo: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: "",
    },
    obrigatorio: {
      type: Boolean,
      default: false,
    },
    data_min: {
      type: String,
      default: null,
    },
    data_max: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      menu: false,
      dataTextField: null,
      dataPicker: null,
      data: null,
      dataError: false,
      formRules: [inputRequired],
    };
  },

  watch: {
    dataPicker() {
      if (this.dataPicker) {
        const [year, month, day] = this.dataPicker.split("-");
        this.dataTextField = `${day}/${month}/${year}`;
        this.data = this.dataPicker;
        this.dataError = false;
      }
    },
    data() {
      if (this.data) {
        this.$emit("update:data_sync", this.data);
      } else {
        this.$emit("update:data_sync", null);
      }
    },

    data_sync: {
      handler() {
        if (this.data_sync) {
          if (typeof this.data_sync == "object") {
            this.dataPicker = format(this.data_sync, "yyyy-MM-dd");
            this.dataTextField = format(this.data_sync, "dd/MM/yyyy");
            this.data = this.dataPicker;
          } else {
            this.dataPicker = this.data_sync;
            const [year, month, day] = this.dataPicker.split("-");
            this.dataTextField = `${day}/${month}/${year}`;
            this.data = this.dataPicker;
          }
        }
      },
      immediate: true,
    },
  },

  methods: {
    clearDataEntrada() {
      this.data = null;
      this.dataPicker = null;
    },
    validateMinMax(date) {
      let result = false;
      if (this.data_min) {
        if (
          isEqual(date, parseISO(this.data_min)) ||
          isAfter(date, parseISO(this.data_min))
        ) {
          result = true;
        } else {
          result = false;
        }
      }
      if (this.data_max) {
        if (
          isEqual(date, parseISO(this.data_max)) ||
          isBefore(date, parseISO(this.data_max))
        ) {
          result = true;
        } else {
          result = false;
        }
      }

      return result;
    },
    parseDateEmissaoTextField(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      let fixDate = parseISO(`${year}-${month}-${day}`);
      if (isValid(fixDate)) {
        if (this.data_min || this.data_max) {
          if (this.validateMinMax(fixDate)) {
            let formatedDate = format(fixDate, "yyyy-MM-dd");
            this.dataPicker = formatedDate;
            this.data = formatedDate;
            this.dataError = false;
          } else {
            let data_inicio = this.data_min
              ? format(parseISO(this.data_min), "dd/MM/yyyy")
              : null;
            let data_fim = this.data_max
              ? format(parseISO(this.data_max), "dd/MM/yyyy")
              : null;
            this.$toast.error(
              `Data fora do periodo, ${
                data_inicio ? "De: " + data_inicio : ""
              }${data_inicio && data_fim ? " - " : ""}${
                data_fim ? "Ate: " + data_fim : ""
              }!`,
              {
                timeout: 6000,
              }
            );
            this.dataError = true;
          }
        } else {
          let formatedDate = format(fixDate, "yyyy-MM-dd");
          this.dataPicker = formatedDate;
          this.data = formatedDate;
          this.dataError = false;
        }
      } else {
        this.$toast.error("Data invalida!");
        this.dataError = true;
      }
    },
  },
};
</script>

<style lang="scss"></style>
