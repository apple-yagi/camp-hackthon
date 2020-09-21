<template>
  <v-app>
    <v-app-bar app color="deep-orange lighten-1" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-access-point-network</v-icon>

        <h1>Geolocation</h1>
      </div>

      <v-spacer />

      <v-btn v-if="uid" class="mr-2" @click.stop="postFormDialog = true" outlined>
        投稿
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-else class="mr-2" @click.stop="loginFormDialog = true" outlined>ログイン</v-btn>

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
import { mapState } from "vuex";
import { AuthState } from "./interfaces/store";

export default Vue.extend({
  name: "App",
  components: {
    VCustomDialog,
    VPostForm,
    VLoginForm,
  },
  data: () => ({
    postFormDialog: false,
    loginFormDialog: false,
    postFormTitle: "Post Form",
    loginFormTitle: "Login From",
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