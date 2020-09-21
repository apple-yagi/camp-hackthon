<template>
  <div>
    <GmapMap class="google-map" :center="current.position" :zoom="15" map-type-id="terrain">
      <GmapMarker
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
        :position="{ lat: post.latitude, lng: post.longitude }"
        :clickable="true"
        :icon="flag"
        @click="show(post)"
      />
    </GmapMap>
    <v-custom-dialog :dialog="dialog" :title="title" @close-dialog="dialog = false">
      <slot>
        <v-post-card :post="selectedPost" />
      </slot>
    </v-custom-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import VCustomDialog from "@/components/utils/VCustomDialog.vue";
import VPostCard from "@/components/VPostCard.vue";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";
import { Post } from "@/interfaces/post";

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
    VPostCard,
    VCustomDialog,
  },
  data: () => ({
    flag: process.env.VUE_APP_FLAG_ICON,
    dialog: false,
    title: "Post Card",
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
