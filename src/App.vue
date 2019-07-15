<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import swapi from './components/swapi.vue'

export default {
  name: 'app',
  components: {
    swapi
  }
}
</script>

<style>
body{
  background-color: #EEEEEE;
  font-family: 'Montserrat',sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
 /* align-items: center;*/
 padding-top: 50px;
}
body,html{
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 50%;
}

</style>
