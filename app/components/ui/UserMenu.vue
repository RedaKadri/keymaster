<script setup lang="ts">
const user = useUser();

const colorMode = useColorMode();

const logout = async () => {
  await $fetch("/api/logout", {
    method: "POST",
  });
  navigateTo("/");
};
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <button
        v-if="!user"
        class="p-2 transition-all border rounded-full w-9 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9"
      >
        <Icon name="solar:menu-dots-bold" class="w-full h-full" />
      </button>
      <button v-else>
        <AvatarRoot
          class="flex overflow-hidden rounded-full cursor-pointer h-9 w-9 shrink-0"
        >
          <AvatarImage
            class="flex items-center justify-center w-full h-full rounded-full bg-muted"
            :src="user?.avatarUrl || ''"
            :alt="user?.name"
          />
          <AvatarFallback
            class="flex items-center justify-center w-full h-full rounded-full bg-muted"
            :delay-ms="600"
          >
            {{ user?.name.charAt(0) }}
          </AvatarFallback>
        </AvatarRoot>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            class="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent"
          >
            <div class="flex items-center">
              <Icon
                name="solar:moon-bold"
                class="absolute w-4 h-4 mr-2 scale-0 dark:scale-100"
              />
              <Icon
                name="solar:sun-bold"
                class="w-4 h-4 mr-2 scale-100 dark:scale-0"
              />

              <span>Toggle theme</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 m-3"
            >
              <DropdownMenuItem
                class="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                @click="colorMode.preference = 'light'"
              >
                <Icon name="solar:sun-bold" class="w-4 h-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                class="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                @click="colorMode.preference = 'dark'"
              >
                <Icon name="solar:moon-bold" class="w-4 h-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                class="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                @click="colorMode.preference = 'system'"
              >
                <Icon name="solar:monitor-bold" class="w-4 h-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator class="h-[1px] bg-secondary m-1" />
        <DropdownMenuItem
          v-if="user"
          class="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          <NuxtLink to="account" class="flex items-center">
            <Icon name="solar:user-bold" class="w-4 h-4 mr-2" />
            <span> My Account </span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem
          class="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          <NuxtLink v-if="!user" to="account" class="flex items-center">
            <Icon name="solar:login-2-bold" class="w-4 h-4 mr-2" />
            <span> Log in </span>
          </NuxtLink>
          <form v-else @submit.prevent="logout">
            <button type="submit" class="flex items-center">
              <Icon name="solar:logout-2-bold" class="w-4 h-4 mr-2" />
              <span> Log out </span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
