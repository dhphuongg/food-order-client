<script setup>

</script>
<template>
    <div class="container food-suggest">
        <div class="wide pad40-0-60">
            <h1 class="home-title">
                Gợi ý món ăn
            </h1>
            <div class="suggest-showmore">
                <HfButton class="btn-showmore">Xem thêm</HfButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.food-suggest {
    width: 100vw;
    background-image: url("@/assets/images/suggest-image1.png");

    .home-title {
        text-align: center;
    }

    .suggest-showmore {
        display: flex;
        justify-content: center;
    }

    .btn-showmore {
        margin: 60px 0 0;
        padding: 20px 36px;
        background-color: $secondary-color;

        &:hover {
            background-color: $primary-color;
        }
    }
}
</style>