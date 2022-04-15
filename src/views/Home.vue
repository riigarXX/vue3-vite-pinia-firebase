<template>
    <div>
        <h1>Home</h1>
        <p>{{ userStore.userData?.email }}</p>
        <Form/>
        <p v-if="useDatabase.loadingDoc">Loading docs...</p>
        <ul v-else>
            <li v-for="item in useDatabase.documents" :key="item.id">
                {{ item.id }} - {{ item.name }}
                <br>
                {{ item.short }}
                <DeleteButton :idItem='item.id'/>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Form from '../components/Form.vue'
import DeleteButton from '../components/DeleteButton.vue'
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from '../stores/database'

const userStore = useUserStore()
const useDatabase = useDatabaseStore()
useDatabase.getUrls()
</script>