<template>
    <div class="container">
        <div v-if=statusMsg class="alert-danger alert"
             role="alert">
            {{ statusMsg }}
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="row" >
                    <router-link v-if="role == 'admin'" :to="'/create'" class="btn btn-primary"> +
                        Create New Blog
                    </router-link>
                </div>

                <paginate
                        name="blogs"
                        :list="posts"
                        :per="5"
                        tag="div"
                >
                    <section v-for="blog in paginated('blogs')" style="margin-top: 36px">
                        <h2>{{ blog.title }}</h2>
                        <div>
                            <router-link :to="'/post/' + blog.id" style="margin-right:48px">Read more</router-link>
                            <router-link v-if="role == 'admin'" :to="'/update/' + blog.id" style="margin-right:48px">
                                Edit
                            </router-link>
                            <button class="btn btn-danger" v-if="role == 'admin'" v-on:click="deletePost(blog.id)">
                                Delete
                            </button>
                        </div>
                        <hr>
                    </section>
                </paginate>

                <paginate-links
                        for="blogs"
                        :limit="3"
                        :async="true"
                        :show-step-links="true"
                        :step-links="{
                            next: 'Next',
                            prev: 'Previous'
                         }"
                        :classes="{
                            'ul': 'pagination',
                            'ul > li': 'page-item',
                            'ul > li > a': 'page-link',
                         }"
                >
                </paginate-links>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [],
                paginate: ['blogs'],
                statusMsg: '',
                role: Role
            }
        },
        created() {  // get data from mongo
            this.$http({url: '/api/blog', method: 'GET'})
                .then(function (response) {
                    this.posts = response.data;
                }, function (error) {
                    console.log(error.statusText);
                });
        },
        methods: {
            deletePost(id) {
                this.$http({url: '/api/blog/' + id, method: 'DELETE'})
                    .then(function () {
                        this.showNotification('delete succeed')
                        this.posts = this.posts.filter(p => p.id !== id)
                    }, function (error) {
                        console.log(error.statusText);
                    });
            },
            showNotification(message) {
                this.statusMsg = message;
                setTimeout(() => {
                    this.statusMsg = '';
                }, 3000);
            }
        }
    }
</script>