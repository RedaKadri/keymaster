<script setup lang="ts">
import { toast } from "vue-sonner";

useHead({ title: "account - Keymaster" });

const user = useUser();

const { data, status, error } = useFetch("/api/games");

let stats: {
  testPlayed: number;
  timePlayed: string;
  avgWpm: number;
  avgRaw: number;
  highestWpm: {
    english: { time: number; wpm: number | null }[];
    french: { time: number; wpm: number | null }[];
  };
};
watch(status, () => {
  if (error.value) {
    toast.error(error.value.statusMessage || "Error", {
      description: error.value.data.message,
      style: { background: "#c34043", border: "#e82424" },
    });
    return navigateTo("/");
  }

  if (!data.value || data.value.length === 0) {
    toast.info("No games found", {
      description: "Start playing today!",
      style: { background: "#7e9cd8", border: "#7fb4ca" },
    });
    return navigateTo("/");
  }

  stats = getWpmUserStats(data.value);
});
</script>

<template>
  <main
    v-if="status === 'pending'"
    class="flex justify-center items-center h-2/3"
  >
    <IconsSpinner />
  </main>

  <main v-else class="w-full flex flex-col gap-12">
    <section
      class="w-full p-8 flex items-center transition-all justify-between rounded-md shadow-md bg-secondary text-secondary-foreground"
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
          <p class="text-3xl font-semibold">{{ stats.testPlayed }}</p>
        </div>
        <div>
          <p class="text-sm opacity-75">average wpm</p>
          <p class="text-3xl font-semibold">{{ stats.avgWpm }}</p>
        </div>
        <div>
          <p class="text-sm opacity-75">time played</p>
          <p class="text-3xl font-semibold">{{ stats.timePlayed }}</p>
        </div>
      </div>
    </section>

    <section class="flex items-center justify-between">
      <div
        class="w-[48%] p-8 overflow-hidden flex relative group items-center transition-all justify-between rounded-md shadow-md bg-secondary text-secondary-foreground"
      >
        <div
          class="p-1 rounded-tr-md opacity-0 group-hover:opacity-100 transition-all absolute bottom-0 left-0 bg-accent text-accent-foreground"
        >
          english
        </div>
        <div
          v-for="(englishwpm, index) in stats.highestWpm.english"
          :key="index"
          class="flex flex-col items-center"
        >
          <p class="text-sm opacity-75">{{ englishwpm.time }} seconds</p>
          <p class="text-3xl font-semibold">{{ englishwpm.wpm || "-" }}</p>
        </div>
      </div>

      <div
        class="w-[48%] p-8 overflow-hidden flex relative group items-center transition-all justify-between rounded-md shadow-md bg-secondary text-secondary-foreground"
      >
        <div
          class="p-1 rounded-tr-md opacity-0 group-hover:opacity-100 transition-all absolute bottom-0 left-0 bg-accent text-accent-foreground"
        >
          french
        </div>
        <div
          v-for="(frenchwpm, index) in stats.highestWpm.french"
          :key="index"
          class="flex flex-col items-center"
        >
          <p class="text-sm opacity-75">{{ frenchwpm.time }} seconds</p>
          <p class="text-3xl font-semibold">{{ frenchwpm.wpm || "-" }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
