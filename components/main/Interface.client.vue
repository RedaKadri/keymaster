<script setup lang="ts">
import type { wpmType } from "~/types";

const text =
  "Nature is the world around us. It includes everything that is not made by people, like trees, animals, rivers, and mountains. Nature is important because it gives us air to breathe, water to drink, and food to eat. It also provides us with beautiful places to visit and enjoy. We need to take care of nature because it is important for our health and well-being. ";

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
    if (timerCounter === timerStore.timer.init) return;

    const userInputLength = userInput.value.length;

    const { wpmRaw, wpmNet } = wpmUtils(
      wpm.value,
      userInputLength,
      timerStore.timer.init,
      timerCounter,
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
  <MainResult v-if="timerStore.timer.counter === 0" :wpm="wpm" />
  <section v-else class="w-full cursor-default" @click="inputRef?.focus()">
    <input
      ref="input"
      v-model="userInput"
      class="absolute z-50 opacity-0"
      @keypress="handleInputKeypress"
    >
    <MainTimer />
    <MainText :user-text="userInput" :text="text" />
    <div class="flex justify-center m-10">
      <Icon
        name="radix-icons:symbol"
        class="absolute text-xl transition-all opacity-50 cursor-pointer hover:opacity-100 hover:rotate-90"
        @click="
          () => {
            userInput = '';
            timerStore.resetTimer();
            userStartTyping = false;
            wpm = [];
          }
        "
      />
    </div>
  </section>
</template>
