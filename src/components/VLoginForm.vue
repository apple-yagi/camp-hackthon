<template>
  <v-card>
    <v-card-text>
      <v-row justify="center">
        <v-col v-show="error" cols="10" sm="8">
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field v-model="loginInfo.username" label="username"></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field v-model="loginInfo.password" label="password"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-layout justify-end>
        <v-btn @click="login">
          Login
          <v-icon>mdi-keyboard-tab</v-icon>
        </v-btn>
        <v-btn @click="close">Cancel</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { LoginInfo } from "@/interfaces/login-info";

export default Vue.extend({
  data: () => ({
    isLoading: false,
    loginInfo: {} as LoginInfo,
    error: "",
  }),
  methods: {
    login() {
      if (!this.loginInfo.username || !this.loginInfo.password) {
        this.error = "ユーザ名/パスワードを入力してください";
        return;
      }

      this.isLoading = true;
      this.$store
        .dispatch("auth/login", this.loginInfo)
        .then((msg) => {
          alert(msg);
          this.$emit("close-dialog");
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    close() {
      this.error = "";
      this.$emit("close-dialog");
    },
  },
});
</script>