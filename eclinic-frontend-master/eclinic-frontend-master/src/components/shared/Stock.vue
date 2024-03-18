
<template>
  <v-expansion-panels mb-6 focusable>
    <v-expansion-panel>

      <v-card rounded="lg" class="ma-3">
        <v-card-title class="display-2">Stock
          <v-spacer></v-spacer>.
        </v-card-title>
        <v-card-text>
          <v-data-table class="elevation-1" :items="stock" :headers="headers" sort-by="barcode" group-by="medicineName"
            :items-per-page="15">
            <template v-slot:group.header="{ items, isOpen, toggle }">
              <th colspan="5">
                <v-icon @click="toggle">
                  {{isOpen ? "mdi-minus" : "mdi-plus"}}
                </v-icon>
                {{items[0].medicineName}} :Total Pieces: {{ items.length }}
              </th>
            </template>
          </v-data-table>
        </v-card-text>
     
      </v-card>

    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from 'vuex';
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
  data() {
  return {
    items: null,
     stock: [
  //    {medicineName: "Dolo-650", locationShortCode: "Pune", locationId: "Pun"},

  //      {medicineName: "Alex-syrup", locationShortCode: "HYD", locationId: "HYD"},
  //      {medicineName: "Amitone", locationShortCode: "Beed", locationId: "Bid"},
  
   ], 
  
    headers: [
      { text: "Barcode", align: "start", value: "barcode" },
      { text: "Medicine Name", value: "medicineName" },
      { text: "Price", value: "price" },
      { text: "Is In Transit", value: "isInTransit" },
      { text: "Is Available", value: "isAvailable" },
    ],
    //tolerances: [],
  };

},
  computed: {
    ...mapGetters(["getLocationStock"]),
  },

  async mounted() {
   await this.fetchStocks();
 },

   //mounted() {
   // this.fetchStocks(); // Call fetchStocks method when component is mounted
  //},


  methods: {
    async fetchStocks() {
  try {
  
    await this.$store.dispatch("getLocationStock", {
      locationId: this.locationId,

    });
    console.log("loc :" , this.locationId);
  
    this.items = this.$store.getters.getLocationStock(this.locationId);
    if (this.items && this.items.inventory) {
       
    } else {
      console.error("Stock data or 'inventory' property is undefined.");
      zz
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
  } finally {  
}
   }
},
    //mounted() {
     // this.fetchStocks();
   // },
  


  // TODO: Get the tolerances here
  // await this.$store.dispatch("getTolerances", this.locationId);
  // this.tolerances = this.$store.getters.getTolerances;

  // console.log(this.items);

  // for (let index in this.items) {
  //   this.items[index].forEach((item) => {
  //     item.balanceQty = this.items[index].reduce(
  //       (sum, value) => sum + value.count,
  //       0
  //     );
  //     item.totalQty = this.items[index].reduce(
  //       (sum, value) => sum + value.batchQty,
  //       0
  //     );
  //     let obj = this.tolerances.find((o) => o.medicineId == index);
  //     if (obj === undefined) {
  //       item.lowerCutOff = -1;
  //       item.upperCutOff = -1;
  //     } else {
  //       item.lowerCutOff = obj.lowerCutOff;
  //       item.upperCutOff = obj.upperCutOff;
  //     }
  //     console.log(item.balanceQty, item.totalQty);
  //   });
  // }

}

</script>

<style></style>

<style></style>