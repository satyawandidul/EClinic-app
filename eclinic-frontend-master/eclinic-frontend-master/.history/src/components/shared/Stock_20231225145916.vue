<template>
  <v-expansion-panels mb-6 focusable>
    <v-expansion-panel>
      <v-card rounded="lg" class="ma-3">
        <v-card-title class="display-2">Stock
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-data-table class="elevation-1" :items="stock" :headers="headers" sort-by="barcode" group-by="medicineName"
            :items-per-page="15">
            <template v-slot:group.header="{ items, isOpen, toggle }">
              <th colspan="5">
                <v-icon @click="toggle">
                  {{ isOpen ? "mdi-minus" : "mdi-plus" }}
                </v-icon>
                {{ items[0]?.medicineName }} -- Total Pieces: {{ items.length }}
              </th>
            </template>

            <template v-slot:item="{ items }">
              <td>{{ items.name }}</td>
              <!-- <td>{{ item.medicineName }}</td> -->
              <!-- <td>{{ item.price }}</td>
              <td>{{ item.isInTransit }}</td>
              <td>{{ item.isAvailable }}</td> -->
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
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
    items: [],
    stock: [],
    headers: [
      { text: "Barcode", align: "start", value: "barcode" },
      { text: "Medicine Name", value: "medicineName" },
      { text: "Price", value: "price" },
      { text: "Is In Transit", value: "isInTransit" },
      { text: "Is Available", value: "isAvailable" },
    ],
    tolerances: [],
  }),

  async mounted() {
    await this.fetchStocks();
  },

  methods: {
    async fetchStocks() {
      await this.$store.dispatch("getLocationStock", {
        locationId: this.locationId,
      });
      this.items = this.$store.getters.getLocationStock(this.locationId);
      this.stock = this.items?.inventory || [];
      console.log(this.stock);

    },

  },
};
</script>

<style></style>
