<script setup lang="ts">
import type { wpmType } from "~/types";

const { wpm, resetTest } = defineProps<{
  wpm: wpmType[];
  resetTest: () => void;
}>();
const result = wpm.at(-1);
</script>

<template>
  <section class="w-full px-16 h-60">
    <MainResultChart :wpm="wpm" />
    <div class="flex items-center justify-between mx-12 my-6 text-3xl">
      <p>
        wpm <span class="text-primary">{{ result?.net }}</span>
      </p>
      <p>
        raw <span class="text-primary">{{ result?.raw }}</span>
      </p>
      <p>
        time
        <span class="text-primary-foreground">{{ result?.x }}s</span>
      </p>
      <div>
        <Icon
          name="radix-icons:double-arrow-right"
          class="transition-colors cursor-pointer hover:text-primary-foreground"
          @click="resetTest"
        />
      </div>
    </div>
  </section>
</template>
