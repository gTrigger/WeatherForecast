<template>
  <v-container class="widget">
    <v-container>
      <v-col class="widget-main-info">
        <v-row class="widget-weather">
          <img
              class="widget-weather-type"
              :src="weatherIconSrc"
              alt="weather-type"
          />
          <span class="widget-temperature">
            {{ temperature | round }}°C
          </span>
        </v-row>

        <v-row class="widget-temperature-details">
          {{ $t('feelsLikeTemp') }}: {{ temperatureFeelsLike | round }}°C
        </v-row>

        <v-row class="widget-temperature-details">
          {{ $t('minTemp') }}: {{ minTemperature | round }}°C /
          {{ $t('maxTemp') }}: {{ maxTemperature | round }}°C
        </v-row>
      </v-col>
    </v-container>

    <v-container>
      <v-row class="widget-extra-info">
        <v-col class="widget-wind">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                {{ mdiWeatherWindy  }}
              </v-icon>
              {{ windSpeed }} {{ $t('metersPerSec') }} ({{ windDirection }})
            </template>

            <span>
              {{ $t('wind') }}
            </span>
          </v-tooltip>
        </v-col>

        <v-col class="widget-humidity">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                {{ mdiWaterOutline  }}
              </v-icon>
              {{ humidity }}%
            </template>

            <span>
              {{ $t('humidity') }}
            </span>
          </v-tooltip>
        </v-col>

        <v-col class="widget-pressure">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                {{ mdiThermometer }}
              </v-icon>
              {{ pressure | convertHPaToMmHg }} {{ $t('pressureUnit') }}
            </template>

            <span>
              {{ $t('pressure') }}
            </span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
  import Vue, { PropType } from "vue";
  import {
    mdiWeatherWindy,
    mdiWaterOutline ,
    mdiThermometer,
  } from '@mdi/js'
  import { WeatherForecast } from "@/common/types/commonTypes";

  export default Vue.extend({
    name: 'WeatherWidget',
    props: {
      forecast: {
        required: true,
        type: Object as PropType<WeatherForecast>,
      }
    },
    data() {
      return {
        mdiWeatherWindy,
        mdiWaterOutline,
        mdiThermometer,
      };
    },
    computed: {
      weatherIconSrc(): string {
        return `http://openweathermap.org/img/w/${this.forecast.weather[0].icon}.png`;
      },
      temperature(): number {
        return this.forecast.main.temp;
      },
      minTemperature(): number {
        return this.forecast.main.temp_min;
      },
      maxTemperature(): number {
        return this.forecast.main.temp_max;
      },
      temperatureFeelsLike(): number {
        return this.forecast.main.feels_like;
      },
      windSpeed(): number {
        return this.forecast.wind.speed;
      },
      windDirection(): string {
        const value = this.forecast.wind.deg;

        if (value >= 22.5 && value < 67.5) {
          return String(this.$t('directionNorthEast'));
        }

        if (value >= 67.5 && value < 112.5) {
          return String(this.$t('directionEast'));
        }

        if (value >= 112.5 && value < 157.5) {
          return String(this.$t('directionSouthEast'));
        }

        if (value >= 157.5 && value < 202.5) {
          return String(this.$t('directionSouth'));
        }

        if (value >= 202.5 && value < 247.5) {
          return String(this.$t('directionSouthWest'));
        }

        if (value >= 247.5 && value < 292.5) {
          return String(this.$t('directionWest'));
        }

        if (value >= 292.5 && value < 337.5) {
          return String(this.$t('directionNorthWest'));
        }

        return String(this.$t('directionNorth'));
      },
      humidity(): number {
        return this.forecast.main.humidity;
      },
      pressure(): number {
        return this.forecast.main.pressure;
      },
    },
    filters: {
      round: (value: number) => {
        return Math.round(value);
      },
      convertHPaToMmHg: (value: number) => {
        return Math.round(value * 0.75);
      },
    },
  });
</script>

<style scoped lang="scss">
  .widget {
    &-main-info {
      display: flex;
      flex-direction: column;
      align-content: center;
    }

    &-extra-info {
      text-align: center;
    }

    &-weather {
      align-self: center;
      gap: 10px;
    }

    &-weather-type {
      width: 65px;
    }

    &-temperature {
      font-size: 26px;
      align-self: center;
    }

    &-temperature-details {
      align-self: center;
    }
  }
</style>
