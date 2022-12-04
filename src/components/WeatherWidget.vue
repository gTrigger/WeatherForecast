<template>
  <v-container class="widget">
    <v-container>
      <v-col class="widget-main-info">
        <v-row class="widget-weather">
          <img
              class="widget-weather-type"
              :src="weatherIconSrc"
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

<script>
  import {
    mdiWeatherWindy,
    mdiWaterOutline ,
    mdiThermometer,
  } from '@mdi/js'

  export default {
    name: 'WeatherWidget',
    props: {
      data: {
        required: true,
      }
    },
    data() {
      return {
        mdiWeatherWindy,
        mdiWaterOutline,
        mdiThermometer,
        item: null,
      };
    },
    computed: {
      weatherIconSrc() {
        return `http://openweathermap.org/img/w/${this.data.weather[0].icon}.png`;
      },
      temperature() {
        return this.data.main.temp;
      },
      minTemperature() {
        return this.data.main.temp_min;
      },
      maxTemperature() {
        return this.data.main.temp_max;
      },
      temperatureFeelsLike() {
        return this.data.main.feels_like;
      },
      windSpeed() {
        return this.data.wind.speed;
      },
      windDirection() {
        const value = this.data.wind.deg;

        if (value >= 22.5 && value < 67.5) {
          return this.$t('directionNorthEast')
        }

        if (value >= 67.5 && value < 112.5) {
          return this.$t('directionEast')
        }

        if (value >= 112.5 && value < 157.5) {
          return this.$t('directionSouthEast')
        }

        if (value >= 157.5 && value < 202.5) {
          return this.$t('directionSouth')
        }

        if (value >= 202.5 && value < 247.5) {
          return this.$t('directionSouthWest')
        }

        if (value >= 247.5 && value < 292.5) {
          return this.$t('directionWest')
        }

        if (value >= 292.5 && value < 337.5) {
          return this.$t('directionNorthWest')
        }

        return this.$t('directionNorth')
      },
      humidity() {
        return this.data.main.humidity;
      },
      pressure() {
        return this.data.main.pressure;
      },
    },
    filters: {
      round: (value) => {
        return Math.round(value);
      },
      convertHPaToMmHg: (value) => {
        return Math.round(value * 0.75);
      },
    },
  };
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
