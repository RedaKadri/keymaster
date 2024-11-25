<script setup lang="ts">
  const count = ref(0)

  const handleClick = () => count.value++
</script>

<template>
  <div class="w-[95%] m-auto">
    <AppHeader />
    <h1 class="text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">Welcome!</h1>
    <div class="flex justify-center min-h-full">
      <UiButton class="m-10" @click="handleClick">
        counter: {{ count }}
      </UiButton>
    </div>
  </div>
</template>