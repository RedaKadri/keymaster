import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = event.context.auth;
  if (!user) {
    throw createError({ status: 401, message: "Unauthorized" });
  }

  try {
    const games = await db
      .select()
      .from(tables.games)
      .orderBy(desc(tables.games.createdAt))
      .where(eq(tables.games.userId, user.id));

    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw createError({ status: 500, message: "Failed to fetch games." });
  }
});
