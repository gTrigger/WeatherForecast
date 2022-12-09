<template>
  <v-container class="app-error-tile">
    <span>
      {{ errorMessage }}
    </span>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import { StatusCode } from "@/common/types/commonTypes";

  export default Vue.extend({
    name: 'ErrorTile',
    props: {
      code: {
        required: true,
      }
    },
    computed: {
      errorMessage(): string {
        if (this.code === StatusCode.NOT_FOUND) {
          return String(this.$t('nothingFoundError'));
        }

        return String(this.$t('genericError'));
      }
    },
  });
</script>

<style scoped lang="scss">
  .app-error-tile {
    text-align: center;
  }
</style>
