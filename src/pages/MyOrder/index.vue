<script setup>
import { getPlacedOrders, cancelOrder } from '@/api/order.api';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount } from 'vue';
const authStore = useAuthStore();
const dataProducts = ref([]);
const loadingBar = useLoadingBar();
const disabledRef = ref(true);
const message = useMessage();
const loadDataPlacedOrders = async () => {
    try {
        loadingBar.start()
        disabledRef.value = false;
        if (authStore.auth.customerId) {
            const data = await getPlacedOrders(authStore.auth.customerId);
            dataProducts.value = data.data;
            console.log(dataProducts.value);
        }
        loadingBar.finish()
        disabledRef.value = true;
    } catch (error) {
        console.log(error);
        disabledRef.value = true;
        loadingBar.error();
        if (!!err.response) {
            message.error(err.response.data.message);
        } else {
            message.error(err.message);
        }
    }
}
onBeforeMount(loadDataPlacedOrders);
const handleCancelOrder = async (billId) => {
    try {
        loadingBar.start()
        disabledRef.value = false;
        const res = await cancelOrder(billId);
        console.log(res.data.status);
        if (res.data.status) {
            message.success('Hủy đơn hàng thành công');
            loadDataPlacedOrders();
        } else {
            message.success('Không thể hủy đơn hàng vì đơn hàng đang được vận chuyển!');
        }
        loadingBar.finish()
        disabledRef.value = true;
    } catch (error) {
        console.log(error);
        if (!!error.response) {
            message.error(error.response.data.message);
        } else {
            message.error(error.message);
        }
        disabledRef.value = true;
        loadingBar.error();
    }
}
</script>
<template>
    <div class="my-order">
        <h1>Đơn hàng của tôi</h1>
        <div class="order-list" v-if="dataProducts">
            <div class="order-product" v-for="item in dataProducts" :key="item.id">
                <div class="shop-infor">
                    <p>
                        <IconHomeStats style="color: #00a149;" />
                        {{ item.bill.status }}
                    </p>
                    <n-button class="btn-show-shop">
                        Xem shop
                    </n-button>
                </div>
                <hr>
                <div class="product-infor">
                    <div class="product-img">
                        <img :src="item.product.image" alt="image product">
                    </div>
                    <div class="product-content">
                        <h2>{{ item.product.name }}</h2>
                        <p>Số lượng: {{ item.quantity }}</p>
                        <p>Thành tiền: {{ item.quantity * item.product.price + item.bill.feeShip }}</p>
                    </div>
                </div>
                <hr>
                <div class="product-cancel">
                    <p class="time-ship">
                        <IconTruckDelivery />
                        {{ item.bill.timeShip.slice(0, 10) }}
                    </p>
                    <n-button type="error" style="color: #fff;" @click="() => handleCancelOrder(item.bill.id)">
                        Hủy hàng
                    </n-button>
                </div>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
<style lang="scss" scoped>
.my-order {
    margin-top: $header-height;

    h1 {
        @include title-main(#333, 28px, 500);
        margin: 40px 0;
    }

    .btn-show-shop {
        color: #333;
        background-color: transparent;
        border: 1px solid $secondary-color;
        outline: none;
        transition: all 0.4s ease;

        &:hover {
            background-color: $secondary-color;
            color: #fff;
        }
    }
}

.order-product {
    width: 100%;
    background-color: $white-color;
    padding: 8px 20px;
    box-shadow: 0 0 2px rgba(0 0 0/30%);
    border-radius: 4px;
    margin-bottom: 40px;

    .shop-infor {
        @include flex(space-between, center);

        p {
            @include flex(center, center);
            color: #313131;
            font-size: 16px;
        }
    }

    hr {
        border-top: 1px solid #ccc;
        border-bottom: transparent;
        margin: 4px 0 16px;
    }

    .product-infor {
        @include flex(unset, unset);
        padding: 0px 0 12px;

        .product-img {
            width: 120px;
            height: 120px;
            overflow: hidden;
            border-radius: 4px;
            margin-right: 20px;

            >img {
                width: 100%;
                height: 100%;
            }
        }

        .product-content {
            h2 {
                font-size: 24px;
                margin: 0;
                line-height: 24px;
                color: #333;
                font-weight: 400;
                margin-bottom: 12px;
            }

            p {
                color: #a3a3a3;
                margin: 8px 0;
            }
        }
    }

    .product-cancel {
        @include flex(space-between, center);
        padding-bottom: 8px;

        p {
            @include flex(center, flex-end);
            color: #313131;
        }
    }
}

.order-product:nth-child(2n+2) {
    background-color: #e8ffe5;
}
</style>
<route lang="yaml">
    name: myorder
    meta:
        layout: purchaseorder
</route>