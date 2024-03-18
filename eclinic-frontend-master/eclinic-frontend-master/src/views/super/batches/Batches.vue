<template>
  <div>
    <v-container fluid id="batches" tag="section">
      <v-card rounded="lg">
        <v-card-title class="display-2"
          >Medicine Batches
          <v-spacer></v-spacer>
          <router-link :to="{ name: 'Add New Batch' }"
            ><v-btn color="primary">Create Batch</v-btn></router-link
          >
        </v-card-title>
        <v-data-table
          class="elevation-1"
          :items="items"
          :headers="headers"
          sort-by="batchNo"
          group-by="medicineName"
        >
          <template v-slot:group.header="{ items, isOpen, toggle }">
            <th colspan="5">
              <v-icon @click="toggle">
                {{ isOpen ? "mdi-minus" : "mdi-plus" }}
              </v-icon>
              <span>  {{ items[0].medicineName }}</span>
            </th>
          </template>
          <template v-slot:item.actions="{ item }">
            <router-link
              :to="{
                name: 'Edit Batch Details',
                params: { id: item.id, itemPassed: item },
              }"
              ><v-icon class="mr-2" small>mdi-pencil</v-icon></router-link
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <consultation-view></consultation-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    items: [],
    headers: [
      {
        text: "Batch ID",
        align: "start",
        value: "batchNo",
      },
      { text: "Description", value: "description" },
      { text: "Medicine Name", value: "medicineName" },
      { text: "Batch Quantity", value: "quantity" },
      { text: "Price", value: "price" },
      { text: "Batch Canceled", value: "isCanceled" },
      { text: "Actions", value: "actions" },
    ],
  }),

  components: {
    ConsultationView: () => import("@/views/doctor/ConsultationView.vue"),
  },

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
      await this.$store.dispatch("getBatches");
      this.items = this.$store.getters.getBatches;
    },
  },
};
</script>

<style>
v-btn.v-btn__content {
  color: red;
}
</style>