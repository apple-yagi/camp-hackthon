<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-card class="google-map-card">
        <v-card-title>Current Position</v-card-title>
        <v-card-text>
          <v-google-map :marker="currentPosition" />
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

export default Vue.extend({
  name: 'Home',
  components: {
    VGoogleMap,
  },
  data: () => ({
    loading: true,
    currentPosition: {} as GoogleMapsMarker,
  }),
  mounted() {
    _location
      .loadCurrentPosition()
      .then((position) => {
        this.currentPosition = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };
      })
      .catch((error: GeoError) => {
        alert('現在位置が取得できませんでした');
      })
      .finally(() => {
        this.loading = false;
      });
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
