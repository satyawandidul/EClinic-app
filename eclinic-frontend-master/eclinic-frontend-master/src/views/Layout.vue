<template>
  <div>
    <v-app>
      <the-app-bar></the-app-bar>

      <the-app-drawer></the-app-drawer>

      <the-core-view></the-core-view>

      <the-footer></the-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Layout",
  components: {
    TheAppBar: () => import("@/components/core/AppBar"),
    TheAppDrawer: () => import("@/components/core/Drawer"),
    TheCoreView: () => import("@/components/core/View"),
    TheFooter: () => import("@/components/core/Footer"),
  },
};
</script>

<style>
</style>