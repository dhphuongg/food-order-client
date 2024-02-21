<script setup>
import { onBeforeMount, reactive } from 'vue';
import { getOrderedProducts } from '@/api/order.api';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const loadingBar = useLoadingBar();
const disabledRef = ref(true);
const columns = reactive([
    {
        title: "Đơn Hàng",
        key: "bill.id",

    },
    {
        title: "Tên Hàng",
        key: "product.name"
    },
    {
        title: "Ngày Đặt",
        key: "bill.createdDate"
    },
    {
        title: "Trạng Thái",
        key: "bill.status",

    },
    {
        title: "Số Lượng Đặt",
        key: 'quantity'
    }
    , {
        title: "Tổng Tiền",
        key: "product.price"
    }
]);
const dataProducts = ref([]);
const loadDataOrderedProducts = async () => {
    try {
        loadingBar.start()
        disabledRef.value = false;
        if (authStore.auth.customerId) {
            const data = await getOrderedProducts(authStore.auth.customerId);
            dataProducts.value = data.data;
        }
        loadingBar.finish()
        disabledRef.value = true;
        console.log(dataProducts.value);
    } catch (error) {
        console.log(error);
        disabledRef.value = true;
        loadingBar.error();
        if (!!error.response) {
            message.error(error.response.data.message);
        } else {
            message.error(error.message);
        }
    }
}
onBeforeMount(loadDataOrderedProducts);
</script>
<template>
    <div class="history-ordered">
        <h1>Lịch sử đơn hàng</h1>
        <n-data-table :columns="columns" :data="dataProducts" />
    </div>
</template>
<style lang="scss" scoped>
.history-ordered {
    margin-top: $header-height;

    h1 {
        @include title-main(#333, 28px, 500);
        margin: 40px 0;
    }
}
</style>
<route lang="yaml">
    name: HisoryOrdered
    meta:
        layout: purchaseorder
</route>