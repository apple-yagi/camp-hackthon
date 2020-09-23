<template>
  <v-card>
    <v-card-text>
      <v-row class="pt-5" justify="center">
        <v-col v-show="error" cols="10" sm="8">
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signinInfo.username"
            :rules="usernameRules"
            label="username"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signinInfo.password"
            label="password"
            :rules="passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-layout justify-end>
        <v-btn
          class="mr-3"
          color="orange darken-2"
          dark
          @click="login"
          :loading="isLoading"
        >
          Login
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn @click="close">Cancel</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { SigninInfo } from '@/interfaces/signin-info';
import { usernameRules, passwordRules } from '@/rules';

export default Vue.extend({
  data: () => ({
    isLoading: false,
    showPassword: false,
    signinInfo: {} as SigninInfo,
    usernameRules,
    passwordRules,
    error: '',
  }),
  methods: {
    login() {
      if (!this.signinInfo.username || !this.signinInfo.password) {
        this.error = 'ユーザ名/パスワードを入力してください';
        return;
      }

      this.isLoading = true;
      this.$store
        .dispatch('auth/signIn', this.signinInfo)
        .then((msg) => {
          this.$emit('close-dialog');
        })
        .catch((err) => {
          this.error = err;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    close() {
      this.error = '';
      this.$emit('close-dialog');
    },
  },
});
</script>
