import blogApi from '../api/blogs';

// store blogs
const moduleBlog = {
    namespaced: true,
    state: {
        blogs: [],
        counting: 0
    },
    // mutations are synchronise, not wait, but actions are asynchronous
    mutations: { // interface for state operations
        updateBlogs(state, newBlogs) {
            console.log("new blogs initiated: " + JSON.stringify(newBlogs));
            state.blogs = [...newBlogs];
        },
        updatePost(state, post) {
            console.log("update post data: " + JSON.stringify(post));
            state.blogs = state.blogs.filter(function (p) {
                if (p.id === post.id) {
                    p.title = post.title;
                    p.content = post.content;
                }
                return p;
            });
        },
        insertPost(state, newPost) {
            console.log("new post inserted: " + JSON.stringify(newPost));
            state.blogs = Object.assign({}, [...state.blogs], newPost);
        },
        increment(state) {
            state.counting++;
        },
        decrement(state) {
            state.counting--;
        },
        incrementBy(state, payload) {
            state.counting += payload.num;
        }
    },
    getters: {
        getAllBlogs: state => {
            return state.blogs;
        },
        getBlogsCount:
            (state, getters) => {
                return getters.getAllBlogs.length;
            },
        getBlogById:
            (state) => (id) => {
                return state.blogs.filter(blog => blog.id === id)
            }
    },
    actions: {
        // increment (context) { // context is obj of store ??  can call getter and state
        increment({commit}) { // commit from context
            commit('increment')
        },
        incrementAsync({commit}) {
            setTimeout(() => {
                commit("increment");
            }, 1000)
        },
        incrementByAsync({commit}, payload) {
            setTimeout(() => {
                commit("incrementBy", payload);
            }, 1000)
        },
        async initBlogs({commit}) {
            try {
                const response = await blogApi.getAllBlogs();
                await commit('updateBlogs', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async deletePost({commit}, payload) {
            try {
                await blogApi.deletePost(payload.id);
                state.blogs = state.blogs.filter(p => p.id !== payload.id)
            } catch (error) {
                console.log(error);
            }
        },
        async newPost({commit}, payload) {
            try {
                const response = await blogApi.createPost(payload.data);
                await commit('insertPost', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async updatePost({commit}, payload) {
            try {
                const response = await blogApi.updatePost(payload.data);
                await commit('updatePost', response.data);
            } catch (error){
                console.log(error);
                return error;
            }
        }
    }
}

export default moduleBlog;