import { OAuth2RequestError, type OAuth2Tokens } from "arctic";
import type { GitHubUser } from "~~/server/types";

import { createSession, generateSessionToken } from "~~/server/lib/session";
import { setSessionTokenCookie } from "~~/server/lib/cookies";
import { github } from "~~/server/lib/oauth";

import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
      message: "Please restart the process.",
    });
  }
  let tokens: OAuth2Tokens;
  try {
    tokens = await github.validateAuthorizationCode(code);
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

  const githubUser = await $fetch<GitHubUser>("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  const [existingUser] = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.authProviderID, String(githubUser.id)));
  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    return sendRedirect(event, "/");
  }

  const userId = createId();
  await db.insert(tables.users).values({
    id: userId,
    name: githubUser.login,
    email: githubUser.email,
    avatarUrl: githubUser.avatar_url,
    authProvider: "github",
    authProviderID: String(githubUser.id),
  });

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, userId);
  setSessionTokenCookie(event, sessionToken, session.expiresAt);
  return sendRedirect(event, "/");
});
