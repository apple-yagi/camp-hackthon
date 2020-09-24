<template>
  <h4>
    {{ username }}
  </h4>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import _users from "@/utils/users";

export default Vue.extend({
  props: {
    uid: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  data: () => ({
    username: "",
  }),
  mounted() {
    _users
      .show(this.uid)
      .then((user) => {
        this.username = user.username;
      })
      .catch((error) => {
        this.username = error;
      });
  },
});
</script>