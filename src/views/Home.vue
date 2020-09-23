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

<script>
import VGoogleMapCard from '@/components/VGoogleMapCard.vue';
import {
  GeolocationPosition,
  GeoError,
} from '@/interfaces/geolocation-position';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';
import _location from '@/utils/location';
import _insects from '@/utils/insects';
import { Insect } from '@/interfaces/insects';

export default {
  name: 'Home',
  components: {
    VGoogleMapCard,
  },
  data: () => ({
    loading: true,
    currentPosition: {},
    posts: [],
    insectChannel: null,
  }),
  // created() {
  //   this.insectChannel = this.$cable.subscriptions.create(
  //     { channel: 'InsectChannel' },
  //     {
  //       received(data) {
  //         this.posts.push(data);
  //       },
  //     }
  //   );
  // },
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
      alert('エラーが発生しました');
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
}
</style>
