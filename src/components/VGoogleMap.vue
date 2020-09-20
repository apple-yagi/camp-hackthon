<template>
  <div>
    <GmapMap
      :center="marker.position"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { GoogleMapsMarker } from '@/interfaces/google-maps-marker';

export default Vue.extend({
  props: {
    marker: {
      type: Object as PropType<GoogleMapsMarker>,
      required: true,
    },
  },
});
</script>
