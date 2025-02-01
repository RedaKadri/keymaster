import { invalidateSession } from "../lib/session";

export default defineEventHandler(async (event) => {
  const { session } = event.context.auth;
  if (session === null) {
    throw createError({
      statusCode: 403,
    });
  }

  await invalidateSession(session.id);
  deleteCookie(event, "session");
});
