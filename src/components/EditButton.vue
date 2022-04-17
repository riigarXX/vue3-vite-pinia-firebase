<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  idItem: String,
});
const router = useRouter();
</script>

<template>
  <div>
    <button @click="router.push(`/editar/${idItem}`)">Editar</button>
  </div>
</template>

<style></style>
