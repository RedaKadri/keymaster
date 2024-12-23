<script setup lang="ts">
const timerStore = useTimerStore();
const timeOptions = [15, 30, 60, 120];

const disableTimerOption = (timeOption: number) =>
  timeOption === timerStore.timer.init ||
  timerStore.timer.counter !== timerStore.timer.init;
</script>

<template>
  <div
    class="flex items-center p-2 my-10 rounded-lg shadow-md w-fit bg-accent text-accent-foreground"
  >
    <div class="flex items-center gap-1 text-[#6a9589] mr-1">
      <Icon name="radix-icons:clock" />
      <span>{{ timerStore.timer.counter }}</span>
    </div>
    <div class="flex">
      <Separator
        class="bg-secondary mx-2 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-1 rounded-3xl"
        decorative
        orientation="vertical"
      />
      <div class="flex items-center gap-1">
        <button
          v-for="timeOption in timeOptions"
          :key="timeOption"
          class="mx-1 transition-colors hover:text-[#6a9589] overflow-clip"
          :class="{
            'cursor-not-allowed': disableTimerOption(timeOption),
          }"
          :disabled="disableTimerOption(timeOption)"
          @click="timerStore.setTimer(timeOption)"
        >
          {{ timeOption }}
        </button>
      </div>
    </div>
  </div>
</template>
