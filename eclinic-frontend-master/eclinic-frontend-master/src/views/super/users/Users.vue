<template>
  <v-container fluid id="users" tag="section">
    <v-card rounded="lg">
      <v-card-title class="display-2"
        >Users
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Add New User' }"
          ><v-btn color="primary">Add User</v-btn></router-link
        >
      </v-card-title>
      <v-data-table class="elevation-1" :items="items" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'Edit User Details',
              params: { id: item.id, itemPassed: item },
            }"
            ><v-icon class="mr-2" small>mdi-pencil</v-icon></router-link
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- <the-receipt></the-receipt>
    <old-receipt></old-receipt> -->
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {

  // components: {
  //   TheReceipt: () => import('@/components/store/ReceiptNew.vue'),
  //   OldReceipt: () => import('@/components/store/Receipt.vue')
  // },

  data: () => ({
    items: [],
    headers: [
      { text: "First Name", align: "start", value: "firstname" },
      { text: "Last Name", value: "lastname" },
      { text: "Email Address", value: "email" },
      { text: "Contact No", value: "phone" },
      { text: "Location Code", value: "locationCode" },
      { text: "User Type", value: "role" },
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
      setIsLoading: "setIsLoading",
      setError: "setError",
    }),

    async fetchData() {
      await this.$store.dispatch("getUsers");
      this.items = this.$store.getters.getUsers;
    },
  },
};
</script>

<style>
</style>