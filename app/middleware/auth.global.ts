export default defineNuxtRouteMiddleware(async (to) => {
  if (["login", "index"].includes(String(to.name))) return;

  const user = useUser();
  const data = await useRequestFetch()("/api/user");

  if (!data) return navigateTo("/login", { redirectCode: 301 });
  user.value = data;
});
