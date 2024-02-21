<template>
    <HfHeader />
    <div class="purchase-order">
        <HfSideBarPurchaseOrder />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>
<style scoped>
.purchase-order {
    display: flex;

    .content {
        flex-grow: 1;
        padding: 40px 60px;
    }
}
</style>