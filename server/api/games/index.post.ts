import type { Status } from "~~/server/types";

export default defineEventHandler(async (event) => {
  const { user } = event.context.auth;
  if (!user) throw createError({ status: 401 });

  const body: Status = await readBody(event);

  try {
    await db.insert(tables.games).values({
      userId: user.id,
      status: body,
    });
    return sendNoContent(event, 201);
  } catch (error) {
    console.error("Error creating game:", error);
    throw createError({ status: 500, message: "Failed to create game." });
  }
});
