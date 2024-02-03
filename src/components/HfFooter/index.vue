<script setup>

</script>
<template>
    <footer class="container footer">
        <div class="wide">
            <div class="footer-info">
                <img src="@/assets/images/logoWhite.png" alt="logo" class="footer-logo">
                <p>
                    Trụ sở: 298 đường Cầu Diễn, phường Minh Khai
                </p>
                <p>
                    Quận Bắc Từ Liêm, Thành phố Hà Nội
                </p>
                <p>
                    Số điện thoại: 02455712345
                </p>
                <p>
                    Email: <a href="mailto:hitfood@gmail.com">hitfood@gmail.com</a>
                </p>
                <p>
                    Facebook: <a target="_blank"
                        href="https://www.facebook.com/hitfood">https://www.facebook.com/hitfood</a>
                </p>
            </div>
            <div class="footer-category">
                <ul>
                    <h4>Danh mục sản phẩm</h4>
                    <li>Rau củ quả</li>
                    <li>Món chay</li>
                    <li>Hải sản</li>
                    <li>Phở</li>
                    <li>Cháo</li>
                    <li>Đồ ăn nhanh</li>
                </ul>
            </div>
            <div class="footer-transport">
                <ul>
                    <h4>Danh mục đơn vị vận chuyển</h4>
                    <li>GoJek</li>
                    <li>GrabFood</li>
                    <li>Now</li>
                    <li>Giao hàng nhanh</li>
                    <li>Giao hàng tiết kiệm</li>
                </ul>
            </div>
            <div class="footer-pay">
                <h4>Phương thức thanh toán</h4>
                <div class="pay-list">
                    <div class="pay-image">
                        <img src="@/assets/images/visa.jpg" alt="visa">
                    </div>
                    <div class="pay-image">
                        <img src="@/assets/images/vnpay.png" alt="vnpay">
                    </div>
                    <div class="pay-image">
                        <img src="@/assets/images/momo.png" alt="momo">
                    </div>
                    <div class="pay-image">
                        <img src="@/assets/images/zalo.png" alt="zalo">
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/_mixins' as mixins;

.footer {
    background-color: $primary-color;
    color: $white-color;
    font-size: 15px;

    .wide {
        padding: 60px 0 40px;
        @include mixins.flex(space-between);
        flex-wrap: wrap;

        >div {
            @include mixins.mobile {
                display: none;
            }

            @include mixins.small-tablet {
                margin-bottom: 24px;
            }

            @include mixins.tablet {
                margin-bottom: 24px;
            }
        }

        >div:first-child {
            @include mixins.mobile {
                display: block;
            }
        }
    }

    &-logo {
        height: 40px;
        margin-bottom: 20px;
    }

    p {
        margin: 0 0 16px;
    }

    a {
        color: $white-color;
    }

    li {
        list-style: none;
        line-height: 30px;
    }

    h4 {
        margin-bottom: 10px;
    }

    .pay-list {
        @include mixins.flex(space-between, center);
    }

    .pay-image {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        overflow: hidden;

        >img {
            width: 100%;
            height: 100%;
        }
    }

    .pay-image:last-child {
        width: 40px;
        height: 40px;
    }
}
</style>