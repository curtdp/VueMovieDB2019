<template>
  <div class="home text-center">
    <h1 class="mb-2">Самые популярные фильмы</h1>
    <MoviesList />
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList";

export default {
  name: "home",

  components: {
    MoviesList
  }
};
</script>
