<template>
  <div>
    <a-popconfirm
      title="Seguro que deseas eliminarlo?"
      ok-text="Si"
      cancel-text="No"
      @confirm="confirm(idItem)"
      @cancel="cancel"
    >
      <a-button
        danger
        :loading="databaseStore.loading"
        :disabled="databaseStore.loading"
        >Borrar</a-button
      >
    </a-popconfirm>
  </div>
</template>
<script setup>
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";
const databaseStore = useDatabaseStore();
const props = defineProps({
  idItem: String,
});
const confirm = async (idItem) => {
  const res = await databaseStore.deleteUrl(idItem);
  if (!res) return message.success("Se elimino con exito");
  return message.error(res);
};
const cancel = () => {
  message.error("No se elimino");
};
</script>

<style lang="scss" scoped>
</style>
