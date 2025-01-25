<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({ error: Object as () => NuxtError });

useHead({ title: `${props.error?.statusCode} | Keymaster` });
</script>

<template>
  <main class="flex items-center justify-center w-screen h-screen gap-8">
    <section>
      <img src="/../public/elmo-idk.gif" class="rounded-md" />
    </section>
    <section class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-8xl text-primary">{{ props.error?.statusCode }}</h1>
      <p class="text-xl">{{ props.error?.message }}</p>
      <NuxtLink to="/">
        <UiButton class="gap-2 text-md bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <Icon name="solar:home-linear" />
          Go back home
        </UiButton>
      </NuxtLink>
    </section>
  </main>
</template>
