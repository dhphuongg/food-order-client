<script setup>
import { onBeforeMount, reactive } from 'vue';
import { validateFullName, validateDOB, validataPhoneNumber, validatePassword } from '@/utils/validator';
import { getUserById, updateUserAddress, updateUserInformation, changeUserPassword, deleteUserById } from '@/api/user.api';
import { useAuthStore } from '@/stores/auth';
import { useGeolocation } from '@vueuse/core';
import router from '@/router';
const message = useMessage();
const auth = useAuthStore();
const user = reactive({
    fullName: null,
    phoneNumber: null,
    address: null,
    dob: null
});
const account = reactive({
    username: "",
    oldPassword: "",
    password: "",
    repeatPassword: ""
})
const customerId = ref(-1);
onBeforeMount(async () => {
    if (!(typeof auth.auth.customerId === 'undefined') || !(typeof auth.auth.customerName === 'undefined')) {
        customerId.value = auth.auth.customerId;
        const data = await getUserById(customerId.value);
        user.fullName = data.data.fullName;
        user.phoneNumber = data.data.phoneNumber;
        user.dob = data.data.dob;
        user.address = data.data.address.addressName;
        account.username = auth.auth.customerName;
    }
})

const formRef = ref(null);
const formRefAccount = ref(null);
const rules = {
    fullName: {
        required: true,
        validator: validateFullName,
        trigger: "blur"
    },
    dob: {
        required: true,
        validator: validateDOB,
        trigger: ["input", "blur"]
    },
    phoneNumber: {
        required: true,
        validator: validataPhoneNumber,
        trigger: ["input"]
    }
}
const rulesAccount = {
    oldPassword: {
        required: true,
        validator: validatePassword,
        trigger: 'blur'
    },
    password: {
        required: true,
        validator: validatePassword,
        trigger: 'blur'
    },
    repeatPassword: {
        required: true,
        validator: (_, repeatPassword) => {
            if (repeatPassword !== account.password) {
                return new Error('Mật khẩu không giống với mật khẩu đã nhập lại!');
            }
            return true;
        },
        trigger: ['blur', 'password-input']
    }
}
const { coords } = useGeolocation();
const handleUpdateUserAddress = async () => {
    try {
        const params = {
            customerId: customerId.value,
            latitude: coords.value.latitude,
            longitude: coords.value.longitude
        }
        await updateUserAddress(params);
        message.success('Cập nhập địa chỉ thành công!');
        const data = await getUserById(customerId.value);
        user.address = data.data.address.addressName;
    } catch (err) {
        console.log(err);
        if (!!err.response) {
            message.error(err.response.data.message);
        } else {
            message.error(err.message);
        }
    }
}
const handleUpdateUserInformation = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            try {
                const newUserData = {
                    customerId: customerId.value,
                    fullName: user.fullName,
                    dob: (user.dob),
                    phoneNumber: user.phoneNumber
                }
                await updateUserInformation(newUserData);
                message.success('Cập nhập thông tin thành công!');
            } catch (err) {
                console.log(err);
                if (!!err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error(err.message);
                }
            }
        }
    })
}
const handleChangePassword = async () => {
    formRefAccount.value?.validate(async (errors) => {
        console.log("tao đây");
        if (!errors) {
            try {
                const newPasswordData = {
                    oldPassword: account.oldPassword,
                    password: account.password,
                    repeatPassword: account.repeatPassword
                }
                await changeUserPassword(newPasswordData);
                message.success('Thay đổi mật khẩu thành công!');
            } catch (err) {
                console.log(err);
                if (!!err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error(err.message);
                }
            }
        }
    })
}
const handleDeleteAccount = async () => {
    try {
        const isCofirm = confirm("Bạn có chắc chắn muốn xóa tài khoản này không!");
        if (isCofirm) {
            await deleteUserById(customerId.value);
            message.success('Xóa tài khoản thành công!');
            auth.clear();
            router.push("/");
        }

    } catch (err) {
        console.log(err);
        if (!!err.response) {
            message.error(err.response.data.message);
        } else {
            message.error(err.message);
        }
    }
}
const scrollToTarget = (elementId) => {
    const parent = document.querySelector(".infor-detail");
    const targetElement = parent.querySelector(`#${elementId}`);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
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
                            {{ user.fullName ? user.fullName : 'Không xác định' }}
                        </h2>
                        <p>
                            <IconPhone />
                            <span>
                                {{ user.phoneNumber ? user.phoneNumber : 'Không xác định' }}
                            </span>
                        </p>
                        <div class="infor-active">
                            <n-button type="info" @click="() => scrollToTarget('user-profile')">
                                Thông tin chi tiết
                            </n-button>
                            <n-button type="success" @click="() => scrollToTarget('user-account')">
                                Thông tin tài khoản
                            </n-button>
                            <n-button type="error" @click="() => scrollToTarget('user-delete')">
                                Xóa tài khoản
                            </n-button>
                        </div>
                    </div>
                </div>
                <div class="infor-detail">
                    <div class="user-profile" id="user-profile">
                        <h3>Thông tin chi tiết</h3>
                        <hr> <br>
                        <n-form :label-width="80" :model="user" :rules="rules" ref="formRef" size="large">
                            <n-form-item label="Họ tên:" path="fullName" style="margin-bottom: 8px;">
                                <n-input v-model:value="user.fullName" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item label="Ngày sinh:" path="dob" style="margin-bottom: 8px;">
                                <n-input v-model:value="user.dob" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item label="Số điện thoại" path="phoneNumber" style="margin-bottom: 8px;">
                                <n-input v-model:value="user.phoneNumber" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item label="Địa chỉ" path="address">
                                <n-input disabled v-model:value="user.address" type="textarea" :autosize="{
                                    minRows: 1,
                                    maxRows: 2
                                }" />
                            </n-form-item>
                            <n-form-item style="display: flex; justify-content: center;">
                                <div class="btn-active">
                                    <HfButton class="btn-update" @click="handleUpdateUserAddress">
                                        Cập nhập địa chỉ
                                    </HfButton>
                                    <HfButton @click="handleUpdateUserInformation">
                                        Cập nhập thông tin
                                    </HfButton>
                                </div>
                            </n-form-item>
                        </n-form>
                    </div>
                    <div class="user-account" id="user-account">
                        <h3>Thông tin tài khoản</h3>
                        <hr> <br>
                        <n-form :label-width="80" :model="account" :rules="rulesAccount" ref="formRefAccount" size="large">
                            <n-form-item label="Tên đăng nhập:" path="username" style="margin-bottom: 8px;">
                                <n-input disabled v-model:value="account.username" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item label="Mật khẩu cũ:" path="oldPassword" style="margin-bottom: 8px;">
                                <n-input v-model:value="account.oldPassword"
                                    placeholder="Chú ý nhập đúng mật khẩu mới thay được" type="text" />
                            </n-form-item>
                            <n-form-item label="Mật khẩu mới:" path="password" style="margin-bottom: 8px;">
                                <n-input v-model:value="account.password" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item label="Nhập lại mật khẩu mới:" path="repeatPassword" style="margin-bottom: 8px;">
                                <n-input v-model:value="account.repeatPassword" placeholder="" type="text" />
                            </n-form-item>
                            <n-form-item style="display: flex; justify-content: center; margin-top: 12px;">
                                <HfButton @click="handleChangePassword">Thay đổi mật khẩu</HfButton>
                            </n-form-item>
                        </n-form>
                    </div>
                    <HfButton id="user-delete" @click="handleDeleteAccount" class="btn-delete">Xóa tài khoản</HfButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped src="./userInfor.scss"></style>

<route lang="yaml">
    name: UserInfor
    meta:
        layout: default
</route>