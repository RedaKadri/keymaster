<script setup lang="ts">
import type { wpmType } from "~/types";

const text =
  "The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze whispered through the trees, carrying the sweet scent of flowers.";

const timerStore = useTimerStore();

const userInput = ref("");
const inputRef = useTemplateRef("input");
let userStartTyping = false;
const handleInputKeypress = () => {
  if (!userStartTyping) {
    timerStore.startTimer();
  }
  userStartTyping = true;
};

const wpm = ref<wpmType[]>([]);

let prevUserInputIndex = 0;
watch(
  () => timerStore.timer.counter,
  (timerCounter) => {
    const userInputLength = userInput.value.length;

    const wpmRaw = Math.floor(
      userInputLength / 5 / ((timerStore.timer.init - timerCounter) / 60),
    );

    const allWpmErrors = getAllWpmErrors(wpm.value);
    const wpmNet = Math.floor(
      (userInputLength / 5 - allWpmErrors) /
        ((timerStore.timer.init - timerCounter) / 60),
    );

    const wpmErrors = getWpmErrors(prevUserInputIndex, userInput.value, text);
    prevUserInputIndex = userInputLength;

    wpm.value.push({
      time: timerCounter,
      raw: wpmRaw,
      net: wpmNet,
      errors: wpmErrors,
    });

    if (timerCounter === 0) timerStore.stopTimer();
  },
);
</script>

<template>
  <section class="w-full cursor-default" @click="inputRef?.focus()">
    <input
      ref="input"
      v-model="userInput"
      class="absolute z-50 opacity-0"
      @keypress="handleInputKeypress"
    >
    <MainTimer />
    <MainText :user-text="userInput" :text="text" />
    <div class="flex justify-center m-10">
      <UiButton
        class="hover:bg-accent hover:text-accent-foreground"
        @click="
          () => {
            userInput = '';
            timerStore.resetTimer();
            userStartTyping = false;
            wpm = [];
          }
        "
      >
        restart
      </UiButton>
    </div>
    <MainResult v-if="timerStore.timer.counter === 0" :wpm="wpm" />
  </section>
</template>
