<script setup lang="ts">
useHead({ title: "account - Keymaster" });

const user = useUser();
</script>

<template>
  <div>{{ user }}</div>
</template>
