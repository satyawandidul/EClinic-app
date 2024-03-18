<template>
  <v-container tag="section" fluid id="stock">
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Locations: </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <router-link :to="{ name: 'Add Stock', params: { id: items[tab].shortcode } }">
              <v-btn color="primary">Import Stock</v-btn>
            </router-link> -->
            <!-- Updated router-link with dynamic locationId -->
            <router-link :to="{ name: 'Add Stock', params: { id: items[tab].shortcode } }">
              <v-btn color="primary">Import Stock</v-btn>
            </router-link>

            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="accent"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item.id" class="mb-3">
                  {{ item.shortcode }}</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.id">
              <the-stock class="mt-5" :locationId="item.shortcode" :isAdmin="isAdmin"></the-stock>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';
export default {
  components: {
    TheStock: () => import("@/components/shared/Stock"),
  },

  created() {
    this.fetchData();
  },


  data: () => ({
    tab: 0,
    items: [
      { id: 1, name: "Tilak Road", shortcode: "Tk" },
      { id: 2, name: "Tilak Road", shortcode: "Tk" },
      { id: 3, name: "Tilak Road", shortcode: "Tk" },
    ],
    medicine: [],




  }),

  computed: {
    isAdmin() {
      return this.getIsAdmin();
    },


  },

  beforeDestroy() {
    this.setError({
      isError: false,
      errorMessage: "",
    });
  },

  methods: {
    ...mapGetters({
      getIsAdmin: "getIsAdmin",
      getLocations: "getLocations",
    }),
    ...mapMutations({
      setIsLoading: "setIsLoading",
      setError: "setError",
    }),

    // async fetchData() {
    //   // Load all the locations here
    //   await this.$store.dispatch("getLocations");
    //   this.items = this.getLocations();
    //   console.log(this.items);
    // },

    async fetchData() {
      // Load all the locations here
      await this.$store.dispatch("getLocations");
      console.log(this.getLocations()); // Ensure the data is fetched correctly
    }

  },

  data() {

  },
  mounted() {
    // Make a GET request to fetch data from the server
    axios.get('http://127.0.0.1:3000/medicines')
      .then(response => {
        this.medicine = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },


};
</script>

<style></style>