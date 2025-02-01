<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { avatarUrl, userName } = defineProps<{
  avatarUrl: string | null | undefined;
  userName: string | undefined;
}>();

const attrs = useAttrs();

const avatarClass = computed(() => {
  return twMerge(
    "flex overflow-hidden rounded-full cursor-pointer shrink-0",
    attrs.class as string,
  );
});
</script>

<template>
  <AvatarRoot :class="avatarClass">
    <AvatarImage
      class="flex items-center justify-center w-full h-full rounded-full bg-muted"
      :src="avatarUrl || ''"
      :alt="userName"
    />
    <AvatarFallback
      class="flex items-center justify-center w-full h-full rounded-full bg-muted"
      :delay-ms="600"
    >
      {{ userName?.charAt(0) }}
    </AvatarFallback>
  </AvatarRoot>
</template>
