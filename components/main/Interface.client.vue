<script setup lang="ts">
import type { wpmType } from "~/types";

const blurSection = ref(true);

const language = ref<"french" | "english">("english");
const toogleLanguage = () => {
  language.value = language.value === "french" ? "english" : "french";
};

const text = ref("");
watch(
  language,
  () => {
    text.value = generateText(700, language.value);
  },
  { immediate: true },
);

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
  text.value = generateText(700, language.value);
  blurSection.value = true;
};
</script>

<template>
  <MainResult
    v-if="timerStore.timer.counter === 0"
    :wpm="wpm"
    :reset-test="resetTest"
  />
  <section v-else class="w-full cursor-default" @click="inputRef?.focus()">
    <div class="mb-10">
      <MainTimer class="relative md:top-10" />
      <button
        class="mx-auto flex justify-center p-2 items-center gap-2"
        :disabled="timerStore.timer.counter !== timerStore.timer.init"
        @click="toogleLanguage"
      >
        <Icon name="solar:global-outline" />
        <span>{{ language }}</span>
      </button>
    </div>
    <input
      ref="input"
      v-model="userInput"
      class="absolute z-50 opacity-0"
      @keypress="handleInputKeypress"
    />
    <div class="flex items-center justify-center" @click="blurSection = false">
      <div
        v-if="blurSection"
        class="absolute flex items-center justify-center gap-2"
      >
        <Icon name="solar:cursor-bold" />
        <p>Click here to focus</p>
      </div>
      <MainText
        :user-text="userInput"
        :text="text"
        :class="blurSection && 'blur-md'"
      />
    </div>
    <div class="flex justify-center m-10">
      <Icon
        name="solar:refresh-bold"
        class="absolute text-xl transition-all opacity-50 cursor-pointer hover:opacity-100 hover:rotate-90"
        @click="resetTest"
      />
    </div>
  </section>
</template>
