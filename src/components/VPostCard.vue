<template>
  <v-card>
    <v-container>
      <v-img
        v-if="post.image"
        :src="post.image"
        max-width="100%"
        alt="post image"
      />
      <v-card-title>{{ post.name }}</v-card-title>
      <v-card-text>
        <h3>{{ post.description }}</h3>
      </v-card-text>
      <v-card-text>
        <h3>コメント</h3>
        <h4 class="my-3" v-for="(comment, index) in comments" :key="index">
          <hr />
          #{{ comment.id }}<br />
          &nbsp;{{ comment.body }}
        </h4>
      </v-card-text>
      <v-row justify="center">
        <v-col cols="11">
          <v-textarea
            v-model="comment.body"
            label="Comments"
            outlined
            rows="2"
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn @click="addComment" :loading="isLoading" :disabled="isLoading">
            add
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-container>
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
    isLoading: false,
  }),
  mounted() {
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
      this.isLoading = true;
      try {
        await _comments.create(this.post.id, this.comment);
        await this.loadComments();
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
  },
  watch: {
    post() {
      this.loadComments();
    },
  },
});
</script>
