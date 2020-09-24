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
        <v-layout class="mt-3" justify-end>
          <v-like-button :insectId="post.id" />
          <v-btn
            v-if="uid === post.user_id"
            @click="deleteInsect"
            :loading="isLoading"
            color="teal darken-2"
            icon
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-layout>
      </div>
      <v-card-text>
        <h3>{{ post.description }}</h3>
      </v-card-text>
      <v-card-text>
        <h3>コメント</h3>
        <hr />
        <h4 class="my-3" v-for="(comment, index) in comments" :key="index">
          <v-username :uid="comment.user_id" /><br />
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
import VUsername from "@/components/VUsername.vue";

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Insect>,
      required: true,
    },
  },
  components: {
    VLikeButton,
    VUsername,
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
        this.comment.body = "";
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    async deleteInsect() {
      if (!window.confirm("投稿を削除してもよろしいですか？")) {
        return;
      }
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
