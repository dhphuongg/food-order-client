<script setup>
const props = defineProps(["title"])
</script>
<template>
    <button type="submit" class="btn">
        {{ props?.title }}
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.btn {
    padding: 12px 24px;
    transition: all linear 0.4s;
    background-color: $primary-color;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    color: $white-color;
    cursor: pointer;

    &:hover {
        background-color: $secondary-color;
    }
}
</style>