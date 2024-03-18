<template>
  <v-container fluid id="updateCharges" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Consultation Charges' }"
          ><v-btn small fab color="primary"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          ></router-link
        >
        {{ formTitle }}
      </v-card-title>
      <v-card-text>
        <v-form ref="chargesForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="item.newPatient"
                  label="New Patient Charges:"
                  color="accent"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="item.followUp"
                  label="Old Patient Charges:"
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
        <v-btn color="primary" class="mb-2" @click="save">Update</v-btn>
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
      newPatient: null,
      followUp: null,
    },
  }),

  computed: {
    formTitle() {
      return "Update Consultation Charges";
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
      if (this.$refs.chargesForm.validate() === true) {
        await this.$store.dispatch("updateCharges", this.item);
      }

      const error = this.$store.getters.getError;
      // Check errors, if error then wait here.
      if (error.isError == false) {
        this.$router.push({ name: "Consultation Charges" });
      }
    },
  },
};
</script>

<style>
</style>