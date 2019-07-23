import Vue from 'vue'
import Router from 'vue-router'
import swapi from './components/swapi.vue'
import people from './components/people.vue'
import films from './components/films.vue'
import planets from './components/planets.vue'
import species from './components/species.vue'
import starships from './components/starships.vue'
import vehicles from './components/vehicles.vue'
Vue.use(Router)


export default new Router({
    mode:'history', //Remove Hash From URL
    routes: [
        {
            path:'/',
            name:'swapi',
            component:swapi
        },
        {
            path: '/people',
            name: 'people' ,
            component:people
        },
        {
            path: '/films',
            name: 'films' ,
            component:films
        },
        {
            path: '/planets',
            name: 'planets' ,
            component:planets
        },
        {
            path: '/species',
            name: 'species' ,
            component:species
        },
        {
            path: '/starships',
            name: 'starships' ,
            component:starships
        },
        {
            path: '/vehicles',
            name: 'vehicles' ,
            component:vehicles
        }
    ]
})