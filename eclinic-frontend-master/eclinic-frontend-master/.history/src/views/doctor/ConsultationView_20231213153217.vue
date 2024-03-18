<template>
  <v-container fluid id="consultationView" tag="section">
    <v-card rounded="lg" class="pa-1">
      <v-card-title class="display-2">Patient Visit Details</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="3">
            <!-- This is the place where we put the patient details and panchakarma list -->
            <v-card elevation="5" height="90%" class="overflow">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Patient Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name: {{ patient.name }}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth: {{ patient.dob }}</td>
                    </tr>
                    <tr>
                      <td>Occupation: {{ patient.occupation }}</td>
                    </tr>
                    <tr>
                      <td>Details: {{ patient.occupationDetails }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <v-col cols="12" lg="7">
            <v-card elevation="5" height="90%">
              <v-card-title>Consultation Details</v-card-title>
              <v-card-text>
                <v-form ref="consultationForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Major Complaints"
                        v-model="visit.majorComplaints"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Past History" v-model="visit.pastHistory"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Investigations" v-model="visit.investigation"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Other Examinations" v-model="visit.otherExams"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Other Medicines" v-model="visit.otherMedicines"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete v-model="visit.diagnosis" multiple deletable-chips chips label="Diagnosis"
                        :items="diagnosisList"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete v-model="visit.pulse" multiple deletable-chips chips :items="pulseList"
                        label="Pulse"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-autocomplete v-model="visit.srotas" multiple deletable-chips chips :items="srotasList"
                        label="Srotas"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea auto-grow rows="1" label="Followup Remark" v-model="visit.remark"></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select label="Discount" :items="discountList" v-model="visit.discount"></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Next visit in" v-model="visit.apptDays"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select :items="yesNoList" label="Is a Testimonial?" v-model="visit.testimonial"></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="2">
            <!-- this is the column for history list -->
            <v-card elevation="5" height="90%" class="overflow">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Past Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="history in oldData" :key="history.id">
                      <td>{{ history.appt }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="10">
            <!-- This is the place where prescription would reside -->
            <v-card elevation="5" height="450px" class="overflow">
              <v-card-title>Prescription</v-card-title>
              <v-card-text>
                <v-form ref="prescriptionForm" v-model="presValid" lazy-validation>
                  <v-row>
                    <v-col cols="12" lg="3">
                      <v-autocomplete v-model="selectedMedicine" label="Medicines" :items="medicines" item-text="name"
                        return-object @change="resetValidations">
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-text-field v-model="selectedMedicine.morningDose" label="Morning"
                        :rules="[rules.required, rules.Number]"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-text-field v-model="selectedMedicine.afternoonDose" label="Noon"
                        :rules="[rules.required, rules.Number]"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-text-field v-model="selectedMedicine.eveningDose" label="Evening"
                        :rules="[rules.required, rules.Number]"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-text-field v-model="selectedMedicine.nightDose" label="Night"
                        :rules="[rules.required, rules.Number]"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="3">
                      <v-textarea rows="1" auto-grow label="Remark" v-model="selectedMedicine.remark"></v-textarea>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-text-field v-model="selectedMedicine.days" label="Days" :rules="[rules.NonZero]"
                        ref="daysField"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="1">
                      <v-btn small fab color="primary" class="display-2" @click="addToTable">+</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
                <v-data-table :items="prescription" :headers="medHeaders" class="elevation-1" :footer-props="{
                  disablePagination: true,
                  disableItemsPerPage: true,
                }" :hide-default-footer="true">
                  <template v-slot:[`header.data-table-select`]></template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="2">
            <v-card elevation="5" height="90%" class="overflow">
              <v-list subheader>
                <v-list-item-group v-model="selectedPancha" multiple active-class="green--text">
                  <v-subheader>Panchakarma</v-subheader>
                  <v-divider></v-divider>
                  <template v-for="panch in panchakarma">
                    <v-list-item :key="panch.id">
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title v-text="panch.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-icon v-if="active" color="green">mdi-check</v-icon>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider :key="panch.name"></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn outlined text color="accent">Skip</v-btn>
        <v-spacer></v-spacer>
        <v-btn text outlined color="grey">Cancel</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Srotas from "@/shared/srotas";
import Pulse from "@/shared/pulse";
import Diagnosis from "@/shared/diagnosis";
import Rules from "@/shared/rules";
export default {
  created() {
    this.fetchData();
  },

  data: () => ({
    valid: false,
    presValid: false,
    visit: {
      majorComplaints: "",
      pastHistory: "",
      investigation: "",
      otherMedicines: "",
      otherExams: "",
      diagnosis: [],
      srotas: [],
      pulse: [],
      remark: "",
      apptDays: 15,
      discount: 0,
      testimonial: "No",
    },
    selectedPancha: [],
    selectedMedicine: {
      name: "",
      morningDose: null,
      afternoonDose: null,
      eveningDose: null,
      nightDose: null,
      days: null,
      remark: null,
    },
    medicines: [],
    oldData: [
      { id: 1, appt: "10/05/1982" },
      { id: 2, appt: "10/05/1982" },
      { id: 3, appt: "10/05/1982" },
      { id: 4, appt: "10/05/1982" },
      { id: 5, appt: "10/05/1982" },
    ],
    patient: {
      name: "Mahesh Mukund Deshpande",
      dob: "10/05/1982",
      occupation: "Service",
      occupationDetails: "Software Engineer",
    },
    panchakarma: [],
    headers: [{ text: "Panchakarma", align: "start", value: "name" }],
    yesNoList: ["Yes", "No"],
    discountList: [0, 5, 10],
    pulseList: Pulse,
    srotasList: Srotas,
    diagnosisList: Diagnosis,
    prescription: [],
    medHeaders: [
      {
        text: "Medicine Name",
        align: "start",
        value: "name",
      },
      { text: "Morning Dose", value: "morningDose" },
      { text: "Afternoon Dose", value: "afternoonDose" },
      { text: "Evening Dose", value: "eveningDose" },
      { text: "Night Dose", value: "nightDose" },
      { text: "No Of Days", value: "days" },
      { text: "Remark", value: "remark" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    rules: Rules,
  }),

  methods: {
    async fetchData() {
      this.panchakarma = this.$store.getters.getPanchakarma;
      if (this.panchakarma.length < 1) {
        await this.$store.dispatch("getPanchakarma");
      }
      this.panchakarma = this.$store.getters.getPanchakarma;

      this.medicines = this.$store.getters.getMedicines;
      if (this.medicines.length < 1) {
        await this.$store.dispatch("getMedicines");
      }
      this.medicines = this.$store.getters.getMedicines;
    },

    save() {
      console.log(this.visit);
      console.log(this.selectedPancha);
    },

    addToTable() {
      if (this.$refs.prescriptionForm.validate() === true) {
        this.prescription.push(this.selectedMedicine);
        this.selectedMedicine = Object.assign({}, null);
        this.$refs.prescriptionForm.resetValidation();
      }
    },

    deleteItem(item) {
      let index = this.prescription.indexOf(item);
      if (index < 0) console.log("item not found");
      else this.prescription.splice(index, 1);

      console.log(this.prescription);
    },

    resetValidations() {
      this.$refs.prescriptionForm.resetValidation();
      this.$refs.daysField.focus()
    },
  },
};
</script>

<style scoped>
.col-12 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.row {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
</style>