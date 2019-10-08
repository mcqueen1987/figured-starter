<template>
    <article class="col-sm-12">
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <router-link :to="'/'" style="color:#666"> &lt;&nbsp;&nbsp;Back</router-link>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                post: {},
                showCommentBox: false,
            }
        },
        beforeMount() {
            this.getPost(this.$route.params.id);
        },
        methods: {
            async getPost(id) {
                let ret = this.$store.state.blogs.blogs.filter(p => p.id === id);
                this.post = Object.assign({}, this.post, [...ret][0]); // ??
            }
        }
    }
</script>