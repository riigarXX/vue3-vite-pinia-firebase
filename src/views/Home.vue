<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
    <Form msg="Agregar" />
    <p v-if="useDatabase.loadingDoc">Loading docs...</p>
    <a-space
      direction="vertical"
      v-if="!useDatabase.loadingDoc"
      style="width: 100%"
    >
      <a-card
        v-for="item in useDatabase.documents"
        :key="item.id"
        :title="item.short"
      >
        <template #extra>
          <a-space>
            <DeleteButton :idItem="item.id" />
            <EditButton :idItem="item.id" />
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
const userStore = useUserStore();
const useDatabase = useDatabaseStore();
useDatabase.getUrls();
</script>
