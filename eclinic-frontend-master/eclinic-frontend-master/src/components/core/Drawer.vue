<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img v-bind="props"></v-img>
    </template>
    <v-divider class="mb-1"></v-divider>

    <v-list nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="primary" contain>
          <v-img src="/images/logo/logo.jpg" max-height="40"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="display-1" height="64" v-text="title">
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2"></v-divider>

    <v-list nav>
      <v-list-item-group color="primary">
        <v-list-item :to="item.to" v-for="(item, key) in items" :key="key">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import {mapState} from 'vuex';
export default {
  name: "TheAppDrawer",

  computed: {
    // ...mapState(['drawer']),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.dispatch("setDrawer", value);
      },
    },

    items() {
      return this.$store.getters.getDrawerLinks;
    },
  },

  data: () => ({
    title: "eClinic",
  }),
};
</script>

<style lang="sass">
#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px
        margin-right: 24px
        margin-left: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        padding-left: 8px

      .v-list-group__header
        padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2
          margin-right: 8px
</style>