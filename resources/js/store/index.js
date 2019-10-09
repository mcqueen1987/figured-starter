import Blogs from './modules/Blogs'
import Plugins from './plugins/Plugins'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        blogs: Blogs,
    },
    plugins: Plugins,
})

export default store;

