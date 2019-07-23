<template>
  <div class="vehicles-countainer">
      <img id="logo" alt="Vue logo" src="../assets/vehicles.png">
     <div id="container"  >
              <select id="list-vehicles"  v-model="selected"     :required='true' > 
                <option disabled >Choose ...</option>
                <option v-for="(vhc,index) in Vehicles" :key="index" :value="vhc">{{vhc.name}}</option>
              </select>
     </div>
     <transition name="alert-in" enter-active-class="animated flash" >
     <div  id="detaille" v-if="selected != 'Choose ...'">
     <ul  v-for="(elem , ex) in selected" v-bind:key="elem" >    
     <li>   <label class="titre" > {{ex}}   : </label> <div class="donnee" v-linkified> {{elem}} </div> </li>
     </ul>
     </div>
     </transition>
  </div>
</template>

<script>
//import { METHODS } from 'http';
import axios from 'axios';
export default {
  
  name: 'vehicles',
  props: {
    msg: String
  },


data: () => ({
      selected:'Choose ...',
      Vehicles: [],
      errors: []
      }),
  created(){
      axios.get('https://swapi.co/api/vehicles/')
      .then(response => {
      this.Vehicles = response.data.results;
      this.Vehicles.map((p, index) => {
          let keys = Object.keys(p)
          keys.map(k => {
           if (['pilots'].includes(k)) {
              p[k].map((url, i) => {
                axios.get(url)
                .then(({ data }) => {
                  //console.log('others - data.name', data.name)
                  this.Vehicles[index][k][i] = data.name
                })
              })
            } else if (['films'].includes(k)) {
              p[k].map((url, i) => {
                axios.get(url)
                .then(({ data }) => {
                  //console.log('films - data.title', data.title)
                  this.Vehicles[index][k][i] = data.title
                })
              })
            }
          })
        })
       })
      .catch(e => {
      this.errors.push(e);
      })
  }
  
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
#vehicles-container{
  background: white;
  width: 30%;
  margin: 0 auto 4px auto;
  padding: 1em;
  box-shadow: 1px 1px 0 lightgrey;
 
}
#logo{
   border-radius: 50px;
   width: 40%;
   height: 40%;  
}
#container{
  position: absolute;
  width: 50%;
  height: 60%;
   border-radius: 10px;
}
#list-vehicles{
  margin-top:5px;
  background: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.23);
  border: solid 1px #666;
  height: 60px;
  /*overflow-y: scroll;*/
  line-height: 1.5;
  letter-spacing: 0.7px;
  color: black;
  font-size: 20px;
  cursor: pointer;
  padding: 7.5px 15px;
  border-top: solid 1px #c0bebe;
  
}
#detaille{
  margin-top: 15%;
  margin-bottom: 20%;
  border:solid 1px #666;
}
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
ul li{
  padding: 35px;
  font-size: 1.3em;
  background-color: rgb(253, 254, 255);
  border-left: 6px solid rgb(62, 80, 246);
  margin-bottom: 3px;
  color: #3E5252;
}
.titre{
  position: relative;
  color: blue;
  width: 30%;
  text-align: left;
  float: left;
}
.donnee{
  position: relative;
  text-align: right;
 
  width:90%;
}

</style>
