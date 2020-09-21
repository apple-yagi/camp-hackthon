<template>
  <v-dialog
    max-width="800"
    v-model="dialog"
    persistent
    :fullscreen="mobile"
    transition="dialog-bottom-transition"
  >
    <v-toolbar dark color="deep-orange lighten-1">
      <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn @click="close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <slot />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },
  },
  computed: {
    mobile(): boolean {
      return window.innerWidth < 500;
    },
  },
});
</script>