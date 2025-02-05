<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between bg-background/95 py-8 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div>
      <NuxtLink to="/">
        <UiButton
          class="gap-2 px-0 text-4xl font-bold bg-transparent text-foreground hover:bg-transparent hover:text-secondary-foreground"
        >
          <Icon name="solar:keyboard-broken" class="h-[2.4rem] w-[2.4rem]" />
          keymaster
        </UiButton>
      </NuxtLink>
    </div>
    <div class="flex items-center justify-center gap-6">
      <UiUserMenu />
    </div>
  </header>
</template>
