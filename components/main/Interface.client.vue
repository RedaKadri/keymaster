<script setup lang="ts">
import type { wpmType } from "~/types";

const text =
  "The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze whispered through the trees, carrying the sweet scent of flowers.";

const { timer, stopTimer, startTimer } = useTimer()

const userInput = ref("");
const inputRef = useTemplateRef("input");

const wpm = ref<wpmType[]>([]);

let prevUserInputIndex = 0;
watch(
  timer,
  () => {
    const userInputLength = userInput.value.length;

    const wpmRaw = Math.floor(
      userInputLength / 5 / ((15 - timer.value) / 60),
    );

    const allWpmErrors = getAllWpmErrors(wpm.value);
    const wpmNet = Math.floor(
      (userInputLength / 5 - allWpmErrors) /
      ((15 - timer.value) / 60),
    );

    const wpmErrors = getWpmErrors(prevUserInputIndex, userInput.value, text);
    prevUserInputIndex = userInputLength;

    wpm.value.push({
      time: timer.value,
      raw: wpmRaw,
      net: wpmNet,
      errors: wpmErrors,
    });

    if (timer.value === 0) stopTimer();
  },
);
</script>

<template>
  <section class="w-full cursor-default" @click="inputRef?.focus()">
    <input ref="input" v-model="userInput" class="absolute z-50 opacity-0" @keypress.once="startTimer()">
    <MainTimer />
    <MainText :user-text="userInput" :text="text" />
    <MainResult v-if="timer === 0" :wpm="wpm" />
  </section>
</template>
