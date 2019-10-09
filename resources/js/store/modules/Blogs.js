import blogApi from '../../api/blogs';

export const mutations = { 
    updateBlogs(state, newBlogs) {
        state.blogs = [...newBlogs];
    },
    updatePost(state, post) {
        state.blogs = state.blogs.filter(function (p) {
            if (p.id === post.id) {
                p.title = post.title;
                p.content = post.content;
            }
            return p;
        });
    },
    insertPost(state, newPost) {
        state.blogs = Object.assign({}, [...state.blogs], newPost);
    }
}

export const getters = {
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
}

export const actions = {
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
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

const moduleBlog = {
    namespaced: true,
    state: {
        blogs: [],
        counting: 0
    },
    actions,
    getters,
    mutations
}

export default moduleBlog;