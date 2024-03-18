<template>
  <v-container>
    <v-data-table :items="stock" :headers="headers" :items-per-page="15">
      <template v-slot:group.header="{ items, isOpen, toggle }">
        <th colspan="5">
          <v-icon @click="toggle">
            {{ isOpen ? "mdi-minus" : "mdi-plus" }}
          </v-icon>
          {{ item[0]?.medicineName }} -- Total Pieces: {{ items.length }}
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
export default {
  props: {
    locationId: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    stock: [], // Initialize as an empty array
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
        // Simulate a delay to mimic an asynchronous operation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Replace this block with your actual data fetching logic
        // Ensure that you are correctly fetching data for the specified locationId
        // Sample data structure
        this.stock = [
          { barcode: "123", medicineName: "Medicine 1", price: 10, isInTransit: false, isAvailable: true },
          { barcode: "456", medicineName: "Medicine 2", price: 15, isInTransit: true, isAvailable: false },
          // Add more items as needed
        ];


        console.log("this.stock:", this.stock);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    },
  },
};
</script>

<style></style>
