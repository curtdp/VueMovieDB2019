<template>
  <div class="MoviesList text-center">
    <MovieCard :movie="movie" v-for="(movie, index) of movies" :key="index" />
  </div>
</template>

<script>
import config from "@/config";
import MovieCard from "./MovieCard";
export default {
  data() {
    return {
      movies: []
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
        this.movies = moviesData.results;
      } catch (error) {}
    }
  },
  components: {
    MovieCard
  }
};
</script>

<style scoped>
.MoviesList {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}
</style>
