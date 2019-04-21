<template>
  <div id="app">
    <div class="flex justify-between items-center">
      <div id="nav" class="text-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="">
        <SearchForm />
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
export default {
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
