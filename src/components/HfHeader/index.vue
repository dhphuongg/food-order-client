<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
const user = useAuthStore();

const options = ref([
  {
    label: 'Thông tin cá nhân',
    key: '/user-infor'
  },
  {
    label: 'Đơn mua',
    key: '/'
  },
  {
    label: 'Đăng xuất',
    key: 'logout'
  }
]);
const show = ref(false);
const router = useRouter();
const handleLogin = () => {
  router.push('/login');
};
const handleLogout = () => {
  cartStore.addItemsToDatabase();
  user.clear();
  router.push('/');
};
const username = ref(user.auth.customerName);
const handleSelect = (key) => {
  if (key === 'logout') {
    handleLogout();
  } else {
    router.push(key);
  }
};
const guestMenuOptions = ref([
  {
    id: 1,
    path: '/login',
    title: 'Giỏ hàng'
  },
  {
    id: 2,
    path: '/login',
    title: 'Đăng nhập'
  },
  {
    id: 3,
    path: '/register',
    title: 'Đăng ký'
  }
]);
const loggedInMenuOptions = ref([
  {
    id: 1,
    path: '/cart',
    title: 'Giỏ hàng'
  },
  {
    id: 2,
    path: '/user-infor',
    title: 'Thông tin cá nhân'
  },
  {
    id: 3,
    path: '/',
    title: 'Đơn mua'
  }
]);
</script>
<template>
  <header class="container header">
    <div class="wide">
      <router-link to="/">
        <img src="@/assets/images/logo.png" alt="logo" class="header-logo" />
      </router-link>
      <div class="header-menu">
        <router-link to="/">
          <IconSearch size="24" class="icon" />
        </router-link>
        <router-link to="/cart">
          <n-badge
            v-if="user.loggedIn"
            :value="cartStore.products.length"
            style="margin-right: 20px"
          >
            <IconShoppingCartFilled size="24" style="color: black" />
          </n-badge>
          <IconShoppingCartFilled v-else size="24" style="color: black; margin-right: 20px" />
        </router-link>
        <div class="user-login" v-if="user.loggedIn">
          <n-dropdown :options="options" :show-arrow="true" @select="handleSelect">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <img src="@/assets/images/user-avatar.jpg" alt="avatar" class="user-avatar" />
              <p>
                {{ username }}
              </p>
            </div>
          </n-dropdown>
        </div>
        <HfButton v-else @click="handleLogin">Đăng nhập</HfButton>
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
            <img src="@/assets/images/logo.png" alt="logo" width="36%" />
          </template>
          <ul class="mobile-menu" v-if="user.loggedIn">
            <li v-for="menu in loggedInMenuOptions" :key="menu.id">
              <router-link :to="menu.path">
                {{ menu.title }}
              </router-link>
            </li>
            <li @click="handleLogout">
              <router-link to=""> Đăng xuất </router-link>
            </li>
          </ul>
          <ul class="mobile-menu" v-else>
            <li v-for="menu in guestMenuOptions" :key="menu.id">
              <router-link :to="menu.path">
                {{ menu.title }}
              </router-link>
            </li>
          </ul>
        </n-drawer-content>
      </n-drawer>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100% !important;
  height: $header-height;
  box-shadow:
    0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  @include position(fixed, $t: 0, $r: 0, $l: 0, $index: 10);

  .wide,
  &-menu,
  .nav-mobile {
    @include flex(space-between, center);
  }

  &-menu {
    @include mobile {
      display: none;
    }
  }

  &-logo {
    width: 92px;

    @include mobile {
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

    @include mobile {
      display: flex;
    }
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 8px;
  }
}

.mobile-menu {
  list-style: none;

  li {
    padding: 8px 4px;

    a {
      padding-left: 4px;
    }

    &:hover {
      background-color: cornflowerblue;
      border-radius: 4px;
      color: $white-color;

      a {
        color: $white-color;
      }
    }
  }
}
</style>
