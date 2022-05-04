<template>
    <div>
        <a-button @click="copiarPortapapeles(idItem)">Copiar</a-button>
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';

const props = defineProps({
    idItem: String,
});
const copiarPortapapeles = async (id) => {
    //copiar al portapapeles
    if (!navigator.clipboard) {
        return message.error("No se pudo copiar");
    }
    const path = window.location.href + `${id}`
    const res = await navigator.clipboard.writeText(path);
    console.log(res)
    if (res) {
        message.error("No se pudo copiar");
    } else {
        message.success("Se copio con exito");
    }

};
</script>

<style lang="scss" scoped>
</style> 