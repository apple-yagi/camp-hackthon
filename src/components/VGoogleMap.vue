<template>
  <div>
    <GmapMap
      class="google-map"
      :center="marker.position"
      :zoom="15"
      map-type-id="terrain"
    >
      <GmapMarker
        :icon="flag"
        :position="marker.position"
        :clickable="true"
        @click="
          show(
            `現在地は緯度：${marker.position.lat}，経度：${marker.position.lng}`
          )
        "
      />
      <GmapMarker
        v-for="(post, i) in posts"
        :key="i"
        :position="{ lat: post.lat, lng: post.lng }"
        :clickable="true"
        :icon="flag"
        @click="show(post.title)"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';
import { Post } from '@/interfaces/post';

export default Vue.extend({
  props: {
    marker: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
  data: () => ({
    flag:
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  }),
  methods: {
    show(message: string) {
      alert(message);
    },
  },
});
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 550px;
}

@media screen and (max-width: 400px) {
  .google-map {
    height: 500px;
  }
}
</style>
