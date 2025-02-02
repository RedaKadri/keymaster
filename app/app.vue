<script lang="ts" setup>
import { Toaster } from "vue-sonner";
</script>

<template>
  <NuxtLoadingIndicator color="#6a9589" :height="5" />
  <Toaster />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
