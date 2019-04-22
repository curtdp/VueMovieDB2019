<template>
  <div class="home text-center">
    <h1 class="mb-2">Самые популярные фильмы</h1>
    <MoviesList :movies="popularMovies" />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList";
import config from "@/config";

export default {
  name: "home",
  data() {
    return {
      popularMovies: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${
            config.api_key
          }`
        );
        const moviesData = await res.json();
        this.popularMovies = moviesData.results;
      } catch (error) {}
    }
  },

  components: {
    MoviesList
  }
};
</script>
