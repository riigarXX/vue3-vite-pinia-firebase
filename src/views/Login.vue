<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" align="center">
      <h1>Login</h1>
      <a-form
        name="basicLogin"
        layout="vertical"
        autocomplete="off"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          label="Ingresa tu correo"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Ingresa un email',
              type: 'email',
            },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          name="password"
          label="Ingrese contraseña"
          :rules="[
            {
              required: true,
              min: 6,
              max: 24,
              whitespace: true,
              message:
                'Ingresa tu contraseña con minimo 6 carácteres y un maximo de 24',
            },
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser"
          >
            Login en firebase!
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
const userStore = useUserStore();

const formState = reactive({
  email: "",
  password: "",
});

const onFinish = async (values) => {
  const res = await userStore.loginUser(formState.email, formState.password);
  if (!res) {
    message.success("Bienvenido a tu escritorio");
    return;
  }
  switch (res) {
    case "auth/user-not-found":
      message.error("No existe esta cuenta 🌶️");
      break;
    case "auth/wrong-password":
      message.error("Contraseña o correo invalido 🌶️");
      break;
    default:
      message.error("Error desde firebase 🌶️");
      break;
  }
};
const onFinishFailed = async (values) => {};
</script>

<style lang="scss" scoped></style>
