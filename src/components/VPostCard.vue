<template>
  <v-card>
    <v-img v-if="post.image" :src="post.image" max-width="100%" alt="post image" />
    <v-card-title>{{ post.title }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Post } from "@/interfaces/post";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
});
</script>
