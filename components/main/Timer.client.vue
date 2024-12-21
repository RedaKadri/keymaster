<script setup lang="ts">
const timerStore = useTimerStore();
const timeOptions = [15, 30, 60, 120];
</script>

<template>
  <div
    class="flex items-center p-2 my-10 rounded-lg w-fit bg-accent text-accent-foreground"
  >
    <div class="flex items-center gap-1 text-[#6a9589] mr-1">
      <Icon name="radix-icons:clock" />
      <span>{{ timerStore.timer.counter }}</span>
    </div>
    <div v-if="timerStore.timer.counter === timerStore.timer.init" class="flex">
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
            'cursor-not-allowed': timeOption === timerStore.timer.init,
          }"
          :disabled="timeOption === timerStore.timer.init"
          @click="timerStore.setTimer(timeOption)"
        >
          {{ timeOption }}
        </button>
      </div>
    </div>
  </div>
</template>
