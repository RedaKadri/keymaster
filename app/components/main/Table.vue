<script setup lang="ts">
import { MainResultChart } from "#components";

const { data } = defineProps<{ data: Game[] }>();

const paginatedData = toRef(data.slice(0, 4));

const loadMoreData = () => {
  const nextData = data.slice(
    paginatedData.value.length,
    paginatedData.value.length + 4,
  );
  paginatedData.value.push(...nextData);

  console.log(paginatedData.value);
};
</script>
<template>
  <table class="w-full caption-bottom">
    <thead class="text-sm opacity-50">
      <tr>
        <th class="h-10">language</th>
        <th class="h-10">time</th>
        <th class="h-10">wpm</th>
        <th class="h-10">raw</th>
        <th class="h-10">errors</th>
        <th class="h-10 px-2">graph</th>
        <th class="h-10">date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(game, index) in paginatedData"
        :key="game.id"
        class="p-2"
        :class="{ 'bg-accent': index % 2 === 0 }"
      >
        <td class="p-2 text-center">{{ game.stats.language }}</td>
        <td class="p-2 text-center">{{ game.stats.time }}s</td>
        <td class="p-2 text-center">{{ game.stats.wpm }}</td>
        <td class="p-2 text-center">{{ game.stats.raw }}</td>
        <td class="p-2 text-center">{{ game.stats.errors }}</td>
        <td class="p-2 text-center">
          <DialogRoot>
            <DialogTrigger>
              <Icon name="solar:graph-new-up-bold" size="20" />
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay
                class="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              />
              <DialogContent
                class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] max-h-[85vh] w-lvw max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
              >
                <div class="w-full h-60">
                  <MainResultChart :wpm="game.stats.timeLine" />
                </div>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </td>
        <td class="p-2 text-center">
          <p>
            {{ game.createdAt?.toString().split(" ")[0] }}
          </p>
          <p>
            {{ game.createdAt?.toString().split(" ")[1]?.slice(0, 5) }}
          </p>
        </td>
      </tr>
      <tr>
        <td colspan="7">
          <UiButton
            class="w-full rounded-none bg-accent text-accent-foreground hover:bg-accent/65"
            :class="{ hidden: paginatedData.length === data.length }"
            @click="loadMoreData"
          >
            Load more
          </UiButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>
