<template>
  <v-container fluid id="locations" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2"
        >Clinic Addresses
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Add New Location' }"
          ><v-btn color="primary">Add Location</v-btn></router-link
        >
      </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Edit Location Details',
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
      { text: "Name", align: "start", value: "name" },
      { text: "Short Code", value: "shortCode" },
      { text: "Address", value: "address" },
      { text: "Pincode", value: "pincode" },
      { text: "GST No", value: 'gstNo'},
      { text: "Is a franchaise ?", value: "isFranchaise" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  created() {
    // this.setIsLoading(true);
    this.fetchData();
    // this.setIsLoading(false);
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
      await this.$store.dispatch("getLocations");
      this.items = this.$store.getters.getLocations;
    },
  },
};
</script>

<style>
</style>