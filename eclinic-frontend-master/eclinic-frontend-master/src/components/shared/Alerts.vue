<template>
  <v-snackbar
    v-model="showSnackBar"
    centered
    timeout="30000"
    color="error"
    elevation="15"
  >
    <template v-slot:action="{ attrs }">
      <v-btn color="red" small fab v-bind="attrs" @click="showSnackBar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    {{ message }}
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Alert",
  methods: {
    ...mapGetters({
      getError: "getError",
    }),

    ...mapMutations({
      setError: "setError",
    }),
  },

  computed: {
    showSnackBar: {
      get() {
        const error = this.getError()
        return error.isError;
      },
      set(value) {
        this.setError({
          isError: value,
          errorMessage: "",
        });
      },
    },

    message() {
      const error = this.$store.getters.getError;
      return error.errorMessage;
    },
  },
};
</script>

<style>
</style>