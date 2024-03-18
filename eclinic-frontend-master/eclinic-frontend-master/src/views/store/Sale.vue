<template>
  <!-- <div>
    <the-overlay></the-overlay>
    <receipt></receipt>
    <new-receipt></new-receipt>
  </div> -->
  <v-container fluid id="receipt" tag="section">
      
  </v-container>
</template>

<script>
export default {
  components: {
    receipt: () => import("@/components/store/Receipt"),
    TheOverlay: () => import("@/components/shared/Overlay"),
    NewReceipt: () => import("@/components/store/ReceiptNew")
  },

  data: () => ({}),
};
</script>

<style>
</style>