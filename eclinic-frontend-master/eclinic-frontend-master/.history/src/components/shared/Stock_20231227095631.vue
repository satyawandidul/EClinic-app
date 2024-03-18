<template>
  <v-container>
    <v-data-table :items="stock" :headers="headers" :items-per-page="15">
      <template v-slot:group.header="{ items, isOpen, toggle }">
        <th colspan="5">
          <v-icon @click="toggle">
            {{ isOpen ? "mdi-minus" : "mdi-plus" }}

          </v-icon>
          {{ items.length > 0 ? items[0].medicineName : 'No Medicine Name' }} -- Total Pieces: {{ items.length }}


        </th>
      </template>


      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.barcode }}</td>
          <td>{{ item.medicineName }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.isInTransit }}</td>
          <td>{{ item.isAvailable }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    locationId: {
      type: String,
      required: true,
    },
    Medicine: {
      type: String,
      required: true,
    },

  },

  data: () => ({
    stock: [], // Initialize as an empty array

    items: [],
    headers: [
      { text: "Barcode", align: "start", value: "barcode" },
      { text: "Medicine Name", value: "medicineName" },
      { text: "Price", value: "price" },
      { text: "Is In Transit", value: "isInTransit" },
      { text: "Is Available", value: "isAvailable" },
    ],
  }),

  async mounted() {
    await this.fetchStocks();
  },

  methods: {
    async fetchStocks() {
      try {
        // Make an API request to fetch medicine data based on locationId
        const response = await axios.get(`/api/medicine?locationId=${this.locationId}`);
        this.stock = response.data; // Assuming the response contains an array of medicine data

        console.log("this.stock:", this.stock);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    },
  },
};
</script>

<style></style>
