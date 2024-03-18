<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transperant"
    flat
    small
    height="70"
  >
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    >
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="mx-3"></div>

    <v-btn class="ml-2" elevation="1" outlined min-width="0" text @click="logout">logout</v-btn>
  </v-app-bar>
</template>

<script>
// import {endPoint} from "@/api/api";
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(['drawer']),
  },

  methods: {
    ...mapMutations({
      setDrawer: 'setDrawer',
    }),

    logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>