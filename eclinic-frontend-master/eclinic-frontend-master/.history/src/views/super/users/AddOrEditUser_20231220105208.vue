<template>
  <v-container fluid id="addEditUser" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2">
        <router-link :to="{ name: 'Users' }"><v-btn small fab
            color="primary"><v-icon>mdi-arrow-left</v-icon></v-btn></router-link>
        {{ formTitle }}</v-card-title>
      <v-card-text>
        <v-form ref="userForm" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="2" sm="6">
                <v-avatar size="150" @click="clicked">
                  <img :src="imageUrl" alt="Patient Image" />
                  <v-file-input type="file" ref="uploader" class="d-none" accept="image/*" @change="fileChanged" />
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.firstname" label="First Name:" color="accent"
                  :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.lastname" label="Last Name:" color="accent"
                  :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.username" label="Username:" color="accent"
                  :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.password" label="Password:" color="accent"
                  :rules="this.id == null ? [rules.required] : []" :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.email" label="Email:" color="accent" :rules="[rules.required, rules.email]"
                  type="email"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-text-field v-model="item.phone" label="Contact Number:" color="accent"
                  :rules="[rules.required, rules.Number]"></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-select v-model="item.role" label="User Role:" color="accent" :rules="[rules.required]"
                  :items="roles"></v-select>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <v-select v-model="item.locationCode" label="Clinic Location:" color="accent" item-text="name"
                  item-value="shortCode" :rules="[rules.required]" :items="locationList"></v-select>
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
    <!-- <the-patient></the-patient> -->
    <!-- <div >
    <patient-list/>
    <patient-list/>
    </div> -->

    <!-- <v-row>
      <v-col col="12" md="4" sm="6">
        <patient-list/>
      </v-col>
      <v-col col="12" md="4" sm="6">
        <patient-list/>
      </v-col>
      <v-col col="12" md="4" sm="6">
        <patient-list/>
      </v-col>
      <v-col col="12" md="4" sm="6">
        <patient-list/>
      </v-col>
    </v-row>  -->
  </v-container>
</template>

<script>
import rules from "@/shared/rules";
import { mapMutations } from "vuex";
import { USER_IMAGE_URL } from "@/shared/constants";
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

  // components: {
  //   ThePatient: () => import('@/components/reception/Patient.vue'),
  //   PatientList: () => import('@/components/reception/PatientList.vue')
  // },

  data: () => ({
    imageUrl: "/images/patient/default.png",

    valid: false,
    rules: rules,
    showPassword: false,
    locationList: [],
    item: {
      id: null,
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      role: "",
      locationCode: 0,
      base64: "",

    },
    roles: [
      "Admin",
      "Doctor",
      "Receptionist",
      "Stockist",
      "Therapist",
      "Super-Admin",
    ],
  }),

  computed: {
    formTitle() {
      if (this.id == null) {
        return "Add User";
      } else {
        return "Edit User Details";
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

    // TODO: This request to fetch the locations needs to be deleted after adding the login component
    await this.$store.dispatch("getLocations");

    this.locationList = this.$store.getters.getLocations;

    // update the image path to show the image
    //   if (this.itemPassed !== null) {
    //     this.imageUrl = USER_IMAGE_URL + this.itemPassed.imagePath;
    //   } else {
    //     this.imageUrl = USER_IMAGE_URL + "default.png";
    //   }
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
      if (this.$refs.userForm.validate() === true) {
        // Generate the form data object here.
        let formData = new FormData();

        this.item.base64 = yourBase64Value; // Add this line before sending to the backend

        // formData.append("image", this.image);

        // // Append the remaining object data here.
        // Object.keys(this.item).forEach((key) => {
        //   formData.append(key, this.item[key]);
        // });

        // console.log(formData);
        this.item.isActive = true

        if (this.image) {
          this.item.base64 = await this.convertImageToBase64(this.image);
          formData.append("base64", this.item.base64);
        }

        // if (this.image !== "null") {
        //   formData.append("base64", this.base64);  // Add this line to append base64 data
        // }

        Object.keys(this.item).forEach((key) => {
          formData.append(key, this.item[key]);
        });



        if (this.id == null) {
          // New Location
          await this.$store.dispatch("addUser", this.item);
        } else {
          // Existing Location
          await this.$store.dispatch("updateUser", this.item);
        }

        const error = this.$store.getters.getError;
        // Check errors, if error then wait here.
        if (error.isError == false) {
          this.$router.push({ name: "Users" });
        }
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
        console.log("Base64 Image:", e.target.result);
      };

      reader.readAsDataURL(file);
      this.image = file;
    },

    convertImageToBase64(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },


  },

};
</script>

<style scoped>
img:hover {
  cursor: pointer;
}
</style>