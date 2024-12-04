<script setup lang="ts">
const { userText, text } = defineProps<{ userText: string; text: string }>();
</script>

<template>
  <p class="text-4xl">
    <span
      v-for="(character, index) in text"
      :key="index"
      :class="
        userText.length > index
          ? userText[index] === character
            ? 'opacity-100'
            : 'text-destructive'
          : 'opacity-50'
      "
    >
      {{ character }}
    </span>
  </p>
</template>
