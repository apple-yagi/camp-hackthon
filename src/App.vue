<template>
  <v-app>
    <v-app-bar app color="deep-orange lighten-1" dark>
      <div class="d-flex align-center">
        <v-icon large>mdi-access-point-network</v-icon>

        <h1>Geolocation</h1>
      </div>
    </v-app-bar>

    <v-main class="base-setting">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style>
.base-setting {
  background-color: whitesmoke;
  margin: 0;
  padding: 0;
}
</style>