<template>
  <v-container fluid id="receipt" tag="section">
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card rounded="lg">
          <v-card-title class="display-2">Invoice</v-card-title>
          <v-card-text>
            <v-form ref="receiptForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="3" sm="6">
                  <v-autocomplete dense
                  label="Select user"
                  item-text="fullname"
                  v-model="patientId"
                  :items="patientsList"
                  :filter="customFilter"
                  return-object
                  color="primary"
                  :rules="[rules.required]"
                  outlined
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-sheet elevation="2" color="white" width="auto" height="600"> </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rules from '@/shared/rules'
export default {
  data: () => ({
    valid: false,
    patientList: [],
    rules: rules,
  }),

  method: {
    customFilter(item, queryText) {
      const textOne = item.fullname.toLowerCase();
      const textTwo = item.patientId.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  }
};
</script>

<style>
</style>