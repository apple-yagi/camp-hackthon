<template>
  <v-btn @click="destroy" color="red" icon>
    <v-icon>mdi-bookmark-check</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import _question from "@/utils/question";

export default Vue.extend({
  props: {
    insectId: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  methods: {
    destroy() {
      _question
        .destroy(this.insectId)
        .then(async () => {
          try {
            await this.$store.dispatch("insects/load");
          } catch (error) {
            alert(error);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
});
</script>