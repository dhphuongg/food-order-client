<script setup>
import { useRouter } from 'vue-router';

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
                    <IconSearch size="26" class="icon" />
                </router-link>
                <router-link to="/login">
                    <IconShoppingCartFilled size="26" class="icon" />
                </router-link>
                <HfButton @click="handleLogin">Đăng nhập</HfButton>
            </div>
            <div class="nav-mobile">
                <router-link to="/">
                    <IconSearch size="24" class="icon mobile-search" />
                </router-link>
                <label for="menu-mobile">
                    <IconMenu2 class="menu-mobile" />
                </label>
            </div>
            <input type="checkbox" hidden name="" id="menu-mobile">
            <label for="menu-mobile" class="overlay"></label>
            <div class="header-menu-mobile">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <img style="width: 40%;" src="@/assets/images/logo.png" alt="logo" class="header-logo">
                    <label for="menu-mobile">
                        <IconX />
                    </label>
                </div>
                <hr>
                <ul>
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
                        <router-link to="/">
                            <IconUser size="18" class="icon-menu-mobile" />Đăng ký
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '@/styles/_mixins' as mixins;

.header {
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

    a {
        color: $black-color;
    }

    label {
        cursor: pointer;

        &:hover {
            color: $primary-color;
        }
    }

    &-logo {
        width: 92px;

        @include mixins.mobile {
            width: 30%;
        }
    }

    &-menu-mobile {
        @include mixins.position(fixed, $t: 0, $r: 0, $l: unset, $b: 0, $index: 13);
        background-color: $white-color;
        width: 70%;
        padding: 12px;
        display: none;

        ul {
            list-style: none;
            margin-top: 12px;
        }

        li {
            padding: 8px;
            @include mixins.flex($align: center);
            font-size: 16px;

            .icon-menu-mobile {
                margin-right: 6px;
            }

            &:hover {
                background-color: cornflowerblue;
                color: $white-color;
                border-radius: 4px;
            }
        }

    }

    .nav-mobile .icon {
        margin-right: 20px;
    }

    .icon,
    .menu-mobile {
        margin-right: 30px;
        cursor: pointer;
        transition: all 0.2s linear;

        &:hover {
            color: $primary-color;
        }

    }

    .menu-mobile {
        margin: 0;
    }

    .nav-mobile {
        display: none;
        margin: 0;

        @include mixins.mobile {
            display: flex;
        }
    }

    .overlay {
        @include mixins.position(fixed, $t: 0, $r: 0, $l: 0, $b: 0, $index: 12);
        background-color: $black-color;
        opacity: 0.4;
        display: none;
    }

    input[type=checkbox]:checked~.overlay,
    input[type=checkbox]:checked~.header-menu-mobile {
        display: block;
    }

    input[type=checkbox]:checked~.header-menu-mobile {
        animation: move 0.3s linear 1;
    }

    @keyframes move {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
}
</style>