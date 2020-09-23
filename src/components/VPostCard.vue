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
    <v-row justify="center">
      <v-col cols="11">
        <v-textarea v-model="comment.body" label="Comments" outlined rows="2" />
      </v-col>
    </v-row>
    <v-card-actions>
      <v-layout justify-end>
        <v-btn>
          add
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-layout>
    </v-card-actions>
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
    comment: {} as Comment,
    comments: [] as Comment[],
  }),
  async mounted() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      try {
        this.comments = await _comments.fetchAll(this.post.id);
      } catch (error) {
        alert(error);
      }
    },
    async addComment() {
      try {
        await _comments.create(this.post.id, this.comment);
      } catch (error) {
        alert(error);
      }
    },
  },
});
</script>
