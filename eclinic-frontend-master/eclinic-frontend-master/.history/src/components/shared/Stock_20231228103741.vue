<template>
  <v-container>
    <v-data-table :items="stock" :headers="headers" :items-per-page="15">
      <template v-slot:group.header="{ items, isOpen, toggle }">
        <th colspan="5">
          <v-icon @click="toggle">
            {{ isOpen ? "mdi-minus" : "mdi-plus" }}
            {{ item.length > 0 ? item[0].medicineName : 'No Medicine Name' }} -- Total Pieces: {{ item.length }}
          </v-icon>



        </th>
      </template>


      <template v-slot:item="{ item, user }">
        <tr>
          <td>{{ item.shortCode }}</td>
          <td>{{ item.name }}</td>
          <td>{{ user.fristname }}</td>
          <td>{{ user.lastname }}</td>
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
    users: [],
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

        // Make a GET request to 'http://127.0.0.1:3000/medicines'
        const response = await axios.get(`http://127.0.0.1:3000/medicines`);

        // Make a GET request to 'http://127.0.0.1:3000/users'
        const user = await axios.get(`http://127.0.0.1:3000/users`);

        // Assign the data from the first request to 'this.user'
        this.users = user.data;

        // Assign the data from the second request to 'this.stock'
        this.stock = user.data;


      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    },
  },
};
</script>

<style></style>
