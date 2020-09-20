<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-card class="google-map-card">
        <v-card-title>Current Position</v-card-title>
        <v-card-text>
          <v-google-map :marker="currentPosition" :posts="posts" />
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VGoogleMap from '@/components/VGoogleMap.vue';
import {
  GeolocationPosition,
  GeoError,
} from '@/interfaces/geolocation-position';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';
import _location from '@/utils/location';
import _posts from '@/utils/posts';
import { Post } from '@/interfaces/post';

export default Vue.extend({
  name: 'Home',
  components: {
    VGoogleMap,
  },
  data: () => ({
    loading: true,
    currentPosition: {} as GoogleMapsMarker,
    posts: [] as Post[],
  }),
  async mounted() {
    try {
      const result = await Promise.all([
        _posts.fetchAll(),
        _location.loadCurrentPosition(),
      ]);

      this.posts = result[0];
      this.currentPosition = {
        position: {
          lat: result[1].coords.latitude,
          lng: result[1].coords.longitude,
        },
      };
      this.loading = false;
    } catch (error) {
      alert('エラーが発生しました');
    }
  },
});
</script>

<style scoped>
.home {
  margin-top: 30px;
}

.google-map-card {
  width: 90%;
}

@media screen and (max-width: 600px) {
  .home {
    margin: 0;
    padding: 0;
  }

  .google-map-card {
    width: 100%;
  }
}
</style>
