<template>
  <v-btn @click="changeHour" icon>
    <v-icon>{{ hours[count].icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    hours: [
      { name: "", icon: "mdi-brightness-auto" },
      { name: "早朝", icon: "mdi-brightness-6" },
      { name: "午前", icon: "mdi-brightness-5" },
      { name: "午後", icon: "mdi-brightness-7" },
      { name: "夜", icon: "mdi-brightness-3" },
    ],
    count: 0,
  }),
  methods: {
    async changeHour() {
      this.count++;
      if (this.count === 5) {
        this.count = 0;
      }

      try {
        await this.$store.dispatch("insects/find", this.hours[this.count].name);
      } catch (error) {
        alert(error);
      }
    },
  },
});
</script>