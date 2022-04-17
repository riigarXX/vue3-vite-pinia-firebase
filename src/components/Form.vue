<script setup>
import { onMounted, reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
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

const handleUpdate = async () => {
  const res = await databaseStore.updateUrl(route.params.id, formState.url);
  if (!res) return message.success("Url editada con exito");
  return error.message(res);
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
    @finish="msg === 'Agregar' ? onFinish() : handleUpdate()"
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
    <a-form-item layout="horizontal">
      <a-space>
        <a-button
          type="primary"
          html-type="submit"
          :loading="databaseStore.loading"
          :disabled="databaseStore.loading"
        >
          {{ msg }}
        </a-button>

        <a-button
          v-if="msg !== 'Agregar'"
          type="primary"
          :loading="databaseStore.loading"
          :disabled="databaseStore.loading"
          @click="router.push('/')"
        >
          Voler
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped></style>
