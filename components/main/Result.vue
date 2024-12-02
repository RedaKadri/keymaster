<script setup lang="ts">
const { wpm } = defineProps<{
  wpm: { raw: number[]; net: number[]; error: number[] };
}>();
</script>

<template>
  <div>
    <p class="text-3xl text-center">raw: {{ wpm.raw }}</p>
    <p class="text-3xl text-center">net: {{ wpm.net }}</p>
    <p class="text-3xl text-center">errors: {{ wpm.error }}</p>
  </div>
</template>
