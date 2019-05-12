<template>
  <div class="home text-center">
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <h3>Пагинатор</h3>
      <v-pagination
        class="flex list-reset justify-center"
        v-model="currentPage"
        :page-count="totalPages"
        :labels="paginationAnchorTexts"
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
import vPagination from "vue-plain-pagination";

export default {
  name: "genre",
  props: ["lang"],
  data() {
    return {
      moviesOfGenre: [],
      genreName: "",
      isLoading: true,
      totalResults: null,
      totalPages: null,
      currentPage: 1,
      paginationAnchorTexts: {
        first: "First",
        prev: "Previous",
        next: "Next",
        last: "Last"
      }
    };
  },
  created() {
    this.currentPage = Number(this.$route.params.pageNumber);
    this.fetchData();
  },
  methods: {
    fetchData() {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            config.api_key
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
            this.currentPage
          }&with_genres=${this.$route.params.genreId}&language=${this.lang}`
        )
          .then(genresResponse => {
            return genresResponse.json();
          })
          .then(genresData => {
            this.moviesOfGenre = genresData.results;
            this.totalResults = genresData.total_results;
            this.totalPages = genresData.total_pages;
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
    },
    currentPage() {
      console.log("paginate", this.currentPage);
      this.$router.push(
        `/genre/${this.$route.params.genreId}/page/${this.currentPage}`
      );
      this.fetchData();
    }
  },
  components: {
    MoviesList,
    vPagination
  }
};
</script>
