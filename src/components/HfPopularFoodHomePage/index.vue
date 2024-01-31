<script setup>

</script>
<template>
    <div class="container popular-food">
        <div class="wide pad40-0-60">
            <!-- Title -->
            <h1 class="home-title">Món ăn phổ biến</h1>

            <!-- List popular food -->
            <div class="list-foods"></div>

            <!-- Cofirm popular -->
            <div class="popular-confirm">
                <img src="@/assets/images/popular-image1.png" alt="">
                <div class="confirm-info">
                    <h1 class="h1-logo">
                        HitFood </h1>
                    <h1 class="h1-confirm">
                        LÀM ĐÚNG. LÀM
                        NGON. DÀNH RIÊNG
                        CHO BẠN.</h1>
                    <HfButton title="ORDER NOW" class="btn-order" />
                </div>
            </div>
        </div>
    </div>
    <div class="popular-images">
        <div><img src="@/assets/images/popular-image3.jpg" alt=""></div>
        <div><img src="@/assets/images/popular-image4.jpg" alt=""></div>
        <div><img src="@/assets/images/popular-image5.jpg" alt=""></div>
        <div><img src="@/assets/images/popular-image6.jpg" alt=""></div>
    </div>
</template>



<style lang="scss" scoped src="@/components/HfPopularFoodHomePage/styles.scss"></style>