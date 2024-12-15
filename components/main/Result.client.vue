<script setup lang="ts">
import type { wpmType } from "~/types";

const { wpm } = defineProps<{
  wpm: wpmType[];
}>();

console.log(wpm);

const result = computed(() => ({ raw: wpm.at(-1)?.raw, net: wpm.at(-1)?.net }));
</script>

<template>
  <div>
    <p class="text-3xl text-center">{{ result }}</p>
  </div>
</template>
