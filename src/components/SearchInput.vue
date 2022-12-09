<template>
  <v-container class="app-search-input">
    <v-combobox
        v-model="item"
        :items="items"
        :rules="[ required ]"
        :placeholder="$t('searchInputPlaceholder')"
        @update:search-input="updateSearch"
    >
      <template #append-outer>
        <v-icon
          :disabled="!item || !item.length"
          @click="emitSearch"
        >
          mdi-magnify
        </v-icon>
      </template>
      <template #message>
        {{ $t('searchInputErrorRequired') }}
      </template>
    </v-combobox>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";

  interface SearchInputData {
    item: string | null;
  }

  export default Vue.extend({
    name: 'SearchInput',
    props: {
      items: {
        required: true,
      }
    },
    data(): SearchInputData {
      return {
        item: null,
      };
    },
    methods: {
      emitSearch() {
        this.$emit('search', this.item);
      },
      updateSearch(value: string) {
        this.item = value;
      },
      required(value: string): string | boolean {
        if (value && value.length) {
          return true;
        }

        return String(this.$t('searchInputErrorRequired'));
      },
    },
  });
</script>
