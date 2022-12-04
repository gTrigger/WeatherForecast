<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <WeatherForecast/>
    </v-main>
    <footer/>
  </v-app>
</template>

<script>
  import WeatherForecast from './views/WeatherForecast';
  import AppHeader from "@/components/AppHeader";

  export default {
    name: 'App',
    components: {
      AppHeader,
      WeatherForecast,
    },
  };
</script>
