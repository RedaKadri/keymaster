<script setup lang="ts">
  const count = ref(0)

  const handleClick = () => count.value++
</script>

<template>
  <div class="w-[95%] m-auto">
    <AppHeader />
    <div class="flex justify-center min-h-full">
      <UiButton class="m-10" @click="handleClick">
        counter: {{ count }}
      </UiButton>
    </div>
  </div>
</template>