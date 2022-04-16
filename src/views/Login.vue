<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        @submit.prevent="handleSubmit"
        name="basicLogin"
        autcomplete="off"
      >
        <input type="email" placeholder="Ingrese email" v-model.trim="email" />
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          v-model.trim="password"
        />
        <button type="submit" :disabled="userStore.loadingUser">
          Login en firebase!
        </button>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const email = ref("alopez@elclubdelaradio.com");
const password = ref("");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 5) {
    return alert("llena los campos");
  }
  await userStore.loginUser(email.value, password.value);
};
</script>

<style lang="scss" scoped>
</style>
