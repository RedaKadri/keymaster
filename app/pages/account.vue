<script setup lang="ts">
import { toast } from "vue-sonner";

useHead({ title: "account - Keymaster" });

const user = useUser();

const { data, status, error } = useFetch("/api/games");

let testPlayed: number;
let secondsPlayed: number;
let timePlayed: string;
let avgWpm: number;

watch(status, () => {
  if (error.value) {
    toast.error(error.value.statusMessage || "error", {
      description: error.value.data.message,
      style: { background: "#c34043", border: "#e82424" },
    });
    return navigateTo("/");
  }

  if (!data.value || data.value.length === 0) return;

  testPlayed = data.value.length;

  secondsPlayed = data.value.reduce((sec, game) => sec + game.stats.time, 0);

  timePlayed = formatSecondsToHMS(secondsPlayed);

  avgWpm =
    Number(data.value.reduce((count, game) => count + game.stats.wpm, 0)) /
    Number(testPlayed);
});
</script>

<template>
  <IconsSpinner v-if="status === 'pending'" />
  <section
    v-else
    class="w-full p-6 flex items-center transition-all justify-between rounded-md shadow-md bg-secondary text-secondary-foreground"
  >
    <div class="flex items-center gap-4">
      <div>
        <UiAvatar
          :avatar-url="user?.avatarUrl"
          :user-name="user?.name"
          class="w-16 h-16"
        />
      </div>
      <div>
        <h3 class="mb-2 text-3xl font-semibold tracking-tight scroll-m-20">
          {{ user?.name }}
        </h3>
        <p class="text-sm opacity-75">
          Joind {{ user?.createdAt?.toString().split(" ")[0] }}
        </p>
      </div>
    </div>
    <Separator
      class="bg-muted mx-2 data-[orientation=vertical]:h-16 data-[orientation=vertical]:w-2 rounded-3xl"
      decorative
      orientation="vertical"
    />
    <div class="flex items-center justify-between w-3/4">
      <div>
        <p class="text-sm opacity-75">test played</p>
        <p class="text-3xl font-semibold">{{ testPlayed }}</p>
      </div>
      <div>
        <p class="text-sm opacity-75">average wpm</p>
        <p class="text-3xl font-semibold">{{ avgWpm }}</p>
      </div>
      <div>
        <p class="text-sm opacity-75">time played</p>
        <p class="text-3xl font-semibold">{{ timePlayed }}</p>
      </div>
    </div>
  </section>
</template>
