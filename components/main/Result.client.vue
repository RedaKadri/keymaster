<script setup lang="ts">
import Chart from "chart.js/auto";
import type { wpmType } from "~/types";

const { wpm } = defineProps<{
  wpm: wpmType[];
}>();

const canvasRef = useTemplateRef("canvas");

onMounted(() => {
  if (!canvasRef.value) return;
  new Chart(canvasRef.value, {
    type: "line",
    data: {
      labels: wpm.map((data) => data.x),
      datasets: [
        {
          label: "raw",
          data: wpm,
          parsing: {
            yAxisKey: "raw",
          },
          borderColor: "rgba(1, 1, 125, 1)",
        },
        {
          label: "net",
          data: wpm,
          parsing: {
            yAxisKey: "net",
          },
          borderColor: "rgba(1, 125, 1, 1)",
        },
        {
          label: "errors",
          data: wpm,
          parsing: {
            yAxisKey: "errors",
          },
          type: "scatter",
          pointStyle: "crossRot",
          borderColor: "rgba(125, 1, 1, 1)",
        },
      ],
    },

  });
});
</script>

<template>
  <section>
    <canvas ref="canvas" height="300" width="1500" />
  </section>
</template>
