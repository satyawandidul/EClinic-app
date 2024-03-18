<template>
  <v-container fluid id="medicines" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        Medicines
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Add New Medicine' }"
          ><v-btn color="primary">Add Medicine</v-btn></router-link
        >
      </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Edit Medicine Details',
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
        text: "Name",
        align: "start",
        value: "name",
      },
      { text: "Type", value: "type" },
      { text: "Per Bottle Qty", value: "bottleQty" },
      { text: "Dosage Remark", value: "remark" },
      { text: "Morning Dose", value: "morningDose" },
      { text: "Afternoon Dose", value: "afternoonDose" },
      { text: "Evening Dose", value: "eveningDose" },
      { text: "Night Dose", value: "nightDose" },
      { text: "Dosage Unit", value: "unitOfMeasure" },
      { text: "Discount Applicable", value: "isDiscountApplicable" },
      { text: "Franchaise Discount", value: "franchaiseDiscount" },
      { text: "HSN Code", value: "hsnCode"},
      { text: "SGST", value: "sgst" },
      { text: "CGST", value: "cgst" },
      { text: "IGST", value: "igst" },
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
      await this.$store.dispatch("getMedicines");
      this.items = this.$store.getters.getMedicines;
    },
  },
};
</script>

<style>
</style>