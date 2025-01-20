// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "radix-vue/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@pinia/nuxt",
  ],
  eslint: {
    config: {
      stylistic: false,
    },
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classPrefix: "",
    classSuffix: "",
  },
});
