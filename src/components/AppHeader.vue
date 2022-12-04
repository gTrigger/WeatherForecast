<template>
  <header class="app-header">
    <v-container class="app-header-content">
      <span class="app-header-title">
        {{ $t('weatherForecast') }}
      </span>
      <LanguageSelect/>
    </v-container>
  </header>
</template>

<script>
  import LanguageSelect from './LanguageSelect'

  export default {
    name: 'AppHeader',
    components: {
      LanguageSelect,
    }
  }
</script>

<style scoped lang="scss">
  .app-header {
    &-content {
      display: flex;
      justify-content: space-between;
    }

    &-title {
      padding-top: 12px;
      text-transform: uppercase;
      font-size: larger;
    }
  }
</style>
