<template>
    <article class="col-sm-12">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>

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
            this.initData();
        },
        methods: {
            initData() {
                this.$http.get('/api/blog/' + this.$route.params.id)
                    .then(function (response) {
                        this.post = response.data;
                    }, function (error) {
                        console.log(error.statusText);
                    });
            },
        }
    }
</script>