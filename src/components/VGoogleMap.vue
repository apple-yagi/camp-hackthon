<template>
  <div>
    <GmapMap
      :center="marker.position"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
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
