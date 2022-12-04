<template>
  <v-select
      class="app-language-select"
      v-model="locale"
      :items="availableLocales"
      @change="LocaleService.setLocale(locale)"
  />
</template>

<script>
  import i18n, { locales } from "@/plugins/i18n";
  import LocaleService from "@/services/LocaleService";

  export default {
    name: 'LanguageSelect',
    data() {
      return {
        locale: i18n.locale,
        availableLocales: [
            locales.EN,
            locales.RU
        ],
        LocaleService,
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-language-select {
    max-width: 100px;
  }
</style>
