<script setup lang="ts">
import type { wpmType } from '~/types';

const text = "The sun dipped below the horizon, painting the sky in hues of orange and pink. A gentle breeze whispered through the trees, carrying the sweet scent of flowers."

const { timer, startTimer, stopTimer } = useTimer()

const userInput = ref("")
const inputRef = useTemplateRef("input")

const wpm = ref<wpmType[]>([])

let prevUserInputIndex = 0
watch(() => timer.counter, (timerCounter) => {
  const userInputLength = userInput.value.length

  const wpmErrors = getWpmErrors(prevUserInputIndex, userInput.value, text)
  prevUserInputIndex = userInputLength

  const wpmRaw = Math.floor(userInputLength / 5 / ((15 - timer.counter) / 60));

  const allWpmErrors = getAllWpmErrors(wpm.value)
  const wpmNet = Math.floor((userInputLength / 5 - allWpmErrors) / ((15 - timer.counter) / 60));

  wpm.value.push({ time: timerCounter, raw: wpmRaw, net: wpmNet, errors: wpmErrors })

  if (timerCounter === 0) stopTimer()
})

</script>

<template>
  <section class="w-full cursor-default" @click="inputRef?.focus()">
    <input ref="input" v-model="userInput" class="absolute z-50 opacity-0" @keypress.once="startTimer()">
    <MainTimer :timer="timer.counter" :class="timer.status === 'active' ? 'opacity-100' : 'opacity-0'" />
    <MainText :user-text="userInput" :text="text" />
    <MainResult v-if="timer.status === 'done'" :wpm="wpm" />
  </section>

</template>