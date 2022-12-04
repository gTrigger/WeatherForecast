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
      v-if="data"
      :data="data"
    />
  </v-container>
</template>

<script>
  import SearchInput from "@/components/SearchInput";
  import WeatherWidget from "@/components/WeatherWidget";
  import CookieService from "@/services/CookieService";
  import ApiService from "@/services/ApiService";
  import LoadingTile from "@/components/LoadingTile";
  import ErrorTile from "@/components/ErrorTile";

  export default {
    name: 'WeatherForecast',
    components: {
      LoadingTile,
      ErrorTile,
      SearchInput,
      WeatherWidget,
    },
    data() {
      return {
        items: [],
        data: null,
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
        const searchedItems = CookieService.getCookie('searchedItems');

        if (!searchedItems) {
          return;
        }

        this.items = CookieService.getCookie('searchedItems').split(',');
      },
      async getInfo(item) {
        const searchedItem = item.toLowerCase();

        this.isLoading = true;
        this.data = null;
        this.isError = false;
        this.errorStatusCode = null;

        await ApiService.searchByCity(searchedItem)
          .then((data) => {
            this.data = data;

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
      rememberInput(searchedItem) {
        const searchedItems = CookieService.getCookie('searchedItems');

        if (!searchedItems) {
          return CookieService.setCookie('searchedItems', searchedItem);
        }

        if (searchedItems.includes(searchedItem)) {
          return;
        }

        CookieService.setCookie('searchedItems', searchedItems + ',' + searchedItem);

        this.setInitialState();
      }
    }
  };
</script>

<style scoped lang="scss">
  .weather-forecast {
    max-width: 600px;
  }
</style>
