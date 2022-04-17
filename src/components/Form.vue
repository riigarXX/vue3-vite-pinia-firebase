<script setup>
import { onMounted, reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const databaseStore = useDatabaseStore();
const formState = reactive({
  url: "",
});

const onFinish = async (value) => {
  const res = await databaseStore.addUrl(formState.url);
  if (!res) {
    formState.url = "";
    return message.success("URL agregada con exito!! ");
  }
  switch (res) {
    //Buscar errores en firebase
    default:
      message.error("ocurrio un error en el servidor");
      break;
  }
};

const props = defineProps({
  msg: String,
});

const handleUpdate = () => {
  databaseStore.updateUrl(route.params.id, formState.url);
};

onMounted(async () => {
  formState.url = await databaseStore.readUrl(route.params.id);
});
</script>
<template>
  <a-form
    name="formComponent"
    autocomplete="off"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="url"
      label="Ingrese una url"
      :rules="[
        {
          required: true,
          pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
          whitespace: true,
          message: 'Ingresa una url valida',
        },
      ]"
    >
      <a-input v-model:value="formState.url" />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :loading="databaseStore.loading"
        :disabled="databaseStore.loading"
      >
        {{ msg }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped></style>
