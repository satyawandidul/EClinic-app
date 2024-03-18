<!-- <template>
  <v-container fluid tag="section" id="importStock">
    <v-card rounded="lg">
      <v-card-title class="display-2"
        >Import Stock
        <v-spacer></v-spacer>
        <v-file-input
          color="primary"
          label="Click here to import .csv file"
          accept=".csv"
          v-model="file"
        >
        </v-file-input>
        <v-btn color="primary" small @click="loadData">Import</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="elevation-1"
          :items="items"
          :headers="headers"
          sort-by="Batch"
          group-by="Medicine"
          :items-per-page="15"
        >
          <template v-slot:group.header="{ items, isOpen, toggle }">
            <th colspan="5">
              <v-icon @click="toggle">
                {{ isOpen ? "mdi-minus" : "mdi-plus" }}
              </v-icon>
              {{ items[0].Medicine }}
            </th>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn class="primary" @click="save">Import</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    headers: [
      { text: "Barcode", align: "start", value: "Barcode" },
      { text: "BatchNo", value: "Batch" },
      { text: "Medicine", value: "Medicine" },
      { text: "Price", value: "Price" },
    ],
    fileData: null,
    items: [],
    file: null,
  }),

  watch: {
    file(f) {
      if (f) {
        f.text().then((data) => {
          this.data = data;
        });
      }
    },
  },

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
    loadData() {
      const lines = this.data.split("\r\n");
      const header = lines[0].split(",");
      const output = lines.slice(1).map((line) => {
        const fields = line.split(",");
        return Object.fromEntries(header.map((h, i) => [h, fields[i]]));
      });
      // console.log(header);
      // console.log(output);
      this.items = output;
    },

    async save() {
      const barcodes = this.items.map(({ Barcode }) => ({ Barcode }));
      barcodes.locationId = this.id;
      await this.$store.dispatch("createStock", barcodes);

      const error = this.$store.getters.getError;
      if (error.isError == false) {
        this.$router.push({ name: "Stock Overview" });
      }
    },
    cancel() {
      this.items = [];
    },
  },
};
</script>

<style>
</style> -->


<template>
  <h2>hiii</h2>
</template>