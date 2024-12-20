<script setup lang="ts">
import type { wpmType } from "~/types";

const { wpm, resetTest } = defineProps<{
  wpm: wpmType[];
  resetTest: () => void;
}>();
const result = wpm.at(-1);
</script>

<template>
  <section class="w-full h-60 px-16">
    <MainResultChart :wpm="wpm" />
    <div class="flex justify-between items-center my-6 mx-12 text-3xl">
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
          class="hover:text-primary-foreground transition-colors cursor-pointer"
          @click="resetTest"
        />
      </div>
    </div>
  </section>
</template>
