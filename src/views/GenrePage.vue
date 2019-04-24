<template>
  <div class="home text-center">
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <h3>Пагинатор</h3>
      <button @click="pageChange">Page Change</button>
      <vue-ads-pagination
        :page="1"
        :itemsPerPage="20"
        :maxVisiblePages="4"
        :totalItems="totalResults"
        @pageChange="pageChange"
      />
      <h1 class="mb-2">Фильмы жанра — {{ genreName }}</h1>
      <MoviesList :movies="moviesOfGenre" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MoviesList from "@/components/MoviesList";
import config from "@/config";
import VueAdsPagination from "vue-ads-pagination";

export default {
  name: "genre",
  props: ["lang"],
  data() {
    return {
      moviesOfGenre: [],
      genreName: "",
      isLoading: true,
      totalResults: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    pageChange(page, range) {
      console.log(page, range);
    },
    fetchData() {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            config.api_key
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${
            this.$route.params.genreId
          }&language=${this.lang}`
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
          }&language=${this.lang}`
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
  watch: {
    lang() {
      this.fetchData();
    }
  },
  components: {
    MoviesList,
    VueAdsPagination
  }
};
</script>
