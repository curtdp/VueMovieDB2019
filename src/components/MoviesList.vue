<template>
  <div class="MoviesList text-center mx-8">
    <MovieCard :movie="movie" v-for="(movie, index) of movies" :key="index" />
  </div>
</template>

<script>
import MovieCard from "./MovieCard";
export default {
  props: ["movies"],
  components: {
    MovieCard
  }
};
</script>

<style scoped>
.MoviesList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
</style>
