<template>
  <div id="app">
    <div class="flex justify-between items-center">
      <div id="nav" class="text-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div>
        <select v-model="lang" name="" id="">
          <option value="uk">Українська</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>

      <div class="">
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
  components: {
    SearchForm
  }
};
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
