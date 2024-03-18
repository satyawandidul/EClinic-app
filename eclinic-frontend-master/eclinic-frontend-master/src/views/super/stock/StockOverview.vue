<template>
  <v-container tag="section" fluid id="stock">
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Locations:</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link v-if="hasItem && item.shortCode" :to="{ name: 'Add-Stock', params: { id: item.shortCode } }">
              <v-btn color="primary">Import Stock</v-btn>
              </router-link>

          </v-toolbar>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="accent"></v-tabs-slider>
            <v-tab v-for="(item, index) in items" :key="index">{{ item.name }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, index) in items" :key="index">
              <the-stock :locationId="item.shortCode" :isAdmin="isAdmin" />
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

  data() {
    return {
      items: [],
      item: {},
      isAdmin: false,
      tab: 0,
    };
  },

  computed: {
    ...mapGetters(["getLocations", "getIsAdmin"]),
    hasItem() {
      return this.items.length > 0;
    },
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    ...mapMutations(["setIsLoading", "setError"]),

    async fetchData() {
      try {
        this.setIsLoading(true);
        await this.$store.dispatch("getLocations");
        this.items = this.getLocations || [];
        if (this.items.length > 0) {
          this.tab = 0; // Set the default tab to the first location
        }
      } catch (error) {
        this.setError({ isError: true, errorMessage: error.message });
      } finally {
        this.setIsLoading(false);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
