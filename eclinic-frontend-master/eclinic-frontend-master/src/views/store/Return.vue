<template>
  <div>
    <the-overlay></the-overlay>
  </div>
</template>

<script>
export default {
  components: {
    TheOverlay: () => import("@/components/shared/Overlay"),
  },
};
</script>

<style>