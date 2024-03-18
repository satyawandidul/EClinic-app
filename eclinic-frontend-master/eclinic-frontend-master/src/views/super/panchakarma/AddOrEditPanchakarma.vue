<template>
  <v-container fluid id="addEditPanchakarma" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Panchakarma' }"
          ><v-btn small fab color="primary"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          ></router-link
        >
        {{ formTitle }}</v-card-title
      >
      <v-card-text>
        <v-form ref="panchakarmaForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="item.name"
                  label="Panchakarma Name:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="item.price"
                  label="Price:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="item.noOfTreatments"
                  label="No Of Treatments:"
                  color="accent"
                  :rules="[rules.required, rules.Number]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="6">
                <v-text-field
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
      name: "",
      description: "",
      price: 0,
      noOfTreatments: 0,
      isActive: true
    },
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add Panchakarma";
      } else {
        return "Edit Panchakarma Details";
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
      if (this.$refs.panchakarmaForm.validate() === true) {
        this.item.isActive = true
        if (this.id == null) {
          // New
          await this.$store.dispatch("addPanchakarma", this.item);
        } else {
          // Existing
          await this.$store.dispatch("updatePanchakarma", this.item);
        }

        const error = this.$store.getters.getError;
        console.log(error);
        // Check errors, if error then wait here.
        if (error.isError == false) {
          this.$router.push({ name: "Panchakarma" });
        }
      }
    },
  },
};
</script>

<style>
</style>