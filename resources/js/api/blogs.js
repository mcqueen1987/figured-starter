import axios from 'axios'

export default {
    getAllBlogs() {
        return axios.get('/api/blog');
    },
    deletePost(id) {
        return axios.delete('/api/blog/' + id);
    },
    createPost(data) {
        return axios.post('/api/blog/', data);
    },
    updatePost(data) {
        return axios.put('/api/blog/' + data.id, data);
    }
}