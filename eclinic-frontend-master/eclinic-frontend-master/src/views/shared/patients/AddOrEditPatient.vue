<template>
  <div>
    <the-overlay></the-overlay>
    <v-container fluid id="addEditPatient" tag="section">
      <v-card rounded="lg">
        <v-card-title class="display-2">
          <router-link :to="{ name: 'Patients' }">
            <v-btn small fab color="primary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          {{ formTitle }}
        </v-card-title>
        <v-card-text>
          <v-form
            :disabled="disabled"
            ref="patientForm"
            v-model="valid"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col cols="12" md="2" sm="6">
                  <v-avatar size="150" @click="clicked">
                    <img :src="imageUrl" alt="Patient Image" />
                    <v-file-input
                      type="file"
                      ref="uploader"
                      class="d-none"
                      accept="image/*"
                      @change="fileChanged"
                    />
                  </v-avatar>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.patientId"
                    label="PatientId:"
                    color="accent"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.firstname"
                    label="Firstname:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.middlename"
                    label="Middlename:"
                    color="accent"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.lastname"
                    label="Lastname:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="6">
                  <v-text-field
                    v-model="item.address"
                    label="Address:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.city"
                    label="City:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.state"
                    label="State:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.country"
                    label="Country:"
                    color="accent"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.pincode"
                    label="Pincode:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.gender"
                    label="Gender:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="genderList"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.maritalStatus"
                    label="Marital Status:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="maritalStatusList"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.phone"
                    label="Contact No:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.altPhone"
                    label="Alternate Contact No:"
                    color="accent"
                    :rules="[rules.Number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.email"
                    label="Email Address:"
                    color="accent"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.altEmail"
                    label="Alternate Email Address:"
                    color="accent"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <div>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="item.dateOfBirth"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="item.dateOfBirth"
                          label="Date of Birth:"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="accent"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="item.dateOfBirth" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="accent" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="accent"
                          @click="$refs.dialog.save(item.dateOfBirth)"
                          @blur="calculateAge"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </div>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field v-model="age" label="Age:" readonly>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.occupation"
                    label="Occupation:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="occupationList"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.occupationDetails"
                    label="Occupation Details:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.reference"
                    label="Reference:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="referenceList"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.referenceDetails"
                    label="Reference Details:"
                    color="accent"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.medicineDiscountPercent"
                    label="Medicine Discount:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3" sm="6">
                  <v-text-field
                    v-model="item.consultationDiscountPercent"
                    label="Consultation Discount:"
                    color="accent"
                    :rules="[rules.required, rules.Number]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.physicianId"
                    label="Consulting Physician:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="doctorList"
                    item-text="fullname"
                    item-value="name"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <v-select
                    v-model="item.locationCode"
                    label="Location:"
                    color="accent"
                    :rules="[rules.required]"
                    :items="locationList"
                    item-text="name"
                    item-value="shortCode"
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
  </div>
</template>

<script>
import rules from "@/shared/rules";
import { mapMutations } from "vuex";
import { PATIENTS_IMAGE_URL } from "@/shared/constants";
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    imageUrl: "/images/patient/default.png",
    image: "",
    modal: false,
    dialog: false,
    valid: false,
    rules: rules,
    age: null,
    item: {
      id: null,
      patientId: "",
      firstname: "",
      middlename: "",
      lastname: "",
      fullname: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      dateOfBirth: null,
      gender: "",
      maritalStatus: "",
      phone: null,
      altPhone: null,
      email: null,
      altEmail: null,
      occupation: "",
      occupationDetails: "",
      reference: "",
      referenceDetails: "",
      physicianId: "",
      locationCode: null,
      medicineDiscountPercent: 0,
      consultationDiscountPercent: 0,
      registrationDate: null
    },
    genderList: ["Male", "Female"],
    maritalStatusList: ["Married", "Unmarried", "Divorced", "Widow", "Widower"],
    occupationList: ["Service", "Self-Employeed", "Home-maker", "Unemployeed"],
    referenceList: [
      "Board",
      "Camp",
      "Friends",
      "Newspaper",
      "Old Patient",
      "Pamphlet",
      "Website",
    ],
    doctorList: [],
    locationList: [],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add Patient";
      } else {
        if (this.disabled == true) {
          return "Patient Details";
        } else {
          return "Edit Patient Details";
        }
      }
    },

    // age() {
    //   return this.calculateAge()
    // },

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
    await this.$store.dispatch("getUsers");
    this.doctorList = this.$store.getters.getDoctors;

    await this.$store.dispatch("getLocations");
    this.locationList = this.$store.getters.getLocations;

    // Update the image path to show the image.
    // if (this.itemPassed !== null) {
    //   this.imageUrl = PATIENTS_IMAGE_URL + this.itemPassed.imagePath;
    // } else {
    //   this.imageUrl = PATIENTS_IMAGE_URL + "default.png";
    // }

    this.calculateAge();
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
      const image = this.image.toString();
      console.log(image);

      // Save the updated or created value to the database.
      // console.log(this.item);
      if (this.$refs.patientForm.validate() === true) {
        // Generate the form data object here.
        // let formData = new FormData();
        // formData.append("image", this.image);

        // // append the remaining object data here.
        // Object.keys(this.item).forEach((key) => {
        //   formData.append(key, this.item[key]);
        // });

        // console.log(formData);

        if (this.id == null) {
          // New Patient
          this.item.registrationDate = new Date()
          await this.$store.dispatch("addPatient", this.item);
        } else {
          // Existing Patient

          // Method spoofig for put related issue
          // formData.append("_method", "put");
          await this.$store.dispatch("updatePatient", this.item);
        }

        const error = this.$store.getters.getEsrror;
        if (error.isError === false) {
          this.$router.push({ name: "Patients" });
        }
      }
    },

    calculateAge() {
      if (this.item.dateOfBirth) {
        const today = new Date();
        const dob = new Date(this.item.dateOfBirth);
        const diff = today - dob;
        this.age = Math.floor(diff / 31557600000);
      }
    },

    clicked() {
      this.$refs.uploader.$refs.input.click();
    },

    fileChanged(file) {
      if (!file) return;

      this.createImage(file);
    },

    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      console.log(this.imageUrl);
      reader.readAsDataURL(file);
      console.log(file);
      this.image = file;
    },
  },
};
</script>

<style scoped>
img:hover {
  cursor: pointer;
}
</style>