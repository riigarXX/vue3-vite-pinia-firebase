<template>
  <h1>Perfil de usuario</h1>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" align="center">
      <h1>Login</h1>
      <a-form
        name="basicPerfil"
        layout="vertical"
        autocomplete="off"
        :model="userStore.userData"
        @finish="onFinish"
      >
        <a-form-item
          name="email"
          label="Tu correo (no modificable)"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Ingresa un email',
              type: 'email',
            },
          ]"
        >
          <a-input disabled v-model:value="userStore.userData.email" />
        </a-form-item>
        <a-form-item
          name="displayName"
          label="Ingresa su nickname"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Ingrese su displayName',
            },
          ]"
        >
          <a-input v-model:value="userStore.userData.displayName" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser"
          >
            Actualizar información
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { useUserStore } from "../stores/user";

import { message } from "ant-design-vue";
const userStore = useUserStore();

const onFinish = async (value) => {
  const error = await userStore.updateUser(userStore.userData.displayName);
  if (!error) {
    return message.success("Se actualizo tu informacion displayName");
  }
  return message.error("Error al actualizar la informacio");
};
</script>
