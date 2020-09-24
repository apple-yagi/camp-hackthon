<template>
  <v-card>
    <v-container>
      <v-img
        v-if="post.image"
        :src="post.image"
        max-width="100%"
        alt="post image"
      />
      <div class="d-flex">
        <div>
          <v-card-title class="headline font-weight-bold">{{
            post.name
          }}</v-card-title>
          <v-card-subtitle>
            時間帯 {{ post.hour }}<br />
            投稿時間 {{ post.created_at }}
          </v-card-subtitle>
        </div>
        <v-layout justify-end>
          <v-like-button class="mt-5 mr-3" :insectId="post.id" />
        </v-layout>
        <v-btn
          v-if="uid === post.user_id"
          class="ml-3"
          @click="deleteInsect"
          :loading="isLoading"
        >
          delete
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <h3>{{ post.description }}</h3>
      </v-card-text>
      <v-card-text>
        <h3>コメント</h3>
        <hr />
        <h4 class="my-3" v-for="(comment, index) in comments" :key="index">
          #{{ index + 1 }}<br />
          &nbsp;{{ comment.body }}
        </h4>
      </v-card-text>
      <div v-if="uid">
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
            <v-btn
              @click="addComment"
              :loading="isLoading"
              :disabled="isLoading"
            >
              add
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Insect } from "@/interfaces/insects";
import _comments from "@/utils/comments";
import _insects from "@/utils/insects";
import { Comment } from "@/interfaces/comments";
import Vue, { PropType } from "vue";
import { mapState } from "vuex";
import VLikeButton from "@/components/VLikeButton.vue";

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Insect>,
      required: true,
    },
  },
  components: {
    VLikeButton,
  },
  data: () => ({
    comment: {} as Comment,
    comments: [] as Comment[],
    isLoading: false,
    clickedColor: "",
    error: "",
  }),
  mounted() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      try {
        this.comments = await _comments.fetchAll(this.post.id);
      } catch (err) {
        this.error = err;
      }
    },
    async addComment() {
      this.isLoading = true;
      try {
        this.comment.user_id = this.uid;
        await _comments.create(this.post.id, this.comment);
        await this.loadComments();
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    async deleteInsect() {
      this.isLoading = true;
      try {
        await _insects.remove(this.post.id);
        await this.$store.dispatch("insects/load");
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
      this.$emit("close-dialog");
    },
  },
  watch: {
    post() {
      this.loadComments();
    },
  },
  computed: {
    ...mapState("auth", {
      uid: (state: any) => state.id,
    }),
  },
});
</script>
