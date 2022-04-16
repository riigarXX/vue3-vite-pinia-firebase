<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="home" v-if="userStore.userData">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if="userStore.loadingSession">Loading User</div>
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useUserStore } from "./stores/user";
import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";

const userStore = useUserStore();
const route = useRoute();

const selectedKeys = ref([]);

watch(
  () => route.name,
  () => (selectedKeys.value = [route.name])
);
</script>

<style lang="scss" scoped>
</style>
vue
