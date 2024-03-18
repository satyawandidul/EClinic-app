<template>
  <v-container>
    <v-data-table :items="stock, users" :headers="headers" :items-per-page="15">
      <template v-slot:group.header="{ items, isOpen, toggle }">
        <th colspan="5">
          <v-icon @click="toggle">
            {{ isOpen ? "mdi-minus" : "mdi-plus" }}
            {{ items.length > 0 ? items[0].medicineName : 'No Medicine Name' }} -- Total Pieces: {{ items.length }}
          </v-icon>
        </th>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.shortCode }}</td>
          <td>{{ item.name }}</td>
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
    users: [],
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
        const response = await axios.get(`http://127.0.0.1:3000/medicines`);

        const user = await axios.get(`http://127.0.0.1:3000/users`);
        this.users = user.data;
        this.stock = response.data;
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    },
  },
};
</script>

<style></style>
