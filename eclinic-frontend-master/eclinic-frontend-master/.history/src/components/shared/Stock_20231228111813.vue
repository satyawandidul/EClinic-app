<template>
  <v-container>
    <v-data-table :items="users" :headers="headers" :items-per-page="15">
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
          <!-- <td>{{ item.shortCode }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.firstname }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.isAvailable }}</td> -->
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
        //   // Make separate requests to different endpoints
        //   const medicinesResponse = await axios.get(`http://127.0.0.1:3000/medicines`);
        //   const usersResponse = await axios.get(`http://127.0.0.1:3000/users`);

        //   // Extract data from responses
        //   const medicinesData = medicinesResponse.data;
        //   const usersData = usersResponse.data;

        //   // Combine or merge the data from both sources
        //   const combinedData = [...medicinesData, ...usersData];

        //   // Assign the combined data to the users property
        //   this.users = combinedData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

  },
};
</script>

<style></style>
