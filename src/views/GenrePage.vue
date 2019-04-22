<template>
  <div class="home text-center">
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <h1 class="mb-2">Фильмы жанра — {{ genreName }}</h1>
      <MoviesList :movies="moviesOfGenre" />
      <h3>Пагинатор</h3>
      <pagination
        :records="totalResults"
        :page="pageNumber"
        @paginate="runPaginate"
      ></pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList";
import config from "@/config";
import { log } from "util";

export default {
  name: "genre",
  data() {
    return {
      moviesOfGenre: [1, 2, 3],
      genreName: "",
      isLoading: true,
      totalResults: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    runPaginate() {
      console.log("paginate");
    },
    fetchData() {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            config.api_key
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${
            this.$route.params.genreId
          }`
        )
          .then(genresResponse => {
            return genresResponse.json();
          })
          .then(genresData => {
            this.moviesOfGenre = genresData.results;
            this.totalResults = genresData.total_results;
          }),
        fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            config.api_key
          }`
        )
          .then(res => {
            return res.json();
          })
          .then(json => {
            const genresArray = json.genres;
            const genreObj = genresArray.find(genre => {
              return genre.id == this.$route.params.genreId;
            });
            this.genreName = genreObj.name;
          })
      ]).then(() => {
        this.isLoading = false;
      });

      // const genresData = await genreResponse.json();
      // console.log(genresData);
      // this.moviesOfGenre = genresData.results;
    }
  },
  computed: {
    pageNumber() {
      return this.$route.params.pageNumber ? this.$route.params.pageNumber : 1;
    }
  },
  components: {
    MoviesList
  }
};
</script>
