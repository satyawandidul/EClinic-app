<template>
  <div>
    <the-overlay></the-overlay>
    <v-container fluid id="tolerances" tag="section">
      <v-card rounded="lg">
        <v-card-title class="display-2"
          >Medicine Stock Cutoffs
          <v-spacer></v-spacer>
          <router-link :to="{ name: 'Add New Tolerance' }"
            ><v-btn color="primary">Set Tolerance</v-btn></router-link
          >
        </v-card-title>
        <v-data-table class="elevation-1" :items="items" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <router-link
              :to="{
                name: 'Edit Tolerance Details',
                params: { id: item.id, itemPassed: item },
              }"
              ><v-icon class="mr-2" small>mdi-pencil</v-icon></router-link
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {
    TheOverlay: () => import("@/components/shared/Overlay"),
  },

  data: () => ({
    items: [],
    headers: [
      {
        text: "Location Name",
        align: "start",
        value: "locationName",
      },
      { text: "Medicine Name", value: "medicineName" },
      { text: "Lower Tolerance", value: "lowerLimit" },
      { text: "Upper Tolerance", value: "upperLimit" },
      { text: "Actions", value: "actions", sortable: false },
    ],
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
      setError: "setError",
    }),
    ...mapMutations({
      setIsLoading: "setIsLoading",
    }),

    async fetchData() {
      await this.$store.dispatch("getTolerances");
      this.items = this.$store.getters.getTolerances;
    },
  },
};
</script>

<style>
</style>