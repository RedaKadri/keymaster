<script setup lang="ts">
const text = "The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze whispered through the trees, carrying the sweet scent of flowers.";

const inputRef = useTemplateRef("input");
const userText = ref("");

const wpm = reactive<{
  raw: number[];
  net: number[];
  error: number[];
  lastUserPosition: number;
}>({
  raw: [],
  net: [],
  error: [],
  lastUserPosition: 0,
});
const timer = reactive<{ status: "idle" | "start" | "end"; counter: number }>({
  status: "idle",
  counter: 15,
});
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
    console.time("timer");

    const raw = Math.floor(
      userText.value.length / 5 / ((15 - timer.counter) / 60),
    );
    wpm.raw.push(raw);

    let errorCount = 0;
    for (let i = wpm.lastUserPosition; i < userText.value.length; i++) {
      if (text[i] !== userText.value[i]) {
        errorCount++;
      }
    }
    wpm.lastUserPosition = userText.value.length;
    wpm.error.push(errorCount);
    const allError = wpm.error.reduce((x, e) => (x += e));
    console.log(allError);

    const net = Math.floor(
      (userText.value.length / 5 - allError) / ((15 - timer.counter) / 60),
    );
    wpm.net.push(net);

    if (timerCounter === 0) timer.status = "end";

    console.timeEnd("timer");
  },
);
</script>

<template>
  <section class="w-full cursor-default" @click="inputRef?.focus()">
    <div v-if="timer.status !== 'end'">
      <p
        class="my-3 text-3xl"
        :class="timer.status === 'start' ? 'opacity-100' : 'opacity-0'"
      >
        {{ timer.counter }}
      </p>
      <input
        ref="input"
        v-model="userText"
        class="absolute z-50 opacity-0"
        @keypress.once="timer.status = 'start'"
      >
      <MainText :user-text="userText" :text="text" />
    </div>
    <MainResult v-else :wpm="wpm" />
  </section>
</template>
