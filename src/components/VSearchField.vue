<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-text-field
        label="serach word"
        v-model="searchWord"
        append-outer-icon="mdi-magnify"
        @click:append-outer="search"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    searchWord: "",
    isLoading: false,
  }),
  methods: {
    async search() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("insects/findByWord", this.searchWord);
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
  },
});
</script>