<template>
  <v-app>
    <v-app-bar app color="deep-orange lighten-1" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-access-point-network</v-icon>

        <h1>InseCollection</h1>
      </div>

      <v-spacer />

      <v-btn class="mr-2" @click.stop="postFormDialog = true" outlined>
        <span class="hidden-sm-and-down">投稿</span>
        <v-icon>mdi-telegram</v-icon>
      </v-btn>

      <!-- <div class="d-flex" v-else>
        <v-btn class="mr-2" @click.stop="loginFormDialog = true" outlined>
          <span class="hidden-sm-and-down">ログイン</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn class="mr-2" @click.stop="signupFormDialog = true" outlined>
          <span class="hidden-sm-and-down">サインアップ</span>
          <v-icon>mdi-account-check</v-icon>
        </v-btn>
      </div>-->

      <v-custom-dialog
        :dialog="postFormDialog"
        :title="postFormTitle"
        @close-dialog="postFormDialog = false"
      >
        <v-post-form @close-dialog="postFormDialog = false" />
      </v-custom-dialog>

      <v-custom-dialog
        :dialog="loginFormDialog"
        :title="loginFormTitle"
        @close-dialog="loginFormDialog = false"
      >
        <v-login-form @close-dialog="loginFormDialog = false" />
      </v-custom-dialog>

      <v-custom-dialog
        :dialog="signupFormDialog"
        :title="signupFormTitle"
        @close-dialog="signupFormDialog = false"
      >
        <v-signup-form @close-dialog="signupFormDialog = false" />
      </v-custom-dialog>
    </v-app-bar>

    <v-main class="base-setting">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VCustomDialog from "@/components/utils/VCustomDialog.vue";
import VPostForm from "@/components/VPostForm.vue";
import VLoginForm from "@/components/VLoginForm.vue";
import VSignupForm from "@/components/VSignupForm.vue";
import { mapState } from "vuex";
import { AuthState } from "./interfaces/store";

export default Vue.extend({
  name: "App",
  components: {
    VCustomDialog,
    VPostForm,
    VLoginForm,
    VSignupForm,
  },
  data: () => ({
    postFormDialog: false,
    loginFormDialog: false,
    signupFormDialog: false,
    postFormTitle: "Post Form",
    loginFormTitle: "Login Form",
    signupFormTitle: "Signup Form",
  }),
  computed: {
    ...mapState("auth", {
      uid: (state: any) => state.uid,
    }),
  },
});
</script>

<style>
.base-setting {
  background-color: whitesmoke;
  margin: 0;
  padding: 0;
}
</style>
