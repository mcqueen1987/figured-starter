<template>
    <div class="card" style="width: 100%">
        <div class="card-header">New Post</div>
        <div class="card-body">
            <div v-if=statusMsg :class="{'alert-success': status, 'alert-danger': !status }" class="alert"
                 role="alert">
                {{ statusMsg }}
            </div>
            <form>
                <div class="form-group">
                    <label>Title</label>
                    <input v-model="title" type="text" class="form-control" id="title"
                           required>
                </div>
                <div class="form-group">
                    <label>Post Content</label>
                    <textarea v-model="body" class="form-control" id="post-content" rows="3" required></textarea>
                </div>
            </form>
        </div>
        <div class="card-footer">
            <button type="button" @click="createPost" class="btn btn-success">
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
        methods: {
            createPost(e) {
                e.preventDefault();
                if (!this.validateForm()) {
                    return false;
                }
                this.isCreatingPost = true;
                const data = {
                    title: this.title,
                    content: this.body
                };
                let that = this;
                this.$store.dispatch('blogs/newPost', {'data': data})
                    .then(function () {
                        that.title = that.body = '';
                        that.status = true;
                        that.isCreatingPost = false;
                        that.showNotification('Post Successfully Created');
                    }, function (error) {
                        console.log(error.statusText);
                    });
            },
            validateForm() {
                if (!this.title) {
                    this.status = false;
                    this.showNotification('Post title cannot be empty');
                    return false;
                }
                if (!this.body) {
                    this.status = false;
                    this.showNotification('Post body cannot be empty');
                    return false;
                }
                return true;
            },
            showNotification(message) {
                this.statusMsg = message;
                setTimeout(() => {
                    this.status_msg = '';
                }, 3000);
            }
        }
    };
</script>
