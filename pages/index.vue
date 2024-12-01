<script setup lang="ts">
  const vFocus = {
    mounted: (el: HTMLInputElement) => el.focus(),
  };

  const userText = ref("");
  const text = "The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze whispered through the trees, carrying the sweet scent of flowers.";

  const timer = reactive<{ status: "idle" | "start" | "end"; counter: number }>({
    status: "idle",
    counter: 15,
  });
  const rawWpm = ref(0);
  let timerInterval: ReturnType<typeof setInterval>;

  watch(
    () => timer.status,
    (timerStatus) => {
      if (timerStatus === "start") {
        timerInterval = setInterval(() => {
          timer.counter--;
        }, 1000);
      } else {
        clearInterval(timerInterval);
      }
    },
  );
  watch(
    () => timer.counter,
    (timerCounter) => {
      if (timerCounter === 0) {
        rawWpm.value = Math.floor(userText.value.length / 5 / (15 / 60));
        timer.status = "end";
      }
    },
  );
</script>

<template>
  <section class="w-full" >
    <div v-if="timer.status !== 'end'">
      <p class="my-3 text-3xl" :class="timer.status === 'start' ? 'opacity-100' : 'opacity-0'">{{ timer.counter }}</p>
      <input
        v-model="userText"
        v-focus
        class="absolute z-50 opacity-0"
        @keypress.once="timer.status = 'start'"
      >
      <p class="text-4xl">
        <span
          v-for="(character, index) in text"
          :key="character"
          :class="
            userText.length > index
              ? userText[index] === character
                ? 'opacity-100'
                : 'text-destructive'
              : 'opacity-50'
          "
        >
          {{ character }}
        </span>
      </p>
    </div>
    <p v-else class="text-3xl text-center">wpm: {{ rawWpm }}</p>
  </section>
</template>

