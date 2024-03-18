<template>
  <v-container fluid id="addEditLocation" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Locations' }"
          ><v-btn small fab color="primary"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          ></router-link
        >
        {{ formTitle }}</v-card-title
      >
      <v-card-text>
        <v-form ref="locationForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.name"
                  label="Location Name:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="item.address"
                  label="Location Address:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  v-model="item.gstNo"
                  label="Location GST No:"
                  color="accent"
                  @keyup="convertToUpper"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="item.pincode"
                  label="Location Pincode:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="item.shortCode"
                  label="Location Short Code:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  v-model="item.isFranchaise"
                  label="Is a Franchaise?:"
                  color="accent"
                  :rules="[rules.required]"
                  :items="frachaiseList"
                ></v-select>
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
      address: "",
      pincode: null,
      gstNo: null,
      shortCode: "",
      isFranchaise: false,
      isActive: true,
    },
    frachaiseList: ["Yes", "No"],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add Location";
      } else {
        return "Edit Location Details";
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
      if (this.$refs.locationForm.validate() === true) {
        const location = Object.assign({}, this.item);
        location.isFranchaise = this.item.isFranchaise === "Yes" ? true : false;
        location.isActive = true;
        if (this.id == null) {
          // New Location
          await this.$store.dispatch("addLocation", location);
        } else {
          // Existing Location
          await this.$store.dispatch("updateLocation", location);
        }

        const error = this.$store.getters.getError;
        console.log(error);
        // Check errors, if error then wait here.
        if (error.isError == false) {
          this.$router.push({ name: "Locations" });
        }
      }
    },

    convertToUpper() {
      if (this.item.gstNo != null)
        this.item.gstNo = this.item.gstNo.toUpperCase();
    },
  },
};
</script>

<style>
</style>