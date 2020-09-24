<template>
  <v-btn :color="likesColor" @click="liked" icon>
    <div class="d-flex" style="flex-direction: column">
      <v-icon>mdi-heart</v-icon>
      <span>{{ likesCount }}</span>
    </div>
  </v-btn>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import _likes from "@/utils/likes";

export default Vue.extend({
  props: {
    insectId: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  data: () => ({
    likesCount: 0,
    likesColor: "",
  }),
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      _likes
        .load(this.insectId)
        .then((data) => {
          this.likesCount = data.length;
          this.likesColor = "pink";
        })
        .catch((error) => {
          alert(error);
        });
    },
    async liked() {
      _likes
        .likes(this.insectId)
        .then(() => {
          this.likesColor = "pink";
          this.load();
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    insectId() {
      this.load();
    },
  },
});
</script>