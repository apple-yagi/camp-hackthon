<template>
  <v-card class="pt-5">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="11" sm="8" md="7">
            <v-alert
              max-width="400"
              class="mx-auto"
              v-show="error"
              type="error"
              >{{ error }}</v-alert
            >
          </v-col>
          <v-col cols="11">
            <v-img-field
              @change-file="changeFile"
              @error-occurred="catchError"
            />
          </v-col>
          <v-col cols="11" sm="8">
            <v-text-field
              outlined
              label="Name"
              :rules="titleRules"
              v-model="data.name"
            />
          </v-col>
          <v-col cols="11" sm="8">
            <v-textarea
              v-model="data.description"
              rows="6"
              label="Description"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-row justify="center">
        <GmapMap
          v-if="!mapLoading"
          :center="{
            lat: data.latitude,
            lng: data.longitude,
          }"
          :zoom="15"
          map-type-id="terrain"
          style="width: 500px; height: 300px;"
        >
          <GmapMarker
            :position="{
              lat: data.latitude,
              lng: data.longitude,
            }"
            :draggable="true"
            @drag="updatePosition"
            :icon="flag"
          />
        </GmapMap>
      </v-row>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn
            class="mr-3 mb-3 white--text"
            color="indigo"
            :loading="isLoading"
            :disabled="!valid"
            @click="submit"
          >
            Post
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import VImgField from '@/components/utils/VImgField.vue';
import { CreateInsect } from '@/interfaces/insects';
import _insects from '@/utils/insects';
import _location from '@/utils/location';
import { mapState } from 'vuex';

export default Vue.extend({
  components: {
    VImgField,
  },
  data: () => ({
    valid: true,
    flag: process.env.VUE_APP_FLAG_ICON,
    data: {} as CreateInsect,
    currentPosition: {},
    error: '',
    titleRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) =>
        (v && v.length <= 15) || 'Name must be less than 15 characters',
    ],
    mapLoading: true,
    isLoading: false,
  }),
  async mounted() {
    // 現在地を取得し、Postに含める
    const currentPosition = await _location.loadCurrentPosition();
    this.data.latitude = currentPosition.coords.latitude;
    this.data.longitude = currentPosition.coords.longitude;
    this.mapLoading = false;
  },
  methods: {
    async submit() {
      if (!this.data.image || !this.data.name) {
        this.error = '項目に不足があります';
        return;
      }
      this.isLoading = true;
      try {
        // APIにPost
        this.data.user_id = this.uid;
        const msg = await _insects.create(this.data);
        await this.$store.dispatch('insects/load');
        this.$emit('close-dialog');
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    changeFile(uploadedImage: string | ArrayBuffer) {
      this.data.image = uploadedImage;
    },
    catchError(err: string) {
      this.error = err;
    },
    updatePosition(location: any) {
      this.data.latitude = location.latLng.lat();
      this.data.longitude = location.latLng.lng();
    },
  },
  computed: {
    ...mapState('auth', {
      uid: (state: any) => state.id,
    }),
  },
});
</script>
