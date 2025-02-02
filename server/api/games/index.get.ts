import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = event.context.auth;
  if (!user) throw createError({ status: 401 });

  const result = await db
    .select()
    .from(tables.games)
    .where(eq(tables.games.userId, user.id));

  return result;
});
