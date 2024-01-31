<script setup>
const searchValue = ref("");
const handleSearch = () => {

}
</script>
<template>
    <div class="banner">
        <h1 class="h1-welcome">Welcome to HitFood</h1>
        <h1 class="h1-question">Hôm nay, bạn muốn ăn gì? </h1>
        <form action="" class="form-search" @submit.prevent="handleSearch">
            <IconCurrentLocation class="icon" />
            <input type="text" v-bind="searchValue" name="" id="" placeholder="Nhập tên món ăn bạn muốn tìm kiếm...">
            <HfButton class="btn-search">
                <IconSearch />
            </HfButton>
        </form>
        <img src="@/assets/images/banner-image2.png" alt="image effect" class="banner-effect">
    </div>
</template>


<style lang="scss" scoped src="@/components/HfSearchBannerHomePage/styles.scss"></style>