<template>
  <div class="hello">
     <img id="logo" alt="Vue logo" src="../assets/logo.png">
     <p id="choix" > GET DATA </p>
      <button id="swapi-container"  v-for="(value,key) in swapis" v-bind:key="key"  @click="goTo(key)">  
         <label id="lb-swapi"> {{key}} </label>
      </button>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'swapi',
  props: {
    msg: String
  },
  data: () => ({
      swapis: [],
      errors: []
      }),
  created(){
      axios.get('https://swapi.co/api/')
      .then(response => {
      this.swapis = response.data;
      console.log(response);
       })
      .catch(e => {
      this.errors.push(e);
      })
  }
  ,
 methods:{
    goTo(key){
         this.$router.push({name:key})
    }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#swapi-container{
  background: white;
  width: 30%;
  margin: 20px 20px 10px auto;
  padding: 1em;
  box-shadow: 1px 1px 0 lightgrey;
  box-sizing: border-box;
  border-radius: 20px;
}
.lb-swapi{
  font-weight: bold;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
#logo{
  border-radius: 80px;
  
}
#choix{
  color: black;
  background-color: gold;
  font-size: 1.5em;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
}
</style>
