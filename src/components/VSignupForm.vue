<template>
  <v-card>
    <v-card-text>
      <v-row class="pt-5" justify="center">
        <v-col cols="10" v-show="error" sm="8">
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field v-model="signupInfo.username" label="username" outlined></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signupInfo.password"
            label="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="signupInfo.confirm_password"
            label="password"
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
        <v-btn class="mr-3">
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
import Vue from "vue";
import { usernameRules, passwordRules } from "@/rules";
import { SignupInfo } from "@/interfaces/signup-info";

export default Vue.extend({
  data: () => ({
    signupInfo: {} as SignupInfo,
    usernameRules,
    passwordRules,
    showPassword: false,
  }),
  methods: {
    close() {
      this.$emit("close-dialog");
    },
  },
});
</script>