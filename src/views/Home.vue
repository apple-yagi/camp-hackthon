<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <v-progress-circular :size="50" width="7" color="primary" indeterminate />
    </div>
    <v-layout v-else justify-center>
      <v-card class="google-map-card">
        <v-card-title>
          <h3>Google Map</h3>
          <v-spacer />
          <v-btn
            class="mr-2"
            @click.stop="formDialog = true"
            outlined
            dark
            color="indigo"
            icon
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-google-map :current="currentPosition" :posts="posts" />
        </v-card-text>
      </v-card>
    </v-layout>
    <v-custom-dialog
      :dialog="formDialog"
      :title="title"
      @close-dialog="formDialog = false"
    >
      <v-post-form @close-dialog="formDialog = false" />
    </v-custom-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VGoogleMap from '@/components/VGoogleMap.vue';
import VCustomDialog from '@/components/utils/VCustomDialog.vue';
import VPostForm from '@/components/VPostForm.vue';
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
    VCustomDialog,
    VPostForm,
  },
  data: () => ({
    loading: true,
    formDialog: false,
    title: 'Post Form',
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
    height: 91vh;
  }
}
</style>
