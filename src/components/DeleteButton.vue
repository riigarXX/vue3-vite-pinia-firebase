<template>
    <div>
        <button @click="databaseStore.deleteUrl(idItem)">Borrar</button>
    </div>
</template>
<script setup>
    import { useDatabaseStore } from '../stores/database';
    const databaseStore = useDatabaseStore()
    const props = defineProps({
        idItem:String
    })

</script>

<style lang="scss" scoped>
    
</style>