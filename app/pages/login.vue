<script setup lang="ts">
useHead({ title: "login | Keymaster" });
</script>
<template>
  <div class="flex items-center justify-center gap-36">
    <section>
      <h1
        class="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl"
      >
        Login
      </h1>
    </section>
    <section class="flex flex-col items-center justify-center gap-4 w-80">
      <NuxtLink
        to="/login/github"
        class="inline-flex items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium transition-colors border rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 border-input bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <IconsGithub />
        Github
      </NuxtLink>
      <div class="relative w-full">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-t-input" />
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <NuxtLink
        to="/login/google"
        class="inline-flex items-center justify-center w-full h-12 px-4 py-2 text-sm font-medium transition-colors border rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 border-input bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <IconsGoogle />
        Google
      </NuxtLink>
    </section>
  </div>
</template>

