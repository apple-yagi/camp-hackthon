<template>
  <v-card>
    <v-card-text>
      <v-row class="pt-5" justify="center">
        <v-col cols="10" v-show="error" sm="8">
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signupInfo.username"
            label="username"
            :rules="usernameRules"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signupInfo.nickname"
            label="nickname"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signupInfo.password"
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
          @click="signUp"
          :loading="isLoading"
          :disabled="isLoading"
        >
          <span>Signup</span>
          <v-icon>mdi-account-check</v-icon>
        </v-btn>
        <v-btn @click="close" class="mr-3">
          <span>Cancel</span>
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import _auth from '@/utils/auth';
import { usernameRules, passwordRules } from '@/rules';
import { SignupInfo } from '@/interfaces/signup-info';

export default Vue.extend({
  data: () => ({
    signupInfo: {} as SignupInfo,
    error: '',
    usernameRules,
    passwordRules,
    showPassword: false,
    isLoading: false,
  }),
  methods: {
    async signUp() {
      if (
        !this.signupInfo.nickname ||
        !this.signupInfo.username ||
        !this.signupInfo.password
      ) {
        this.error = '空白の項目があります';
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch('auth/signUp', this.signupInfo);
        this.close();
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    close() {
      this.$emit('close-dialog');
    },
  },
});
</script>
