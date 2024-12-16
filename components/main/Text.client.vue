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
    if ( updatedUserText.length > charsPer2Lines.value && updatedUserText.endsWith(" ")) {
      currentScroll.value += 40;
      charsPer2Lines.value += textRef.value ? Math.floor(textRef.value?.clientWidth / 22) : 67;
    }
  },
);
</script>

<template>
  <div class="text-4xl h-[122px] overflow-hidden">
    <p ref="par" class="relative" :style="{ bottom: currentScroll + 'px' }">
      <span
        v-for="(character, index) in text"
        :key="index"
        :class="{
          'opacity-100': index < userText.length && userText[index] === character,
          'text-destructive': index < userText.length && userText[index] !== character,
          'opacity-50': index >= userText.length,
        }"
      >
        {{ character }}
      </span>
    </p>
  </div>
</template>
