import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (auth.session === null || auth.user === null) {
    throw createError({
      statusCode: 403,
    });
  }
  await db.delete(tables.users).where(eq(tables.users.id, auth.user.id));

  deleteCookie(event, "session");
});
