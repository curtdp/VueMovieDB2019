<template>
  <div class="home">
    <div v-if="isLoading">Loading</div>
    <div v-else-if="isError">Какая-то ошибка</div>
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
          <p>
            {{ $t("genre") }}:
            <span
              v-for="genre of movie.genres"
              :key="genre.id"
              class="genreLink"
            >
              <router-link :to="`/genre/${genre.id}`">{{
                genre.name
              }}</router-link>
            </span>
          </p>
          <h2 class="mb-2">{{ $t("descriptionTitle") }}</h2>
          <main class="leading-tight">
            {{ movie.overview }}
          </main>
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
  props: ["lang"],
  data() {
    return {
      isLoading: true,
      isError: false,
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
      // https://image.tmdb.org/t/p/w500/undefinded.jpg
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
  watch: {
    lang() {
      this.fetchData();
    }
  },
  methods: {
    async fetchData(movieId = this.$route.params.id) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
            config.api_key
          }&language=${this.lang}`
        );
        if (res.ok) {
          this.movie = await res.json();
          this.isLoading = false;
        } else {
          throw Error("Что-то пошло не так.");
        }
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        this.isError = true;
      }
    }
  },
  components: {}
};
</script>

<i18n>
{
  "ru": {
    "genre": "Жанр",
    "descriptionTitle": "Описание фильма"
  },
  "uk": {
    "genre": "Жанр",
    "descriptionTitle": "Опис кінострічки"
  },
  "en": {
    "genre": "Genre",
    "descriptionTitle": "Movie description"
  }
}
</i18n>

<style scoped>
.movieTitle {
  text-shadow: 7px 3px 14px black;
}
.genreLink::after {
  content: ", ";
}

.genreLink a:hover {
  text-decoration: none;
}
</style>
