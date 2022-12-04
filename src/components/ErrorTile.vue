<template>
  <v-container class="app-error-tile">
    <span>
      {{ errorMessage }}
    </span>
  </v-container>
</template>

<script>
  export default {
    name: 'ErrorTile',
    props: {
      code: {
        required: true,
      }
    },
    data() {
      return {
        StatusCodes: {
          NOT_FOUND: 404,
        },
      }
    },
    computed: {
      errorMessage() {
        if (this.code === this.StatusCodes.NOT_FOUND) {
          return this.$t('nothingFoundError');
        }

        return this.$t('genericError');
      }
    },
  };
</script>

<style scoped lang="scss">
  .app-error-tile {
    text-align: center;
  }
</style>
