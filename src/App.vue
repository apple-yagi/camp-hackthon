<template>
  <v-app>
    <v-app-bar app color="deep-orange lighten-1" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-access-point-network</v-icon>

        <h1>InseCollecTion</h1>
      </div>

      <v-spacer />

      <div v-if="!id" class="d-flex">
        <v-btn
          class="mr-2 hidden-sm-and-down"
          @click.stop="loginFormDialog = true"
          outlined
        >
          <span class="hidden-sm-and-down">ログイン</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn
          class="mr-2 hidden-sm-and-down"
          @click.stop="signupFormDialog = true"
          outlined
        >
          <span class="hidden-sm-and-down">サインアップ</span>
          <v-icon>mdi-account-check</v-icon>
        </v-btn>
        <v-btn class="hidden-sm-and-up" outlined @click.stop="drawer = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>

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

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click.stop="loginFormDialog = true">
            <v-list-item-title>ログイン</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click.stop="signupFormDialog = true">
            <v-list-item-title>サインアップ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="base-setting">
      <router-view />
    </v-main>

    <v-btn
      v-if="id"
      class="mr-2 post-button"
      @click.stop="postFormDialog = true"
      dark
      color="indigo"
      fab
    >
      <v-icon>mdi-telegram</v-icon>
    </v-btn>
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
    drawer: false,
  }),
  computed: {
    ...mapState("auth", {
      id: (state: any) => state.id,
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

.post-button {
  position: absolute;
  bottom: 40px;
  right: 100px;
  z-index: 99;
}

@media screen and (max-width: 500px) {
  .post-button {
    bottom: 10px;
    right: 65px;
  }
}
</style>
