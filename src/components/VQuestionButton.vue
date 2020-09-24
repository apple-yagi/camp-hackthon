<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        @click="fetchQuestion"
        icon
        color="#00796B"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Question</v-toolbar-title>
        <v-spacer />
        <v-btn @click.stop="dialog = false" color="indigo" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row style="margin: 0; padding: 0">
        <v-col
          cols="12"
          sm="5"
          md="4"
          v-for="(question, i) in questions"
          :key="i"
        >
          <v-post-card :post="question" />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Insect } from "@/interfaces/insects";
import _question from "@/utils/question";
import VPostCard from "@/components/VPostCard.vue";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    VPostCard,
  },
  data: () => ({
    dialog: false,
    comment: {} as Comment,
    questions: [] as Insect[],
  }),
  methods: {
    async fetchQuestion() {
      try {
        this.questions = await _question.loadAll();
        if (!this.questions.length) {
          alert("現在、Questionはありません");
          this.dialog = false;
        }
      } catch (error) {
        alert(error);
        this.dialog = false;
      }
    },
  },
});
</script>