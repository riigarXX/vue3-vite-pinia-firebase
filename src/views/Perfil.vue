<template>
  <h1>Perfil de usuario</h1>
  <p>{{ userStore.userData }}</p>
  <div align="center" class="mb-2">
    <a-avatar :src='userStore.userData.photoURL' :size='150' />
  </div>
  <a-row >
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" >

      <a-form name="basicPerfil" layout="vertical" autocomplete="off" :model="userStore.userData" @finish="onFinish">
        <a-form-item name="email" label="Tu correo (no modificable)" :rules="[
          {
            required: true,
            whitespace: true,
            message: 'Ingresa un email',
            type: 'email',
          },
        ]">
          <a-input disabled v-model:value="userStore.userData.email" />
        </a-form-item>
        <a-form-item name="displayName" label="Ingresa su nickname" :rules="[
          {
            required: true,
            whitespace: true,
            message: 'Ingrese su displayName',
          },
        ]">
          <a-input v-model:value="userStore.userData.displayName" />
        </a-form-item>
        <a-upload v-model:file-list="fileList" list-type="picture" :before-upload="beforeUpload" :max-count="1"
          @change="handleChange" >
          <a-button>
            Subir foto de perfil
          </a-button>
        </a-upload>
        <a-form-item class="mt-2">
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser">
            Actualizar información
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import { ref } from "vue";

const userStore = useUserStore();
const fileList = ref([])

const beforeUpload = (file) => {
  fileList.value = [...fileList.value, file];
  return false;
}
const handleChange = info => {
  if (info.file.status !== 'uploading') {
    const isJPG = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
    if (!isJPG) {
      message.error('Solo se permiten archivos JPG/PNG');
      handleRemove(info.file);
      return
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('El tamaño máximo permitido es 2MB');
      handleRemove(info.file);
      return
    }
  }

  let resFileList = [...info.fileList]
  resFileList = resFileList.slice(-1)
  resFileList = resFileList.map(file => {
    if (file.response) {
      file.url = file.response.url
    }
    return file
  })
  fileList.value = resFileList
}
const handleRemove = file => {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}
const onFinish = async () => {
  const error = await userStore.updateUser(userStore.userData.displayName);

  if (fileList.value[0]) {
    const error = await userStore.updateUserPhoto(fileList.value[0].originFileObj);
    if (error) {
      return message.error("Problemas al subir la foto de perfil");
    }
    message.success("Foto de perfil actualizada");
  }



if (!error) {
  return message.success("Se actualizo tu informacion displayName");
}
return message.error("Error al actualizar la informacio");
};
</script>
<style>
.mb-2{
  margin-bottom: 2rem;
}
.mt-2{
  margin-top: 2rem;
}
</style>
