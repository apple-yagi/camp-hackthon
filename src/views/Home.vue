<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-google-map-card :currentPosition="currentPosition" :posts="posts" />
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VGoogleMapCard from "@/components/VGoogleMapCard.vue";
import {
  GeolocationPosition,
  GeoError,
} from "@/interfaces/geolocation-position";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";
import _location from "@/utils/location";
import _insects from "@/utils/insects";
import { Post } from "@/interfaces/post";

export default Vue.extend({
  name: "Home",
  components: {
    VGoogleMapCard,
  },
  data: () => ({
    loading: true,
    currentPosition: {} as GoogleMapsMarker,
    posts: [] as Post[],
  }),
  async mounted() {
    try {
      const result = await Promise.all([
        _insects.fetchAll(),
        _location.loadCurrentPosition(),
      ]);

      this.posts = result[0];
      this.currentPosition = {
        position: {
          lat: result[1].coords.latitude,
          lng: result[1].coords.longitude,
        },
      };
    } catch (error) {
      alert("エラーが発生しました");
    }
    this.loading = false;
  },
});
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
}
</style>
