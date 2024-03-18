<template>
  <v-container fluid id="addEditTreatment" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Treatments' }"
          ><v-btn small fab color="primary"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          ></router-link
        >
        {{ formTitle }}</v-card-title
      >
      <v-card-text>
        <v-form ref="treatmentForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="item.name"
                  label="Treatment Name:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="item.remark"
                  label="Remark:"
                  color="accent"
                  :rules="[rules.required]"
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
      remark: "",
      isActive: true
    },
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add Treatment";
      } else {
        return "Edit Treatment Details";
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
      if (this.$refs.treatmentForm.validate() === true) {
        this.item.isActive = true
        if (this.id == null) {
          // New
          await this.$store.dispatch("addTreatment", this.item);
        } else {
          // Existing
          await this.$store.dispatch("updateTreatment", this.item);
        }

        const error = this.$store.getters.getError;
        // Check errors, if error then wait here.
        if (error.isError == false) {
          this.$router.push({ name: "Treatments" });
        }
      }
    },
  },
};
</script>

<style>
</style>