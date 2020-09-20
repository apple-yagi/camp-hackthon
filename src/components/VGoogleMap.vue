<template>
  <div>
    <GmapMap class="google-map" :center="marker.position" :zoom="15" map-type-id="terrain">
      <GmapMarker :icon="flag" :position="marker.position" :clickable="true" @click="show" />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { GoogleMapsMarker } from "@/interfaces/google-maps-marker";

export default Vue.extend({
  props: {
    marker: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
  },
  data: () => ({
    flag:
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  }),
  methods: {
    show() {
      alert(this.marker);
    },
  },
});
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 700px;
}

@media screen and (max-width: 400px) {
  .google-map {
    height: 600px;
  }
}
</style>