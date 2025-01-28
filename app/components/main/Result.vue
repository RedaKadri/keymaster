<script setup lang="ts">
const { wpm, resetTest } = defineProps<{
  wpm: wpmType[];
  resetTest: () => void;
}>();

const result = wpm.at(-1);
const errors = wpm.reduce((sum, item) => sum + item.errors, 0);
</script>

<template>
  <section class="w-full">
    <div class="flex gap-8">
      <div class="flex flex-col gap-2">
        <div>
          <p class="text-3xl opacity-75">wpm</p>
          <p class="text-7xl text-primary">{{ result?.net }}</p>
        </div>
        <div>
          <p class="text-3xl opacity-75">time</p>
          <p class="text-7xl text-primary">{{ result?.x }}s</p>
        </div>
      </div>
      <div class="w-full h-56">
        <MainResultChart :wpm="wpm" />
        <div class="flex items-center justify-between mx-12 my-6">
          <div>
            <p class="opacity-75">raw</p>
            <p class="text-4xl text-primary">{{ result?.raw }}</p>
          </div>
          <div>
            <p class="opacity-75">errors</p>
            <p class="text-4xl text-destructive">{{ errors }}</p>
          </div>
          <button class="mt-3 text-4xl" @click="resetTest">
            <Icon
              name="solar:double-alt-arrow-right-line-duotone"
              class="transition-colors hover:text-[#6a9589]"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
