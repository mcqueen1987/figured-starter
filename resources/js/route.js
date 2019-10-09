
import App from './components/App.vue'
import VueRouter from 'vue-router'

const routes = [
    {path: '/', component: App.components.Blog},
    {path: '/home', component: App.components.Blog},
    {path: '/post/:id', component: App.components.Post},
    {path: '/create', component: App.components.Create},
    {path: '/update/:id', component: App.components.Update},
];

const router = new VueRouter({
    mode:'history',
    routes
})

export default router;