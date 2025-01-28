export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  const data = await useRequestFetch()("/api/user");

  if (data) {
    user.value = data;
    if (to.name === "login") return navigateTo("/");
    return;
  }

  if (to.name === "account") return navigateTo("/login");
});
