<template>
  <v-container fluid id="addEditLocation" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Batches' }"
          ><v-btn small fab color="primary"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          ></router-link
        >
        {{ formTitle }}</v-card-title
      >
      <v-card-text>
        <v-form ref="batchForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="3" sm="6"
                ><v-text-field
                  v-model="item.batchNo"
                  label="Batch No:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6"
                ><v-text-field
                  v-model="item.quantity"
                  label="Batch Quantity:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6"
                ><v-text-field
                  v-model="item.price"
                  label="Price:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-autocomplete
                  label="Medicine"
                  item-text="name"
                  item-value="name"
                  v-model="item.medicineName"
                  :items="medicineList"
                  color="accent"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="12" sm="6"
                ><v-text-field
                  v-model="item.description"
                  label="Description:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" @click="save">{{
          buttonTitle
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import rules from "@/shared/rules";
import { mapMutations } from "vuex";
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    itemPassed: {
      type: Object,
      default: null,
    },
  },

  data: () => ({
    valid: false,
    rules: rules,
    item: {
      id: null,
      batchNo: "",
      medicineName: "",
      quantity: 0,
      price: null,
      isActive: true,
      isCanceled: false,
    },
    medicineList: [],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Create Batch";
      } else {
        return "Edit Batch Details";
      }
    },

    buttonTitle() {
      if (this.id == null) {
        return "Save";
      } else {
        return "Update";
      }
    },
  },

  async created() {
    this.item = Object.assign({}, this.itemPassed);
    await this.$store.dispatch("getMedicines");
    this.medicineList = this.$store.getters.getMedicines;
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
    async save() {
      // Save the updated or created value to the database.
      if (this.$refs.batchForm.validate() === true) {
        this.item.isActive = true;
        this.item.isCanceled = false;
        if (this.id == null) {
          // new batch
          await this.$store.dispatch("addBatch", this.item);
        } else {
          // existing batch
          await this.$store.dispatch("updateBatch", this.item);
        }

        const error = this.$store.getters.getError;
        if (error.isError === false) {
          this.$router.push({ name: "Batches" });
        }
      }
    },
  },
};
</script>

<style>
</style>