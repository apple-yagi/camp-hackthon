<template>
  <v-card class="pt-5">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="11" sm="8" md="7">
            <v-alert
              max-width="400"
              class="mx-auto"
              v-show="error"
              type="error"
              >{{ error }}</v-alert
            >
          </v-col>
          <v-col cols="11">
            <v-img-field
              @change-file="changeFile"
              @error-occurred="catchError"
            />
          </v-col>
          <v-col cols="11" sm="8">
            <v-text-field
              outlined
              label="タイトル"
              :rules="titleRules"
              v-model="data.title"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn
            class="mr-3 mb-3 white--text"
            color="indigo"
            :loading="isLoading"
            :disabled="!valid"
            @click="submit(data)"
            >Post<v-icon>mdi-telegram</v-icon></v-btn
          >
        </v-layout>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import VImgField from '@/components/utils/VImgField.vue';
import { Post } from '@/interfaces/post';
import _posts from '@/utils/posts';
import _location from '@/utils/location';

export default Vue.extend({
  components: {
    VImgField,
  },
  data: () => ({
    valid: true,
    data: {} as Post,
    error: '',
    titleRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) =>
        (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    isLoading: false,
  }),
  methods: {
    async submit(post: Post) {
      if (!post.image) {
        this.error = '項目に不足があります';
        return;
      }
      this.isLoading = true;
      try {
        // 現在地を取得し、Postに含める
        const currentPosition = await _location.loadCurrentPosition();
        post.lat = currentPosition.coords.latitude;
        post.lng = currentPosition.coords.longitude;

        // APIにPostし、登録
        const msg = await _posts.create(post);
        alert(msg);
        this.$emit('close-dialog');
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    changeFile(file: File) {
      this.data.image = file;
    },
    catchError(err: string) {
      this.error = err;
    },
  },
});
</script>
