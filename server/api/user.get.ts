export default defineEventHandler((event) => {
  return event.context.auth.user;
});
