<script setup>
</script>
<template>
    <div class="container our-commitment">
        <div class="wide pad40-0-60">
            <h1 class="home-title">
                Đảm bảo của chúng tôi
            </h1>
            <div class="commitments-list">
                <div class="commitment-item">
                    <div class="commitment-image" style="background-color: #7aac82;">
                        <img src="@/assets/images/commitment-image1.png" alt="">
                    </div>
                    <div class="commitment-content">
                        <h3>Dễ Dàng Đặt Hàng</h3>
                        <p>Bạn chỉ cần một vài bước để đặt món ăn.</p>
                    </div>
                </div>
                <div class="commitment-item">
                    <div class="commitment-image" style="background-color: #53a8ab;">
                        <img src="@/assets/images/commitment-image2.png" alt="">
                    </div>
                    <div class="commitment-content">
                        <h3>Chuyển Phát Nhanh</h3>
                        <p>Bạn chỉ cần ngồi chờ và hàng của bạn có thể được giao tận nhà của bạn</p>
                    </div>
                </div>

                <div class="commitment-item">
                    <div class="commitment-image" style="background-color: #ae6967;">
                        <img src="@/assets/images/commitment-image3.png" alt="">
                    </div>
                    <div class="commitment-content">
                        <h3>Chất Lượng Tốt Nhất</h3>
                        <p>Không chỉ nhanh đối với chúng tôi chất lượng còn là số một.</p>
                    </div>
                </div>
                <div class="commitment-item">
                    <div class="commitment-image" style="background-color: #a7916f;">
                        <img src="@/assets/images/commitment-image4.png" alt="">
                    </div>
                    <div class="commitment-content">
                        <h3>Nguyên Liệu Sạch</h3>
                        <p>Nguyên liệu chúng tôi dùng để làm món ăn cho bạn cam kết sạch 100%</p>
                    </div>
                </div>
                <div class="commitment-item">
                    <div class="commitment-image" style="background-color: #657d4d;">
                        <img src="@/assets/images/commitment-image5.png" alt="">
                    </div>
                    <div class="commitment-content">
                        <h3>Giá Cả Phải Chăng</h3>
                        <p>Chúng tôi luôn đưa cho bạn những mức giá tiền phải chăng.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/styles/_mixins' as mixins;

.our-commitment {
    .home-title {
        text-align: center;
    }

    .commitments-list {
        @include mixins.flex(space-between);
        flex-wrap: wrap;
        text-align: center;

        .commitment-item {
            width: 20%;
            padding: 0 32px;

            @include mixins.mobile {
                margin-bottom: 32px;
                width: 100%;
            }

            @include mixins.small-tablet {
                margin-bottom: 32px;
                width: 50%;
            }

            @include mixins.tablet {
                margin-bottom: 32px;
                width: 33%;
            }
        }

        @include mixins.small-tablet {
            justify-content: center;
        }

        @include mixins.tablet {
            justify-content: center;
        }

        .commitment-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            transition: all ease 1s;

            >img {
                display: block;
                margin: auto;
                width: 50%;
                height: 50%;
            }
        }

        h3 {
            margin-bottom: 10px;
            font-size: 18px;
            color: #1e1d23;
            white-space: nowrap;
        }

        p {
            color: #808080;
            font-size: 15px;
            line-height: 28px;
        }
    }
}
</style>