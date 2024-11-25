<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between bg-background/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <NuxtLink to="/" class="cursor-pointer">
      <UiButton
        class="font-mono text-2xl font-bold bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground">
        Mantype
      </UiButton>
    </NuxtLink>
    <div className="flex justify-center gap-4">
      <UiThemeToggle />
    </div>
  </header>
</template>