import { createId } from "@paralleldrive/cuid2";
import { decodeIdToken, OAuth2RequestError, type OAuth2Tokens } from "arctic";
import { eq } from "drizzle-orm";
import { setSessionTokenCookie } from "~~/server/lib/cookies";
import { google } from "~~/server/lib/oauth";
import { createSession, generateSessionToken } from "~~/server/lib/session";
import type { GoogleType } from "~~/server/types";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(event, "google_code_verifier") ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null ||
    state !== storedState
  ) {
    throw createError({
      status: 400,
      message: "Please restart the process.",
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({
        status: 400,
        message: "Please restart the process.",
      });
    }
    throw createError({
      status: 500,
      message: "Please restart the process.",
    });
  }

  const googleUser = decodeIdToken(tokens.idToken()) as GoogleType;

  const [existingUser] = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.authProviderID, String(googleUser.sub)));
  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    return sendRedirect(event, "/account");
  }

  const userId = createId();
  await db.insert(tables.users).values({
    id: userId,
    name: googleUser.name,
    email: googleUser.email,
    avatarUrl: googleUser.picture,
    authProvider: "google",
    authProviderID: googleUser.sub,
  });

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, userId);
  setSessionTokenCookie(event, sessionToken, session.expiresAt);
  return sendRedirect(event, "/account");
});
