<script setup lang="ts">
const { userText, text } = defineProps<{ userText: string; text: string }>();

const textRef = useTemplateRef("par");
const charsPer2Lines = ref(67);
const currentScroll = ref(0);

watch(textRef, () => {
  if (textRef.value)
    charsPer2Lines.value = Math.floor(textRef.value.clientWidth / 22) * 2;
});

watch(
  () => userText,
  (updatedUserText) => {
    if (
      updatedUserText.length > charsPer2Lines.value &&
      updatedUserText.endsWith(" ")
    ) {
      currentScroll.value += 54;
      charsPer2Lines.value += textRef.value
        ? Math.floor(textRef.value?.clientWidth / 22)
        : 67;
    }
  },
);
</script>

<template>
  <div class="text-4xl h-[165px] overflow-hidden">
    <p
      ref="par"
      class="relative leading-normal"
      :style="{ bottom: currentScroll + 'px' }"
    >
      <span
        v-for="(character, index) in text"
        :key="index"
        style=""
        :class="{
          'text-foreground':
            index < userText.length && userText[index] === character,
          'text-foregroundShadow': index >= userText.length,
          'text-destructive':
            index < userText.length && userText[index] !== character,
          'border-b-4 border-b-[#c0a36e]': index === userText.length,
        }"
      >
        {{ character }}
      </span>
    </p>
  </div>
</template>
