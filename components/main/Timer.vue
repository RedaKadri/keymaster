<script setup lang="ts">

const { timer } = defineProps<{ timer: number }>()
</script>

<template>
  <div class="flex items-center gap-2 my-3 text-2xl">
    <Icon name="radix-icons:clock" />
    <span>{{ timer }}</span>
  </div>
</template>