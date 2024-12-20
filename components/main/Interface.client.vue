<script setup lang="ts">
import type { wpmType } from "~/types";

const text = ref(generateText(700));

const timerStore = useTimerStore();

const userInput = ref("");
const inputRef = useTemplateRef("input");
let userStartTyping = false;
const handleInputKeypress = () => {
  if (!userStartTyping) timerStore.startTimer();
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

    const wpmErrors = getWpmErrors(
      prevUserInputIndex,
      userInput.value,
      text.value,
    );
    prevUserInputIndex = userInputLength;

    wpm.value.push({
      x: timerStore.timer.init - timerCounter,
      raw: wpmRaw,
      net: wpmNet,
      errors: wpmErrors,
    });

    if (timerCounter === 0) timerStore.stopTimer();
  },
);

const resetTest = () => {
  userInput.value = "";
  timerStore.resetTimer();
  userStartTyping = false;
  wpm.value = [];
  text.value = generateText(700);
};
</script>

<template>
  <MainResult
    v-if="timerStore.timer.counter === 0"
    :wpm="wpm"
    :reset-test="resetTest"
  />
  <section v-else class="w-full cursor-default" @click="inputRef?.focus()">
    <input
      ref="input"
      v-model="userInput"
      class="absolute z-50 opacity-0"
      @keypress="handleInputKeypress"
    />
    <MainTimer />
    <MainText :user-text="userInput" :text="text" />
    <div class="flex justify-center m-10">
      <Icon
        name="radix-icons:symbol"
        class="absolute text-xl transition-all opacity-50 cursor-pointer hover:opacity-100 hover:rotate-90"
        @click="resetTest"
      />
    </div>
  </section>
</template>
