<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  idItem: String,
});
const router = useRouter();
</script>

<template>
  <div>
    <a-button @click="router.push(`/editar/${idItem}`)" type="primary"
      >Editar</a-button
    >
  </div>
</template>

<style></style>
