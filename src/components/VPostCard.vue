<template>
  <v-card>
    <v-img v-if="post.image" :src="post.image" max-width="100%" alt="post image" />
    <v-card-title>{{ post.name }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Insect } from "@/interfaces/insects";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Insect>,
      required: true,
    },
  },
});
</script>
