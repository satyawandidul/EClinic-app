<template>
  <v-container fluid id="receptionDashboard" tag="section">
    <v-card elevation="5" class="pa-5">
      <v-card-title class="display-2">Today's Appointments</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="4" v-for="doc in doctors" :key="doc.id">
            <patient-list :docName="doc.fullname" :docId="doc.id"></patient-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    doctors: [],
   
  }),

  components: {
    PatientList: () => import("@/components/reception/PatientList.vue"),
  },

  created() {
    this.setIsLoading(true);
    this.fetchData();
    this.setIsLoading(false);
  },

  methods: {
    ...mapMutations({
      setError: "setError",
      setIsLoading: "setIsLoading",
    }),

    ...mapGetters({
      getDoctors: "getDoctors",
    }),

    ...mapActions({
      getUsers: "getUsers",
    }),
    async fetchData() {
      this.doctors = this.getDoctors();
      if (this.doctors.length < 1) {
        await this.getUsers();
      }
      this.doctors = this.getDoctors();
    },
    
  },
  
  
};
</script>

<style>
</style>