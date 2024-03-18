<template>
  <v-container fluid id="treatments" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2"
        >Treatments
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Add New Treatment' }"
          ><v-btn color="primary">Add Treatment</v-btn></router-link
        >
      </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Edit Treatment Details',
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
    headers: [
      {
        text: "Treatment Name",
        align: "start",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Remarks", value: "remark" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
  }),

  created() {
    this.setIsLoading(true);
    this.fetchData();
    this.setIsLoading(true);
  },

  mounted() {},

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
      await this.$store.dispatch("getTreatments");
      this.items = this.$store.getters.getTreatments;
    },
  },
};
</script>

<style>
</style>