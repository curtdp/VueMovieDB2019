<template>
  <div>
    <div class="flex">
      <div class="relative mr-2">
        <input
          type="text"
          v-model="searchText"
          class="border px-4 py-2 rounded"
          :placeholder="$t('search')"
          @keydown.down="highlightNext"
          @keydown.up="highlightPrev"
          @keydown.enter="showResults"
          @input="makeSearch"
          @keydown.esc="close"
        />
        <div class="absolute w-full mt-1" v-show="suggestions.length > 0">
          <ul
            class="list-reset bg-white border rounded overflow-hidden shadow-lg"
          >
            <li
              v-for="suggestion of suggestions"
              :key="suggestion.id"
              class="p-2 hover:bg-grey-light"
              :class="[
                highlightedItem === suggestions.indexOf(suggestion)
                  ? 'bg-grey'
                  : ''
              ]"
            >
              <router-link :to="`/movie/${suggestion.id}`">
                {{ suggestion.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <button
        type="button"
        @click="makeSearch"
        class="px-4 py-2 bg-blue-dark text-white font-bold rounded"
      >
        {{ $t("search") }}
      </button>
    </div>
  </div>
</template>

<script>
import config from "@/config";
export default {
  data() {
    return {
      searchText: "",
      suggestions: [],
      highlightedItem: null
    };
  },
  methods: {
    highlightNext() {
      if (this.highlightedItem === null) {
        this.highlightedItem = 0;
      } else if (this.highlightedItem === this.suggestions.length - 1) {
        this.highlightedItem = 0;
      } else {
        this.highlightedItem++;
      }
    },
    highlightPrev() {
      if (this.highlightedItem === null) {
        this.highlightedItem = this.suggestions.length - 1;
      } else if (this.highlightedItem === 0) {
        this.highlightedItem = this.suggestions.length - 1;
      } else {
        this.highlightedItem--;
      }
    },
    close() {
      this.suggestions = [];
      this.highlightedItem = null;
    },
    makeSearch: async function() {
      try {
        if (this.searchText.length > 2) {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${
              config.api_key
            }&query=${this.searchText}`
          );
          const result = await res.json();
          this.suggestions = result.results.slice(0, 5);
          this.highlightedItem = null;
        }
      } catch (error) {}
    },
    showResults() {
      if (this.highlightedItem !== null) {
        this.$router.push(
          `/movie/${this.suggestions[this.highlightedItem].id}`
        );
        this.suggestions = [];
        this.searchText = "";
      }
    }
  },
  watch: {
    $route() {
      this.suggestions = [];
      this.searchText = "";
      this.highlightedItem = null;
    }
  }
};
</script>

<i18n>
{
  "en": {
    "search": "Search"
  },
  "uk": {
    "search": "Пошук"
  },
  "ru": {
    "search": "Поиск"
  }
}
</i18n>

<style>
</style>
