<template>
  <div id="app">
    <todo-header></todo-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import todoHeader from "@/components/header.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    todoHeader
  }
})
export default class App extends Vue {}
</script>


<style>
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  height: 595px;
  border: 1px solid #2c3e50;
  margin: 0 auto;
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
