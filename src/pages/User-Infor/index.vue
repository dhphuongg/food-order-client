<script setup>

</script>
<template>
    <div class="container user-infor">
        <div class="wide">
            <h1 class="home-title">Thông tin cá nhân</h1>
            <div class="infor">
                <div class="infor-basic">
                    <div class="avatar">
                        <img src="@/assets/images/user-avatar.jpg" alt="avatar">
                    </div>
                    <div class="user-bio">
                        <h2>
                            Nguyễn Thị Trang
                        </h2>
                        <p>
                            <IconPhone />0123456789
                        </p>
                        <p>
                            <IconHome />Việt Nam
                        </p>
                        <p>
                            <IconCake />12/10/2003
                        </p>
                    </div>
                </div>
                <div class="infor-detail">
                    <div class="user-profile">
                        <h3>Thông tin chi tiết</h3>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-infor {
    margin-top: $header-height;

    h1 {
        font-weight: 500;
    }

    .infor {
        @include flex();
        margin-bottom: 40px;

        &-basic,
        &-detail {
            width: 25%;
            background-color: $white-color;
            box-shadow: 0 0px 20px rgba(36, 39, 37, 0.1);
            padding: 16px 20px 44px;
            border-radius: 0.625rem;
        }

        &-basic {
            @include flex($align: center);
            flex-direction: column;

        }

        &-detail {
            margin-left: 24px;
            flex-grow: 1;
        }
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin: 28px auto 24px;
        transition: all 0.3s linear;

        >img {
            width: 100%;
        }

        &:hover {
            scale: 1.2;
        }
    }

    .user-bio {
        h2 {
            color: $primary-color;
            margin-bottom: 16px;
            font-weight: 500;
        }

        p {
            @include flex($align: center);
            line-height: 36px;

            >svg {
                width: 20px;
                color: $primary-color;
            }
        }

    }

    .user-profile {
        h3 {
            font: {
                size: 20px;
                weight: 400;
            }

            margin: 8px 0 12px;
        }

        hr {
            border-top: 1px solid #ccc;
            border-bottom: transparent;
        }
    }
}
</style>

<route lang="yaml">
    name: UserInfor
    meta:
        layout: default
</route>