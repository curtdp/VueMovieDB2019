<template>
  <div class="home">
    <div
      class="backdrop-image bg-cover w-full bg-blue-light h-64 flex justify-center items-center text-4xl mb-4"
      :style="backdropStyles"
    >
      <h1 class="movieTitle text-white">{{ movie.title }}</h1>
    </div>
    <img :src="posterPath" alt="" srcset="" />
  </div>
</template>

<script>
// @ is an alias to /src
import config from "@/config";

export default {
  name: "home",
  data() {
    return {
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
          config.images.backdrop_sizes[2]
        }${this.movie.backdrop_path})`
      };
    }
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            this.$route.params.id
          }?api_key=${config.api_key}`
        );
        this.movie = await res.json();
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
