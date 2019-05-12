<template>
  <div id="app">
    <h1 class="mx-8 mt-8">{{ $t("siteName") }}</h1>
    <div class="flex justify-between items-center mx-8 mb-4">
      <div id="nav" class="text-center">
        <router-link to="/">{{ $t("home") }}</router-link> |
        <router-link to="/about">{{ $t("about") }}</router-link>
      </div>
      <div class="text-center">
        <select v-model="lang" name="" id="">
          <option value="uk">Українська</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>

      <div class="text-center">
        <SearchForm />
      </div>
    </div>

    <router-view :lang="lang" />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
export default {
  name: "App",
  data() {
    return {
      lang: "uk"
    };
  },
  created() {
    if (localStorage.getItem("lang")) {
      this.lang = localStorage.getItem("lang");
    }
  },
  components: {
    SearchForm
  },
  watch: {
    lang(val) {
      this.$i18n.locale = val;
      localStorage.setItem("lang", this.lang);
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.pagination-item {
  margin: 0 0.5rem;
  width: 3rem;
  border: 1px solid red;
  border-radius: 5px;
  padding: 8px;
}
</style>
