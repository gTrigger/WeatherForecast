<template>
  <v-container class="app-search-input">
    <v-combobox
        :value="item"
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

<script>
  export default {
    name: 'SearchInput',
    props: {
      items: {
        required: true,
      }
    },
    data() {
      return {
        item: null,
      };
    },
    methods: {
      emitSearch() {
        this.$emit('search', this.item);
      },
      updateSearch(value){
        this.item = value;
      },
      required(value) {
        if (value && value.length) {
          return true;
        }

        return this.$t('searchInputErrorRequired');
      },
    },
  };
</script>
