import type { Stats } from "~~/server/types";

export default defineEventHandler(async (event) => {
  const { user } = event.context.auth;
  if (!user) throw createError({ status: 401 });

  const body: Stats = await readBody(event);

  try {
    await db.insert(tables.games).values({
      userId: user.id,
      stats: body,
    });
    return sendNoContent(event, 201);
  } catch (error) {
    console.error("Error creating game:", error);
    throw createError({ status: 500, message: "Failed to create game." });
  }
});
