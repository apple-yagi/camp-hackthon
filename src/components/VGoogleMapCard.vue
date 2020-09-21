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
import { Post } from "@/interfaces/post";
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    currentPosition: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
  components: {
    VGoogleMap,
  },
});
</script>