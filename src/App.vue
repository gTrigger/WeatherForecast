<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <WeatherForecast/>
    </v-main>
    <footer/>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import WeatherForecast from '@/views/WeatherForecast.vue';
  import AppHeader from "@/components/AppHeader.vue";

  export default Vue.extend({
    name: 'App',
    components: {
      AppHeader,
      WeatherForecast,
    },
  });
</script>
