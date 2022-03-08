<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="brown lighten-1">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Login"
                    flat
                    full-width
                    type="email"
                    v-model="login.email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="senha"
                    label="Senha"
                    full-width
                    flat
                    v-model="login.senha"
                    class="input-group--focused mt-1"
                    @click:append="show = !show"
                    @keyup.enter="logar"
                  ></v-text-field>
                  <v-checkbox
                    class="ma-0"
                    color="secondary"
                    v-model="checkbox"
                    label="Lembrar Email"
                  >
                  </v-checkbox>
                </v-form>
                <template v-if="erros.length > 0">
                  <v-card-text class="pa-0 mb-4 red--text">
                    <div
                      class="py-1"
                      v-for="(erro, index) in erros"
                      :key="index"
                    >
                      <v-icon class="mr-2 red--text">mdi-alert-circle</v-icon>
                      <span>{{ erro }}</span>
                    </div>
                  </v-card-text>
                </template>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click.prevent="logar"
                  x-large
                  max-height="50px"
                  color="secondary"
                  class="mt-1 px-8 white--text"
                  :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      show: false,
      loading: false,
      checkbox: false,
      login: {
        email: "",
        senha: "",
      },
      erros: [],
      rules: {
        //rules faz a verificaçao obrigatorias de campos
        required: (value) => !!value || "obrigatório",
        min: (v) => v.length >= 3 || "min 3 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "email inválido";
        },
      },
    };
  },

  computed: {
    ...mapState("Usuario", {
      role: (state) => state.role,
    }), //puxa a role do usuario.store.js
  },

  methods: {
    async logar() {
      try {
        this.loading = true;
        this.erros = [];
        this.$Progress.start(); // estarta barra de carregamento

        await this.$store.dispatch("Usuario/logarUsuario", this.login); //em forma de promisse, despacha as informacoes para a funçao logarusuario localizada em usuario.store.js, aguardando a respostas. Dando continuidade ou nao.

        const email = this.$ls.get("email"); //puxar direto da memoria do browser o valor do email

        if (email && !this.checkbox) {
          // um ternario onde verifica se existe o valor email na memoria do browser
          this.$ls.remove("email"); // caso exista e o chuckbox estiver desativada, remomve o valor de email da memoria
        }
        if (this.checkbox) {
          this.$ls.set("email", this.login.email); //aqui se a chuckbox estiver ativada, ele grava na memoria o valor email
        }
        //terminando o primeiro ciclo
        await this.$store.dispatch("Usuario/getUsuario"); // solicita o getUsuario q esta no usuario.store.js, para gerar  profile.

        this.$router.push({ path: "/" }); // logo depois de tudo dar certo, sera direcionado para home

        this.loading = false;
        this.$Progress.finish();
      } catch (error) {
        // casoa alguma coisa der errado nos await, sera retornado error de "error.response.status" localizada em axios_services na funçao error
        if (error.response.status === 401) {
          this.erros.push("Dados incorretos, acesso não autorizado");
        }
        this.loading = false;
        this.$Progress.fail(); // termina a barra de carregamento
      }
    },
  },

  mounted() {
    const email = this.$ls.get("email"); // caso a checkbox estiver true, sera setado automaticamento o email gravado na memoria do brownser, como fez na linha 164
    if (email) {
      this.login.email = email;
      this.checkbox = true;
    }

    if (process.env.VUE_APP_SENHA_MICHEL) {
      this.login.senha = process.env.VUE_APP_SENHA_MICHEL;
    }

    // basenodes();
  },
};
</script>

<style></style>
