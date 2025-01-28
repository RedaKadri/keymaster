<script setup lang="ts">
const { userAvatarUrl, userName } = defineProps<{
  userAvatarUrl: string;
  userName: string | undefined;
}>();
</script>

<template>
  <NuxtLink to="account">
    <AvatarRoot class="flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
      <AvatarImage
        class="flex h-full w-full items-center justify-center rounded-full bg-muted"
        :src="userAvatarUrl || ''"
        :alt="userName"
      />
      <AvatarFallback
        class="flex h-full w-full items-center justify-center rounded-full bg-muted"
        :delay-ms="600"
      >
        {{ userName?.charAt(0) }}
      </AvatarFallback>
    </AvatarRoot>
  </NuxtLink>
</template>
