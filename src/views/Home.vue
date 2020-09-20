<template>
  <div class="home">
    <v-google-map />
  </div>
</template>

<script>
import VGoogleMap from '@/components/VGoogleMap.vue';

export default {
  name: 'Home',
  components: {
    VGoogleMap,
  },
};
</script>
