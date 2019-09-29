<template>
    <div class="card" style="width:100%">
        <div class="card-header">Edit Post</div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label>Title</label>
                    <input v-model="title" type="text" class="form-control" id="title" placeholder="Post Title"
                           required>
                </div>
                <div class="form-group">
                    <label>Post Content</label>
                    <textarea v-model="body" class="form-control" id="post-content" rows="3"
                              required>{{body}}</textarea>
                </div>
            </form>
        </div>
        <div v-if=statusMsg :class="{'alert-success': status, 'alert-danger': !status }" class="alert"
             role="alert">
            {{ statusMsg }}
        </div>
        <div class="card-footer">
            <button type="button" @click="updatePost" class="btn btn-primary">
                {{ isCreatingPost ? 'Saving...' : 'Save' }}
            </button>
            <button type="button" class="btn">
                <router-link :to="'/'" style="color:#999">Cancel</router-link>
            </button>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                statusMsg: '',
                status: '',
                isCreatingPost: false,
                title: '',
                body: '',
            };
        },
        beforeMount() {
            this.initData();
        },
        methods: {
            initData() {
                this.$http.get('/api/blog/' + this.$route.params.id)
                    .then(function (response) {
                        this.title = response.data.title;
                        this.body = response.data.content;
                    }, function (error) {
                        console.log(error.statusText);
                    });
            },
            updatePost(e) {
                e.preventDefault();
                if (!this.validateForm()) {
                    return false;
                }
                this.isCreatingPost = true;
                const data = {
                    title: this.title,
                    content: this.body
                };
                this.$http.patch('/api/blog/' + this.$route.params.id, data)
                    .then(
                        () => {
                            this.status = true;
                            this.showNotification('Post Successfully Updated');
                            this.isCreatingPost = false;
                        },
                        error => console.log(error)
                    );
            },
            validateForm() {
                if (!this.title) {
                    this.status = false;
                    this.showNotification('Post title should not be empty');
                    return false;
                }
                if (!this.body) {
                    this.status = false;
                    this.showNotification('Post body should not be empty');
                    return false;
                }
                return true;
            },
            showNotification(message) {
                this.statusMsg = message;
                setTimeout(() => {
                    this.statusMsg = '';
                }, 3000);
            }
        },
    };
</script>
