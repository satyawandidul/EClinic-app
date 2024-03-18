/* __placeholder__ */
export default (await import('vue')).defineComponent({
props: {
locationId: {
type: String,
required: true,
},

isAdmin: {
type: Boolean,
required: true,
},
Medicine: {
type: String,
required: true,
},
},

data: () => ({
items: [],
collection: [],
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

await this.$store.dispatch("getLocationStock", {
Medicines: this.Medicine,
});
//getMedicines
this.items = this.$store.getters.getLocationStock(this.locationId);
this.collection = this.$store.getters.getLocationStock(this.Medicine);


this.stock = this.items?.inventory || [];
this.stock = this.collection?.inventory || [];



console.log(this.locationId);
// console.log(this.Medicine);
// console.log(this.stock);
console.log(this.items);



},
},
});
