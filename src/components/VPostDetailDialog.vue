<template>
  <v-dialog
    max-width="800"
    v-model="dialog"
    persistent
    :fullscreen="mobile"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="deep-orange lighten-1">
        <v-toolbar-title class="font-weight-bold"
          >Detail Dialog</v-toolbar-title
        >
        <v-spacer />
        <v-btn @click="close" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-img
        v-if="post.image"
        :src="post.image"
        max-width="100%"
        alt="post image"
      />
      <v-card-title>{{ post.title }}</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Post } from '@/interfaces/post';
import Vue, { PropType } from 'vue';
export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    dialog: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close-dialog');
    },
  },
  computed: {
    mobile(): boolean {
      return window.innerWidth < 500;
    },
  },
});
</script>
