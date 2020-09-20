<template>
  <div>
    <GmapMap
      class="google-map"
      :center="current.position"
      :zoom="15"
      map-type-id="terrain"
    >
      <GmapMarker
        :icon="flag"
        :position="current.position"
        :clickable="true"
        @click="
          alert(
            `現在地は緯度：${current.position.lat}，経度：${current.position.lng}`
          )
        "
      />
      <GmapMarker
        v-for="(post, i) in posts"
        :key="i"
        :position="{ lat: post.lat, lng: post.lng }"
        :clickable="true"
        :icon="flag"
        @click="show(post)"
      />
    </GmapMap>
    <v-post-detail-dialog
      :dialog="dialog"
      :post="selectedPost"
      @close-dialog="dialog = false"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import VPostDetailDialog from '@/components/VPostDetailDialog.vue';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';
import { Post } from '@/interfaces/post';

export default Vue.extend({
  props: {
    current: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
  components: {
    VPostDetailDialog,
  },
  data: () => ({
    flag:
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    dialog: false,
    selectedPost: {} as Post,
  }),
  methods: {
    alert(msg: string) {
      alert(msg);
    },
    show(post: Post) {
      this.selectedPost = post;
      this.dialog = true;
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
