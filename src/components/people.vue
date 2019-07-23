<template>
  <div class="people-countainer">
     <img id="logo" alt="Vue logo" src="../assets/people.png">
     <div id="container">
        <select id="list-people"   v-model="selected"   :required='true' > 
          <option disabled >Choose ...</option>
          <option v-for="(per, index) in peoples" :key="index" :value="per">{{per.name}}</option>
        </select>
     </div>
     <transition name="alert-in" enter-active-class="animated bounceInLeft" >
     <div  id="detaille" v-if="selected != 'Choose ...'">
     <ul  v-for="(elem , ex) in selected" :key="elem"   >    
      <li>
        <label  class="titre"> {{ex}}    :</label>
        <div class="donnee"  v-linkified >
            {{elem}}
        </div>
      </li>
     </ul>
     </div>
     </transition>
  </div>
</template>

<script>
//import { METHODS } from 'http';
import axios from 'axios';
import { write } from 'fs';
import { type } from 'os';
import { resolve } from 'path';
export default {
  name: 'people',
data () {
  return {
    selected:'Choose ...',
    peoples: [],
    errors: [],
    pop:'',
  }
  },
  created(){
      axios.get('https://swapi.co/api/people/')
      .then(response => {
        this.peoples=response.data.results;
        this.peoples.map((p, index) => {
          let keys = Object.keys(p)
          keys.map(k => {
            if (k === 'homeworld') {
              //console.log('get homeworld', p[k]);
              
              axios.get(p[k])
              .then(({ data }) => {
                //console.log('data.name', data.name)
                this.peoples[index][k] = data.name
              })
            } else if (['species', 'vehicles', 'starships'].includes(k)) {
              p[k].map((url, i) => {
                axios.get(url)
                .then(({ data }) => {
                  //console.log('others - data.name', data.name)
                  this.peoples[index][k][i] = data.name
                })
              })
            } else if (['films'].includes(k)) {
              p[k].map((url, i) => {
                axios.get(url)
                .then(({ data }) => {
                  //console.log('films - data.title', data.title)
                  this.peoples[index][k][i] = data.title
                })
              })
            }
          })
        })
        
      })
      .catch(e => {
        lo
        this.errors.push(e);
      })    
  },
  
  /*
   methods:{
     
     result (valeur) {
       console.log('result',valeur);
       

           if(valeur.indexOf("https") && typeof valeur =='string'){
                return valeur;
                                     }
          else{
            
            if(!valeur.indexOf("https")){
            
              axios.get(valeur).then(response =>{
              // console.log(response.data['name'])
               console.log(response.data)
                 this.pop=response.data['name'];
            
                 
            
            });
            
            
            }
            
          }
       }
  },*/
  watch:{
    selected(newval ,oldval){
      console.log('watcher', newval);
     
      
      
      
    }
  }
  
  
}

 
  
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
#people-container{
  background: white;
  width: 30%;
  margin: 0 auto 4px auto;
  padding: 1em;
  box-shadow: 1px 1px 0 lightgrey;
 
}
#logo{
   border-radius: 10px;
   width: 40%;
   height: 40%;  
}
#container{
  position: absolute;
  width: 50%;
  height: 60%;
   border-radius: 10px;
}
#list-people{
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
