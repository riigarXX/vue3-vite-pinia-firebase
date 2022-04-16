<template>
    <div>
        <form action="" @submit.prevent="msg==='Agregar' ? handleSubmit() : handleUpdate()" >
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">{{ msg }}</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database'
import { useRoute } from 'vue-router';

const url = ref("")
const route =  useRoute()
const databaseStore = useDatabaseStore()

const props = defineProps({
    msg: String,
})

const handleSubmit = () => {
    databaseStore.addUrl(url.value)
}

const handleUpdate = () => {
    databaseStore.updateUrl(route.params.id,url.value)
}

onMounted(async () => {
    url.value = await databaseStore.readUrl(route.params.id)
})
</script>

<style lang="scss" scoped>
</style>
