<template>
    <div class="container">
        <div v-if=statusMsg class="alert-danger alert"
             role="alert">
            {{ statusMsg }}
        </div>
        <div class="row">
            latestBlogsCount: {{ this.$store.getters['blogs/getBlogsCount'] }}
            <hr>
            latestBlogs: {{ this.$store.getters['blogs/getAllBlogs'] }}
            <hr>
            <div onclick="">
                <button @click='decrement'>-</button>
                counting : {{ this.$store.state.blogs.counting }}
                <button @click='incrementBy'>+</button>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <router-link v-if="role == 'admin'" :to="'/create'" class="btn btn-primary"> +
                        Create New Blog
                    </router-link>
                </div>
                <paginate
                        name="pagination"
                        :list="this.$store.state.blogs.blogs"
                        :per="5"
                        tag="div"
                >
                    <section v-for="blog in paginated('pagination')" style="margin-top: 36px">
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
                        for="pagination"
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
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                paginate: ['pagination'],
                statusMsg: '',
                role: Role
            }
        },
        created() {  // get data from mongo
            this.$store.dispatch('blogs/initBlogs');
        },
        computed: mapState([
            'counting'
        ]),
        // computed: {
        //     counting() {
        //         return this.$store.blogs.state.counting + "";
        //     }
        // },
        methods: {
            deletePost(id) {
                let that = this;
                this.$store.dispatch('blogs/deletePost', {'id': id})
                    .then(function () {
                        that.showNotification('delete succeed');
                        that.$store.state.blogs.blogs = that.$store.state.blogs.blogs.filter(p => p.id !== id);
                    }, function (error) {
                        console.log(error.statusText);
                    });
            },
            showNotification(message) {
                this.statusMsg = message;
                setTimeout(() => {
                    this.statusMsg = '';
                }, 3000);
            },
            increment() {
                this.$store.dispatch('blogs/incrementAsync')
            },
            decrement() {
                this.$store.commit('blogs/decrement');
            },
            incrementBy() {
                this.$store.dispatch('blogs/incrementByAsync', {'num': 9});
            }
        }
    }
</script>