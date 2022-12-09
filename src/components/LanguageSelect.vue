<template>
  <v-select
      class="app-language-select"
      v-model="locale"
      :items="availableLocales"
      @change="changeLocale"
  />
</template>

<script lang="ts">
  import Vue from "vue";
  import i18n, { AppLocale } from "@/plugins/i18n";
  import LocaleService from "@/services/LocaleService";

  export default Vue.extend({
    name: 'LanguageSelect',
    data() {
      return {
        locale: i18n.locale,
        availableLocales: [
          AppLocale.EN,
          AppLocale.RU
        ],
      }
    },
    methods: {
      changeLocale() {
        LocaleService.setLocale(this.locale as AppLocale);
      }
    }
  });
</script>

<style scoped lang="scss">
  .app-language-select {
    max-width: 100px;
  }
</style>
