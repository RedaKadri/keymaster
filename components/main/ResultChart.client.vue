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
          label: "wpm",
          tension: 0.3,
          data: wpm,
          yAxisID: "wpm",
          parsing: {
            yAxisKey: "net",
          },
          borderColor: "#2d4f67",
          pointBackgroundColor: "#2d4f67",
          borderWidth: 3,
          pointRadius: 1.5,
          order: 2,
        },
        {
          label: "raw",
          tension: 0.3,
          data: wpm,
          yAxisID: "raw",
          parsing: {
            yAxisKey: "raw",
          },
          borderColor: "#727169",
          pointBackgroundColor: "#727169",
          borderWidth: 3,
          pointRadius: 1.5,
          order: 3,
        },
        {
          label: "errors",
          data: wpm,
          yAxisID: "errors",
          parsing: {
            yAxisKey: "errors",
          },
          type: "scatter",
          pointStyle: "crossRot",
          borderColor: "#e82424",
          pointBackgroundColor: "#e82424",
          borderWidth: 2,
          order: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        wpm: {
          axis: "y",
          display: true,
          title: {
            display: true,
            text: "Words per Minute",
          },
          beginAtZero: true,
          min: 0,
          ticks: {
            autoSkip: true,
            autoSkipPadding: 20,
          },
          grid: {
            display: true,
          },
        },
        raw: {
          axis: "y",
          display: false,
          title: {
            display: true,
            text: "Raw Words per Minute",
          },
          beginAtZero: true,
          ticks: {
            autoSkip: true,
            autoSkipPadding: 20,
          },
          grid: {
            display: false,
          },
        },
        errors: {
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Errors",
          },
          beginAtZero: true,
          ticks: {
            precision: 0,
            autoSkip: true,
            autoSkipPadding: 20,
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          animation: { duration: 250 },
          mode: "index",
          intersect: false,
        },
      },
    },
  });
});
</script>

<template>
  <canvas ref="canvas" />
</template>
