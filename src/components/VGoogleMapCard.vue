<template>
  <v-card class="google-map-card" :color="cardColor">
    <v-card-title>
      <h3>Google Map</h3>
      <v-search-field />
      <v-question-button />
      <v-hour-button />
    </v-card-title>
    <v-card-text>
      <v-google-map :current="currentPosition" :posts="posts" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import VGoogleMap from "@/components/VGoogleMap.vue";
import VHourButton from "@/components/VHourButton.vue";
import VQuestionButton from "@/components/VQuestionButton.vue";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";
import { Insect } from "@/interfaces/insects";
import Vue, { PropType } from "vue";
import VSearchField from "@/components/VSearchField.vue";

export default Vue.extend({
  props: {
    currentPosition: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
    posts: {
      type: Array as PropType<Insect[]>,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
  components: {
    VGoogleMap,
    VHourButton,
    VQuestionButton,
    VSearchField,
  },
  data: () => ({
    cardColor: "",
  }),
  watch: {
    hour(newVal) {
      switch (newVal) {
        case "早朝":
          this.cardColor = "#CFD8DC";
          break;
        case "午前":
          this.cardColor = "#FFCCBC";
          break;
        case "午後":
          this.cardColor = "#FFAB91";
          break;
        case "夜":
          this.cardColor = "#546E7A";
          break;
        default:
          this.cardColor = "";
          break;
      }
    },
  },
});
</script>

<style scoped>
.google-map-card {
  width: 100%;
  height: 100vh;
}
</style>