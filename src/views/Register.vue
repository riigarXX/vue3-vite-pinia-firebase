<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese email" v-model.trim='email'>
            <input type="password" placeholder="Ingrese su contraseña" v-model.trim='password'>
            <button type="submit" :disabled="userStore.loadingUser" >Crear usuario</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import {useUserStore} from '../stores/user'
    
    const userStore = useUserStore()

    const email = ref('alopez@elclubdelaradio.com')
    const password = ref('alvaro1122')
    
    const handleSubmit = async () => {
        if(!email.value || password.value.length < 5){
            return alert('llena los campos')
        }
        await userStore.registerUser(email.value,password.value)
    }
</script>

<style lang="scss" scoped>

</style>