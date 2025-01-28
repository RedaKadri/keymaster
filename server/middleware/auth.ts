import { setSessionTokenCookie } from "../lib/cookies";
import {
  type SessionValidationResult,
  validateSessionToken,
} from "../lib/session";

declare module "h3" {
  interface H3EventContext {
    auth: SessionValidationResult;
  }
}

export default defineEventHandler(async (event) => {
  if (!getRequestURL(event).pathname.startsWith("/api")) return;

  const token = getCookie(event, "session");
  if (!token) {
    event.context.auth = { user: null, session: null };
    return;
  }

  const authData = await validateSessionToken(token);

  if (!authData.session) {
    deleteCookie(event, "session");
  } else {
    setSessionTokenCookie(event, token, authData.session.expiresAt);
  }

  event.context.auth = authData;
});
