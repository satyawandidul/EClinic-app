<template>
  <v-container fluid id="panchakarma" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2"
        >Panchakarma
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Add New Panchakarma' }"
          ><v-btn color="primary">Add Panchakarma</v-btn></router-link
        >
      </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Edit Panchakarma Details',
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
        text: "Panchakarma Name",
        align: "start",
        value: "name",
      },
      { text: "Description", value: "description" },
      { text: "Price", value: "price" },
      { text: "No Of Treatments", value: "noOfTreatments" },
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
      await this.$store.dispatch("getPanchakarma");
      this.items = this.$store.getters.getPanchakarma;
    },
  },
};
</script>

<style>
</style>