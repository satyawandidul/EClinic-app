<template>
  <div>
    <the-overlay></the-overlay>
    <v-container fluid id="addEditTolerance" tag="section">
      <v-card rounded="lg">
        <v-card-title class="display-2">
          <router-link :to="{ name: 'Tolerances' }"
            ><v-btn small fab color="primary"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            ></router-link
          >
          {{ formTitle }}</v-card-title
        >
        <v-card-text>
          <v-form ref="toleranceForm" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" md="3" sm="6">
                  <v-autocomplete
                    label="Location"
                    item-text="name"
                    item-value="name"
                    v-model="item.locationName"
                    :items="locationList"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-autocomplete>
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
                <v-col cols="12" md="3" sm="6"
                  ><v-text-field
                    v-model.number="item.lowerLimit"
                    label="Lower CutOff:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6"
                  ><v-text-field
                    v-model.number="item.upperLimit"
                    label="Upper CutOff:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
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
  </div>
</template>

<script>
import rules from "@/shared/rules";
import { mapMutations } from "vuex";
export default {
  components: {
    TheOverlay: () => import("@/components/shared/Overlay"),
  },

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
      locationName: null,
      medicineName: null,
      lowerLimit: 0,
      upperLimit: 0,
    },
    medicineList: [],
    locationList: [],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Set Tolerance";
      } else {
        return "Edit Tolerance Details";
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

    // TODO: Remove the location call to the backend after login component is created.
    await this.$store.dispatch("getLocations");
    this.locationList = this.$store.getters.getLocations;

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
      if (this.$refs.toleranceForm.validate() === true) {
        if (this.item.lowerLimit > this.item.upperLimit) {
          alert("Lower cutoff cannot be greater than upper cutoff");
          return;
        }
        if (this.id == null) {
          // New
          console.log('sending request');
          await this.$store.dispatch("addTolerance", this.item);
        } else {
          // Existing
          await this.$store.dispatch("updateTolerance", this.item);
        }

        const error = this.$store.getters.getError;
        if (error.isError === false) {
          this.$router.push({ name: "Tolerances" });
        }
      }
    },
  },
};
</script>

<style>
</style>