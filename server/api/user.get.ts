export default defineEventHandler((event) => {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(event.context.auth.user);
  //   }, 1000);
  // });
  return event.context.auth.user;
});
