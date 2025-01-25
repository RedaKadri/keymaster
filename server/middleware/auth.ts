import { setSessionTokenCookie } from "../lib/cookies";
import { validateSessionToken } from "../lib/session";

export default defineEventHandler(async (event) => {
  if (!getRequestURL(event).pathname.startsWith("/api")) return;

  const token = getCookie(event, "session");
  if (!token) {
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
    });
  }

  const { user, session } = await validateSessionToken(token);

  if (!session) {
    deleteCookie(event, "session");
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
    });
  } else {
    setSessionTokenCookie(event, token, session.expiresAt);
  }

  event.context.auth = { user, session };
});
