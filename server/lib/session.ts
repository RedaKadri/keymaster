import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq } from "drizzle-orm";

export function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };

  await db.insert(tables.sessions).values(session);
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [result] = await db
    .select({ user: tables.users, session: tables.sessions })
    .from(tables.sessions)
    .innerJoin(tables.users, eq(tables.sessions.userId, tables.users.id))
    .where(eq(tables.sessions.id, sessionId));
  if (!result) return { user: null, session: null };

  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(tables.sessions).where(eq(tables.sessions.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 3) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    await db
      .update(tables.sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(tables.sessions.id, session.id));
  }

  return { user, session };
}

export async function invalidateSession(sessionId: string) {
  await db.delete(tables.sessions).where(eq(tables.sessions.id, sessionId));
}


export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
