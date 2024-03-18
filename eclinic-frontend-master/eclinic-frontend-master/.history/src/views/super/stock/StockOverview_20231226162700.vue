<template>
  <v-container tag="section" fluid id="stock">
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Locations: </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link v-if="hasItem" :to="{ name: 'Add Stock', params: { id: item.shortCode } }">
              <v-btn color="primary">Import Stock</v-btn>
            </router-link>


            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="accent"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item.id" class="mb-3">
                  {{ item.shortCode }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.id">
              <the-stock class="mt-5" :locationId="item.shortCode" :isAdmin="isAdmin"></the-stock>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    TheStock: () => import("@/components/shared/Stock"),
  },

  created() {
    this.fetchData();
  },

  data() {
    return {
      tab: 0,
      items: [],
      item: {},
    };
  },

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

    async fetchData() {
      // Load all the locations here
      await this.$store.dispatch("getLocations");
      this.items = this.getLocations() || [];

      if (this.items.length > 0) {
        this.item = this.items[0];
      }

      console.log(this.items);
    },
  },
};
</script>

<style></style>
