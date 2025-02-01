<script setup lang="ts">
useHead({ title: "account - Keymaster" });

const user = useUser();
</script>

<template>
  <section class="w-full bg-secondary text-secondary-foreground p-4 rounded-md">
    <div class="flex items-center gap-4">
      <div>
        <UiAvatar
          :avatar-url="user?.avatarUrl"
          :user-name="user?.name"
          class="h-16 w-16"
        />
      </div>
      <div>
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          {{ user?.name }}
        </h3>
        <p class="text-sm font-medium leading-none">
          {{ user?.createdAt?.toString().split(" ")[0] }}
        </p>
      </div>
    </div>
  </section>
</template>
