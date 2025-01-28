import type { H3Event } from "h3";

export function setSessionTokenCookie(
  event: H3Event,
  token: string,
  expiresAt: Date,
) {
  setCookie(event, "session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}
