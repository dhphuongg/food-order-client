<script setup>
import { onBeforeMount, reactive } from 'vue';
import { getOrderedProducts } from '@/api/order.api';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const loadingBar = useLoadingBar();
const disabledRef = ref(true);
const formattedDate = (date) => date.slice(0, 10).split('-').reverse().join('-');
const formattedPrice = (price) => price.toLocaleString('vi-VN');

const dataProducts = ref([]);
const loadDataOrderedProducts = async () => {
    try {
        loadingBar.start()
        disabledRef.value = false;
        if (authStore.auth.customerId) {
            const data = await getOrderedProducts(authStore.auth.customerId);
            dataProducts.value = data.data;
            console.log(dataProducts.value);
        }
    } catch (error) {
        console.log(error);
        if (!!error.response) {
            message.error(error.response.data.message);
        } else {
            message.error(error.message);
        }
    }
    loadingBar.finish()
    disabledRef.value = true;
}
onBeforeMount(
    async () => await loadDataOrderedProducts()
);
const columns = reactive([
    {
        title: "Đơn Hàng",
        key: "id",
        align: 'center',
    },
    {
        title: "Tên Hàng",
        key: "product.name"
    },
    {
        title: "Ngày Đặt",
        key: "bill.createdDate",
        render(row) {
            return h(
                'span',
                formattedDate(row.bill.createdDate)
            );
        }
    },
    {
        title: "Trạng Thái",
        key: "bill.status"
    },
    {
        title: "Giá tiền",
        align: 'center',
        key: 'product.price',
        render(row) {
            return h(
                'span',
                formattedPrice(row.product.price) + ' đ'
            )
        }
    },
    {
        title: "Số Lượng Đặt",
        align: 'center',
        key: 'quantity'
    }
    , {
        title: "Tổng Tiền",
        align: 'center',
        key: "product.price",
        render(row) {
            return h(
                'span',
                {
                    style: {
                        color: 'red',
                        fontWeight: 500
                    }
                },
                formattedPrice(row.product.price * row.quantity) + ' đ'
            );
        }
    }
]);
</script>
<template>
    <div class="history-ordered">
        <h1>Lịch sử đơn hàng</h1>
        <n-data-table :columns="columns" :data="dataProducts" :pagination="10" />
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