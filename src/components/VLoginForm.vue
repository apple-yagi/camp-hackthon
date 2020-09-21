<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="10" sm="8" md="6">
          <v-text-field v-model="loginInfo.email" label="email"></v-text-field>
        </v-col>
        <v-col cols="10" sm="8" md="6">
          <v-text-field v-model="loginInfo.password" label="password"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="login">
        Login
        <v-icon>mdi-keyboard-tab</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { LoginInfo } from "@/interfaces/login-info";

export default Vue.extend({
  data: () => ({
    loginInfo: {} as LoginInfo,
  }),
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", this.loginInfo)
        .then((msg) => {
          alert(msg);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});
</script>