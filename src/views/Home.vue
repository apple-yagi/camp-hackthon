<template>
  <div class="mt-10">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-google-map :marker="currentPosition" />
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VGoogleMap from "@/components/VGoogleMap.vue";
import {
  GeolocationPosition,
  GeoError,
} from "@/interfaces/geolocation-position";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";

export default Vue.extend({
  name: "Home",
  components: {
    VGoogleMap,
  },
  data: () => ({
    loading: true,
    currentPosition: {} as GoogleMapsMarker,
  }),
  mounted() {
    if (!navigator.geolocation) {
      alert("現在地情報を取得できませんでした");
      return;
    }

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  },
  methods: {
    success(position: GeolocationPosition) {
      this.currentPosition = {
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      };
      this.loading = false;
    },
    error(error: GeoError) {
      switch (error.code) {
        case 1: // PERMISSION_DENIED
          alert("位置情報の利用が許可されていません");
          break;
        case 2: // POSITION_UNAVAILABLE
          alert("現在位置が取得できませんでした");
          break;
        case 3: // TIMEOUT
          alert("タイムアウトになりました");
          break;
        default:
          alert("現在位置が取得できませんでした");
          break;
      }
      this.loading = false;
    },
  },
});
</script>
