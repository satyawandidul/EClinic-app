<template>
  <v-app>
    <v-container fluid tag="section" id="login">
      <v-row justify="center">
        <v-col cols="12" md="4" sm="6">
          <v-card shaped elevation="5">
            <the-alert v-if="error" :mode="mode" :message="message"></the-alert>
            <v-card-title
              class="headline align-center justify-center mb-5 mt-14 pt-10"
              >eClinic App</v-card-title
            >
            <v-card-subtitle class="text-center justify-center"
              >Please sign-in to your account</v-card-subtitle
            >
            <v-card-text>
              <v-form v-model="valid" ref="loginForm" lazy-validation>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-text-field
                        v-model="username"
                        label="Username:"
                        :rules="[rules.required]"
                        color="accent"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        type="password"
                        label="Password"
                        :rules="[rules.required]"
                        color="accent"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" class="text-right">
                      <v-btn type="submit" :loading="loading" class="accent"
                        >Login</v-btn
                      >
                    </v-col> -->
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" class="accent" @click="login"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Rules from "@/shared/rules";
import { mapGetters } from "vuex";
// import { endPoint } from "@/api/api";
export default {
  components: {
    TheAlert: () => import("@/components/shared/Alerts"),
  },
  data: () => ({
    error: false,
    message: "",
    mode: "",
    loading: false,
    valid: false,
    username: "",
    password: "",
    rules: Rules,
  }),

  mounted() {
    // this.fetchLocations();
  },

  methods: {
    ...mapGetters({
      getError: "getError",
      getCurrentUser: "getCurrentUser",
    }),

    async login() {
      this.loading = true;
      if (this.$refs.loginForm.validate() === true) {
        try {
          await this.$store.dispatch("login", {
            username: this.username,
            password: this.password,
          });

          const err = this.getError();
          if (err.isError === false) {
            const user = this.getCurrentUser();
            this.$router.replace({ name: user.role });
          }
        } catch (error) {
          this.error = true;
          this.message = "Failed to login";
          this.mode = "error";
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>