<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon color="#00897B">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar>
        <v-toolbar-title>Edit Form</v-toolbar-title>
        <v-spacer />
        <v-btn @click.stop="dialog = false" color="indigo" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="11" sm="8">
          <v-img
            class="mx-auto"
            :src="insect.image"
            alt="insect image"
            width="300px"
          />
        </v-col>
        <v-col cols="11" sm="8">
          <v-alert type="error" v-show="error">{{ error }} </v-alert>
        </v-col>
        <v-col cols="11" sm="8">
          <v-text-field
            outlined
            label="Name"
            :rules="insectNameRules"
            v-model="insect.name"
          />
        </v-col>
        <v-col cols="11" sm="8">
          <v-textarea
            v-model="insect.description"
            rows="5"
            label="Description"
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
      <v-layout justify-center>
        <v-checkbox label="Question" v-model="insect.question" />
      </v-layout>
      <v-card-actions>
        <v-layout justify-end>
          <v-btn
            class="mr-3 mb-3 white--text"
            color="indigo"
            :loading="isLoading"
            @click="submit"
          >
            Update
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
          <v-btn
            class="mr-3 mb-3"
            :loading="isLoading"
            @click.stop="dialog = false"
          >
            Cancel</v-btn
          >
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Insect } from "@/interfaces/insects";
import _insects from "@/utils/insects";
import { insectNameRules } from "@/rules";

export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Insect>,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    insect: {} as Insect,
    isLoading: false,
    insectNameRules,
    error: "",
  }),
  mounted() {
    this.updateInsect();
  },
  methods: {
    async submit() {
      this.isLoading = true;
      try {
        this.error = "";
        await _insects.update(this.insect);
        await this.$store.dispatch("insects/load");
        this.dialog = false;
      } catch (err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    updateInsect() {
      this.insect = JSON.parse(JSON.stringify(this.post));
    },
  },
  watch: {
    post() {
      this.updateInsect();
    },
  },
});
</script>