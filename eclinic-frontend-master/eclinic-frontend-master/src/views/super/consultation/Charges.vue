<template>
  <v-container fluid id="charges" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2"> Consultation Charges </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Update Consultation Charges',
              params: { id: item.id, itemPassed: item },
            }"
            ><v-icon class="mr-2" small>mdi-pencil</v-icon></router-link
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    items: [],
    headers: [
      {
        text: "New Patient Charges",
        align: "start",
        value: "newPatient",
      },
      { text: "Existing Patient", value: "followUp" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  created() {
    this.setIsLoading(true);
    this.fetchData();
    this.setIsLoading(true);
  },

  beforeDestroy() {
    this.setError({
      isError: false,
      errorMessage: "",
    });
  },

  methods: {
    ...mapMutations({
      setIsLoading: "setIsLoading",
      setError: "setError",
    }),

    async fetchData() {
      await this.$store.dispatch("getCharges");
      this.items = this.$store.getters.getCharges;
    },
  },
};
</script>

<style>
</style>