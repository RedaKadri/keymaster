<script setup lang="ts">
import { toast } from "vue-sonner";

const { wpm, language, resetTest } = defineProps<{
  wpm: wpmType[];
  language: "french" | "english";
  resetTest: () => void;
}>();

const result = wpm.at(-1);
const errors = wpm.reduce((sum, item) => sum + item.errors, 0);

const user = useUser();

onMounted(async () => {
  if (!user.value) return;

  await $fetch("/api/games", {
    method: "POST",
    body: {
      time: result?.x,
      language,
      wpm: result?.net,
      raw: result?.raw,
      errors,
      timeline: wpm,
    },
    async onResponse({ response }) {
      if (response.ok) {
        toast.success("Games has been saved successfully", {
          style: { background: "#76946a", border: "#98bb6c" },
        });
      } else {
        toast.error(response._data.message, {
          description: response.statusText,
          style: { background: "#c34043", border: "#e82424" },
        });
      }
    },
  });
});
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
            <p class="opacity-75">language</p>
            <p class="text-4xl text-primary">{{ language }}</p>
          </div>
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
        <div v-if="!user" class="my-6">
          <p class="text-center">
            <NuxtLink
              to="login"
              class="underline transition-colors underline-offset-4 hover:text-secondary-foreground"
            >
              Sign in
            </NuxtLink>
            to save your result
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
