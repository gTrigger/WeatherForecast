<template>
  <v-container class="app-loading-tile">
    <v-progress-circular indeterminate/>
  </v-container>
</template>

<script>
  export default {
    name: 'LoadingTile',
  };
</script>

<style scoped lang="scss">
  .app-loading-tile {
    text-align: center;
  }
</style>
