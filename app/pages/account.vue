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
    toast.info("No test found", {
      description: "Start playing now!",
      style: { background: "#7e9cd8", border: "#7fb4ca" },
    });
    return navigateTo("/");
  }

  stats = getWpmUserStats(data.value);
});

const deleteUser = async () => {
  await $fetch("/api/user", {
    method: "DELETE",
  });
  reloadNuxtApp({ path: "/" });
};
</script>

<template>
  <main
    v-if="status === 'pending' || data?.length === 0"
    class="flex items-center justify-center h-2/3"
  >
    <IconsSpinner />
  </main>

  <main v-else class="flex flex-col w-full gap-12">
    <section
      class="flex items-center justify-between w-full p-8 mt-5 transition-all rounded-md relative group shadow-md bg-secondary text-secondary-foreground"
    >
      <DialogRoot>
        <DialogTrigger
          class="absolute top-[-15px] right-[-15px] w-10 h-10 flex justify-center items-center transition-all opacity-0 rounded-full group-hover:opacity-100 hover:bg-[#e82424] hover:text-primary bg-[#c34043] text-accent-foreground"
        >
          <Icon name="solar:trash-bin-minimalistic-broken" size="20" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
          <DialogContent
            class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] max-h-[85vh] w-lvw max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
          >
            <div class="flex flex-col gap-10">
              <div class="w-full flex flex-col gap-4">
                <DialogTitle
                  class="text-xl font-semibold leading-none tracking-tight"
                  >Confirm deletion the account</DialogTitle
                >
                <DialogDescription class="text-sm text-muted-foreground">
                  This action is irreversible and will permanently delete the
                  account.
                </DialogDescription>
              </div>
              <div
                class="flex flex-col-reverse sm:flex-row sm:justify-end gap-4"
              >
                <UiButton
                  class="border border-accent bg-transparent hover:bg-accent hover:text-accent-foreground"
                >
                  Cancel
                </UiButton>
                <UiButton
                  class="bg-[#c34043] text-secondary hover:bg-[#c34043]/90"
                  @click="deleteUser"
                  >Delete</UiButton
                >
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
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
          class="absolute bottom-0 left-0 p-1 transition-all opacity-0 rounded-tr-md group-hover:opacity-100 bg-accent text-accent-foreground"
        >
          english<span class="text-sm">(best)</span>
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
          class="absolute bottom-0 left-0 p-1 transition-all opacity-0 rounded-tr-md group-hover:opacity-100 bg-accent text-accent-foreground"
        >
          french<span class="text-sm">(best)</span>
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

    <section
      class="flex items-center justify-between w-full p-8 transition-all rounded-md shadow-md bg-secondary text-secondary-foreground"
    >
      <MainTable v-if="data" :data="data" />
    </section>
  </main>
</template>
