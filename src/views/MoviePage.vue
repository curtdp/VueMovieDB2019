<template>
  <div class="home">
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <div
        class="backdrop-image p-8 bg-cover w-full bg-blue-light min-h-64 flex justify-center items-center text-2xl mb-4"
        :style="backdropStyles"
      >
        <h1 class="movieTitle text-white">{{ movie.title }}</h1>
      </div>
      <div class="flex flex-wrap xs:flex-no-wrap mx-8">
        <div class="w-full xs:w-1/4 xs:mr-4">
          <img :src="posterPath" alt="" srcset="" />
        </div>
        <div class="movieContent w-full xs:w-3/4">
          {{ movie.overview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import config from "@/config";

export default {
  name: "home",
  data() {
    return {
      isLoading: true,
      movie: {}
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    posterPath() {
      return `${config.images.secure_base_url}${config.images.poster_sizes[3]}${
        this.movie.poster_path
      }`;
      // https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
    },
    backdropStyles() {
      return {
        backgroundImage: `url(${config.images.secure_base_url}${
          config.images.backdrop_sizes[3]
        }${this.movie.backdrop_path})`
      };
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // this.isLoading = true;
    // this.movie = null;
    await this.fetchData(to.params.id);
    next();
  },
  // watch: {
  //   $route() {
  //     this.fetchData();
  //   }
  // },
  methods: {
    fetchData: async function(movieId = this.$route.params.id) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            config.api_key
          }`
        );
        this.movie = await res.json();
        this.isLoading = false;
      } catch (error) {}
    }
  },
  components: {}
};
</script>

<style scoped>
.movieTitle {
  text-shadow: 7px 3px 14px black;
}
</style>
