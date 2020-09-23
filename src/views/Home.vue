<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-google-map-card :currentPosition="currentPosition" :posts="insects" />
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VGoogleMapCard from '@/components/VGoogleMapCard.vue';
import {
  GeolocationPosition,
  GeoError,
} from '@/interfaces/geolocation-position';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';
import _location from '@/utils/location';
import _insects from '@/utils/insects';
import { Insect } from '@/interfaces/insects';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Home',
  components: {
    VGoogleMapCard,
  },
  data: () => ({
    loading: true,
    currentPosition: {},
    insectChannel: null,
  }),
  async mounted() {
    try {
      const result = await Promise.all([
        this.$store.dispatch('insects/load'),
        _location.loadCurrentPosition(),
      ]);

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
  computed: {
    ...mapState('insects', {
      insects: (state: any) => state.insects,
    }),
  },
});
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
}
</style>
