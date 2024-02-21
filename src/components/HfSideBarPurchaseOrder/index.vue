<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
</script>
<template>
    <div class="side-bar">
        <div class="account">
            <div class="account-avatar">
                <img src="@/assets/images/user-avatar.jpg" alt="avatar">
            </div>
            <router-link to="/user-infor">
                <div class="account-content">
                    {{ auth.auth.customerName }} <br>
                    <router-link to="/user-infor">
                        <IconEdit size="20" />
                        Sửa hồ sơ
                    </router-link>
                </div>
            </router-link>
        </div>
        <hr style="margin: 20px 0;">
        <div class="nav">
            <ul>
                <li>
                    <router-link to="/myorder">
                        <IconTruckDelivery size="20" />
                        Đơn hàng của tôi
                    </router-link>
                </li>
                <li>
                    <router-link to="/history-ordered">
                        <IconHistory size="20" />
                        Lịch sử đơn hàng

                    </router-link>
                </li>
                <li>
                    <router-link to="/user-infor">
                        <IconUserCheck size="20" />
                        Tài khoản của tôi
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="buffer-zone"></div>
</template>

<style lang="scss" scoped>
.side-bar {
    width: 230px;
    margin-top: $header-height;
    padding: 30px 36px;
    background-color: #fff;
    box-shadow: 1px 0px 8px rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 4;

    .account {
        @include flex(center, center);
        cursor: pointer;

        .account-avatar {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 8px;

            >img {
                width: 100%;
            }
        }

        .account-content {
            font-size: 16px;

            >a {
                @include flex(center, center);
                color: #ccc;
                font-size: 13px;
                margin-top: 4px;
            }
        }
    }

    .nav {
        li {
            list-style: none;

            a {
                @include flex(center, center);
                color: #313131;
                padding: 8px;
                font-size: 15px;
                margin: 12px 0;

                &:hover {
                    background-color: cornflowerblue;
                    color: #fff;
                    border-radius: 4px;
                }
            }
        }
    }
}

.buffer-zone {
    width: 230px;
}
</style>
