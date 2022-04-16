<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" align="center">
      <h1>Register</h1>
    </a-col>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        name="basicRegister"
        layout="vertical"
        autocomplete="off"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          label="Ingrese email"
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
        <a-form-item
          name="rePassword"
          label="Repita su contraseña"
          :rules="[
            {
              validator: validatePass,
            },
          ]"
        >
          <a-input-password v-model:value="formState.rePassword" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
          >
            Registrate en firebase!
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const formState = reactive({
  email: "",
  password: "",
  rePassword: "",
});
const validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Repita contraseña");
  }
  if (value !== formState.password) {
    return Promise.reject("No coinciden las contraseñas");
  }
  return Promise.resolve();
};
const onFinish = async (values) => {
  console.log("Success ->", values);
  await userStore.registerUser(formState.email, formState.password);
};

const onFinishFailed = async (values) => {
  console.log("Failed ->", values);
};
</script>

<style lang="scss" scoped>
</style>
