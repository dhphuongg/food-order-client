<script setup>
const emit = defineEmits(['click'])
const handleClick = () => {
    emit('click');
}
</script>
<template>
    <button type="submit" class="btn" @click="handleClick">
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