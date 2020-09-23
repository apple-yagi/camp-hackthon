<template>
  <v-card>
    <v-img
      v-if="post.image"
      :src="post.image"
      max-width="100%"
      alt="post image"
    />
    <v-card-title>{{ post.name }}</v-card-title>
    <v-card-text>{{ post.description }}</v-card-text>
    <span v-for="(comment, i) in comments" :key="i">
      {{ comment.id }}:{{ comment.body }}
    </span>
  </v-card>
</template>

<script lang="ts">
import { Insect } from '@/interfaces/insects';
import _comments from '@/utils/comments';
import { Comment } from '@/interfaces/comments';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Insect>,
      required: true,
    },
  },
  data: () => ({
    comments: [] as Comment[],
  }),
  async mounted() {
    try {
      this.comments = await _comments.fetchAll(this.post.id);
    } catch (error) {
      alert(error);
    }
  },
});
</script>
