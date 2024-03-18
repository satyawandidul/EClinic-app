<template>
  <div>
    <the-overlay></the-overlay>
    <v-container fluid id="patients" tag="section">
      <v-card rounded="lg">
        <v-card-title class="display-2"
          >Patients
          <v-spacer></v-spacer>
          <router-link :to="{ name: 'Add New Patient' }"
            ><v-btn color="primary">Add Patient</v-btn></router-link
          >
        </v-card-title>
        <v-data-table class="elevation-1" :items="items" :headers="headers">
          <template v-slot:item.actions="{ item }">
            <router-link
              :to="{
                name: 'Edit Patient Details',
                params: { id: item.id, itemPassed: item, disabled: true },
              }"
              ><v-icon class="mr-2" small>mdi-eye</v-icon></router-link
            >
            <router-link
              :to="{
                name: 'Edit Patient Details',
                params: { id: item.id, itemPassed: item, disabled: false },
              }"
              ><v-icon class="mr-2" small>mdi-pencil</v-icon></router-link
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {
    TheOverlay: () => import("@/components/shared/Overlay"),
  },

  data: () => ({
    items: [],
    headers: [
      {
        text: "patient ID",
        align: "start",
        value: "patientId",
      },
      { text: "Patient Name", value: "fullname" },
      { text: "Gender", value: "gender" },
      { text: "Date of Birth", value: "dob" },
      { text: "Marital Status", value: "maritalStatus" },
      { text: "Contact Number", value: "phone" },
      { text: "Consulting Physician", value: "doctorName" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  created() {
    this.setIsLoading(true);
    this.fetchData();
    this.setIsLoading(true);
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
    ...mapMutations({
      setIsLoading: "setIsLoading",
    }),

    async fetchData() {
      await this.$store.dispatch("getPatients");
      this.items = this.$store.getters.getPatients;
    },
  },
};
</script>

<style>
</style>