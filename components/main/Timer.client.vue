<script setup lang="ts">
const { timer, setTimer } = useTimer()
const timeOptions = [15, 30, 60, 120]
</script>

<template>
  <div class="flex items-center p-2 my-10 rounded-lg w-fit bg-accent text-accent-foreground">
    <div class="flex items-center gap-1 text-primary-foreground">
      <Icon name="radix-icons:clock" />
      <span>{{ timer }}</span>
    </div>
    <Separator 
      class="bg-secondary mx-3 data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-1 rounded-3xl"
      decorative 
      orientation="vertical" 
    />
    <div class="flex items-center gap-1">
      <button 
        v-for="timeOption in timeOptions"
        :key="timeOption"
        class="mx-1 transition-colors hover:text-primary-foreground"
        @click="setTimer(timeOption)"
      >
        {{ timeOption }}
      </button>
    </div>
  </div>
</template>