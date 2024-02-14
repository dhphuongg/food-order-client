<script setup>
import { useRouter } from 'vue-router';
const show = ref(false);
const router = useRouter();
const handleLogin = () => {
    router.push('/login');
}
</script>
<template>
    <header class="container header">
        <div class="wide">
            <router-link to="/">
                <img src="@/assets/images/logo.png" alt="logo" class="header-logo">
            </router-link>
            <div class="header-menu">
                <router-link to="/">
                    <IconSearch size="24" class="icon" />
                </router-link>
                <router-link to="/login">
                    <IconShoppingCartFilled size="24" class="icon" />
                </router-link>
                <HfButton @click="handleLogin">Đăng nhập</HfButton>
            </div>
            <div class="nav-mobile">
                <router-link to="/">
                    <IconSearch size="24" class="icon mobile-search" />
                </router-link>
                <IconMenu2 class="menu-mobile" @click="show = true" />
            </div>
            <n-drawer v-model:show="show" width="70%">
                <n-drawer-content closable>
                    <template #header>
                        <img src="@/assets/images/logo.png" alt="logo" width="36%">
                    </template>
                    <ul class="mobile-menu">
                        <li>
                            <router-link to="/">
                                <IconShoppingCartFilled size="18" class="icon-menu-mobile" />Giỏ hàng
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/login">
                                <IconLogin size="18" class="icon-menu-mobile" />Đăng nhập
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/register">
                                <IconUser size="18" class="icon-menu-mobile" />Đăng ký
                            </router-link>
                        </li>
                    </ul>
                </n-drawer-content>
            </n-drawer>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '@/styles/_mixins' as mixins;

.header {
    width: 100% !important;
    height: $header-height;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    @include mixins.position(fixed, $t: 0, $r: 0, $l: 0, $index: 10);

    .wide,
    &-menu,
    .nav-mobile {
        @include mixins.flex(space-between, center);
    }

    &-menu {
        @include mixins.mobile {
            display: none;
        }
    }

    &-logo {
        width: 92px;

        @include mixins.mobile {
            width: 60px;
        }
    }

    .icon,
    .menu-mobile {
        margin-right: 20px;
        transition: all 0.2s linear;
        cursor: pointer;

        &:hover {
            color: $primary-color;
        }

    }

    .menu-mobile {
        margin: 0;
    }

    .nav-mobile {
        align-items: start;
        display: none;
        margin: 0;

        @include mixins.mobile {
            display: flex;
        }
    }
}

.mobile-menu {
    list-style: none;

    li {
        padding: 8px 4px;

        a {
            @include mixins.flex($align: center);
        }

        &:hover {
            background-color: cornflowerblue;
            border-radius: 4px;

            a {
                color: $white-color;

            }
        }
    }


}
</style>