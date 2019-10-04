<template>
    <div class="container">
        <div class="row">
            <div class="container">
                <img style="width: 100%; margin: 30px 0 0 0;"
                     src="https://practicedock.com/wp-content/uploads/2018/03/blog-767x423.jpg">
            </div>
            <router-view>
                <Blog></Blog>
            </router-view>
            <footer class="col-sm-12">
                <hr>
                <p class="text-center"><a href="http://dongboxu.com/" target="_blank">Dongbo Xu</a> &copy; 2019 </p>
            </footer>
        </div>
    </div>
</template>