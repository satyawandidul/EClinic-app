<template>
  <v-container fluid id="addEditMedicine" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Medicines' }">
          <v-btn small fab color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
        {{ formTitle }}
      </v-card-title>
      <v-card-text>
        <v-form ref="medicineForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.name"
                  label="Medicine Name:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-select
                  v-model="item.type"
                  label="Medicine Type:"
                  color="accent"
                  :rules="[rules.required]"
                  :items="medicineTypes"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.bottleQty"
                  label="Per Bottle Quantity:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-select
                  v-model="item.unitOfMeasure"
                  label="Unit:"
                  color="accent"
                  :rules="[rules.required]"
                  :items="units"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.morningDose"
                  label="Morning Dose:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.afternoonDose"
                  label="Afternoon Dose:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.eveningDose"
                  label="Evening Dose:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.nightDose"
                  label="Night Dose:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.hsnCode"
                  label="HSN Code:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model.number="item.sgst"
                  label="State GST:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model.number="item.cgst"
                  label="Central GST:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model.number="item.igst"
                  label="Integrated GST:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.shortCode"
                    label="Medicine Short Code:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.isDiscountApplicable"
                    label="Discount Applicable:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="discountValues"
                  ></v-select>
                </v-col>
              <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.franchaiseDiscount"
                    label="Franchaise Discount:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.remark"
                  label="Dosage Remark:"
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
      name: "",
      type: "",
      shortCode: "",
      bottleQty: 0,
      remark: "",
      morningDose: null,
      afternoonDose: null,
      eveningDose: null,
      nightDose: null,
      unitOfMeasure: "",
      isDiscountApplicable: false,
      franchaiseDiscount: 0,
      hsnCode: "",
      cgst: 0,
      sgst: 0,
      igst: 0,
      isActive: true,
    },
    units: ["gm", "ml", "pcs", "tbsp", "tsp"],
    discountValues: ["Yes", "No"],
    medicineTypes: [
      "Balm",
      "Churna",
      "Cosmetics",
      "Ghruta",
      "Liquid",
      "Oil",
      "Soap",
      "Syrup",
      "Tablet",
    ],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add Medicine";
      } else {
        return "Edit Medicine Details";
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

  created() {
    this.item = Object.assign({}, this.itemPassed);
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
      if (this.$refs.medicineForm.validate() === true) {
        const medicine = Object.assign({}, this.item);
        medicine.isDiscountApplicable =
          medicine.isDiscountApplicable === "Yes" ? true : false;
        medicine.isActive = true;
        // Check if gst is same
        if (
          this.item.sgst !== this.item.cgst ||
          this.item.sgst * 2 != this.item.igst
        ) {
          alert(
            "GST values are incorrect, SGST and CGST should be same. IGST should be sum of SGST and CGST"
          );
          return;
        }
        if (this.id == null) {
          // New Medicine
          await this.$store.dispatch("addMedicine", medicine);
        } else {
          // Existing Medicine
          await this.$store.dispatch("updateMedicine", medicine);
        }

        const error = this.$store.getters.getError;
        console.log(error);
        // Check errors, if error then wait here.
        if (error.isError == false) {
          this.$router.push({ name: "Medicines" });
        }
      }
    },
  },
};
</script>

<style>
</style>