<template>
  <v-card class="google-map-card">
    <v-card-title>
      <h3>Google Map</h3>
    </v-card-title>
    <v-card-text>
      <v-google-map :current="currentPosition" :posts="posts" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import VGoogleMap from "@/components/VGoogleMap.vue";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";
import { Insect } from "@/interfaces/insects";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    currentPosition: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
    posts: {
      type: Array as PropType<Insect[]>,
      required: true,
    },
  },
  components: {
    VGoogleMap,
  },
});
</script>

<style scoped>
.google-map-card {
  width: 100%;
  height: 100vh;
}
</style>