<template>
  <v-container class="weather-forecast">
    <SearchInput
      :items="items"
      @search="getInfo"
    />
    <LoadingTile
        v-if="isLoading"
    />
    <ErrorTile
        v-if="isError"
        :code="errorStatusCode"
    />
    <WeatherWidget
      v-if="forecast"
      :forecast="forecast"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import CookieService from "@/services/CookieService";
  import { CookieType } from "@/common/types/cookieTypes";
  import ApiService from "@/services/ApiService";
  import { WeatherForecast } from "@/common/types/commonTypes";
  import SearchInput from "@/components/SearchInput.vue";
  import WeatherWidget from "@/components/WeatherWidget.vue";
  import LoadingTile from "@/components/LoadingTile.vue";
  import ErrorTile from "@/components/ErrorTile.vue";

  interface WeatherForecastData {
    items: string[];
    forecast: WeatherForecast | null;
    isLoading: boolean;
    isError: boolean;
    errorStatusCode: number | null;
  }

  export default Vue.extend({
    name: 'WeatherForecast',
    components: {
      LoadingTile,
      ErrorTile,
      SearchInput,
      WeatherWidget,
    },
    data(): WeatherForecastData {
      return {
        items: [],
        forecast: null,
        isLoading: false,
        isError: false,
        errorStatusCode: null,
      }
    },
    created() {
      this.setInitialState();
    },
    methods: {
      setInitialState() {
        const searchedItems = CookieService.getCookie(CookieType.SEARCHED_ITEMS);

        if (!searchedItems) {
          return;
        }

        this.items = CookieService.getCookie(CookieType.SEARCHED_ITEMS).split(',');
      },
      async getInfo(item: string) {
        const searchedItem = item.toLowerCase();

        this.isLoading = true;
        this.forecast = null;
        this.isError = false;
        this.errorStatusCode = null;

        await ApiService.searchByCity(searchedItem)
          .then((data) => {
            this.forecast = data;

            this.rememberInput(searchedItem);
          })
          .catch((err) => {
            this.isError = true;
            this.errorStatusCode = err.response.status;
            throw err;
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      rememberInput(searchedItem: string) {
        const searchedItems = CookieService.getCookie(CookieType.SEARCHED_ITEMS);

        if (!searchedItems) {
          return CookieService.setCookie(CookieType.SEARCHED_ITEMS, searchedItem);
        }

        if (searchedItems.includes(searchedItem)) {
          return;
        }

        CookieService.setCookie(CookieType.SEARCHED_ITEMS, searchedItems + ',' + searchedItem);

        this.setInitialState();
      }
    }
  });
</script>

<style scoped lang="scss">
  .weather-forecast {
    max-width: 600px;
  }
</style>
